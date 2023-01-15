import { Schema, model } from 'mongoose';

const User = new Schema({
   username: { type: String, required: true },
   hp: { type: Number, required: true },
   statuses: { type: Array, required: true },
});

export default model('User', User);