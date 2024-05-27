import React, { useEffect, useState } from "react";
import { BoldLink, BoxContainer, FormContainer, Input, MutedLink, SubmitButton } from "./Common";
import { Marginer } from "../marginer";
import NewPassword from "./NewPassword";
import { HeaderText, SmallGrayText, SmallText } from "./Home";
import { FORGOT_PASSWORD_URL, HeaderGreenText } from "./ForgotPassword";
import axios from "axios";
import Axios from "../../api/Axios";

interface otpProps {
  email: string,
  otp: string
}


const OTP = (props: otpProps) => {
  const [otp, setOTP] = useState<string>('')
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [disable, setDisable] = useState(true)
  const [timerCount, setTimerCount] = useState(60)

  function checkOTP(otp: string, inputOtp: string) {
    otp === inputOtp
      ? setShowNewPassword(true)
      : setShowNewPassword(false)
  }

  function resendOTP() {
    if (disable) return
    Axios
      .post(FORGOT_PASSWORD_URL, {
        emailTo: props.email,
        otp: props.otp
      })
      .then(() => setDisable(true))
      .then(() => setTimerCount(60))
      .catch((error) => console.log('error', error))
  }

  useEffect(() => {
    let interval = setInterval(() => {
      setTimerCount((lastTimerCount) => {
        lastTimerCount <= 1 && clearInterval(interval)
        if (lastTimerCount <= 1) setDisable(false)
        if (lastTimerCount <= 0) return lastTimerCount
        return lastTimerCount - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [disable])

  return (
    showNewPassword ? (
      <NewPassword email={props.email} />
    ) : (
      <BoxContainer>
        <FormContainer>
          <HeaderGreenText>Email Verification</HeaderGreenText>
          <SmallGrayText>We have sent a code to your email</SmallGrayText>
          <Input
            type="text"
            placeholder="OTP"
            onChange={(e) => setOTP(e.target.value)}
          />
          OTP is: {props.otp}
          <Marginer direction="vertical" margin="1.6em" />
          <SubmitButton type="submit" onClick={() => { checkOTP(props.otp, otp) }}>Submit OTP</SubmitButton>
          <SmallGrayText>Didn't receive the code? </SmallGrayText>
          <MutedLink>Didn't receive the code?
            <BoldLink
              href="#"
              onClick={() => {
                console.log('resend')
                !disable ?? resendOTP()
                setDisable(true)
                setTimerCount(60)
              }}
              style={{ cursor: disable ? "none" : "pointer" }}
            >
              {disable ? `Resend in ${timerCount}s` : 'Resend OTP'}
            </BoldLink>
          </MutedLink>
        </FormContainer>
      </BoxContainer>
    )
  )

}

export default OTP;