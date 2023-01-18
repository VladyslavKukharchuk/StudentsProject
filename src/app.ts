import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import { createServer } from 'http';
import router from './routers/router';
import { EventEmitter } from 'events';
import ErrorHandler from './middleware/errorHandler';
import EventsController from './controllers/EventsController';
import authentication from './middleware/authentication';
import User from './models/User';
import db from './db';
import { WebSocket } from 'ws';
import connection from './routers/routesWS';

const DB_URL = process.env.DB_URL!;
mongoose.set('strictQuery', false);

const myEmitter = new EventEmitter();

const app = express();
const httpServer = createServer(app);
const wss = new WebSocket.Server({ server: httpServer });
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
   credentials: true,
   origin: process.env.CLIENT_URL,
}));
app.use('/api', router);
app.use(ErrorHandler.http);

// подключение
wss.on('connection', connection);
myEmitter.on('error', ErrorHandler.ws);

async function start() {
   await db.connect();
   await mongoose.connect(DB_URL);
   httpServer.listen(PORT, () => {
      console.log(`Server started on port ${PORT}.`);
   });
}

start().catch((e) => {
   console.log(e);
   process.exit(0)
});

//uncaughtException
process.on('uncaughtException', (err) => {
   console.warn('uncaughtException', '', {
      message: 'uncaughtException',
      body: {
         err,
      },
   });

   httpServer.close(() => {
      console.log('Http server closed.');
      mongoose.connection.close(false, async () => {
         await User.deleteMany({});
         console.log('MongoDb connection closed.');
      });
      db.end(() => {
         console.log('PG connections closed.');
         process.exit(1);
      });
   });

   setTimeout(() => {
      process.abort();
   }, 1000).unref();
});

//unhandledRejection
process.on('unhandledRejection', (reason, promise) => {
   console.warn({
      message: 'Unhandled promise rejection',
      params: {
         promise,
         reason,
      },
   });

   httpServer.close(() => {
      console.log('Http server closed.');
      mongoose.connection.close(false, async () => {
         await User.deleteMany({});
         console.log('MongoDb connection closed.');
      });
      db.end(() => {
         console.log('PG connections closed.');
         process.exit(1);
      });
   });

   setTimeout(() => {
      process.abort();
   }, 1000).unref();
});

//SIGINT
process.on('SIGINT', () => {
   console.info('SIGTERM signal received.');
   httpServer.close(() => {
      console.log('Http server closed.');
      mongoose.connection.close(false, async () => {
         await User.deleteMany({});
         console.log('MongoDb connection closed.');
      });
      db.end(() => {
         console.log('PG connections closed.');
         process.exit(0);
      });
   });
});

//SIGTERM
process.on('SIGTERM', () => {
   console.info('SIGTERM signal received.');
   httpServer.close(() => {
      console.log('Http server closed.');
      mongoose.connection.close(false, async () => {
         await User.deleteMany({});
         console.log('MongoDb connection closed.');
      });
      db.end(() => {
         console.log('PG connections closed.');
         process.exit(0);
      });
   });
});

export { httpServer, myEmitter };
