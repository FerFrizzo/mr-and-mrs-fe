import { createContext, useState } from "react";

type AuthType = {
  email: string,
  password: string,
  roles: number[],
  accessToken: string
}

type AuthContextType = {
  auth: AuthType
  setAuth: (auth: AuthType) => void
}

export const AuthContext = createContext<AuthContextType>({
  auth: { email: "", password: "", roles: [], accessToken: "" },
  setAuth: () => null
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState<AuthType>({ email: "", password: "", roles: [], accessToken: "" })

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  )

}

export const AuthConsumer = AuthContext.Consumer

export default AuthProvider