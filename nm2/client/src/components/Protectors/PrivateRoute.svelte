<script>
    import { Route } from "svelte-navigator";
    import PrivateRouteGuard from "./PrivateRouteGuard.svelte";
    let navigate;
    let location;
    export let path;
</script>

<!-- The path prop {path} is used to render the protected component if the user is authenticated -->

<Route {path}>
    <PrivateRouteGuard {navigate} {location}>
        <slot/>
    </PrivateRouteGuard>
</Route>