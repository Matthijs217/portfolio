
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
<style>
    .video-background {
        position: fixed;
        top: 50%;
        left: 50%;
        min-width: 100%;
        min-height: 100%;
        transform: translate(-50%, -50%);
    }

    #container {
        height: 500vh;
    }
</style>
<video src="newyork4_smooth.mp4" playsinline="true" webkit-playsinline="true" preload="auto" muted="muted" class="video-background"></video>

<div id="container"></div>
