import { authConstants } from "../action/constants"

const initState={
    token:null,
    user:{
        email:"",
        profilePictue:""
    },
    autenticate:false,
    autenticating:false,
    message:""
 }
export default (state=initState,action)=>{
    switch(action.type){
        case authConstants.LOGIN_REQUEST:state={
            ...state,
            autenticating:true,
            error:action.payload.error
        }
        break;

        case authConstants.LOGIN_SUCESS:      
        state={
            ...state,
            user:action.payload.user,
            token:action.payload.token,
            autenticate:true,
            autenticating:false,
            loading:false,
            error:null,
            message:"",
            status:200
        }
        break;
        case authConstants.LOGOUT_REQUEST:
        state={
            ...state,
            loading:true
        }
        case authConstants.LOGOUT_SUCESS:
        state={
            ...initState
        }
        case authConstants.LOGOUT_FAILURE:
        state={
            ...state,
            error:action.payload,
           loading:false
        }
        break;
        case authConstants.LOGIN_FAILURE:state={
           message:action.payload.error,
           autenticate:false,
           status:400
        }
        break;

    }
    return state;
}