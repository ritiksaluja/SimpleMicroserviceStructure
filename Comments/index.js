
import  express from "express";
import bodyParser from "body-parser";
import { randomBytes } from "crypto";
import cors from "cors";


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

    res.status(201).send(comments)

})



app.get(`/posts/:id/comments` , (req , res)=>{
    console.log(commentsbypostid[req.params.id])
    res.send(commentsbypostid[req.params.id] || [])

})


app.listen(4001 , ()=>{
    console.log("comment server started on 4001")
})