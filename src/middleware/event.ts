import { NextFunction } from 'express';
import { myEmitter } from '../controllers/EventsController';

class Event {
   static forOll([eventType, data]: any, next: NextFunction) {
      try {
         switch (eventType) {
            case 'attack':
               if (typeof data.userId !== 'number') {
                  throw new Error('Id must be a number');
               }
               break;
            case 'ability':
               if (typeof data.userId !== 'number') {
                  throw new Error('Id must be a number');
               }
               break;
            case 'message':
               if (typeof data.message !== 'string') {
                  throw new Error('Message must be a string');
               }
               break;
            case 'restore':
               if (JSON.stringify(data) !== '{}') {
                  throw new Error('Restore does not need data to work');
               }
               break;
            default:
               throw new Error('You are using an unknown function');
         }
         next();
      } catch (e) {
         myEmitter.emit('error', e);
         // next(e);
      }
   }
}

export { Event };
