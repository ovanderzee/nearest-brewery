<template>
  <div class="bubble-path" v-on:animationend="onOffscreen">
    <div class="bubble" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "BubbleStick",
  methods: {
    /**
     * Handle a bubble disappearing
     */
    onOffscreen() {
      this.endBubble && this.endBubble();
    },
  },
  props: {
    endBubble: Function,
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bubble-path {
  position: absolute;
  top: 0;
  width: 0;
  height: 90vh;
}
.bubble {
  position: absolute;
  left: calc(var(--bubble-size) / 2);
  margin-top: calc(0em - var(--bubble-size));
  width: var(--bubble-size);
  height: var(--bubble-size);
  border-radius: 50%;
  box-shadow: inset -0.5em -0.25em 0.5em 0 var(--darkish-beer),
    inset 0 1.25em 0.5em 0 var(--whitish-beer);
  background: var(--opaque-strong-beer);

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
    transform: scale(var(--bubble-end-scale));
  }
}
</style>
