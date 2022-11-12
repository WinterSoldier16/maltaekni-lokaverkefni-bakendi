import dotenv from 'dotenv';
import express from 'express';
import { router as router } from './lib/routes';

dotenv.config();

const { PORT: port = 3000 } = process.env;

const app = express();

app.use(express.json());
app.use( router )