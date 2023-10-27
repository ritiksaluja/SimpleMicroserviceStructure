
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

    comments.push({id:commentId , content , status:"pending"})
    commentsbypostid[req.params.id] = comments


    axios.post("http://localhost:4005/Events" , {
        type:"commentcreated" , 
        data:{
            id:commentId ,
            content,
            postId: req.params.id , 
            status:"pending"
        }
    }).catch((err) => {
        console.log(err.message ,  "commenterror1");
      });

    res.status(201).send(comments)

})



app.get(`/posts/:id/comments` , (req , res)=>{
    console.log(commentsbypostid[req.params.id])
    res.send(commentsbypostid[req.params.id] || [])

})

app.post("/Events" , async (req, res)=>{
    console.log("event received" , req.body.type)

    const {type , data} = req.body

    if(type==="commentModerated"){
        const {postId , id , status , content } = data
        const Comments = commentsbypostid[postId]
        const comment = Comments.find( (commment)=>{
            return commment.id === id
        })

        comment.status = status

        await axios.post('http://localhost:4005/Events' , {
            type: 'CommentUpdated' , 
            data :{
                id , status , postId , content
            }
        }).catch((err) => {
            console.log(err.message ,  "commenterror2");
          });
    }


  

    res.send({})

})


app.listen(4001 , ()=>{
    console.log("comment server started on 4001")
})