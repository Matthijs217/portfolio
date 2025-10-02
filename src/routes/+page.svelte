

<video src="newyork4_smooth.mp4" playsinline="true" webkit-playsinline="true" preload="auto" muted="muted" class="video-background"></video>
<h1 class="name">Matthijs</h1>
<div id="container">
    <main>
        <div class="title">
            <h2>About me</h2>
        </div>
        <div class="content">
            <h3>AD Frontend Design & Development</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

            <h3>America</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

            <h3>Hobbys</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
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
<style>
    @font-face {
        font-family: 'Gotham';
        src: url('/fonts/GothamBold.otf') format('opentype');
        font-weight: bold;
        font-style: normal;
        font-display: swap;
    }  
    #container {
        height: 500vh;
    }
    main {
        height:70vh;
        width: 100%;
        display: grid;
        grid-template-columns: 2fr 1fr;
        grid-template-rows: 1fr 2fr;
        grid-template-areas:
            "title title"
            "nav nav"
            "content content"
        ;
    }
    .video-background {
        position: fixed;
        top: 50%;
        left: 50%;
        min-width: 100%;
        min-height: 100%;
        transform: translate(-50%, -50%);
        z-index: -1;
    }
    .name {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -70%);
        color: #F6FF00;
        font-size: 4rem;
        font-family: 'Gotham', 'Arial', sans-serif;
        z-index: 10;
        
        /* CSS scroll-driven animation */
        animation: fadeOutOnScroll linear forwards;
        animation-timeline: scroll(root);
        animation-range: 200px 600px;
    }
    @keyframes fadeOutOnScroll {
        0% {
            opacity: 1;
            transform: translate(-50%, -70%);
        }
        100% {
            opacity: 0;
            transform: translate(-50%, -150%);
        }
    }
    .title {
        grid-area: title;
        display: flex;
        justify-content: left;
        align-items: center;
        padding-left: 1rem;
        h2 {
            margin: 0;
            font-family: 'Gotham', 'Arial', sans-serif;
            font-size: 3rem;
            color: #F6FF00;
        }
    }
    .content {
        position: relative;
        margin-left: 1rem;
        padding: 1em;
        width: 80vw;
        color: rgb(0, 0, 0);
        font-family: 'Gotham', 'Arial', sans-serif;
        background-color: rgb(255, 255, 255);
        grid-area: content;
    }
    nav {
        grid-area: nav;
        display: flex;
        flex-direction: column;
        padding-left: 1rem;
        ul {
            list-style: none;
            padding: 0;
            margin: 0;
            display: flex;
            flex-direction: column;
            gap: 1rem;
            li {
                a {
                    text-decoration: none;
                    color: #F6FF00;
                    font-family: 'Gotham', 'Arial', sans-serif;
                    font-size: 1.5rem;
                    &:hover {
                        text-decoration: underline;
                    }
                }
            }
        }
    }
    
</style>
<script>
    import { onMount } from 'svelte';
    import { gsap } from 'gsap';
    import { ScrollTrigger } from 'gsap/ScrollTrigger';
        
    onMount(() => {
        console.clear();

        const video = document.querySelector(".video-background");
        let src = video.currentSrc || video.src;
        console.log(video, src);

        function once(el, event, fn, opts) {
            var onceFn = function (e) {
                el.removeEventListener(event, onceFn);
                fn.apply(this, arguments);
            };
            el.addEventListener(event, onceFn, opts);
            return onceFn;
        }

        once(document.documentElement, "touchstart", function (e) {
            video.play();
            video.pause();
        });

        gsap.registerPlugin(ScrollTrigger);

        let tl = gsap.timeline({
            defaults: { duration: 1 },
            scrollTrigger: {
                trigger: "#container",
                start: "top top",
                end: "bottom bottom",
                scrub: true
            }
        });

        once(video, "loadedmetadata", () => {
            tl.fromTo(
                video,
                {
                    currentTime: 0
                },
                {
                    currentTime: video.duration || 1
                }
            );  
        });

        if (window["fetch"]) {
            fetch(src)
                .then((response) => response.blob())
                .then((response) => {
                    var blobURL = URL.createObjectURL(response);

                    var t = video.currentTime;
                    once(document.documentElement, "touchstart", function (e) {
                        video.play();
                        video.pause();
                    });

                    video.setAttribute("src", blobURL);
                    video.currentTime = t + 0.01;
                });
        }
    });
</script>