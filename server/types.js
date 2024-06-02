const zod = require("zod");

todoTaskSchema = zod.object({
    "title": zod.string(),
    "description": zod.string()
});

updateTaskSchema = zod.object({
    "id": zod.string()
});

module.exports ={
    todoTaskSchema,
    updateTaskSchema
}