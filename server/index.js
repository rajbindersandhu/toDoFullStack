const express = require("express");
const {todoTaskSchema, updateTaskSchema} = require("./types")
const{Task} = require("./db");
const cors = require("cors")

const app = express();

app.use(express.json())
app.use(cors());

app.post("/todo/task", async (req, res) => {
    const reqBody = req.body
    const parseRes = todoTaskSchema.safeParse(reqBody);
    if(!parseRes.success){
        res.status(400).json({"msg":"Invalid payload"})
    }else{
        const taskExists = await Task.find({"title": reqBody.title,"description": reqBody.description});
        if(!taskExists.length){
            const dbRes = await Task.create({
                "title": reqBody.title,
                "description": reqBody.description,
                "completed":false
            });
            res.status(200).json({"taskId":dbRes._id , "msg": "Posted to DB"});
            return;
        }else{
            res.status(409).json({"msg": "Task already exists in DB"});
        }
        
    }
});

app.get("/todo", async (req, res) =>{
    const dbRes = await Task.find();
    res.status(200).json(dbRes);
});

app.put("/todo/:todoId", async (req, res) => {
    const reqBody = {
        "id": req.params.todoId
    };
    const parseBody = updateTaskSchema.safeParse(reqBody);
    if(!parseBody.success){
        res.status(400).json({"msg": "Invalid payload"});
    }else{
        const dbRes = await Task.find({"_id": req.params.todoId});
        if(dbRes.length == 0){
            res.status(400).json({"msg": "Invalid task ID"})
        }else{
            const updateDbRes = await Task.updateOne({_id: req.params.todoId}, {"completed": true});
            if(updateDbRes.acknowledged){
                res.status(200).json({"msg":"DB updated"})
            }else{
                res.status(500).json({"msg": "DB error"});
            }
        }
    }
});

app.listen(3000);