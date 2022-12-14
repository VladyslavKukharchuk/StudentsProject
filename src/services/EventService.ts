class EventService {
   // Действия

   // атака
   //  получаем класс текущего юзера из postgres
   //  получаем сессию целевого юзера из mongo
   //  проверяем действующие статусы на целевом юзере и возможно ли провести атаку.
   //  Если нет возвращаем ошибку автору
   //  Уменьшаем здоровье целевого юзера и сохраняем изменения в сессии.
   //  Возвращаем измененную сессию целевого юзера всем подписчикам
   static async attack(id: number) {
      return id;
   }

   // применение способности
   //  получаем класс текущего юзера из postgres
   //  получаем сессию целевого юзера из mongo
   //  проверяем можно ли применить способность к целевому юзеру
   //  Если нет возвращаем ошибку автору
   //  Добавляем статус целевому юзеру и сохраняем изменения в сессии.
   //  Возвращаем измененную сессию целевого юзера всем подписчикам
   static async ability(id: number) {
      return id;
   }

   // сообщение
   //  Проверяем может ли юзер писать сообщения
   //  Если нет возвращаем ошибку автору
   //  Отправляем сообщение всем подписчикам
   static async message(message: string) {
      return message;
   }

   // возрождение
   //  Проверяем нужно ли юзеру возрождение
   //  Если нет возвращаем ошибку автору
   //  Если да получаем класс текущего юзера из postgres
   //  Пересоздаем сессию в mongo
   //  Возвращаем обновленную сессию целевого юзера всем подписчикам
   static async restore() {
      console.log("User used restore.");
   }
}

export { EventService };
