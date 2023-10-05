<script lang="ts">
    import { onDestroy } from 'svelte';
    import { browser } from "$app/environment";
    export let data;
    const userData = JSON.parse(data.user)

    if(browser) {
        let interval = setInterval(async () => {
            let result = await fetch("/");
            let json = await result.json();
            data._totalVisits = json.totalVisits;
        }, 1000);

        onDestroy(() => {
            clearInterval(interval);
        });
    }
</script>

<body>
    <div>
        <h1>Welcome {data.username}</h1>
        <form action="/login?/logout" method="post">
            <button class="btn">Log Out</button>
        </form>
    </div>
    <div>
        <h3>Unique Visitors: {data.totalVisitors}</h3>
        <h3>User ID: {userData.id}</h3>
        <h3>User Visits: {userData.visits}</h3>
        <h3>Total Visits: {data._totalVisits}</h3>
    </div>
    <a style="color: black" href="/sessions">Sessions</a>
    
</body>



<style>
    
</style>