import express from "express"
import bodyParser from "body-parser"
import axios from "axios"

const app = express()
app.use(bodyParser.json())




app.post("/Events" , (req, res)=>{
    const event = req.body
    console.log(event)

    axios.post(`http://localhost:4000/Events` , event)
    axios.post(`http://localhost:4001/Events` , event)
    axios.post(`http://localhost:4002/Events` , event)

    res.send({status:`ok`})

})




app.listen(4005 , ()=>{
    console.log("server started on the port 4005" )
})