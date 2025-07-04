import { Navigate } from "react-router-dom"

const UserPrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token")
  const role = localStorage.getItem("role")
  if (!token || role !== "user") {
    return <Navigate to="/login" replace />
  }
  return children
}

export default UserPrivateRoute