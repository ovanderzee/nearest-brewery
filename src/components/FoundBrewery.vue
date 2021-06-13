<template>
  <li>
    <h4>{{ brewery.name || brewery.error }}</h4>
    <div class="distance">{{ brewery.distance }}</div>
    <div class="location">{{ brewery.address }}</div>
    <div class="location">
      <span v-if="brewery.postcode" class="postcode">{{
        brewery.postcode
      }}</span>
      <span class="city">{{ brewery.city }}</span>
    </div>
  </li>
</template>

<script>
export default {
  name: "ListItem",
  props: {
    brewery: Object,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
li {
  position: relative;
  list-style: none;
  margin: 0.75em 0;
  padding: 0.5em 0.75em;
  border-radius: 0.5em;
  background: #fffd;
  box-shadow: 0.125em 0.25em 0.125em 0 hsl(25, 25%, 44%);
  text-transform: capitalize;
}
li:after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 120px;
  border-radius: 0.5em;
  background: linear-gradient(
    120deg,
    transparent 20px,
    hsla(25, 25%, 44%, 0.3) 90%
  );
}
li > *:first-child {
  background-position: top right;
}
li > * {
  background-image: url(../assets/rand.png);
  background-position: center right;
  background-repeat: no-repeat;
}
li > *:last-child {
  background-position: bottom right;
}

h4 {
  margin: 0;
}
.distance:empty {
  display: none;
}
.distance {
  position: absolute;
  top: 0;
  right: 0;
  border: red 10px solid;
}
.postcode:after {
  content: ", ";
}
.city {
  font-weight: 700;
}
</style>
