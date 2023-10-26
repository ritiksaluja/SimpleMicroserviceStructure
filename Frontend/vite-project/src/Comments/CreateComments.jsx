import React, { useState } from 'react'
import axios from 'axios'

function CreateComments( {postId}) {

    const [ CommentValue , setCommentValue] = useState("")

   function HandlesComments(e){
    e.preventDefault()

    axios.post(`http://localhost:4001/posts/${postId}/comments` , {CommentValue})
    console.log(CommentValue)
    setCommentValue("")

    }
  return (
    <div>
        <h6>Create Comments</h6>
        <form onSubmit={(e)=>{HandlesComments(e)}}>
            <input type="text"  placeholder='add comments' value={CommentValue} onChange={(e)=>{setCommentValue(e.target.value)}} />
            <button type='submit'>Submit</button>
        </form>
    </div>
  )
}

export default CreateComments