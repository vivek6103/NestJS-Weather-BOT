import { Route,Routes } from "react-router";
import {GoogleOAuthProvider} from '@react-oauth/google'
import Login from "./pages/Login";
import Portal from "./pages/Portal";
import secret from "./secret.json"
function App(){
  function Auth(){
    return(
      <GoogleOAuthProvider clientId={secret.web.client_id}>
        <Login/>
      </GoogleOAuthProvider>
    )
  }

  return(
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="/home" element={<Portal/>}/>
    </Routes>
  )
}
export default App;