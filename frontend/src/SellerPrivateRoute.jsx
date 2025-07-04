import { Navigate } from "react-router-dom"

const SellerPrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token")
  const role = localStorage.getItem("role")
  if (!token || role !== "seller") {
    return <Navigate to="/login" replace />
  }
  return children
}

export default SellerPrivateRoute