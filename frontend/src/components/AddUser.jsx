import { useState } from 'react'
import {useForm} from 'react-hook-form' 
import { useNavigate } from 'react-router'

function AddUser() {
  const {register,handleSubmit,formState:{errors}} = useForm()
  let [error,setError] = useState(null)
  let [loading,setLoading] = useState(false)
  let navigate = useNavigate()
  //form submit
  const onSubmit=async (o)=>{
    // console.log(o)
    // make http post req to create new user
    setLoading(true)
    try{
      let res = await fetch('http://localhost:5000/user-api/users',{
        method:'POST', //by default assumes to be get
        headers:{
          "Content-Type" : "application/json"
        },
        body:JSON.stringify(o),
      })
      if(res.status === 201){
        //user created, it should now navigate to the users list component
        navigate('/user-list')
      }
      else{
        console.log(res)
        throw new Error("error occurred")
      }
    }catch(err){
      setError(err)
    }
    finally{
      setLoading(false)
    }
  }

  if(loading === true){
    return <p className='text-3xl text-center mt-10 text-orange-500'>Loading.....</p>
  }
  if(error){
    return <p className='text-3xl text-center mt-10 text-red-500'>Error occurred.....</p>
  }

  return (
    <div className='text-center inline'>
      <div className='text-5xl text-gray-600'>Add New User</div>
      {/* form design */}
      <form onSubmit={handleSubmit(onSubmit)} className='max-w-70 m-auto mt-5 '>
        <input type="text" {...register("name")} placeholder='enter the name' className=' rounded-md border  mb-5 w-full '/>
        <input type="text" {...register("email")} placeholder='enter the email' className='rounded-md border mb-5 w-full'/>
        <input type="date" {...register("dob")} className='rounded-md border  mb-5 w-full'/>
        <input type="number" {...register("mobile")} placeholder='enter the mobile number' className='rounded-md border mb-5 w-full'/>
        <button className=' border bg-blue-300 text-white rounded-md p-2'>Add User</button>
      </form>
    </div>
  )
}

export default AddUser