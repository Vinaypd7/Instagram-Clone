import React,{useState, useEffect} from 'react'
import {useHistory } from 'react-router-dom'
import M from 'materialize-css'

const CreatPost = ()=>{
    const history = useHistory()
    const [title,setTitle] = useState("")
    const [body,setBody] = useState("")
    const [image,setImage] = useState("")
    const [url,setUrl] = useState("")
  
    useEffect(()=>{
        if(url){
            fetch("/create",{
                method:"post",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":"Bearer "+localStorage.getItem("jwt")
                },
                body:JSON.stringify({
                    title,
                    body,
                    pic:url
                })
            }).then(res=>res.json())
            .then(data=>{
                if(data.error){
                    M.toast({html: data.error})
                }
                else{
                    M.toast({html: "Posted"})
                    history.push('/')
                }
            })
        }
    },[url])

    const postDetails = ()=>{
        const data = new FormData()
        data.append("file",image)
        data.append("upload_preset","insta c1one")
        data.append("clound_name","vpd")
        fetch("https://api.cloudinary.com/v1_1/vpd/image/upload",{
            method:"post",
            body:data
        })
        .then(res=>res.json())
        .then(data=>{
            setUrl(data.url)
        })
        .catch(err=>{
            console.log(err)
        })

    }

    

    return(
        <div className="card input-fi">

            <input type="text" placeholder="title"
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            />
            <input type="text" placeholder="body"
            value={body}
            onChange={(e)=>setBody(e.target.value)}
            />
            <div className="file-field input-fi">
                <div className="btn #64b5f6 blue darken-1">
                    <span>Choose Image</span>
                    <input type="file" onChange={(e)=>setImage(e.target.files[0])}/>
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" placeholder="Upload one or more files"/>
                </div>
                <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
                onClick={()=>postDetails()}>
                    Upload
                </button>
            </div>
        </div>
    )
}

export default CreatPost