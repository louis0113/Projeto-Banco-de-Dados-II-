import { createClient} from 'redis';
import dotenv from "dotenv";

const port = process.env.PORT_REDIS;
const host = process.env.HOST_REDIS;
const user = process.env.USERNAME_REDIS;
const password = process.env.PASSWORD_REDIS;

const redis = await createClient({
    url : `redis://${user}:${password}@${host}:${port}`
});

export default redis;


