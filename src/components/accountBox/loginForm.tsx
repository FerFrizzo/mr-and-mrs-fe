import React, { useContext, useEffect, useRef, useState } from "react";
import { BoldLink, BoxContainer, FormContainer, Input, MutedLink, SubmitButton } from "./common";
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContext";
import useAuth from "../../hooks/useAuth";
import Axios from "../../api/Axios";

const LOGIN_URL = '/auth'

export function LoginForm() {
  const { switchtoSignup } = useContext(AccountContext);
  const { auth, setAuth } = useAuth();
  const emailRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLInputElement>(null);

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errMsg, setErrMsg] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    setErrMsg('')
  }, [email, password])

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault()

    try {
      const response = await Axios.post(
        LOGIN_URL,
        { email, pwd: password },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      )

      const accessToken = response?.data?.accessToken
      const roles = response?.data?.roles

      setAuth({
        email,
        password,
        roles,
        accessToken
      });


      setEmail('')
      setPassword('')
      setSuccess(true)
    } catch (error: any) {
      if (!error?.response) {
        console.log(error)
        setErrMsg('No Server Response')
      } else if (error.response?.status === 400) {
        setErrMsg('Invalid email or password')
      } else if (error.response?.status === 401) {
        setErrMsg('Unauthorized')
      } else {
        setErrMsg('Login failed. Please try again.')
      }
      errRef.current?.focus()
    }


  }

  return (
    <>
      {success ? (
        <>
          <p>You are logged in</p>
          <br />
          <p>
            <BoldLink href="#">Go to Home</BoldLink>
          </p>
        </>
      ) : (
        <BoxContainer>
          <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}>{errMsg}</p>
          <FormContainer>
            <Input
              type="email"
              placeholder="Email"
              ref={emailRef}
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
            <Input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
          </FormContainer>
          <Marginer direction="vertical" margin={10} />
          <MutedLink href="#">Forgot your password?</MutedLink>
          <Marginer direction="vertical" margin="1.6em" />
          <SubmitButton type="submit" onClick={handleSubmit}>SignIn</SubmitButton>
          <Marginer direction="vertical" margin="1em" />
          <MutedLink href="#">Don't have an account? <BoldLink href="#" onClick={switchtoSignup}> Signup</BoldLink></MutedLink>
        </BoxContainer>
      )}
    </>
  )
}