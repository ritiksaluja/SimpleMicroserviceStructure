import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CreateComments from '../Comments/CreateComments'
import CommentList from '../Comments/CommentList'


function PostList() {
    const [PostLists , setPostLists] = useState({})


    const fetchposts = async()=>{
        const res = await axios.get("http://localhost:4002/posts" )
        console.log(res.data)
        setPostLists(res.data)
    }

    useEffect(()=>{
        fetchposts()
    } , [])

    const Renderposts = Object.values(PostLists).map((Post)=>{

        return(
          <div style={{padding:"10px" , border:"2px solid black" , display:"inline-block" , margin:"10px"}} >
            <h3 style={{padding:"10px" , display:"inline-block"}}>{Post.title}</h3>
            <CommentList comments = {Post.Comments}/>
             <CreateComments  postId={Post.id} />
          </div>

        )

    })
   

   
  return (
    <div>
        {Renderposts}

    </div>
  )
}

export default PostList