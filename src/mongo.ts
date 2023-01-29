import * as mongoDB from 'mongodb';
import * as dotenv from 'dotenv';
import User from './models/User';

export const collections: { users?: mongoDB.Collection<User> } = {};


export async function connectToDatabase() {
   // Pulls in the .env file, so it can be accessed from process.env. No path as .env is in root, the default location
   dotenv.config();

   // Create a new MongoDB client with the connection string from .env
   const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.MONGODB_DB_URL!);

   // Connect to the cluster
   await client.connect();

   // Connect to the database with the name specified in .env
   const db: mongoDB.Db = client.db(process.env.MONGODB_DB_NAME);

   // Apply schema validation to the collection
   await applySchemaValidation(db);

   // Connect to the collection with the specific name from .env, found in the database previously specified
   const usersCollection = db.collection<User>(process.env.MONGODB_USERS_COLLECTION_NAME!);

   // Persist the connection to the Games collection
   collections.users = usersCollection;

   console.log(`Successfully connected to database: ${db.databaseName} and collection: ${usersCollection.collectionName}`);
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

   // Try applying the modification to the collection, if the collection doesn't exist, create it
   await db.command({
      collMod: process.env.GAMES_COLLECTION_NAME,
      validator: jsonSchema,
   }).catch(async (error: mongoDB.MongoServerError) => {
      if (error.codeName === 'NamespaceNotFound') {
         await db.createCollection(process.env.MONGODB_USERS_COLLECTION_NAME!, { validator: jsonSchema });
      }
   });
}