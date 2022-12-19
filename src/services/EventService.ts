import { wss } from "../app";
import {clients, masseges} from "../controllers/EventsController";

class EventService {


    static sendMessage(data) {
        const {event, message, name} = data;
        masseges.push({name, message});
        for (const id in clients) {
            clients[id].send(JSON.stringify([{name, message}]))
        }
    }

    // static broadcastMessage(message: string, ws) {
    //     wss.clients.forEach(client => {
    //         client.send(JSON.stringify(message));
    //     })
    // }

    // static attack(message, ws) {
    //     wss.clients.forEach(client => {
    //         if (client.id === ws.id) {
    //             client.send(JSON.stringify(message));
    //         }
    //         client.send(JSON.stringify(message));
    //     })
    // }
}

export {EventService};