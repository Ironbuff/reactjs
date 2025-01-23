import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router";
import Users from "./users/pages/Users";
function App() {
  return (
    <>
      <Router>
        <Users />
      </Router>
    </>
  );
}

export default App;
