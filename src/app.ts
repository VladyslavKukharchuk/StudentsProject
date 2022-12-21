//Http server
import express from 'express';
import { createServer } from 'http';
import { Server } from "socket.io";
import {router} from "./router";
import mongoose from "mongoose";

const DB_URL = `mongodb+srv://user:user@cluster0.q8wq4ns.mongodb.net/?retryWrites=true&w=majority`;
mongoose.set('strictQuery', false);

const app = express();
const port = 3000;

app.use(express.json());
app.use('/api', router);

const httpServer = createServer(app);
const io = new Server(httpServer);
// const server = http.createServer(app);
// const wss = new WebSocket.Server({ server });

async function startServers() {
    try {
        await mongoose.connect(DB_URL);
        httpServer.listen(port, () => {
            console.log(`Server started on port ${port}.`)
        })
    } catch (e) {
        console.log(e)
    }
}

startServers();




import {authentication} from "./middleware/authentication";

// подключение
// проверяем jwt токен.
io.use(authentication.ws);

// получаем класс юзера
// создаем сессию в mongodb{
//  "_id": number;
//  "username": string;
//  "hp": number;
//  "statuses": number[];
// }
// подписываем текущего юзера на вебсокет
// отправляем сессии всех активных пользователей
// отправляем кеш последних 10 сообщений из Redis
import {EventsController } from "./controllers/EventsController";
io.on("connection", EventsController.connection);

//Типы событий

// attack
// ability
// message
// restore


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