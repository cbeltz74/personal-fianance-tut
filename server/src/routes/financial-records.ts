import express, { Request, Response } from "express";
import FinancialRecordModel from "../schema/financial-record";

const router = express.Router();

// get records route
router.get("/getAllByUserID/userID", async (req: Request, res: Response) => {
    try {
        const userID = req.params.userID;
        const records = await FinancialRecordModel.find({userID: userID })
        if (records.length === 0) {
            return res.status(404).send("No records found for the user.");
        }
        res.status(200).send(records);
    } catch (err) {
        res.status(500).send(err);
    }
});

// post records route
router.post("/", async (req: Request, res: Response) => {
    try {
        const newRecordBody = req.body;
        const newRecord = new FinancialRecordModel(newRecordBody);
        const savedRecord = await newRecord.save();
        res.status(200).send(savedRecord);
    } catch (err) {
        res.status(500).send(err);
    }
});

//update records route
router.put("/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const newRecordBody = req.body;
        const record = await FinancialRecordModel.findByIdAndUpdate(
            id, 
            newRecordBody,
            { new: true }
        );

        if (!record) return res.status(404).send();

        res.status(200).send(record);
    } catch (err) {
        res.status(500).send(err);
    }
});

//delete records
router.delete("/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const record = await FinancialRecordModel.findByIdAndDelete(id);

        if (!record) return res.status(404).send();

        res.status(200).send(record);
    } catch (err) {
        res.status(500).send(err);
    }
});


export default router;