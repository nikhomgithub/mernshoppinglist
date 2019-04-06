import {
 USER_LOADING,
 USER_LOADED,
 AUTH_ERROR,
 LOGIN_SUCCESS,
 LOGIN_FAIL,
 LOGOUT_SUCCESS,
 REGISTER_SUCCESS,
 REGISTER_FAIL,
} from '../actions/types';



const initialState={
  token: localStorage.getItem('token'),
  isAuthenticated:false,
  isLoading:false,
  user:null
}

export default function(state=initialState,action){
  switch(action.type){
    case  USER_LOADING :
      return{ 
        ...state,
        isLoading:true
      };
    
    case  USER_LOADED : //Check user from token
      return{ 
        ...state,
        isAuthenticated:true,
        isLoading:false,
        user:action.payload
      };
    
    case  LOGIN_SUCCESS :
    case  REGISTER_SUCCESS:
    localStorage.setItem('token',action.payload.token)
      return{
        ...state,
        ...action.payload, //inclue user and token
        isAuthenticated:true,
        isLoading:false,
      };

    case  LOGIN_FAIL:
    case  LOGOUT_SUCCESS :
    case  AUTH_ERROR :
    case  REGISTER_FAIL :
      localStorage.removeItem('token');
      return{ 
        token:null,
        isAuthenticated:false,
        isLoading:false,
        user:null
      };  

    default :
      return state;
  }
}