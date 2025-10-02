<script>
    import { onMount } from "svelte";
    import { gsap } from "gsap";
    import { ScrollTrigger } from "gsap/ScrollTrigger";
    gsap.registerPlugin(ScrollTrigger);

    let canvas;
    let context;
    let images = [];
    let frameCount = 200;
    let currentFrame = (index) =>
        `/imgarray/ezgif-frame-${String(index).padStart(3, "0")}.jpg`;
    let imgSeq = { frame: 0 };

    onMount(() => {
        context = canvas.getContext("2d");

        // preload alle frames
        for (let i = 1; i <= frameCount; i++) {
            const img = new Image();
            img.src = currentFrame(i);
            images.push(img);
        }

        // eerste frame tekenen
        images[0].onload = () =>
            context.drawImage(images[0], 0, 0, canvas.width, canvas.height);

        // GSAP ScrollTrigger
        gsap.to(imgSeq, {
            frame: frameCount - 1,
            snap: "frame",
            ease: "none",
            scrollTrigger: {
                scrub: true,
                pin: true,
                trigger: canvas,
                end: "+=3000", // lengte van scroll bepalen
            },
            onUpdate: () => render(),
        });
    });

    function render() {
        const img = images[imgSeq.frame];
        if (img && context) {
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(img, 0, 0, canvas.width, canvas.height);
        }
    }
</script>

<main>
    {#if typeof window === "undefined"}
        <!-- SSR fallback -->
        <img
            src="/imgarray/ezgif-frame-001.jpg"
            alt="New York"
            style="width:100%; height:auto;"
        />
    {:else}
        <canvas bind:this={canvas} width={1920} height={1080}></canvas>
    {/if}

    <h1 class="name">Matthijs</h1>
    <div id="container">
        <main>
            <div class="title">
                <h2>About me</h2>
            </div>
            <div class="content">
                <h3>AD Frontend Design & Development</h3>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                    enim ad minim veniam, quis nostrud exercitation ullamco laboris
                    nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                    in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                    nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                    sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>

                <h3>America</h3>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                    enim ad minim veniam, quis nostrud exercitation ullamco laboris
                    nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                    in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                    nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                    sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>

                <h3>Hobbys</h3>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                    enim ad minim veniam, quis nostrud exercitation ullamco laboris
                    nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                    in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                    nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                    sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
            </div>
            <nav>
                <ul>
                    <li><a href="#education">Education</a></li>
                    <li><a href="#travel">Travel</a></li>
                    <li><a href="#matthijs">Matthijs</a></li>
                </ul>
            </nav>
        </main>
    </div>
</main>


<style>
    body {
        margin: 0;
        padding: 0;
        height: 100%;
        background: black;
        overflow-x: hidden;
    }
    @font-face {
        font-family: "Gotham";
        src: url("/fonts/GothamBold.otf") format("opentype");
        font-weight: bold;
        font-style: normal;
        font-display: swap;
    }

    canvas {
        position: absolute;
        inset: 0;
        display: block;
        width: 100%;
        height: 100vh;
        object-fit: cover;
        z-index: -1;
    }
</style>
