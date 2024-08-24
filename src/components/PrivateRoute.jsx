import {Navigate,useLocation,Outlet} from "react-router-dom"
import  {useAuth}  from "../context/authContext" 

// private route wrapper
export const PrivateRoute = () => {
   const {encodedToken} = useAuth()
   const user = JSON.parse(localStorage.getItem('user'))
   const location = useLocation()

   if(!encodedToken){
    return <Navigate to="/login" state={{ from: location }} replace />;
   }
   if(!user.isAdmin){
    return <Navigate to="/home" replace />;
   }
   return <Outlet />
}