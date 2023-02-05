import express from 'express';
import 'dotenv/config';
import { createServer } from 'http';
import router from './routers/router';
import { errorHandlerHttp } from './middleware/errorHandler';
import db from './databases/db';
import { WebSocket } from 'ws';
import connection from './webSockets';
import { connectToDatabase } from './databases/mongo';

const redis = require('redis');
const redisClient = redis.createClient(process.env.REDIS_DB_PORT, process.env.REDIS_DB_HOST);

import MongoRepository from './repositories/MongoRepository';
const mongoRepository = new MongoRepository();

const app = express();
const httpServer = createServer(app);
const wss = new WebSocket.Server({ server: httpServer });
const PORT = process.env.PORT;

app.use(express.json());
app.use('/api', router);
app.use(errorHandlerHttp);

// подключение
wss.on('connection', connection);

wss.on('error', (err: Error) => {
  console.error('WS server error!');
  console.error(err.message);
});

wss.on('close', async () => {
  await mongoRepository.deleteAllUsers();
  console.error('WS server close!');
});

async function start() {
  await db.connect();
  await redisClient.connect();
  await connectToDatabase();
  httpServer.listen(PORT, () => {
    console.log(`Server started on port ${PORT}.`);
  });
}

start().catch((e) => {
  console.log(e);
  process.exit(0);
});

//uncaughtException
process.on('uncaughtException', (err) => {
  console.warn('uncaughtException', '', {
    message: 'uncaughtException',
    body: {
      err,
    },
  });

  httpServer.close(async () => {
    console.log('Http server closed.');
    await mongoRepository.deleteAllUsers();
    await redisClient.quit();
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

  httpServer.close(async () => {
    console.log('Http server closed.');
    await mongoRepository.deleteAllUsers();
    await redisClient.quit();
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
  httpServer.close(async () => {
    console.log('Http server closed.');
    await mongoRepository.deleteAllUsers();
    await redisClient.quit();
    db.end(() => {
      console.log('PG connections closed.');
      process.exit(0);
    });
  });
});

//SIGTERM
process.on('SIGTERM', () => {
  console.info('SIGTERM signal received.');
  httpServer.close(async () => {
    console.log('Http server closed.');
    await mongoRepository.deleteAllUsers();
    await redisClient.quit();
    db.end(() => {
      console.log('PG connections closed.');
      process.exit(0);
    });
  });
});

export { httpServer, redisClient };
