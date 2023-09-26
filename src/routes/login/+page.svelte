<script lang="ts">

    import { enhance } from "$app/forms";
    import type { ActionData } from "./$types.js";

    export let form: ActionData;
    export let data;
</script>


<!-- Enhance enhancear formuläret -->
<body>
    <div class="login-div">
        <form method="post" action="?/login" use:enhance>
            <label for="username">Name: <input type="text" name="username"></label>
            <label for="password">Password: <input type="password" name="password"></label>
            
            <button class="btn">Log In</button>
            {#if form?.userName}
                <span style="color: red;">{form.userName}</span>
            {/if}
        </form>
    </div>
</body>

<style>
    :global(body){
        padding: 0;
        margin: 0;
    }
    body{
        overflow:hidden;
        width: 100%;
        height: 100vh;
        padding: 0;
        margin: 0;

        font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 15px;

        background: linear-gradient(to top, rgb(77, 46, 77), rgb(38, 38, 64));

    }
    .login-div {
        background: linear-gradient(45deg, rgb(51, 43, 57), rgb(42, 28, 42));
        
        padding: 20px;
        aspect-ratio: 1;
        border-radius: 15px;
        box-shadow: 5px 5px black;
    }
    .btn {
        font-family: inherit;
        font-size: medium;
        transition: 0.1s;
        border-radius: 50em;
        border: none;


        width: 100px;
        height: 35px;

        background-color: rgb(39, 44, 49);
        color: white;
    }
    .btn:hover {
        background-color: rgb(33, 37, 42);
    }
    form {
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;
    }
    input {
        border-radius: 5px;
        border: 1px solid black;
    }
</style>