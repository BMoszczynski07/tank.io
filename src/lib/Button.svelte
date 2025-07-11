<script lang="ts">
  import btnHover from "../assets/global/btn-hover.wav";

  export let text: string;
  export let className: string;

  const btnMouseEnter = () => {
    const audio = new Audio(btnHover);
    audio.volume = 0.75;
    audio.play();
  };
</script>

<button on:mouseenter={btnMouseEnter} class={className}>
  <slot>{text}</slot>
</button>
