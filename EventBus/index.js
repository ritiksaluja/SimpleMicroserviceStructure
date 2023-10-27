import express from "express"
import bodyParser from "body-parser"
import axios from "axios"

const app = express()
app.use(bodyParser.json())

const Events = [];


app.post("/Events" , (req, res)=>{
    const event = req.body

    Events.push(event)
    console.log(event)

    axios.post(`http://localhost:4000/Events` , event).catch((err) => {
        console.log(err.message , "error1");
      });
    axios.post(`http://localhost:4001/Events` , event).catch((err) => {
        console.log(err.message , "error2");
      });
    axios.post(`http://localhost:4002/Events` , event).catch((err) => {
        console.log(err.message , "error3");
      });
    axios.post(`http://localhost:4003/Events` , event).catch((err) => {
        console.log(err.message ,  "error4");
      });

    res.send({status:`ok`})

})


app.get('/Events' , (req , res)=>{
    res.send(Events)
})




app.listen(4005 , ()=>{
    console.log("server started on the port 4005" )
})