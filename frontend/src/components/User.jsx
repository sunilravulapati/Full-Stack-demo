import { useLocation } from "react-router"

function User() {
  let { state } = useLocation()
  
  return (
    <div className="mt-10">
      {/* Centered container with a simple border */}
      <div className="max-w-sm m-auto border border-gray-300 p-6 rounded-md shadow-lg">
        <h1 className="text-xl font-bold mb-4">User Details</h1>
        {/* Left-aligned content */}
        <div className="text-left space-y-2">
          <p><strong>Name:</strong> {state?.user?.name}</p>
          <p><strong>Email:</strong> {state?.user?.email}</p>
          <p><strong>Date of Birth:</strong> {state?.user?.dob.split('T')[0]}</p>
          <p><strong>Mobile:</strong> {state?.user?.mobile}</p>
        </div>
      </div>
    </div>
  )
}

export default User