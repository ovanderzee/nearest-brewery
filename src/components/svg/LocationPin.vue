<template>
  <svg
    version="1.1"
    class="location-pin"
    x="0px"
    y="0px"
    width="960px"
    height="1630px"
    viewBox="0 0 960 1630"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    xml:space="preserve"
  >
    <circle class="pin-bowl" cx="480" cy="480" r="450" />
    <path
      class="pin-point"
      d="M65.363,655.16C139.889,824.601,479,1293,480,1600c1-307,340.111-775.399,414.637-944.84"
    />
    <circle class="pin-dot" cx="480" cy="480" r="150" />
  </svg>
</template>

<script>
export default {
  name: "LocationPin",
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.pin-bowl,
.pin-point {
  fill: #0099ff;
  stroke: #000;
  stroke-width: 37;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-miterlimit: 10;
}
.pin-dot {
  fill: #000;
}
</style>
