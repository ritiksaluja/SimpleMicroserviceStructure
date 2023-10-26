import React, { useState } from 'react'
import axios from "axios"

function PostCreate() {

    const [PostValue , setPostValue] = useState("")

    function HandleSubmit(e){
        e.preventDefault()
        axios.post("http://localhost:4000/posts" , {"title" : PostValue})
        console.log(PostValue)

    }
  return (
    <div>
 <form onSubmit={(e)=>{HandleSubmit(e)}}>
    <input type="text" placeholder='create post' value={PostValue} onChange={(e)=>{setPostValue(e.target.value)}} />
    <button type='submit'>Create Post</button>
 </form>

    </div>
  )
}

export default PostCreate