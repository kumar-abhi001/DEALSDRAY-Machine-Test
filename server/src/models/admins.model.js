import mongoose, { Schema } from "mongoose";

const adminSchema = new Schema(
    {
        username: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

const Admins = mongoose.model("Admins", adminSchema);

export default Admins;