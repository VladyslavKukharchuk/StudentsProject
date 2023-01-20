import { Schema, model } from 'mongoose';

export interface IUser {
   _id: number,
   username: string,
   hp: number,
   statuses: number[]
}

const User = new Schema<IUser>({
   _id: { type: Number, require: true },
   username: { type: String, required: true },
   hp: { type: Number, required: true },
   statuses: [Number]
});

export default model('User', User);