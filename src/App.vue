<template>
  <BubbleBox />
  <h1>NeighBeerGood</h1>
</template>

<script>
import BubbleBox from "./components/BubbleBox.vue";

export default {
  name: "App",
  components: {
    BubbleBox,
  },
};
</script>

<style>
body {
  margin: 0;
  font-family: Avenir, Helvetica, Arial, sans-serif;
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
#app {
  height: 100vh;
  box-sizing: border-box;
  overflow: auto;
}
h1 {
  position: relative;
  z-index: 10;
  margin: 0;
  padding: 2em;
  text-align: center;
}
@media only screen and (orientation: landscape) {
  h1 {
    text-align: left;
  }
}
</style>
