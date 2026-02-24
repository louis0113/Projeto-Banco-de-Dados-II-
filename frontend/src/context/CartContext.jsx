import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const CartContext = createContext();
const API_BASE = 'http://localhost:3000';

const decodeJwt = (token) => {
  try {
    const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    const payload = JSON.parse(atob(base64));
    return payload;
  } catch {
    return null;
  }
};

const normalizeCartItem = (item) => {
  const id = item._id ?? item.productId ?? item.id;
  return {
    _id: id,
    id,
    name: item.name || '',
    price: Number(item.price) || 0,
    quantity: Number(item.quantity) || 0,
    image: item.image || item.imageUrl || '',
  };
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [token, setToken] = useState(() => localStorage.getItem('auth_token'));
  const [user, setUser] = useState(() => {
    const storedToken = localStorage.getItem('auth_token');
    return storedToken ? decodeJwt(storedToken) : null;
  });

  useEffect(() => {
    if (token) {
      localStorage.setItem('auth_token', token);
      setUser(decodeJwt(token));
    } else {
      localStorage.removeItem('auth_token');
      setUser(null);
    }
  }, [token]);

  const authHeaders = () => (token ? { authorization: token } : {});

  const loadCart = async (userId = user?.id) => {
    if (!userId || !token) return;
    try {
      const response = await axios.get(`${API_BASE}/api/cart/${userId}`, {
        headers: authHeaders(),
      });
      const items = Array.isArray(response.data) ? response.data.map(normalizeCartItem) : [];
      setCartItems(items);
    } catch (err) {
      if (err.response?.status === 401) {
        setToken(null);
      }
    }
  };

  const login = async (username, password) => {
    const response = await axios.post(`${API_BASE}/api/auth/login`, { username, password });
    if (response.data?.token) {
      setToken(response.data.token);
    }
    return response.data;
  };

  const register = async (username, password) => {
    await axios.post(`${API_BASE}/api/auth/register`, { username, password, role: 'user' });
    return login(username, password);
  };

  const logout = () => {
    setToken(null);
    setCartItems([]);
  };

  useEffect(() => {
    if (user?.id && token) {
      loadCart(user.id);
    }
  }, [user?.id, token]);

  const addToCart = (product) => {
    if (!user?.id || !token) {
      setCartItems(prev => {
        const isItemInCart = prev.find(item => item._id === product._id);
        if (isItemInCart) {
          return prev.map(item => item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item);
        }
        return [...prev, { ...product, quantity: 1 }];
      });
      setIsDrawerOpen(true);
      return;
    }

    const payload = {
      productId: product._id,
      quantity: 1,
      productInfo: {
        name: product.name,
        price: product.price,
        imageUrl: product.image,
      },
    };

    axios
      .post(`${API_BASE}/api/cart/${user.id}/items`, payload, { headers: authHeaders() })
      .then(() => loadCart(user.id))
      .finally(() => setIsDrawerOpen(true));
  };

  const removeFromCart = (id) => {
    if (!user?.id || !token) {
      setCartItems(prev => prev.filter(item => item._id !== id));
      return;
    }
    axios
      .delete(`${API_BASE}/api/cart/${user.id}/items/${id}`, { headers: authHeaders() })
      .then(() => loadCart(user.id));
  };

  const cartTotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        cartTotal,
        isDrawerOpen,
        setIsDrawerOpen,
        token,
        user,
        loadCart,
        setToken,
        login,
        register,
        logout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
