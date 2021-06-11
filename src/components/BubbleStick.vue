<template>
  <div class="bubble-path"><div class="bubble" /></div>
</template>

<script>
export default {
  name: "BubbleStick",
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bubble-path {
  position: absolute;
  width: 0;
  height: 90vh;
}
.bubble {
  position: absolute;
  left: -2.5em;
  margin-top: -1.5em;
  width: 5em;
  height: 5em;
  border-radius: 50%;
  /*20em 	box-shadow: inset -2em -1em 2em 0 hsl(25, 25%, 44%), inset 0 5em 2em 0 hsl(43,100%,100%);*/
  box-shadow: inset -0.5em -0.25em 0.5em 0 hsl(25, 25%, 44%),
    inset 0 1.25em 0.5em 0 hsl(43, 100%, 100%);
  background: hsla(39, 76%, 62%, 0.67);
  animation-name: bubbling;
  animation-timing-function: ease-out;
  animation-duration: 10s;
}

@keyframes bubbling {
  from {
    top: 99%;
    transform: scale(0.1);
  }
  to {
    top: 0%;
    transform: scale(1);
  }
}
</style>
