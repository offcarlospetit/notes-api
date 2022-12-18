import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:37017/notes-api", (res) => {
    if (res) {
        console.log("Error connecting to database: ", res);
    } else {
        console.log("Connected to database!");
    }
});  