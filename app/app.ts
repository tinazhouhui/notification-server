import express from 'express';
import router from './router';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json()); // json body parser
app.use(router); // apply router

export default app;
