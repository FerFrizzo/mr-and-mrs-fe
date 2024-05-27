import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import useRefreshToken from "../../hooks/useRefreshToken";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { auth, persist } = useAuth();
  const refresh = useRefreshToken();

  useEffect(() => {
    let isMounted = true;
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (error) {
        console.log(error);
      } finally {
        isMounted && setIsLoading(false);
      }
    }

    !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);

    return () => {
      isMounted = false;
    }

  }, [])

  useEffect(() => {
    console.log('isLoading', isLoading);
    console.log('token', JSON.stringify(auth?.accessToken));
  }, [isLoading])

  return (
    <>
      {!persist
        ? <Outlet />
        : isLoading
          ? <div>Loading...</div> // Show a loading spinner
          : <Outlet />}
    </>
  )
};

export default PersistLogin;