import { Schema, model } from "mongoose";

const User = new Schema({
        username: {type: String, required: true},
        email: {type: String, required: true},
        password: {type: String, required: true},
        id: {type: Number, required: true},
    })

export default model('User', User);