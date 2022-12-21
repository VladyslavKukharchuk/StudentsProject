class EventService {

    // Действия

    // атака
    //  получаем класс текущего юзера из postgre
    //  получаем сессию целевого юзера из mongo
    //  проверяем действующие статусы на целевом юзере и возможно ли провести атаку.
    //  Если нет возвращаем ошибку автору
    //  Уменьшаем здоровье целевого юзера и сохраняем изменения в сессии.
    //  Возвращаем измененную сессию целевого юзера всем подписчикам
    static attack(socket, req) {
        console.log(`attack ${req}`);
        return `attack ${req}`;
    }

    // применение способности
    //  получаем класс текущего юзера из postgre
    //  получаем сессию целевого юзера из mongo
    //  проверяем можно ли применить способность к целевому юзеру
    //  Если нет возвращаем ошибку автору
    //  Добавляем статус целевому юзеру и сохраняем изменения в сессии.
    //  Возвращаем измененную сессию целевого юзера всем подписчикам
    static ability(socket, req) {
        console.log(`ability ${req}`);
    }

    // сообщение
    //  Проверяем может ли юзер писать сообщения
    //  Если нет возвращаем ошибку автору
    //  Отправляем сообщение всем подписчикам
    static message(socket, req) {
        console.log(`message ${req}`);
        socket.emit("message", req)
    }

    // возрождение
    //  Проверяем нужно ли юзеру возрождение
    //  Если нет возвращаем ошибку автору
    //  Если да получаем класс текущего юзера из postgre
    //  Пересоздаем сессию в mongo
    //  Возвращаем обновленную сессию целевого юзера всем подписчикам
    static restore(socket, req) {
        console.log(`restore ${req}`);
    }


    // // получать и различать события
    //
    // // атака
    // // {
    // //     "type": EventTypeEnum;
    // //     "userId": number;
    // // }
    // static onAttack(res) {
    //     console.log(`onAttack ${res}`);
    //     return `onAttack ${res}`;
    // }
    //
    // // применение способности
    // // {
    // //     "type": EventTypeEnum;
    // //     "userId": number;
    // // }
    // static onAbility(res) {
    //     console.log(`onAbility ${res}`);
    // }
    //
    // // сообщение
    // // {
    // //     "type": EventTypeEnum;
    // //     "message": string;
    // // }
    // static onMessage(res) {
    //     console.log(`onMessage ${res}`);
    // }
    //
    // // возрождение
    // // {
    // //     "type": EventTypeEnum;
    // // }
    // static onRestore(res) {
    //     console.log(`onRestore ${res}`);
    // }
}

export {EventService};