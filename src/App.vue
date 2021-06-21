<template>
  <BubbleBox />
  <main>
    <h1>NeighBeerGood</h1>
    <SearchBrewery />
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BubbleBox from "./components/BubbleBox.vue";
import SearchBrewery from "./components/SearchBrewery.vue";

export default defineComponent({
  name: "App",
  components: {
    BubbleBox,
    SearchBrewery,
  },
});
</script>

<style>
:root {
  --whitish-beer: hsl(43, 100%, 90%);
  --opaque-strong-beer: hsl(39, 76%, 62%, 0.67);
  --darkish-beer: hsl(25, 25%, 44%);
}

body {
  margin: 0;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 16px;
  line-height: 1.333em;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: linear-gradient(
    to right,
    hsl(25, 32%, 56%) 0%,
    hsl(40, 55%, 62%) 9%,
    hsl(43, 100%, 75%) 27%,
    hsl(42, 100%, 68%) 45%,
    hsl(39, 76%, 62%) 83%,
    hsl(38, 58%, 57%) 91%,
    hsl(19, 35%, 63%) 100%
  );
  overflow: hidden;
}
main {
  padding: 0 4em;
  overflow: auto;
  height: 100vh;
}
h1 {
  margin: 0;
  padding: 2em 0;
  font-size: 2em;
}
@media only screen and (orientation: landscape) {
  h1 {
    text-align: left;
  }
}
</style>
