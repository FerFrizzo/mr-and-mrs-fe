import { useNavigate } from "react-router-dom";
import useLogout from "../../hooks/useLogout";

const LoggedIn = () => {
  const navigate = useNavigate();
  const logout = useLogout();

  const signOut = async () => {
    await logout();
    navigate('/login');
  }

  return (
    <div>
      <h2>Logged in</h2>
      <button onClick={signOut}>Logout</button>
    </div>
  )
}

export default LoggedIn;