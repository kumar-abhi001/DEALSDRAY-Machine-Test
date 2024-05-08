import mongoose, { Schema } from "mongoose";

const employeeSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        picture: {
            type: String,
            required: true
        },
        designation: {
            type: String,
            required: true
        },
        gender: {
            type: String,
            required: true
        },
        course: {
            type: [],
            required: true
        },
    },
    { timestamps: true }
);

const Employees = mongoose.model("Employees", employeeSchema);

export default Employees;