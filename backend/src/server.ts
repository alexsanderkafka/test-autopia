import 'dotenv/config';
import { createExpressServer } from 'routing-controllers';
import express from 'express';
import AuthControllers from './controllers/AuthControllers';

const app: any = createExpressServer({
  //cors: true,
  routePrefix: '/api',
  //middlewares: [],
  controllers: [AuthControllers],
  classTransformer: true,
});

app.use(express.json());

const PORT = process.env.SERVER_PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});