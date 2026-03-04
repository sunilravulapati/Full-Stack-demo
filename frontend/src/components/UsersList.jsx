import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'

function UsersList() {
  let [users, setUsers] = useState([])
  let [error, setError] = useState(null)
  let [loading, setLoading] = useState(false)
  let navigate = useNavigate()
  
  const goToUser = (o) =>{
    navigate('/users',{state:{user:o}})  
  }

  useEffect(() => {
    setLoading(true)

    async function getUsers() {
      try {
        let res = await fetch('http://localhost:5000/user-api/users')

        if (res.status === 200) {
          let data = await res.json()
          setUsers(data.payload)
        } else {
          setError("Failed to fetch users")
        }

      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    getUsers()
  }, [])

  if (loading === true) {
    return <p className='text-3xl text-center mt-10 text-orange-500'>Loading.....</p>
  }
  if (error) {
    return <p className='text-3xl text-center mt-10 text-red-500'>Error occurred.....</p>
  }
  return (
    <div>
      <h1 className='mt-5 ml-15 text-3xl'>UsersList:</h1>
      <div className='flex justify-evenly'>
        {
          users.map(userObj =>
          <div onClick={()=>goToUser(userObj)} key={userObj.email} className='cursor-pointer p-5 mt-5 shadow-2xl'>
              <p className='font-bold'>{userObj.name}</p>
              <p>{userObj.email}</p>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default UsersList