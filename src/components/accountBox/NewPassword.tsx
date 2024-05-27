import React, { useRef, useState } from "react";
import { BoxContainer, FormContainer, Input, SubmitButton } from "./Common";
import { Marginer } from "../marginer";
import Axios from "../../api/Axios";
import { useLocation, useNavigate } from "react-router-dom";
import { HeaderText, SmallGrayText, SmallRedText } from "./Home";
import { HeaderGreenText } from "./ForgotPassword";

interface newPasswordProps {
  email: string
}

const RESET_PASSWORD_URL = '/reset-password'
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const NewPassword = (props: newPasswordProps) => {
  const [pwd, setPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const newPwdRef = useRef<HTMLInputElement>(null);
  const confirmPwdRef = useRef<HTMLInputElement>(null);
  const [errorMsg, setErrorMsg] = useState('')
  const navigate = useNavigate();
  const body = {
    email: props.email,
    pwd
  }

  const handleSubmit = () => {
    try {
      if (pwd === confirmPwd && PWD_REGEX.test(pwd)) {
        Axios
          .post(RESET_PASSWORD_URL, body)
          .then(() => navigate('/login', { replace: true }))
      } else {
        setErrorMsg('Passwords do not match or invalid');
      }
    } catch (error: any) {
      console.log('error', error)
    }
  }

  return (
    <BoxContainer>
      <FormContainer>
        <HeaderGreenText>Change Password</HeaderGreenText>
        <Marginer direction="vertical" margin="1em" />
        <Input
          type="password"
          placeholder="New Password"
          ref={newPwdRef}
          onChange={(e) => {
            setPwd(e.target.value)
            setErrorMsg('')
          }}
          value={pwd}
        />
        <Marginer direction="vertical" margin="1em" />
        <Input
          type="password"
          placeholder="Confirm Password"
          ref={confirmPwdRef}
          onChange={(e) => {
            setConfirmPwd(e.target.value)
            setErrorMsg('')
          }}
          value={confirmPwd}
        />
        {errorMsg && <SmallRedText>{errorMsg} - {pwd} - {confirmPwd}</SmallRedText>}
        <Marginer direction="vertical" margin="1.6em" />
        <SubmitButton type="submit" onClick={handleSubmit}>Reset Password</SubmitButton>
      </FormContainer>
    </BoxContainer>
  );
}

export default NewPassword;