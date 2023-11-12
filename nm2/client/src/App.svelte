<script>
  import { user } from "../src/store/user";
  import { Router, Link, Route } from "svelte-navigator";
  import PrivateRoute from "./components/Protectors/PrivateRoute.svelte";

  import Home from "./pages/Home/Home.svelte";
  import Login from "./pages/Login/Login.svelte";
  import Signup from "./pages/SignUp/SignUp.svelte";
  import Protected from "./pages/Protected/Protected.svelte";
</script>

<Router>
  <nav>
    <Link to="/">Home</Link>
    {#if !$user}
      <Link to="/login">| Login</Link>
      <Link to="/signup">| SignUp</Link>
    {/if}
    {#if $user}
      <Link to="/protected">| Restricted Area</Link>
    {/if}
  </nav>

  <Route path="/">
    <Home />
  </Route>

  <Route path="/login">
    <Login />
  </Route>

  <Route path="/signup">
    <Signup />
  </Route>

  <PrivateRoute path="/protected">
    <Protected />
  </PrivateRoute>
</Router>
