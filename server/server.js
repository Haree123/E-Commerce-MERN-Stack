import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';

import dbConfig from './config/db.js';
import productRoute from './routes/productRoute.js';
import authRoute from './routes/authRoute.js';
import cartRoute from './routes/cartRoute.js';

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();
dbConfig();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(helmet());
app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:3000',
  })
);

app.use('/', productRoute);
app.use('/', authRoute);
app.use('/', cartRoute);

app.listen(PORT, () => {
  console.log(`App Listening on ${PORT}`);
});
