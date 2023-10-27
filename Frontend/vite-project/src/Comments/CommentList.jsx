import React, { useEffect, useState } from 'react'
import axios from 'axios'

function CommentList({comments}) {

  
  return (
    <div>
        <ul style={{display:"flex" , flexWrap:"wrap"}}>
            {comments.map((item)=>{
             let content ; 
             console.log(item)
             if(item.status==='approved'){
              content = item.content.CommentValue
             }
             if(item.status==='pending'){
              content = 'This Comment is awaiting moderation'

             }

             if(item.status==='rejected'){
              content = 'this comment has been rejected'
             }

                return <li key={item.id}
                style={{margin:"10px"}}
                >{content}</li>

            })}
   
        </ul>

    </div>
  )
}

export default CommentList