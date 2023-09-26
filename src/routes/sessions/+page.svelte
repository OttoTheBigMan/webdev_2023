<script lang="ts">
    import { enhance } from '$app/forms';
    import type { PageData } from './$types';

    
    export let data: PageData;
    export let form;

    $: sessions = data._sessions;
</script>

<main class="bg">
    <div class="session-list section">
        <h1>Existing Sessions</h1>
        
        <div class="list">
            {#each sessions as [session, messages]}
                <div class="session-element">
                    <a href="/sessions/{session}">Join</a>
                    <div>
                        <p>{session}</p>
                        <p>{messages.length} Messages</p>
                    </div>
                </div>
            {/each}
        </div>
    </div>
    
    
    <div class="create-session section">
        <h1>New Session:</h1>
        <form action="?/create" method="post" use:enhance>
            <input type="text" name="sessionName">
            <button>Create Session</button>
            {#if form?.sessionName}
                <span>{form.sessionName}</span>
            {/if}
        </form>
    </div>

    <div class="account-display section">

    </div>
</main>

<style>
    :global(body){
        margin: 0;
        padding: 0;
    }
    .bg {
        background-color: rgb(51, 59, 63);
        height: 100vh;
        width: 100vw;
        overflow: hidden;
        margin: 0;

        display: grid;
        gap: 10px;
        grid-template-columns: 25vw auto;
        grid-template-rows: 60vh auto;

        color: white;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    }
    .section {
        background-color: rgb(29, 34, 40);
    }
    .create-session {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }
    form button {
        transition: 0.1s;
        border-radius: 5px;
        background-color: rgb(235, 163, 28);
        border: none;
        padding: 10px;
        font-size: large;
    }
    form button:hover {
        background-color: rgb(189, 128, 15);
    }
    form {
        flex-direction: column;
        display: flex;
        align-items: center;
        justify-content: space-around;

        gap: 25px;
    }
    .session-list {
        grid-row-start: span 2;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .list {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;

        border-radius: 10px;
        border: 2px solid white;

        width: 80%;
        height: 100%;

        margin-bottom: 20px;

        box-sizing: border-box;
        padding-top: 10px;
    }
    .session-element {
        border-radius: 10px;
        background-color: rgb(51, 59, 63);
        width: 80%;
        height: 10vh;
        display: flex;
        align-items: center;
    }
    .session-element div {
        display: flex;
        flex-direction: column;
        align-items: right;
        justify-content: center;

        width: 100%;
        height: 50%;

        text-align: center;
    }
    .session-element a {
        /* basically make it button */
        transition: 0.1s;
        height: 50%;
        aspect-ratio: 2 / 1;
        background-color: rgb(235, 163, 28);

        display: flex;
        align-items: center;
        justify-content: center;

        margin-left: 5px;
        border-radius: 5px;

        text-decoration: none;
        color: black;
        font-size: large;

    }
    .session-element a:hover {
        background-color: rgb(189, 128, 15);
    }

    p {
        margin: 0;
        font-size: large;
    }
</style>