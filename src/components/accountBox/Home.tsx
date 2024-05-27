import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { AccountContext } from "./AccountContext";
import { SocialLogin } from "./socialLogin";
import LoginForm from "./loginForm";
import { SignupForm } from "./signupForm";
import { CircularImage } from "./Common";
import ForgotPassword from "./ForgotPassword";


const BoxConteiner = styled.div`
  width: 280px;
  min-height: 550px;
  display: flex;
  flex-direction: column;
  border-radius: 19px;
  background-color: #fff;
  box-shadow: 0 0 2px rgba(15, 15, 15, 0.28);
  position: relative;
  overflow: hidden;
`

const TopContainer = styled.div`
  margin-top: 30px;
  width: 100%;
  height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0 1.8em;
  padding-bottom: 5em;
`

const BackDrop = styled(motion.div)`
  width: 160%;
  height: 550px;
  position: absolute;
  display: flex;
  flex-direction: column;
  border-radius: 50%;
  transform: rotate(60deg);
  top: -290px;
  left: -70px;
  background: rgb(35, 196, 146);
  background: linear-gradient(
    0deg,
    rgba(35, 196, 146, 1) 20%,
    rgba(34, 193, 195, 1) 100%
  );
`

export const HeaderText = styled.h2`
  font-size: 30px;
  font-weight: 600;
  line-height: 1.24;
  color: #fff;
  z-index: 10;
  margin: 0;
`

export const SmallText = styled.h5`
  color: #fff;
  font-weight: 500;
  font-size: 11px;
  z-index: 10;
  margin: 0;
  margin-top: 7px;
`

export const SmallGrayText = styled.h5`
  font-size: 11px;
  color: rgba(200, 200, 200, 0.8);
  font-weight: 500;
`

export const SmallRedText = styled.h5`
  font-size: 11px;
  color: rgba(255, 0, 0, 0.8);
  font-weight: 500;
  font-weight: bold;
`

const InnerContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 1.8em;
`

const BackDropVariants = {
  expanded: {
    width: "233%",
    height: "1050px",
    borderRadius: "20%",
    transform: "rotate(60deg)"
  },
  collapsed: {
    width: "160%",
    height: "550px",
    borderRadius: "50%",
    transform: "rotate(60deg)"
  }
}

const expandingTransition = {
  type: "spring",
  duration: 2.3,
  stiffness: 30,
}

interface ImageProps {
  imageUrl: string;
}

const ImageWithCircularMask: React.FC<ImageProps> = ({ imageUrl }) => {
  return <CircularImage src={imageUrl} />;
};

export function AccountBox() {
  const [isExpanded, setExpanded] = useState(false)
  const [active, setActive] = useState("signin")

  const playExpandingAnimation = () => {
    setExpanded(true)
    setTimeout(() => {
      setExpanded(false)
    }, expandingTransition.duration * 1000 - 1500)
  }

  const switchtoSignup = () => {
    playExpandingAnimation()
    setTimeout(() => {
      setActive("signup")
    }, 400)
  }

  const switchtoSignin = () => {
    playExpandingAnimation()
    setTimeout(() => {
      setActive("signin")
    }, 400)
  }

  const switchToForgotPassword = () => {
    playExpandingAnimation()
    setTimeout(() => {
      setActive("forgot")
    }, 400)
  }

  const contextValue = { switchtoSignup, switchtoSignin, switchToForgotPassword }

  return (
    <AccountContext.Provider value={contextValue}>
      <BoxConteiner>
        <TopContainer>
          <BackDrop
            initial={false}
            animate={isExpanded ? "expanded" : "collapsed"}
            variants={BackDropVariants}
            transition={expandingTransition} />
          <div style={{ position: 'relative', marginTop: '30px' }} >
            <ImageWithCircularMask imageUrl={require('../../assets/logo.jpg')} />
          </div>
          {/* {active === "signin" &&
            <HeaderContainer>
              <HeaderText> Welcome to</HeaderText>
              <HeaderText> Mr & Mrs </HeaderText>
              <SmallText> Please sign-in to continue! </SmallText>
            </HeaderContainer>}
          {active === "signup" && <HeaderContainer>
            <HeaderText> Create </HeaderText>
            <HeaderText> Account </HeaderText>
            <SmallText> Please sign-up to continue! </SmallText>
          </HeaderContainer>} */}
        </TopContainer>
        <InnerContainer>
          {active === "signin" && <LoginForm />}
          {active === "signup" && <SignupForm />}
          {active === "forgot" && <ForgotPassword />}
        </InnerContainer>
        {/* <InnerContainer>
          <SmallGrayText> --- or continue with --- </SmallGrayText>
          <SocialLogin />
        </InnerContainer> */}

      </BoxConteiner>
    </AccountContext.Provider >
  );
}