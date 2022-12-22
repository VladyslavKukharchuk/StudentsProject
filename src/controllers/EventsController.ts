import {EventService} from "../services/EventService";
import {io} from "../app";
import {Event} from "../middleware/event";

class EventsController {
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
    static connection(socket) {
            console.log(`A new user with id: ${socket.id} has connected.`);
            socket.send("You have successfully connected");

            // получать и различать события

            //примітивний middleware
            socket.use(Event.forOll);

            // атака
            // {
            //     "userId": number;
            // }
            socket.on("attack", (req) => {

                // // атака
                // //  Возвращаем измененную сессию целевого юзера всем подписчикам
                let updatedUser = EventService.attack(req.userId);
                io.sockets.emit("message", updatedUser);
            });

            // применение способности
            // {
            //     "userId": number;
            // }
            socket.on("ability", (req) => {

                // применение способности
                //  Возвращаем измененную сессию целевого юзера всем подписчикам
                let updatedUser = EventService.ability(req.userId);
                io.sockets.emit("message", updatedUser);
            });

            // сообщение
            // {
            //     "message": string;
            // }
            socket.on("message", (req) => {

                // сообщение
                //  Отправляем сообщение всем подписчикам
                let message = EventService.message(req.message);
                io.sockets.emit("message", message);
            });

            // возрождение
            // {
            // }
            socket.on("restore", () => {

                // возрождение
                //  Возвращаем обновленную сессию целевого юзера всем подписчикам
                let updatedUser = EventService.restore();
                socket.emit("ability", updatedUser);
            });

            // отключение
            // удаляем сессию из mongodb
            // убираем юзера из подписчиков ws сервера
            socket.on("disconnect", (reason) => {
                console.log(reason);
            });
        }
}

export {EventsController};