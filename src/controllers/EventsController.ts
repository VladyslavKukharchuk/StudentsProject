import {EventService} from "../services/EventService";


class EventsController {
    static connection(socket) {
        console.log(`Підключився новий клієнт.`);

        // // Действия
        //
        // // атака
        // //  получаем класс текущего юзера из postgre
        // //  получаем сессию целевого юзера из mongo
        // //  проверяем действующие статусы на целевом юзере и возможно ли провести атаку.
        // //  Если нет возвращаем ошибку автору
        // //  Уменьшаем здоровье целевого юзера и сохраняем изменения в сессии.
        // //  Возвращаем измененную сессию целевого юзера всем подписчикам
        // socket.emit("attack", (req) => {
        //     EventService.attack(req);
        // });
        //
        // // применение способности
        // //  получаем класс текущего юзера из postgre
        // //  получаем сессию целевого юзера из mongo
        // //  проверяем можно ли применить способность к целевому юзеру
        // //  Если нет возвращаем ошибку автору
        // //  Добавляем статус целевому юзеру и сохраняем изменения в сессии.
        // //  Возвращаем измененную сессию целевого юзера всем подписчикам
        // socket.emit("ability", (req) => {
        //     EventService.ability(req);
        // });
        //
        // // сообщение
        // //  Проверяем может ли юзер писать сообщения
        // //  Если нет возвращаем ошибку автору
        // //  Отправляем сообщение всем подписчикам
        // socket.emit("message", (req) => {
        //     EventService.message(req);
        // });
        //
        // // возрождение
        // //  Проверяем нужно ли юзеру возрождение
        // //  Если нет возвращаем ошибку автору
        // //  Если да получаем класс текущего юзера из postgre
        // //  Пересоздаем сессию в mongo
        // //  Возвращаем обновленную сессию целевого юзера всем подписчикам
        // socket.emit("restore", (req) => {
        //     EventService.message(req);
        // });


        // получать и различать события

        // атака
        // {
        //     "type": EventTypeEnum;
        //     "userId": number;
        // }
        socket.on("attack", (res) => {
            EventService.attack(socket, res);
        });

        // применение способности
        // {
        //     "type": EventTypeEnum;
        //     "userId": number;
        // }
        socket.on("ability", (res) => {
            EventService.ability(socket, res);
        });

        // сообщение
        // {
        //     "type": EventTypeEnum;
        //     "message": string;
        // }
        socket.on("message", (res) => {
            // EventService.message(socket, res);
            socket.broadcast.emit("user connected", {
                res
            });
        });

        // возрождение
        // {
        //     "type": EventTypeEnum;
        // }
        socket.on("restore", (res) => {
            EventService.restore(socket, res);
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
