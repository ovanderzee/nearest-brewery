<template>
  <section class="bubble-box">
    <BubbleStick
      v-for="stick in sticks"
      :style="stick"
      :endBubble="endBubble"
      :key="stick"
    />
  </section>
</template>

<script>
import BubbleStick from "./BubbleStick.vue";

export default {
  name: "BubbleBox",
  components: {
    BubbleStick,
  },

  data() {
    return {
      interval: 250,
      sticks: [],
    };
  },

  methods: {
    /**
     * Add new bubble periodically
     */
    startBubbling() {
      this.bubbling = setInterval(() => {
        if (document.visibilityState !== "visible") return;
        const randomPercentage = (100 * Math.random()).toFixed(3);
        const newStick = {
          left: `${randomPercentage}%`,
        };
        this.sticks = this.sticks.concat([newStick]);
      }, this.interval);
    },
    /**
     * Remove disappeared bubble
     */
    endBubble() {
      this.sticks = this.sticks.slice(1);
    },
  },
  created() {
    this.startBubbling();
  },
  beforeUnmount() {
    clearInterval(this.bubbling);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bubble-box {
  --bubble-size: 5em;
  --bubble-end-scale: 0.75;
}
.bubble-box {
  position: relative;
  z-index: -1;
  border: none !important;
}
</style>
