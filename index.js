const express =require('express');
const app=express();
const port = 5000;
app.use(express.json());

const tasks= [];

app.get('/',(req,res)=>{
res.sendFile(__dirname+'/index.html');
})


app.get('/t',(req,res)=>{
res.json(tasks);
})

app.listen(port,()=>{console.log(`http://localhost:${port}`)});
