import {createContext, useEffect, useReducer} from 'react';

const initialState = {
      isAuth :false,
      user:null,
      token : localStorage.getItem('token') || null
}
// console.log(initialState)
export const authContext = createContext(initialState);

const authReducer = (state,action) => {
      switch(action.type) {
            case 'LOGIN_START' : return {
                  isAuth : false,
                  user: null,
                  token : null
            };
            case 'LOGIN_SUCCESS' : return {
                  isAuth : true,
                  user: action.payload.user,
                  token : action.payload.token
            };
            case 'LOGIN_OUT' : return {
                  isAuth : false,
                  user: null,
                  token : null
            };
            default : return state
      }
}

export const AuthContextProvider = ({children}) => {
      const [state, dispatch] = useReducer(authReducer, initialState);
     
      useEffect(() => {
            localStorage.setItem("token",state.token)
      },[state])
      return (
      <authContext.Provider value={{
            isAuth : state?.isAuth,
            user:state?.user, 
            token : state?.user,
            dispatch : dispatch
            }}>
            {children}
      </authContext.Provider>
      )
}