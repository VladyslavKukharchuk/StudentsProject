//Http server
import express from 'express';
import http from 'http';
import WebSocket from 'ws';
import { router } from "./router";
import mongoose from "mongoose";

const DB_URL = `mongodb+srv://user:user@cluster0.q8wq4ns.mongodb.net/?retryWrites=true&w=majority`;
mongoose.set('strictQuery', false);

const app = express();
const httpServerPort = 3000;

//WebSocket server

const wsServerPort = 3001;
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// WS

app.use(express.json());
app.use('/api', router);

async function startServers() {
    try {
        await mongoose.connect(DB_URL);
        app.listen(httpServerPort, () => {
            console.log(`Http Server started on port ${httpServerPort}.`)
        })
        server.listen(wsServerPort, () => {
            console.log(`WebSocket Server started on port ${wsServerPort}.`);
        });
    } catch (e) {
        console.log(e)
    }
}

startServers();

import {EventsController } from "./controllers/EventsController";

wss.on('connection', EventsController.connectWS);

export { wss };

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