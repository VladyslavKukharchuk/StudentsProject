import * as mongoDB from 'mongodb';
import IUser from '../interfaces/IUser';

export const collections: { users?: mongoDB.Collection<IUser> } = {};

export async function connectToDatabase() {

   const client: mongoDB.MongoClient = new mongoDB.MongoClient(`mongodb://${process.env.MONGODB_DB_HOST}:${process.env.MONGODB_DB_PORT}/`);

   await client.connect();

   const db: mongoDB.Db = client.db(process.env.MONGODB_DB_NAME);

   await applySchemaValidation(db);

   const usersCollection = db.collection<IUser>(process.env.MONGODB_USERS_COLLECTION_NAME!);

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
               description: '\'_id\' is required and is a number',
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