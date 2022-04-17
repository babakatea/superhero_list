import React from "react";
import {Routing} from "../routes";
import {BrowserRouter as Router} from "react-router-dom";

const App: React.FC = () => {
  return (
      <Router>
        <Routing />
      </Router>
  );
}

export default App;
