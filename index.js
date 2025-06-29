const express = require("express");
const prisma = require('./DB/db.config.js');


const app = express();


app.use(express.json());

app.post('/user', async (req, res) => {
    const { name, email } = req.body;
    try {
        const user = await prisma.user.create({
            data: { name, email },
        });
        res.json(user);
        console.log("created succesfully");
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }


});

app.get('/user',async(req,res)=>{
    const user = await prisma.user.findMany();
    res.json(user);
})
app.get('/user/:id',async(req,res)=>{
    const { id } = req.params;
    const user = await prisma.user.findUnique({
        where:{id:Number(id)}
    })
       if(!user){
        return res.status(404).json({ error: "User not found" });
       }
       return res.json(user);
})

app.put('/user/:id',async(req,res)=>{
    const {id}=req.params;
      const { name, email } = req.body;
      try{
        const updateUser = await prisma.user.update({
            where:{id:Number(id)},
            data:{name,email},
        });
         res.json(updateUser);
      } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete('/user/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.user.delete({
      where: { id: Number(id) },
    });
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});



app.listen(3000,()=>{
    console.log("SERVER RUNNING");
})