import express from "express"
import bodyParser from "body-parser"
import axios from "axios"


const app = express()
app.use(bodyParser.json())



app.post(`/Events` , async (req , res)=>{
    const {type , data } = req.body

    console.log("ritik" , data )

   let status = "pending"

    if(type==="commentcreated"){
        status = data.content.CommentValue.includes('orange') ? 'rejected' : 'approved';

        await axios.post(`http://localhost:4005/Events` , {
            type:'commentModerated' , 
            data:{
            id:data.id ,
            postId: data.postId , 
            content : data.content , 
            status
        }
        }).catch((err) => {
            console.log(err.message , "errorModeration");
          });

    }

    res.send({})

   
})







app.listen(4003 , ()=>{
    console.log("server started on port 4003")
})