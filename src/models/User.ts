import { Schema, model } from 'mongoose';

const User = new Schema({
   _id: { type: Number, require: true },
   username: { type: String, required: true },
   hp: { type: Number, required: true },
   statuses: { type: Array, default: [] },
});

export default model('User', User);