<script lang="ts">
    import { browser } from '$app/environment';
    import { enhance } from '$app/forms';
    import { onDestroy } from 'svelte';
    import type { ActionData, PageData } from './$types';
    import { invalidateAll } from '$app/navigation';
    import '@fontsource/ubuntu';
    
    export let form: ActionData;
    export let data: PageData;

    if(browser) {
        let interval = setInterval(invalidateAll, 500);

        onDestroy(() => {
            clearInterval(interval);
        });
    }
</script>

<main>
    <h1>welcome to session: {data.session}</h1>
    
    
    
    
    <div class="chat">      
        <div class="messages">
            {#each data.messages as message}
                <div class="message-bubble" id="{message.user == data.username ? "my-message" : "other-persons-message"}">
                    <span>{message.text}</span>
                </div>
            {/each}
        </div>
        <form action="?/message" method="post" use:enhance>
            <input type="text" name="message">
            <button><img src="https://cdn-icons-png.flaticon.com/512/2343/2343605.png" alt="bollar"></button>
            
        </form>
        {#if form?.msg} 
            <span style="color: red">{form.msg}</span>
        {:else}
            <span style="opacity: 0; user-select: none">Hello :)</span>
        {/if}
    </div>
</main>

<style>
    :global(body){
        overflow: hidden;
        margin: 0;
        padding: 0;

        font-family: "Ubuntu", sans-serif;
    }
    main {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;

        height: 100vh;
        width: 100vw;

        background-color: aliceblue;    
    }             
    ::-webkit-scrollbar {
        background-color: rgb(52, 47, 53);
        border-radius: 7.5px;
        width: 15px;
    }                                                        
    ::-webkit-scrollbar-button{
        display: none;
    }                 
    ::-webkit-scrollbar-thumb{
        border-radius: 7.5px;
        width: 15px;
        background-color: rgb(86, 85, 87);

    }                                                                     
    .messages {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-end;
        
        width: 100%;
        margin: 15px;
        gap: 10px;
        /* max-height: 90%; */
        overflow-y: auto;

        flex-grow: 1;

        box-sizing: border-box;
    }
    .message-bubble {
        border-radius: 10px;
        padding: 10px;
    }
    #my-message {
        background-color: green;
        border-bottom-right-radius: 2px;
        align-self: flex-end;
    }
    #other-persons-message {
        background-color: gray;
        border-bottom-left-radius: 2px;
        align-self: flex-start;
    }
    .chat{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 50px;
        border-radius: 15px;
        width: 35vw;
        height: 90vh;
        background-color: rgb(51, 59, 63);

        box-sizing: border-box;
        padding: 10px;
    }
    form {
        display: flex;
        align-items: center;

        height: 50px;
    }
    form input {
        width: 25vw;
        height: 35px;
        border-radius: 10px;
        border: 2px solid black;
    }
    form button {
        height: 50px;
        width: 50px;
        border-radius: 10px;
    }
    button img {
        width: 100%;
        height: 100%;
        user-select: none;
    }
</style>