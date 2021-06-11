<template>
  <section class="bubble-box">
    <BubbleStick v-for="stick in sticks" :style="stick" :key="stick" />
  </section>
</template>

<script>
import BubbleStick from "./BubbleStick.vue";

export default {
  name: "BubbleBox",
  components: {
    BubbleStick
  },

  data() {
    return {
      sticks: []
    };
  },

  methods: {
    startBubbling() {
      // until the screen is nearly half filled with bubbles
      const htmlElm = document.documentElement;
      const iteratetionsOnOneLine = htmlElm.clientWidth / 300;
      const bubbleCount = (htmlElm.clientHeight * htmlElm.clientWidth) / 750;

      this.bubbling = setInterval(() => {
        const pixelsDecending = Math.round(
          this.sticks.length / iteratetionsOnOneLine
        );
        const randomPercentage = (100 * Math.random()).toFixed(3);
        const newStick = {
          top: `${pixelsDecending}px`,
          height: `calc(90vh - ${pixelsDecending}px)`,
          left: `${randomPercentage}%`
        };
        this.sticks.push(newStick);
        if (this.sticks.length >= bubbleCount) clearInterval(this.bubbling);
      }, 250);
    }
  },
  created() {
    this.startBubbling();
  },
  beforeUnmount() {
    clearInterval(this.bubbling);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bubble-box {
  position: relative;
  z-index: -1;
}
</style>
