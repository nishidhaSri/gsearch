import { Switch, Route } from "react-router-dom";
import "./App.css";
import Dashboard from "./containers/dashboard";
import Home from "./containers/home";

function App() {
  return (
    <Switch>
      <Route path="/me">
        <Dashboard />
      </Route>
      <Route path="/">
        <Home />
      </Route>
    </Switch>
  );
}

export default App;
