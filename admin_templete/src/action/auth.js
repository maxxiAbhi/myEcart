import axiosInstance from "../helper/axios"
import { authConstants } from "./constants"
export const login = (user) => {
    return async (dispatch) => {
        console.log(user)
        const res = await axiosInstance.post('/admin/login',{
            ...user
        })
        console.log(res.data.message)
        if (res.status === 200) {
            const { token, user } = res.data
            localStorage.setItem('token', token)
            localStorage.setItem('user', JSON.stringify(user))
            dispatch({
                type: authConstants.LOGIN_SUCESS,
                payload: {
                    token, user
                }
            })
        }
        if (res.status === 400) {
            console.log('yo')
            dispatch({
                type: authConstants.LOGIN_FAILURE,
                payload: {
                    error:res.data.message 
                }
            })
        }

    }
}