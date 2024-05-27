import axios from "../api/Axios";
import useAuth from "./useAuth";

const useLogout = () => {
  const { setAuth } = useAuth();

  const logout = async () => {
    setAuth({ email: "", password: "", roles: [], accessToken: "" });
    console.log('Logging out')
    try {
      await axios.get('/logout')
    } catch (error) {
      console.log(error)
    }
  }

  return logout
}

export default useLogout;