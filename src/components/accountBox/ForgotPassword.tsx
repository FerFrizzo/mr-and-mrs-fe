import React, { useRef, useState } from "react";
import { BoxContainer, FormContainer, Input, SubmitButton } from "./Common";
import { Marginer } from "../marginer";
import Axios from "../../api/Axios";
import { useNavigate } from "react-router-dom";
import OTP from "./OTP";
import { HeaderText } from "./Home";
import styled from "styled-components";

export const FORGOT_PASSWORD_URL = '/password-recovery'
const otp = Math.floor(100000 + Math.random() * 900000).toString().substring(0, 6)

export const HeaderGreenText = styled.h3`
  font-size: 24px;
  font-weight: 600;
  line-height: 1.24;
  color: rgba(34, 193, 195, 1);
  z-index: 10;
  margin: 0;
`


const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const forgotPasswordRef = useRef<HTMLInputElement>(null);

  const handleReset = () => {
    try {
      Axios
        .post(FORGOT_PASSWORD_URL, { emailTo: email, otp })
        .then(() => setShowOTP(true))

    } catch (error: any) {
      setEmail('')
      setShowOTP(false)
      console.log('error', error)
    }
  }

  return (
    (showOTP) ? (
      <OTP email={email} otp={otp} />
    ) : (
      <BoxContainer>
        <FormContainer>
          <HeaderGreenText>Enter your email</HeaderGreenText>
          <Marginer direction="vertical" margin="1em" />
          <Input
            type="email"
            placeholder="Email"
            ref={forgotPasswordRef}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
          <Marginer direction="vertical" margin="1.6em" />
          <SubmitButton type="submit" onClick={handleReset} >Reset Password</SubmitButton>
        </FormContainer>
      </BoxContainer>
    )
  );
}

export default ForgotPassword;