import  Express from "express";
import { randomBytes } from "crypto";
import bodyParser from "body-parser";
import cors from "cors";
import axios from "axios"



const app = Express();
app.use(bodyParser.json());
app.use(cors())

const posts = {}


app.get("/posts" , (req , res )=>{
    res.send(posts)

})

app.post("/posts" , async (req , res )=>{
    const id = randomBytes(4).toString('hex')
    const {title} = req.body
    console.log(req.body)

    posts[id]= {
        id , title
    }

    await axios.post("http://localhost:4005/Events" , {
        type:"PostCreated" , 
        data: {id , title}
    })

    res.status(201).send(posts[id])

})

app.post("/Events" , (req, res)=>{
    console.log("event received" , req.body.type)

    res.send({})

})




app.listen(4000 , ()=>{
    console.log("Posts server started on 4000")
})