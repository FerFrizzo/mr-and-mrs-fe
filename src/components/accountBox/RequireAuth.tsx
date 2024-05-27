import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";


type RequireAuthProps = {
  allowedRoles: number[]
}

const RequireAuth = (props: RequireAuthProps) => {
  const { auth } = useAuth();
  const location = useLocation();

  return (
    auth?.roles?.find(role => props.allowedRoles.includes(role))
      ? <Outlet />
      : auth.email
        ? <Navigate to="/unauthorized" state={{ from: location }} replace />
        : <Navigate to="/login" state={{ from: location }} replace />
  )
}

export default RequireAuth;