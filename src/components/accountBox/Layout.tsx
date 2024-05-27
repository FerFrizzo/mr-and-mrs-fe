import { Outlet } from "react-router-dom";
import { AccountBox } from "./Home";
import { AppContainer } from "./Common";

const Layout = () => {

  return (
    <main className="App">
      <AppContainer>
        <Outlet />
      </AppContainer>
    </main>
  )

}

export default Layout;