<script lang="ts">
    import { onDestroy, onMount } from 'svelte';
    import { browser } from "$app/environment";
    export let data;
    const userData = JSON.parse(data.user)

    let textBoxRef: HTMLDivElement;
    let dvdBorderRef: HTMLDivElement;

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

    const speed = 150;
    let xSpeed = 0, ySpeed = 0;
    let screenX = 0, screenY = 0; //Screen x och y betyder dvdBorder x och y egentligen
    let screenPosX = 0, screenPosY = 0;  //samma sak här
    let divW = 0, divH = 0, xPos : number, yPos : number;
    let prevSec = 0;
    function DoFrame(time:number){
        let sec = time / 1000;

        const deltaTime = sec - prevSec;
        xPos += xSpeed * deltaTime;
        yPos += ySpeed * deltaTime;

        if(xPos <= screenPosX){
            xPos = screenPosX;
            xSpeed *= -1;
        }
        else if (xPos + divW >= screenPosX + screenX){
            xPos = screenX - divW + screenPosX;
            xSpeed *= -1;
        }
        else if (yPos <= screenPosY){
            yPos = screenPosY;
            ySpeed *= -1;
        }
        else if(yPos + divH >= screenPosY + screenY){
            yPos = screenY - divH + screenPosY;
            ySpeed *= -1;
        }

        prevSec = sec;
        window.requestAnimationFrame(DoFrame)
    }
    function GetStartAngle(){
        const angle = Math.random() * Math.PI / 2 - Math.PI / 2;
        xPos = screenPosX;
        yPos = screenPosY;
        xSpeed = Math.cos(angle) * speed;
        ySpeed = Math.sin(angle) * speed;
    }
    onMount(() => {
        GetDivSize();
        GetScreenSize();
        window.addEventListener("resize", GetScreenSize)
        window.requestAnimationFrame(DoFrame)
    })
    function GetScreenSize() {
        let rect = dvdBorderRef.getBoundingClientRect()
        screenPosX = rect.left;
        screenPosY = rect.top;
        screenX = dvdBorderRef.clientWidth;
        screenY = dvdBorderRef.clientHeight;
        GetDivSize()
        GetStartAngle();
    }
    function GetDivSize(){
        divH = textBoxRef.clientHeight;
        divW = textBoxRef.clientWidth;
    }
</script>

<body>
    <div class="welcome">
        <h1>Welcome {data.username}</h1>
        <form action="/login?/logout" method="post">
            <button class="btn">Log Out</button>
        </form>
    </div>
    <div class="dvd-border" bind:this={dvdBorderRef}>
        <div class="text-box" bind:this={textBoxRef} style="top: {yPos}px; left: {xPos}px;">
            <h3>Unique Visitors: {data.totalVisitors}</h3>
            <h3>User ID: {userData.id}</h3>
            <h3>User Visits: {userData.visits}</h3>
            <h3>Total Visits: {data._totalVisits}</h3>
        </div>
    </div>
    <a style="color: black" href="/sessions">Sessions</a>
    
</body>



<style>
    :global(body){
        padding: 0;
        margin: 0;
    }
    body{
        overflow-x: hidden;
        width: 100%;
        height: 200vh;
        padding: 0;
        margin: 0;

        font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;

        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 15px;

        background: linear-gradient(to top, rgb(77, 46, 77), rgb(38, 38, 64));

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
    .welcome {
        background: linear-gradient(45deg, rgb(51, 43, 57), rgb(42, 28, 42));
        border-radius: 10px;
        box-shadow: 7px 7px rgba(0,0,0,1);


        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        padding: 15px;
        padding-top: 0;
        margin-top: 15px;
        width: 60%;
    }
    .dvd-border {
        background: linear-gradient(135deg, rgb(51, 43, 57), rgb(42, 28, 42));
        border-radius: 10px;
        width: 80%;
        height: 80vh;
        box-shadow: 7px 7px rgba(0,0,0,1);

    }
    .text-box {
        background-color: cornflowerblue;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-radius: 10px;
        width: 25%;
        aspect-ratio: 1;

        position: absolute;

        box-shadow: 7px 7px rgba(0,0,0,0.5);
    }
    .text-box h3 {
        user-select: none;
    }
</style>