<script>
    import { user } from "../../store/user.js";
    import { BASE_URL } from "../../store/urlDomain.js";
    import toastr from "toastr";

    toastr.option = {
        positionClass: "toast-top-right",
        timeOut: "3000",
    };

    async function logout() {
        const logoutUrl = $BASE_URL + "/users/logout";

        const response = await fetch(logoutUrl, {
            method: "GET",
        });

        user.set(null);
        return toastr.success("You have been logged out.");
    }
</script>

<h2>HOME</h2>

{#if $user}
    <button on:click={logout}>Logout</button>
{/if}

<slot />
