const express=require("express")
const mysql = require('mysql2');
const cors=require('cors')
const app=express()
app.use(express.json(),cors())
const port=5000
const sql= mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'simple'
  });
app.get('/',(req,res,next)=>{
    sql.execute("select * from simple",(error,result)=>{
        return res.json({message:"success",user:result})
    })
})
app.post("/signup",(req,res,next)=>{
const{email,firstname,lastname,password}=req.body;
sql.execute(`insert into simple (email,firstname,lastname,password) values('${email}','${firstname}','${lastname}','${password}')`,(error,result)=>{
    if(error){
        if(error.errno==1062){
            return res.json({message:"email already register",error:error})
        }
        return res.json({message:"fail",error:error})
    }
    return res.json({message:"success",user:result})
})

})
app.post("/signin",(req,res,next)=>{
    const {email,password}=req.body
    sql.execute(`select * from simple where email='${email}' and password='${password}'`,(error,result)=>{
       if(result.length){
        return res.json({message:"success",user:result})

       }
       else{
        return res.json({message:"inputs not valid"})

       }
        
    })
})

app.listen(port,()=>{
    console.log(`server is running....${port}`);
})