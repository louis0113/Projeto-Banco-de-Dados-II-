import bcrypt from "bcrypt";
import sequelize from "../config/mysql.js";
import User from "../models/user.js";

const seedUsers = async () => {
  try {
    await sequelize.sync({ force: true }); // recria tabelas

    const users = [
      { username: "admin", password: "admin123", role: "admin" },
      { username: "moderator", password: "mod123", role: "moderator" },
      { username: "user", password: "user123", role: "user" },
    ];

    for (const u of users) {
      const hash = await bcrypt.hash(u.password, 10);
      await User.create({ username: u.username, password: hash, role: u.role });
    }

    console.log("Users seeded successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding users:", error);
    process.exit(1);
  }
};

console.log(process.env.DATABASE_MYSQL);
console.log(process.env.USER_MYSQL);
console.log(process.env.PASS_MYSQL);
console.log(process.env.HOST_MYSQL);

seedUsers();