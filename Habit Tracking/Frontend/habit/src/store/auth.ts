import { createSlice } from "@reduxjs/toolkit";


const authSlice = createSlice({
    name:"auth",
    initialState:{isloggedIn:false},
    reducers:{
        login(state){
            state.isloggedIn=true;
        },
        logout(state){
            state.isloggedIn=false
        }
    }
});

export const authAction = authSlice.actions;
export default authSlice.reducer