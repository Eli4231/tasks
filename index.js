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
     let isDone=false;
    let task ={id,text,isDone};
    tasks[id]= task;
res.status(201).json({message:"ok"})
})

app.delete('/t/:id',(req,res)=>{
let id =req.params.id;
if(id < 0 || tasks.length < id){
    return res.status(400).json({message:"does not exist"})
}
tasks[id]=null;
res.status(200).json({message:"Deleted!"})
})


app.get('/t/:id',(req,res)=>{
let id = req.params.id;
if(id < 0 || id > tasks.length || tasks[id] == null){
    return res.status(400).json({message:"does not exist"})
}
res.json(tasks[id])
})

app.patch('/t/:id',(req,res)=>{
let id = req.params.id;
if(id < 0 || id > tasks.length || tasks[id] == null){
    return res.status(400).json({message:"does not exist"})
}
let isDone = req.body.isDone;
if(isDone != undefined){
  tasks[id].isDone = isDone;
}
let text = req.body.txt;
 if(text){
       tasks[id].text = text;
    }
let obj= tasks[id];
obj.text=text;

res.json(tasks[id])
})



app.listen(port,()=>{console.log(`http://localhost:${port}`)});
