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
  persist: boolean,
  setPersist: (persist: boolean) => void
}

export const AuthContext = createContext<AuthContextType>({
  auth: { email: "", password: "", roles: [], accessToken: "" },
  setAuth: () => null,
  persist: false,
  setPersist: () => false
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState<AuthType>({ email: "", password: "", roles: [], accessToken: "" })
  const [persist, setPersist] = useState<boolean>(
    JSON.parse(localStorage.getItem('persist') || 'false') as boolean
  )

  return (
    <AuthContext.Provider value={{ auth, setAuth, persist, setPersist }}>
      {children}
    </AuthContext.Provider>
  )

}

export const AuthConsumer = AuthContext.Consumer

export default AuthProvider