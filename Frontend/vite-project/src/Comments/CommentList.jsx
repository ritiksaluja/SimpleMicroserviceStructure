import React, { useEffect, useState } from 'react'
import axios from 'axios'

function CommentList({postId}) {

    const [CommentList , setCommentList] = useState([])

   const feetchCommentList = async ()=>{
      const res = await axios.get(`http://localhost:4001/posts/${postId}/comments`)
      setCommentList(res.data)
   } 

   useEffect(()=>{feetchCommentList()} , [])

  
  return (
    <div>
        <ul style={{display:"flex" , flexWrap:"wrap"}}>
            {CommentList.map((item)=>{
                return <li key={item.id}
                style={{margin:"10px"}}
                >{item.content.CommentValue}</li>

            })}
   
        </ul>

    </div>
  )
}

export default CommentList