// password: kc0kyypfS3GDpJUy

import express, { Express } from 'express';
import mongoose from 'mongoose';
import FinancialRecordRouter from "./routes/financial-records";

const app: Express = express(); 
const port = process.env.PORT || 3001;

app.use(express.json());

const mongoURI: string = "mongodb+srv://colinbeltz:FW4rowAVX3jT5S2V@personalfinancetracker.wmpsior.mongodb.net/";

mongoose.connect(mongoURI)
.then(() => console.log("CONNECTED TO MONGODB!"))
.catch((err) => console.error("Failed to Connect to MongoDB:", err));


app.use("/financial-records", FinancialRecordRouter);

app.listen(port, () => {
    console.log(`Server running on Port ${port}`)
});