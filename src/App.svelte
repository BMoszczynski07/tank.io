<script lang="ts">
  import Router from "svelte-spa-router";
  import Main from "./lib/Main.svelte";

  const routes = {
    "/": Main,
  };

  import "./app.scss";
</script>

<main>
  <Router {routes} />
</main>
