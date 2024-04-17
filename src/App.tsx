import React, { useEffect, useState } from 'react';
import './App.css';

import { Profile, SocialLogin } from './SocialLogin';

import styled from 'styled-components';
import { AccountBox } from './components/accountBox';


// import { LoginForm } from './components/accountBox/loginForm';
// import { SignupForm } from './components/accountBox/signupForm';


export type User = {
  name: string,
  age: number,
  countryOfResidence: string,
}

const AppContainer = styled.div`
width: 100vw;
height: 100vh;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
`;

function App() {
  const client_id = '56270461773-7737mfdq2btcfno4nnran8sia74dnkj3.apps.googleusercontent.com'

  // return (
  //   <Routes>
  //     <Route path="/" element={<Layout />}>
  //       <Route path="login" element={<LoginForm />} />
  //       <Route path="register" element={<SignupForm />} />
  //       {/* <Route path="linkpage" element={<LinkPage />} /> */}
  //       {/* <Route path="unauthorized" element={<Unauthorized />} /> */}

  //       {/* we want to protect these routes */}
  //       {/* <Route element={<RequireAuth />}> */}
  //       {/* <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}> */}
  //       <Route path="/" element={<Home />} />
  //       {/* <Route path="editor" element={<Editor />} /> */}
  //       <Route path="admin" element={<Admin />} />
  //       <Route path="lounge" element={<Lounge />} />
  //       {/* </Route> */}

  //       {/* <Route element={<RequireAuth allowedRoles={[ROLES.Editor]} />}> */}
  //       {/* </Route> */}


  //       {/* <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}> */}
  //       {/* </Route> */}

  //       {/* <Route element={<RequireAuth allowedRoles={[ROLES.Editor, ROLES.Admin]} />}> */}
  //       {/* </Route> */}

  //       {/* catch all */}
  //       <Route path="*" element={<Missing />} />
  //     </Route>
  //   </Routes>
  // )

  return (
    <div className="App">
      <AppContainer>
        <AccountBox />
      </AppContainer>
    </div>
  );
}

export default App;
