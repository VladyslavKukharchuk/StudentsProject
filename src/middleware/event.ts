import { NextFunction } from "express";
import { myEmitter } from "../app";

class Event {
   static forOll([eventType, data]: any, next: NextFunction) {
      console.log(eventType)
      console.log(data)
      try {
         switch (eventType) {
            case "attack":
               if (typeof data.userId !== "number") {
                  throw new Error("Id must be a number");
               }
               break;
            case "ability":
               if (typeof data.userId !== "number") {
                  return new Error("Id must be a number");
               }
               break;
            case "message":
               if (typeof data.message !== "string") {
                  return new Error("Message must be a string");
               }
               break;
            case "restore":
               if (JSON.stringify(data) !== "{}") {
                  return new Error("Restore does not need data to work");
               }
               break;
            default:
               return new Error("You are using an unknown function");
         }
         next();
      } catch (e) {
         myEmitter.emit("error", e);
      }
   }
}

export default Event;
