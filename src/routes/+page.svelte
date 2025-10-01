
<h1 class="name">Matthijs</h1>
<div id="set-height"></div>
<video id="v0" tabindex="0" autobuffer="autobuffer" preload="preload" class="bg-video" muted>
    <source type="video/mp4" src="/newyork4.mov">
        macpro_main_desktop
    </video>
    
    <style>
        @font-face {
            font-family: 'Gotham';
            src: url('/fonts/GothamBold.otf') format('opentype');
            font-weight: 700;
            font-style: normal;
        }
        .name {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -100%);
            color: #F6FF00;
            font-family: "Gotham", Arial, sans-serif;
            font-size: 5rem;
            font-weight: bold;
            z-index: 10;
        }
        #set-height {
            display: block;
        }
        .bg-video {

            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            object-fit: cover;
            z-index: -1;
            /* pointer-events: none; */
        } 
    </style>
    
    <script>
        import { onMount } from 'svelte';
        
        onMount(() => {
            var frameNumber = 0, // start video at frame 0
            // lower numbers = faster playback
            playbackConst = 1000, 
            // get page height from video duration
            setHeight = document.getElementById("set-height"), 
            // select video element         
            vid = document.getElementById('v0'); 
            
            // dynamically set the page height according to video length
            // vid.addEventListener('loadedmetadata', function() {
                console.log("loadedmetadata")
                setHeight.style.height = Math.floor(vid.duration) * playbackConst + "px";
                console.log(vid.duration);
                console.log(setHeight.style.height);
            // });
            
            // Use requestAnimationFrame for smooth playback
            function scrollPlay() {  
                var frameNumber  = window.pageYOffset/playbackConst;
                vid.currentTime  = frameNumber;
                window.requestAnimationFrame(scrollPlay);
            }
            
            window.requestAnimationFrame(scrollPlay);
        });
    </script>