import React, { useEffect, useState } from 'react';
import './App.css';

import { Profile, SocialLogin } from './SocialLogin';


import { AccountBox } from './components/accountBox/Home';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/accountBox/Layout';
import { SignupForm } from './components/accountBox/signupForm';
import PersistLogin from './components/accountBox/PersistLogin';
import Unauthorized from './components/accountBox/Unauthorized';
import RequireAuth from './components/accountBox/RequireAuth';
import LoggedIn from './components/accountBox/LoggedIn';

const ROLES = {
  ADMIN: 5150,
  EDITOR: 1984,
  USER: 2001
}

function App() {
  const client_id = '56270461773-7737mfdq2btcfno4nnran8sia74dnkj3.apps.googleusercontent.com'

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<AccountBox />} />
        <Route path="register" element={<SignupForm />} />
        <Route path='unauthorized' element={<Unauthorized />} />

        <Route element={<PersistLogin />} >
          <Route element={<RequireAuth allowedRoles={[ROLES.USER]} />}>
            <Route path='/' element={<LoggedIn />} />
          </Route>
        </Route>

        <Route path='*' element={<Unauthorized />} />
      </Route>
    </Routes>
  )

}

export default App;
