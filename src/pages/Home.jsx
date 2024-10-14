import React, { useContext, useRef, useState } from 'react'
import AllUserPost from '../components/AllUserPost'
import UserContext from '../context/UserContext';
import axios from 'axios';

const Home = () => {
  let ctx = useContext(UserContext);
  const [clicked,setClicked] = useState(false)

  const [files,setfiles] = useState("");
  let titleRef = useRef();
  let discriptionRef = useRef();

  const handleChanger =(e)=>{
    let value = e.target.files[0]
    console.log(value)
    setfiles(value)
  }
  const handleSubmit = async(e)=>{
    e.preventDefault();
    let formData = new FormData();
    formData.append('file',files);
    formData.append('upload_preset','social')//Social is your
    let data =  await axios.post('https://api.cloudinary.com/v1_1/dtxf6hu3f/upload',formData)
    console.log(data)
    let obj ={
      title:titleRef.current.value,
     discription:discriptionRef.current.value,
      file:data.data.secure_url
    }
    
    let res = await axios.post('http://localhost:8080/posts/create',obj,{
           headers:{
            'Authorization':ctx.details.token
    
        }
        });
        console.log(res.data)
        setClicked(false)
    
  }
  // const handleSubmit = (e)=>{
  //   e.preventDefault()
  //   let reader = new FileReader();
  //   reader.readAsDataURL(files);
  //   reader.onload = async()=>{
  //     //console.log(reader.result)
  //   let obj = {
  //     title:titleRef.current.value,
  //     discription:discriptionRef.current.value,
  //     file:reader.result
  //   }
  //   console.log(obj)
  //   let res = await axios.post('http://localhost:8080/posts/create',obj,{
  //     headers:{
  //       'Authorization':ctx.details.token

  //     }
  //   });
  //   let data = res.data
  //   console.log(data)
  //   setClicked(false)
  // }
  // reader.onerror =()=>{
  //   console.log(reader.error)
  // }
  
  return (
    <div className='row m-0 p-0 bg-light mt-3'>
      <div className='col-1'>
        <button onClick={()=>setClicked(true)} className='btn btn-light mt-2'>Create</button>

      </div>
      <div className='col-11'>
        <AllUserPost clicked={clicked}/>
      </div>

      { clicked &&<div className='form mt-5'>
        <button onClick={()=>setClicked(false)} type="button" className="btn-close bg-light btnCloseForm" aria-label="Close"></button>
      <form className='rounded-5'>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
    <input ref={titleRef} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
    <div className="form-floating mb-3">
  <textarea ref={discriptionRef} className="form-control" placeholder="Leave a comment here" id="floatingTextarea"></textarea>
  <label htmlFor="floatingTextarea">Description</label>
</div>



  </div>
  <div className="mb-3">
  <label htmlFor="formFileSm" className="form-label"> Upload Image/Video</label>
  <input onChange={handleChanger} className="form-control form-control-sm" id="formFileSm" type="file"/>
</div>

    <button onClick={handleSubmit} type="submit" className="btn btn-primary">Submit</button>
</form>

      </div>}
    </div>
  )
}

export default Home
