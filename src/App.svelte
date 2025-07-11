<script lang="ts">
  import Router from "svelte-spa-router";
  import Main from "./lib/Main.svelte";
  import mouseEnter from "./assets/global/hover.wav";
  import mouseClick from "./assets/global/click.mp3";

  const routes = {
    "/": Main,
  };

  import "./app.scss";
  import { onMount } from "svelte";

  onMount(() => {
    setTimeout(() => {
      const btns = document.querySelectorAll("button");
      const selects = document.querySelectorAll("select");
      const inputs = document.querySelectorAll("input");

      btns.forEach((btn) => {
        btn.addEventListener("mouseenter", () => {
          const hoverAudio = new Audio(mouseEnter);
          hoverAudio.volume = 0.75;
          hoverAudio.play();
        });

        btn.addEventListener("click", () => {
          const clickAudio = new Audio(mouseClick);
          clickAudio.volume = 0.75;
          clickAudio.currentTime = 0.2;
          clickAudio.play();
        });
      });

      selects.forEach((select) =>
        select.addEventListener("mouseenter", () => {
          const hoverAudio = new Audio(mouseEnter);
          hoverAudio.volume = 0.75;
          hoverAudio.play();
        })
      );

      inputs.forEach((input) => {
        input.addEventListener("mouseenter", () => {
          const hoverAudio = new Audio(mouseEnter);
          hoverAudio.volume = 0.75;
          hoverAudio.play();
        });

        input.addEventListener("click", () => {
          const clickAudio = new Audio(mouseClick);
          clickAudio.volume = 0.75;
          clickAudio.currentTime = 0.2;
          clickAudio.play();
        });
      });
    }, 200);
  });
</script>

<main>
  <Router {routes} />
</main>
