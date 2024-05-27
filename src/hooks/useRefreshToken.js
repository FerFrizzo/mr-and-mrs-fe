import axios from '../api/Axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
  const { auth, setAuth } = useAuth();

  const refresh = async () => {

    const response = await axios.get('/refresh', {
      withCredentials: true
    });
    console.log('refresh', response.data.accessToken)
    setAuth(prev => {
      return {
        ...prev,
        roles: response.data.roles,
        accessToken: response.data.accessToken
      }
    });
    return response.data.accessToken;
  }
  return refresh;
};

export default useRefreshToken;