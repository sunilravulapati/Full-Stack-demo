import { useLocation } from "react-router"

function User() {
  let {state} = useLocation()
  return (
    <div className="">
      <h1 className="mt-5 text-center text-3xl">User:</h1>
      <div className="text-center mt-5">
        <p>Name: {state?.user?.name}</p>
        <p>Email: {state?.user?.email}</p>
        <p>Date of Birth: {state?.user?.dob}</p>
        <p>Mobile Phone: {state?.user?.mobile}</p>
      </div>
    </div>
  )
}

export default User