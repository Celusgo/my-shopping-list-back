import express from "express";
import cors from "cors";
import connection from "./database.js";
import Joi from 'joi';

const app = express();
app.use(express.json());
app.use(cors());

app.post("/post", async(req, res) => {
    const { text } = req.body;

    const schema = Joi.object({
        text: Joi.string().min(1).required()
    })

    const { error } = schema.validate({
        text
    });

    if (error) {
        res.status(400).send("O campo não pode estar vazio e deve ser do tipo 'texto'.");
        return;
    }

    try{
        await connection.query(`INSERT INTO text (text) VALUES ($1)`, [text]);
        res.sendStatus(201);
    } catch(err) {
        console.log(err);
        res.sendStatus(500);
    }
    
});

app.get("/posts", async(req, res) => {
    try{
        const request = await connection.query(`SELECT * FROM text`);
        res.status(200).send(request.rows);
    } catch(err) {
        console.log(err);
        res.sendStatus(500);
    }
});

export default app;
