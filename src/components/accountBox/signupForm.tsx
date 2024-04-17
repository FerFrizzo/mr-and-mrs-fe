import React, { useContext, useEffect, useRef, useState } from "react";
import { BoldLink, BoxContainer, FormContainer, Input, MutedLink, SubmitButton } from "./common";
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContext";
import axios from '../../api/Axios'

const EMAIL_REGEX = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/register'

export function SignupForm() {

  const emailRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLInputElement>(null);

  const [fullname, setFullname] = useState('')
  const [validName, setValidName] = useState(false)
  const [nameFocus, setNameFocus] = useState(false)

  const [email, setEmail] = useState('')
  const [validEmail, setValidEmail] = useState(false)
  const [emailFocus, setEmailFocus] = useState(false)

  const [pwd, setPwd] = useState('')
  const [validPwd, setValidPwd] = useState(false)
  const [pwdFocus, setPwdFocus] = useState(false)

  const [matchPwd, setMatchPwd] = useState('')
  const [validMatch, setValidMatch] = useState(false)
  const [matchFocus, setMatchFocus] = useState(false)

  const [errMsg, setErrMsg] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    emailRef.current?.focus()
  }, [])

  useEffect(() => {
    const result = EMAIL_REGEX.test(email)
    setValidEmail(result)
  }, [email])

  useEffect(() => {
    const result = PWD_REGEX.test(pwd)
    setValidPwd(result)
    const match = pwd === matchPwd
    setValidMatch(match)
  }, [pwd, matchPwd])

  useEffect(() => {
    setErrMsg('')
  }, [email, pwd, matchPwd])

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    const v1 = EMAIL_REGEX.test(email)
    const v2 = PWD_REGEX.test(pwd)

    if (!v1 || !v2) {
      setErrMsg('Invalid email or password')
      return
    }

    try {
      const result = await axios.post(REGISTER_URL,
        JSON.stringify({ fullname, email, pwd }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      )
      if (result.status === 201) {
        setSuccess(true)
      }
      setSuccess(false)
    } catch (err: any) {
      if (!err?.response) {
        setErrMsg('No response from server. Please try again later.')
      } else if (err.response?.status === 409) {
        setErrMsg("Username already exists. Please choose another.")
      } else {
        setErrMsg('Registration failed. Please try again.')
      }
      errRef.current?.focus()
    }
  }

  const { switchtoSignin } = useContext(AccountContext);

  return (
    <BoxContainer>
      <FormContainer>
        <Input
          type="text"
          placeholder="Full Name"
          onChange={(e) => setFullname(e.target.value)}
          required
          onFocus={() => setNameFocus(true)}
          onBlur={() => setNameFocus(false)}
        />
        <Input
          type="email"
          placeholder="Email"
          autoComplete="off"
          onChange={(e) => setEmail(e.target.value)}
          required
          onFocus={() => setEmailFocus(true)}
          onBlur={() => setEmailFocus(false)}
        />
        <Input
          type="password"
          placeholder="Password"
          onChange={(e) => setPwd(e.target.value)}
          required
          onFocus={() => setPwdFocus(true)}
          onBlur={() => setPwdFocus(false)}
        />
        <Input
          type="password"
          placeholder="Confirm Password"
          onChange={(e) => setMatchPwd(e.target.value)}
          required
          onFocus={() => setMatchFocus(true)}
          onBlur={() => setMatchFocus(false)}
        />
      </FormContainer>
      <Marginer direction="vertical" margin={27} />
      <SubmitButton type="submit" onClick={handleSubmit} >Signup</SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">Already have an account? <BoldLink href="#" onClick={switchtoSignin}> Signin</BoldLink></MutedLink>
    </BoxContainer>
  )
}