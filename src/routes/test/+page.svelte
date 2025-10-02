<script>
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  gsap.registerPlugin(ScrollTrigger);

  let canvas;
  let context;
  let images = [];
  let frameCount = 200;
  let currentFrame = index => `/imgarray/ezgif-frame-${String(index).padStart(3, '0')}.jpg`;
  let imgSeq = { frame: 0 };

  onMount(() => {
    context = canvas.getContext('2d');

    // preload alle frames
    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      images.push(img);
    }

    // eerste frame tekenen
    images[0].onload = () => context.drawImage(images[0], 0, 0, canvas.width, canvas.height);

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
      onUpdate: () => render()
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

<style>
  html, body {
    margin: 0;
    padding: 0;
    height: 100%;
    background: black;
    overflow-x: hidden;
  }

  canvas {
    display: block;
    width: 100%;
    height: 100vh;
    object-fit: cover;
  }
</style>

{#if typeof window === 'undefined'}
  <!-- SSR fallback -->
  <img src="/imgarray/ezgif-frame-001.jpg" alt="New York" style="width:100%; height:auto;" />
{:else}
  <canvas bind:this={canvas} width={1920} height={1080}></canvas>
{/if}
