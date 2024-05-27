import styled from "styled-components";

export const BoxContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
`

export const FormContainer = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 0px 0px rgba(15, 15, 15, 0.19);
`

export const MutedLink = styled.a`
  font-size: 11px;
  color: rgba(200, 200, 200, 0.8);
  font-weight: 500;
  text-decoration: none;
`

export const BoldLink = styled.a`
  font-size: 12px;
  color: rgb(35, 196, 146);
  font-weight: 500;
  text-decoration: none;
  margin: 0 4px;
`

export const Input = styled.input`
  width: 100%;  
  height: 42px; 
  outline: none;
  border: 1px solid rgba(200, 200, 200, 0.3);
  padding: 0px 10px;
  transition: all 200ms ease-in-out;
  font-size: 12px;

  &::placeholder {
    color: rgba(200, 200, 200, 1);
  }

  &:not(:last-of-type) {
    border-bottom: 1.5px solid rgba(200, 200, 200, 0.4);
  }

  &focus {
    outline: none;
    border-bottom: 2px solid rgb(241, 196, 15);
  }
`

export const SubmitButton = styled.button`
  width: 100%;
  padding: 11px 30%;
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  border: none;
  border-radius: 100px 100px 100px 100px;
  cursor: pointer;
  transition: all, 240ms ease-in-out;
  background: rgb(35, 196, 146);
  background: linear-gradient(
    0deg,
    rgba(35, 196, 146, 1) 20%,
    rgba(34, 193, 195, 1) 100%
  );

  &:hover {
    filter: brightness(1.03);
  }
`

export const AppContainer = styled.div`
width: 100vw;
height: 100vh;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
`;

export const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  margin-top: 5px;
`

export const CheckboxInput = styled.input`
  margin-right: 10px;
  margin-top: 2px;
  appearance: none; /* Hide default checkbox */
  width: 20px;
  height: 20px;
  border: 1px solid #ccc;
  border-radius: 3px;
  outline: none;
  cursor: pointer;

  &:checked {
    background-color: rgba(35, 196, 146, 1);
    border-color: rgba(35, 196, 146, 1);
  }

  &:checked::before {
    content: '\u2713'; /* Checkmark symbol */
    display: block;
    text-align: center;
    line-height: 20px; /* Center vertically */
    font-size: 16px;
    color: white; /* Checkmark color */
  }
`

export const CheckboxText = styled.span`
  font-size: 12px;
  color: rgba(200, 200, 200, 0.8);
`
export const CircularImage = styled.img`
  border-radius: 50%;
  overflow: hidden;
  text-align: center;
  z-index: 10;
  height: 180px;
  width: 180px;
`;


