import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import LoadingSpinner from "../Components/Shared/LoadingSpinner";



const PrivateRoute = ({children}) => {
    const {user, loading} = useAuth();
    const location = useLocation()
   if (loading){
    return <LoadingSpinner></LoadingSpinner>
   }
   if(user){
    return children;
   }
   return <Navigate to="/login" state={{from:location}} replace></Navigate>
   
};

export default PrivateRoute;