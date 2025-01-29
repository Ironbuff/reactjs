import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router";
import Users from "./users/pages/Users";
import Navigation from "./shared/components/Navigation";
function App() {
  return (
    <>
      <Router>
        <Navigation/>
        <Users />
      </Router>
    </>
  );
}

export default App;
