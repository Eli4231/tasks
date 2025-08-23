const express =require('express');
const app=express();
const port = 5000;
app.use(express.json());

const tasks= [];
let nextID=1;

app.get('/',(req,res)=>{
res.sendFile(__dirname+'/index.html');
})


app.get('/t',(req,res)=>{
res.status(200).json(tasks)
})

app.post('/t',(req,res)=>{
     let text= req.body.txt;
    if(!text){
       return res.status(400).json({message:"no text"})
    }
     let id= nextID++;
    let task ={id,text};
    tasks[id]= task;
res.status(201).json({message:"ok"})
})


app.listen(port,()=>{console.log(`http://localhost:${port}`)});
