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

<script lang="ts">
import { defineComponent, onBeforeUnmount, ref } from "vue";
import { TInlineCss } from "../types";
import BubbleStick from "./BubbleStick.vue";

export default defineComponent({
  components: {
    BubbleStick,
  },

  setup() {
    const interval = 250;
    const sticks = ref([] as TInlineCss[]);

    /**
     * Add new bubble periodically
     */
    const bubbling = setInterval(() => {
      if (document.visibilityState !== "visible") return;
      const randomPercentage = (100 * Math.random()).toFixed(3);
      const newStick = {
        left: `${randomPercentage}%`,
      };
      sticks.value = sticks.value.concat([newStick]);
    }, interval);

    /**
     * Remove disappeared bubble
     */
    const endBubble = () => {
      sticks.value = sticks.value.slice(1);
    };

    onBeforeUnmount(() => {
      clearInterval(bubbling);
    });

    return { bubbling, sticks, endBubble };
  },
});
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
