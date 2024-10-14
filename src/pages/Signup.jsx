import { Password } from '@mui/icons-material'

import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import {toast} from 'react-toastify'
import { useRef } from 'react'

const Signup = () => {
  let nameRef = useRef()
  let emailRef = useRef()
  let passwordRef = useRef()

  let navigate = useNavigate()
 
const handleSubmit = async(e)=>{
  e.preventDefault();

  let obj = {
    name:nameRef.current.value,
    email:emailRef.current.value,
    password:passwordRef.current.value
  }
  
  if(!obj.name|| !obj.email || !obj.password){
    return alert('please fill all the fields')
  }
  //console.log(obj)
let res = await axios.post('http://localhost:8080/users/create',obj)
console.log(res.data)
if(res.data.success){
  toast.success(res.data.msg,{position:'top-center'})
  navigate('/login')
}else{
  //alert(res.data.msg)
  toast.error(res.data.msg,{position:'top-center'})
}
}



  return (
    <div className='bg-dark sign'>
  <form className='w-50 bg-light p-4 m-auto mt-3 rounded-4'>
    <h3 className='text-center m-2 text-dark'>Threads Signup Page</h3>
  <div className="mb-3 text-dark">
    <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
    <input ref={nameRef} type="text" className="form-control" id="name" aria-describedby="emailHelp" />
   
  </div>
  <div className="mb-3 text-dark">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input ref={emailRef} type="email"  className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
   
  </div>
  <div className="mb-3 text-dark">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" ref={passwordRef} className="form-control" id="exampleInputPassword1" />
  </div>

  <button onClick={handleSubmit} type="submit" className="btn btn-dark">Submit</button>
  <p className='text-center text-dark'>Already have an account <Link to={'/login'} className='text-dark'>Login</Link></p>
</form>

    </div>
  )
}

export default Signup
