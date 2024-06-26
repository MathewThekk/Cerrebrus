import { useNavigate } from "react-router-dom"
import firebase from "firebase/compat/app"

const useLogout = () => {
  const navigate = useNavigate()

  const logout = async () => {
    await firebase.auth().signOut()
    navigate("/login")
  }

  return logout
}

export default useLogout
