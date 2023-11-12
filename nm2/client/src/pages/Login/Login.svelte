<script>
    import { BASE_URL } from "../../store/urlDomain.js";
    import toastr from "toastr";
    import 'toastr/build/toastr.css';
    import { user } from "../../store/user.js";
    import { navigate } from "svelte-navigator";    

toastr.option = {
        "positionClass": "toast-top-right",
        "timeOut": "3000"
    }

let email = "";
let password = "";
let recovery = "";

    async function handleLogin(){

        const credentialsToJSON = JSON.stringify({email, password});

        const loginUrl= $BASE_URL + "/users/login";
    
        
        const response = await fetch(loginUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: credentialsToJSON,
            credentials: "include"
        });

        const data = await response.json();
       
        if (response.status === 404) {
            return toastr.error(`User not recognised. Need to create an account?`)
        }
        if (response.status === 400){
            return toastr.error(`Invalid password.`)
        }    

        if (response.status === 200 && data.email === email){
    
            user.set({name: data.name, email: data.email});

            toastr.success(`Login successful, welcome back ${$user.name}`);
            setTimeout(() => {
                navigate("/", { replace: true });
            }, 2000)
        }

        email = "";
        password = "";
    };

    async function sendResetEmail(){
        
        const resetUrl = $BASE_URL + "/user/recovery?email=" + recovery;
        console.log(resetUrl)
        const response = await fetch(resetUrl, {
            method: "GET",
        });

        if (response.status === 200){
            return toastr.success("Email sent")
        }
        else {
            return toastr.error("Invalid email");
        }
    };


</script>

<slot></slot>

<h1>LOGIN</h1>

<form on:submit|preventDefault="{handleLogin}">
    <input type="email" name="email" placeholder="email" bind:value={email} required/>
    <input type="password" name="password" placeholder="password" bind:value={password} required/>

    <button type="submit">Login</button>
</form>

<form on:submit|preventDefault="{sendResetEmail}">
    <input type="email" name="recovery_email" placeholder="recovery email" bind:value={recovery} required />
<button type="submit">I Forgot my password</button>
</form>