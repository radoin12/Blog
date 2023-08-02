import { Navigate } from "react-router"
import { authState } from "../../../component/redux/auth"
import { SelectorApp } from "../../../component/redux/config/hooks"

type propsChildren={
    children:React.ReactNode
}
export default function Protect({children}:propsChildren) {
    const AuthService=SelectorApp(authState)
  
    if (!AuthService.userInfo.isAdmin) {
       return  <Navigate to="/" replace/>
    }

    return <>{children}</>; 




}