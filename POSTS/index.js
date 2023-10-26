import  Express from "express";
import { randomBytes } from "crypto";
import bodyParser from "body-parser";
import cors from "cors";



const app = Express();
app.use(bodyParser.json());
app.use(cors())

const posts = {}


app.get("/posts" , (req , res )=>{
    res.send(posts)

})

app.post("/posts" , (req , res )=>{
    const id = randomBytes(4).toString('hex')
    const {title} = req.body
    console.log(req.body)

    posts[id]= {
        id , title
    }

    res.status(201).send(posts[id])

})




app.listen(4000 , ()=>{
    console.log("Posts server started on 4000")
})