import { useSelector } from "react-redux"
import jwt_decode from 'jwt-decode'
import { getAuthState } from "../slices/authSlice"

const useUserID = () => {
    const { token } = useSelector(getAuthState)
    const payload = jwt_decode(token)
    return payload.userId
}

export default useUserID