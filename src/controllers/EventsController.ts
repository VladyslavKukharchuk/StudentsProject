import {EventService} from "../services/EventService";

import {v4 as uuid} from "uuid";

const clients = {};
const masseges = [];

class EventsController {
    static connectWS(ws) {

        // треба присвоїти id  клієнту щоб потім можна було до нього звертатися
        const id = uuid();
        clients[id] = ws;
        console.log(`New client with id: ${id} is connected :)`);
        ws.send(JSON.stringify(masseges));

        ws.on('message', (message: string) => {
            const data = JSON.parse(message);

            ws.send("it is working");
            switch (data.event) {
                case "attack":
                    // const {event, userMessage, name} = data;
                    // masseges.push({name, userMessage});
                    // for (const id in clients) {
                    //     clients[id].send(JSON.stringify({name, userMessage}))
                    // }
                    ws.send(`attack ${data.id}`);
                    break;
                case "ability":
                    ws.send(`ability ${data.id}`);
                    break;
                case "relive":
                    ws.send(`relive ${data.id}`);
                    break;
                case "message":
                    EventService.sendMessage(data);

                    // EventService.broadcastMessage(data.message, ws);

                    break;
                default:
                    ws.send("The server does not provide such an action");
                    break;
            }
        });

        ws.on('close', () => {
            delete clients[id];
            console.log(clients);
            console.log(`Clients ${id} is closed :(`)
        })
    };
}

export {EventsController, clients, masseges};

// const EventEmitter = require('events').EventEmitter;
// const chatRoomEvents = new EventEmitter;
//
// function displayMessage(message){
//     document.write(message);
// }
//
// function userJoined(username){
//     chatRoomEvents.on('message', displayMessage);
// }
//
// chatRoomEvents.on('userJoined', userJoined);
//
// chatRoomEvents.removeListener('message', displayMessage);
//
//
//
//
//
// const myGatorEvents = new EventEmitter;
//
// class Food {
//     constructor(name) {
//         this.name = name;
//         // Become eaten when gator emits 'gatorEat'
//         myGatorEvents.on('gatorEat', this.becomeEaten);
//     }
//
//     becomeEaten(){
//         return 'I have been eaten.';
//     }
// }
//
// var bacon = new Food('bacon');
//
// const gator = {
//     eat() {
//         myGatorEvents.emit('gatorEat');
//     }
// }
//
//
//
//
//
// class EventsController {
//
// }
//
// export { EventsController };
