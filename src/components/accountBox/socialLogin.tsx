import { useCallback, useState } from 'react';
import { GoogleLoginButton } from 'react-social-login-buttons';
import { LoginSocialGoogle } from 'reactjs-social-login';
import { IResolveParams } from 'reactjs-social-login/dist/index.d';
import { Marginer } from '../marginer';

const REDIRECT_URI = window.location.href;
const REACT_APP_GOOGLE_CLIENT_ID = '56270461773-7737mfdq2btcfno4nnran8sia74dnkj3.apps.googleusercontent.com'

type Provider = 'google'

export type Profile = {
  accessToken: string,
  tokenType: Provider,
  expiresIn: number,
  scope: string,
  name?: string,
  givenName?: string,
  familyName?: string,
  picture?: string,
  email?: string,
  locale?: string,
}

export const SocialLogin = () => {
  const [provider, setProvider] = useState<Provider | null>()
  const [profile, setProfile] = useState<Profile>()
  const onLoginStart = useCallback(() => {
    alert('start login')
  }, [])

  // const onLogoutSuccess = useCallback(() => {
  //   setProfile({ "accessToken": "", "tokenType": "google", "expiresIn": 0, "scope": "" })
  //   setProvider(null)
  //   alert('logout success')
  // }, [])

  return (
    <div>
      {/* <Marginer direction="vertical" margin={15} /> */}
      <LoginSocialGoogle
        isOnlyGetToken={false}
        client_id={REACT_APP_GOOGLE_CLIENT_ID}
        onLoginStart={onLoginStart}
        redirect_uri={REDIRECT_URI}
        onResolve={({ provider, data }: IResolveParams) => {
          let googleData: Profile
          let p: Provider

          if (data) {
            console.log("🚀 ~ SocialLogin ~ data:", data)
            p = provider as Provider

            googleData = {
              "accessToken": data.access_token,
              "tokenType": p,
              "expiresIn": data.expires_in,
              "scope": data.scope,
              "name": data.name,
              "givenName": data.given_name,
              "familyName": data.family_name,
              "picture": data.picture,
              "email": data.email,
              "locale": data.locale
            }
          }
          else {
            googleData = { "accessToken": "", "tokenType": "google", "expiresIn": 0, "scope": "" }
            p = {} as Provider
          }

          setProvider(p)
          console.log('provider', provider, googleData)
          // postProfileData(googleData)
          setProfile(googleData)
        }}
        onReject={(err) => {
          console.log(err)
        }}
      >
        <GoogleLoginButton />
      </LoginSocialGoogle>
      <Marginer direction="vertical" margin={15} />
    </div>
  )
}