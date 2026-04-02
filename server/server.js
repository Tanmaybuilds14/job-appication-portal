import express from "express";

const PORT = 5000;
const app = express();
app.use(express.json());

app.get('/',(req,res)=>{
  res.status(200).json({msg:"server is running successfully"});
});

app.listen(PORT,()=>{
  console.log(`server running on http://localhost:${PORT}`);
});