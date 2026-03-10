import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'

function AddUser() {
  const { register, handleSubmit, formState: { errors } } = useForm()
  let [error, setError] = useState(null)
  let [loading, setLoading] = useState(false)
  let navigate = useNavigate()
  //form submit
  const onSubmit = async (o) => {
    // console.log(o)
    // make http post req to create new user
    setLoading(true)
    try {
      let res = await fetch('http://localhost:5000/user-api/users', {
        method: 'POST', //by default assumes to be get
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(o),
      })
      if (res.status === 201) {
        //user created, it should now navigate to the users list component
        navigate('/user-list')
      }
      else {
        console.log(res)
        throw new Error("error occurred")
      }
    } catch (err) {
      setError(err)
    }
    finally {
      setLoading(false)
    }
  }

  if (loading === true) {
    return <p className='text-3xl text-center mt-10 text-orange-500'>Loading.....</p>
  }
  if (error) {
    return <p className='text-3xl text-center mt-10 text-red-500'>Error occurred.....either backend issue or something else</p>
  }

  return (
    <div className="flex justify-center items-center py-10 bg-gray-50 min-h-[400px] rounded-2xl">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-8 tracking-tight">
          Add New User
        </h2>
        {/* form design */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="relative">
            <label className="text-xs font-semibold text-gray-500 ml-2 mb-1 block">Name</label>
            <input
              {...register("name", { required: "Name is required" })}
              type="text"
              placeholder="Full Name"
              className='w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 transition-all duration-200 bg-gray-50'
            />
            {
              errors.name && <p className="text-red-500 text-xs mt-1 ml-2 font-medium">{errors.name.message}</p>
            }
          </div>
          <div className="relative">
            <label className="text-xs font-semibold text-gray-500 ml-2 mb-1 block">Email</label>
            <input
              {...register("email",{ required: "Email is required" })}
              type="email"
              placeholder="enter your email"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 placeholder-gray-400 bg-gray-50"
            />
            {
              errors.email && <p className="text-red-500 text-xs mt-1 ml-2 font-medium">{errors.email.message}</p>
            }
          </div>
          <div className="relative">
            <label className="text-xs font-semibold text-gray-500 ml-2 mb-1 block">Date of Birth</label>
            <input
              {...register("dob")}
              type="date"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 text-gray-600 bg-gray-50"
            />
          </div>
          <div className="relative">
            <label className="text-xs font-semibold text-gray-500 ml-2 mb-1 block">Mobile Number</label>
            <input
              {...register("mobile")}
              type="number"
              placeholder="enter your mobile number"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 placeholder-gray-400 bg-gray-50"
            />
          </div>
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-200 transform transition-active:scale-95 duration-200 mt-4">
            Create User Profile
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddUser