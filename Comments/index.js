
import  express from "express";
import bodyParser from "body-parser";
import { randomBytes } from "crypto";
import cors from "cors";
import axios from "axios"


const app = express()
app.use(bodyParser.json())
app.use(cors())



const commentsbypostid = { }

app.post(`/posts/:id/comments` , (req , res)=>{
    console.log(req.body)
    const commentId = randomBytes(4).toString("hex")
    const content = req.body
    const comments = commentsbypostid[req.params.id] || []

    comments.push({id:commentId , content})
    commentsbypostid[req.params.id] = comments


    axios.post("http://localhost:4005/Events" , {
        type:"commentcreated" , 
        data:{
            id:commentId ,
            content,
            postId: req.params.id
        }
    })

    res.status(201).send(comments)

})



app.get(`/posts/:id/comments` , (req , res)=>{
    console.log(commentsbypostid[req.params.id])
    res.send(commentsbypostid[req.params.id] || [])

})

app.post("/Events" , (req, res)=>{
    console.log("event received" , req.body.type)

    res.send({})

})


app.listen(4001 , ()=>{
    console.log("comment server started on 4001")
})