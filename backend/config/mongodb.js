import dns from "node:dns/promises"
dns.setServers(["1.1.1.1", "8.8.8.8"]);

import mongoose from 'mongoose'

const user = process.env.USER_MONGO;
const senha = process.env.PASS_MONGO;
const senha_encoded= encodeURIComponent(senha);
const host = process.env.HOST_MONGO;
const cluster = process.env.CLUSTER_MONGO;

const uri = `mongodb+srv://${user}:${senha_encoded}@${host}/?appName=${cluster}`;

export {uri, mongoose};

