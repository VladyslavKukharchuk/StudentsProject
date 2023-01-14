import mongoose from "mongoose";

const Class = new mongoose.Schema({
   name: {type: String, required: true},
});

export default mongoose.model("Class", Class);