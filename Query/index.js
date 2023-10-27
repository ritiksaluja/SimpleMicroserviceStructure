import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import axios from "axios"


const app = express()

app.use(bodyParser.json())
app.use(cors())

const posts = {}

const HandleEvents = (type , data)=>{


    if(type ==="PostCreated"){

        const {id , title} = data

        posts[id] = {id , title , Comments:[]}

    }

    if(type ==="CommentUpdated"){

        const{id ,content , postId , status} = data

        console.log(id ,content , postId , status)

     const post = posts[postId] 
     console.log("check" , post)
     const comment = post.Comments.find((comment)=>{
       return comment.id === id
     })

     comment.status = status
     comment.content = content

    }

    if(type ==="commentcreated"){

        const {id ,content , postId , status} = data

        const post = posts[postId]
        post.Comments.push({id , content , status})

    }


}


app.post(`/Events` , (req , res)=>{

    const {type , data} = req.body

    HandleEvents(type , data)

  
    res.send({})

})

app.get(`/posts` , (req , res)=>{

    res.send(posts)

})






app.listen(4002 , async ()=>{
    console.log("query server started ")

   const res = await axios.get('http://localhost:4005/Events')
   for(let event of res.data){
    HandleEvents(event.type , event.data)
   }
})