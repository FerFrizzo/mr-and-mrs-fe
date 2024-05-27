import React, { useContext, useEffect, useRef, useState } from "react";
import { BoldLink, BoxContainer, CheckboxInput, CheckboxLabel, CheckboxText, FormContainer, Input, MutedLink, SubmitButton } from "./Common";
import { Marginer } from "../marginer";
import useAuth from "../../hooks/useAuth";
import Axios from "../../api/Axios";
import { AccountContext } from "./AccountContext";
import { useLocation, useNavigate } from "react-router-dom";

const LOGIN_URL = '/auth'

const LoginForm = () => {
  const { switchtoSignup, switchToForgotPassword } = useContext(AccountContext);
  // const { switchToForgotPassword } = useContext(AccountContext);
  const { setAuth, persist, setPersist } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const emailRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLInputElement>(null);

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errMsg, setErrMsg] = useState('')
  // const [success, setSuccess] = useState(false)

  useEffect(() => {
    setErrMsg('')
  }, [email, password])

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault()
    console.log('email', email, password)
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
      navigate(from, { replace: true })

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

  const togglePersist = () => {
    setPersist(!persist);
  }

  useEffect(() => {
    if (persist) {
      localStorage.setItem('persist', JSON.stringify(persist));
    } else {
      localStorage.removeItem('persist');
    }
  }, [persist])

  return (
    <>
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
          <CheckboxLabel>
            <CheckboxInput
              type="checkbox"
              checked={persist}
              onChange={togglePersist}
            />
            <CheckboxText>Remember me</CheckboxText>
          </CheckboxLabel>
        </FormContainer>
        <Marginer direction="vertical" margin={10} />
        <MutedLink href="#" onClick={switchToForgotPassword}>Forgot your password?</MutedLink>
        <Marginer direction="vertical" margin="1.6em" />
        <SubmitButton type="submit" onClick={handleSubmit}>SignIn</SubmitButton>
        <Marginer direction="vertical" margin="1em" />
        <MutedLink>Don't have an account? <BoldLink href="#" onClick={switchtoSignup}> Signup</BoldLink></MutedLink>
      </BoxContainer>
    </>
  )
}

export default LoginForm;