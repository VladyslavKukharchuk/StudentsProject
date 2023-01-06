import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import { createServer } from 'http';
import { router } from './router';
import { EventEmitter } from 'events';
import ErrorHandler from './middleware/errorHandler';
import EventsController from './controllers/EventsController';
import authentication from './middleware/authentication';


const DB_URL = process.env.DB_URL!;
mongoose.set('strictQuery', false);

const myEmitter = new EventEmitter();

const app = express();
const httpServer = createServer(app);
const io = require('socket.io')(httpServer, {cors: {origin: "*"}});
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
   credentials: true,
   origin: process.env.CLIENT_URL
}));
app.use('/api', router);
app.use(ErrorHandler.http);

// подключение
// проверяем jwt токен.
io.use(authentication.ws);

io.on('connection', (socket: any) => {
   EventsController.connection(io, socket);
});

myEmitter.on('error', ErrorHandler.ws);

const start = async () => {
   try {
      await mongoose.connect(DB_URL);
      httpServer.listen(PORT, () => {
         console.log(`Server started on port ${PORT}.`);
      });
   } catch (e: any) {
      throw new Error(e);
   }
}

start()

//uncaughtException
process.on('uncaughtException', (err) => {
   console.warn('uncaughtException', '', {
      message: 'uncaughtException',
      body: {
         err,
      },
   });

   httpServer.close(() => {
      process.exit(1); // then exit
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
      process.exit(1);
   });

   setTimeout(() => {
      process.abort();
   }, 1000).unref();
});

process.on('SIGTERM', () => {
   console.info('SIGTERM signal received.');
   console.log('Closing http server.');
   httpServer.close(() => {
      console.log('Http server closed.');
      mongoose.connection.close(false, () => {
         console.log('MongoDb connection closed.');
         process.exit(0);
      });
      io.close(() => {
         console.log('All connections were closed.');
      });
   });
});

export { httpServer, myEmitter };

// import { CharacterActions } from './character/characterActions';
// import { CharacterCreator } from './character/characterCreator';
// import { CharacterClasses } from './config/enums';
//
// let thief1 = CharacterCreator.createCharacter(CharacterClasses.Thief);
// let thief2 = CharacterCreator.createCharacter(CharacterClasses.Thief);
//
// console.log(thief1);
// console.log(thief2);
//
// let warrior1 = CharacterCreator.createCharacter(CharacterClasses.Warrior);
// let warrior2 = CharacterCreator.createCharacter(CharacterClasses.Warrior);
//
// console.log(warrior1);
// console.log(warrior2);
//
// let mage1 = CharacterCreator.createCharacter(CharacterClasses.Mage);
// let mage2 = CharacterCreator.createCharacter(CharacterClasses.Mage);
//
// console.log(mage1);
// console.log(mage2);
//
// console.log("Test of Archery Shot:");
//
// CharacterActions.useAttack(thief1, warrior2);
// CharacterActions.useAttack(thief1, thief2);
// CharacterActions.useAttack(thief1, mage2);
//
// console.log(`Warrior2 HP: ${warrior2.characterHP}`);
// console.log(`Thief2 HP: ${thief2.characterHP}`);
// console.log(`Mage2 HP: ${mage2.characterHP}`);
//
//
// console.log("Test of Sword Strike:");
//
// CharacterActions.useAttack(warrior1, warrior2);
// CharacterActions.useAttack(warrior1, thief2);
// CharacterActions.useAttack(warrior1, mage2);
//
// console.log(`Warrior2 HP: ${warrior2.characterHP}`);
// console.log(`Thief2 HP: ${thief2.characterHP}`);
// console.log(`Mage2 HP: ${mage2.characterHP}`);
//
//
// console.log("Test of Fireball:");
//
// CharacterActions.useAttack(mage1, warrior2);
// CharacterActions.useAttack(mage1, thief2);
// CharacterActions.useAttack(mage1, mage2);
//
// console.log(`Warrior2 HP: ${warrior2.characterHP}`);
// console.log(`Thief2 HP: ${thief2.characterHP}`);
// console.log(`Mage2 HP: ${mage2.characterHP}`);
//
//
// console.log("Test of Relive:");
//
// CharacterActions.useRelive(warrior2);
// CharacterActions.useRelive(thief2);
// CharacterActions.useRelive(mage2);
//
// console.log(`Warrior2 HP: ${warrior2.characterHP}`);
// console.log(`Thief2 HP: ${thief2.characterHP}`);
// console.log(`Mage2 HP: ${mage2.characterHP}`);
