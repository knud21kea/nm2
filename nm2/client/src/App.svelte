<script>
    import { user } from "../src/store/user";
    import { Router, Link, Route } from "svelte-navigator";
    import PrivateRoute from "./components/Protectors/PrivateRoute.svelte";
    
    import Home from "./pages/Home/Home.svelte";
    import Login from "./pages/Login/Login.svelte";
    import Signup from './pages/SignUp/SignUp.svelte';
    import RestrictedArea from "./pages/Protected/Protected.svelte";
    
    </script>
    
    <Router>
      <nav>
        <Link to="/">// Home //</Link>
        {#if !$user}
        <Link to="/login">// Login //</Link>
        <Link to="/signup">// SignUp //</Link>
        {/if}
        {#if $user}
        <Link to="/restricted-area">// Restricted Area //</Link>
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
    
      <PrivateRoute path="/restricted-area">
        <RestrictedArea />
      </PrivateRoute>
    
    </Router>
      
    