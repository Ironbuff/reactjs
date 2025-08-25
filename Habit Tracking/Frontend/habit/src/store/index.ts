import {configureStore} from '@reduxjs/toolkit'
import authReducer from './auth'
const Store = configureStore({
    reducer:{
        auth:authReducer //so we can use authReducer state using auth.isloggedIn similarly
    }, //this tells intial and final state
})

export default Store