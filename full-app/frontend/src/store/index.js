// Import tools to create Redux slice and store
import { createSlice, configureStore } from "@reduxjs/toolkit";

// Create slice for managing user authentication
const authSlice = createSlice({
    // Unique name for this slice of state
    name: "auth",
    
    // Starting point for authentication data
    initialState: { user:"", isLoggedIn: false },
    
    // Rules for changing authentication state
    reducers: {
        loggin(state){
            state.isLoggedIn = true;
        },
        loggout(state){
            state.isLoggedIn = false;
        },
    },
});

// Make authentication actions available to use in components
export const authActions = authSlice.actions;

// Set up the main store to manage app's state
export const store = configureStore({
    // Add authentication management to the store
    reducer: authSlice.reducer,
    
});