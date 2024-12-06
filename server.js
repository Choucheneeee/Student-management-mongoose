const express=require("express")
const logger =require("morgan")

const mongoose=require("mongoose")
var url="mongodb://localhost:27017/mytest"

const app=express()
app.use(logger('dev'))
const studentSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    age: Number,
    Speciality: String,
  });
  
const Student = mongoose.model("Student", studentSchema);
  
app.get("/",(req,res)=>{
    res.send("Hello World")
    mongoose.connect(url,).then(res=>{
        console.log("Connected to MongoDB")
        mongoose.disconnect()
    })
})
app.get("/addfields",(req,reso)=>{
   mongoose.connect(url).then(res=>{
        Student.insertMany([
            {firstName:'bbbb',lastName:'bbbb',age:10,Speciality:'bbbb'},
            {firstName:'aa',lastName:'aaa',age:10,Speciality:'aaaa'},
            {firstName:'ccc',lastName:'ccc',age:10,Speciality:'ccc'}
        ]).then((result)=>{
            reso.send(result)
            console.log("Data inserted",result)
        })
        .catch((err)=>{
            console.log(err)    
        })
        mongoose.disconnect()

    
})})

app.get("/readdata",(req,reso)=>{

    mongoose.connect(url)
    .then(async (res)=>{
        await Student.find()
        .then((result)=>{
            console.log(result)
            reso.send(result)
    })      
    mongoose.disconnect().then(()=>{
        console.log("diconnected")

    })
 
})}
)

app.get("/update",async(req,reso)=>{

    await mongoose.connect(url)
    .then(async (res)=>{
        await Student.updateOne({_id:"67521225e83c6752c4c4d2ad"}
            ,{firstName:"zaza",lastName:'zaaa',age:20}).then((res)=>{
                console.log(res)

                reso.end("updated")
            })
    })
        mongoose.disconnect().then(()=>{
            console.log("diconnected")
    
        }) 
    
 
})


app.get("/delete",async(req,reso)=>{

    await mongoose.connect(url)
    .then(async (res)=>{
        const resa= await Student.deleteOne({_id:'67521225e83c6752c4c4d2ae'})
        console.log(resa)
    })
        mongoose.disconnect().then(()=>{
            console.log("diconnected")
    
        }) 
    
 
})
app.listen("3000",()=>{console.log("server is running on port 3000")})






