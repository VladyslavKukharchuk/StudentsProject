import * as mongoDB from 'mongodb';
import * as dotenv from 'dotenv';
import User from './interfaces/User';

export const collections: { users?: mongoDB.Collection<User> } = {};

export async function connectToDatabase() {
   dotenv.config();

   const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.MONGODB_DB_URL!);

   await client.connect();

   const db: mongoDB.Db = client.db(process.env.MONGODB_DB_NAME);

   await applySchemaValidation(db);

   const usersCollection = db.collection<User>(process.env.MONGODB_USERS_COLLECTION_NAME!);

   collections.users = usersCollection;
}

async function applySchemaValidation(db: mongoDB.Db) {
   const jsonSchema = {
      $jsonSchema: {
         bsonType: 'object',
         required: ['_id', 'username', 'hp', 'statuses'],
         additionalProperties: false,
         properties: {
            _id: {
               bsonType: 'number',
               description: '\'_id\' is required and is a string',
            },
            username: {
               bsonType: 'string',
               description: '\'username\' is required and is a string',
            },
            hp: {
               bsonType: 'number',
               description: '\'hp\' is required and is a number',
            },
            statuses: {
               bsonType: 'array',
               description: '\'statuses\' is required and is a array',
            },
         },
      },
   };

   await db.command({
      collMod: process.env.GAMES_COLLECTION_NAME,
      validator: jsonSchema,
   }).catch(async (error: mongoDB.MongoServerError) => {
      if (error.codeName === 'NamespaceNotFound') {
         await db.createCollection(process.env.MONGODB_USERS_COLLECTION_NAME!, { validator: jsonSchema });
      }
   });
}