// const http = require("http");
// const server = http.createServer((req, res) => {
//     // res.end('Hello from the server');
//     if(req.url === "/cars"){
//         res.end("This is cars page");
//     }
//     else if(req.url === "/motorbike"){
//         res.end("This is motorbike page");
//     }
//     else{
//         res.end('Hello from the server');
//     }
// }) ;

// server.listen(8000,"localhost",()=>{
//     console.log('Server.is Started');
// })


const express = require("express");
const app = express();
const PORT = 8000;
//Middleware untuk parsing JSON body
app.use(express.json()) 

//Menyajikan file HTML langsung dari folder public 
app.use(express.static('public'));

//Data sementara (in-memory) untuk to-do list
let todos = [
    {id:1, task: "Belajar HTML", done: true},
    {id:2, task: "Belajar CSS", done: true},
    {id:3, task: "Belajar JavaScript", done: true},
    {id:4, task: "Belajar Node.js", done: true},
    {id:5, task: "Belajar Express.js", done: true},
];

app.get('/todos',(req, res)=>{
    res.json(todos); //kirim array todos sebagai JSON
});

app.post('/todos',(req, res)=>{
    const newTodo = req.body;
    newTodo.id = Date.now();
    newTodo.done = false;
    todos.push(newTodo);
    res.status(201).json({messege: 'To-do berhasil ditambahkan', todo: newTodo});
});

app.delete('/todos/:id',(req,res)=>{
    const todoId = Number(req.params.id);
    todos = todos.filter(todo => todo.id !== todoId);
    res.json({messege:'To-do dihapus'});
});

// app.get("/", (req, res)=>{
//     res.send("Hello from the server!");
// });

// app.get("/cars",(req,res)=>{
//     res.send("This is from cars page");
// });

// app.get("/profile",(req,res)=>{
//     res.send("Nama saya Fajar");
// });

app.listen(PORT,()=>{
    console.log(`Server berjalan di http://localhost:${PORT}`);
})