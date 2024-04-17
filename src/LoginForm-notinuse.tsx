import React, { useState } from "react";
import styled from "styled-components";
import { AccountBox } from "./components/accountBox";

// interface LoginFormProps {
//   onLogin: (email: string, password: string) => void;
// }

const AppContainer = styled.div`
width: 100%;
height: 100%;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
`;

function onLogin(email: string, password: string) {
  console.log('on Login')
}

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <AppContainer>
      <AccountBox />
      {/* <form onSubmit={handleSubmit}>
        <div>
          <text> Email: </text>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <text> Password: </text>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form> */}
    </AppContainer>
  );
}