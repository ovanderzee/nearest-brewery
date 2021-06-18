<template>
  <li>
    <div class="brewery-data">
      <h4>{{ brewery.name || brewery.error }}</h4>
      <div class="opened long">{{ brewery.days.join(", ") }}</div>
      <div class="opened short">
        {{ brewery.days.map((day) => day.substr(0,3)).join(", ") }}
      </div>
      <div class="address">{{ brewery.address }}</div>
      <div class="location">
        <span v-if="brewery.postcode" class="postcode">{{
          brewery.postcode
        }}</span>
        <span class="city">{{ brewery.city }}</span>
      </div>
    </div>
    <div class="journey-data">
      <a
        v-if="journey.gMapURL"
        class="directions"
        :href="journey.gMapURL"
        target="_blank"
      >
        <LocationPin />
      </a>
      <div v-if="isFinite(journey.distance)" class="distance">
        {{ journey.distance }}
      </div>
    </div>
  </li>
</template>

<script>
import LocationPin from "./svg/LocationPin";

export default {
  name: "FoundBrewery",
  components: {
    LocationPin,
  },
  props: {
    brewery: Object,
    journey: Object,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
li {
  display: flex;
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
  width: 150px;
  border-radius: 0.5em;
  background: linear-gradient(
    120deg,
    transparent 60px,
    hsla(25, 25%, 44%, 0.3) 90%
  );
}

.brewery-data {
  flex: 1 1 auto;
}
h4 {
  margin: 0;
}
.opened,
.address,
.location {
  font-size: 0.92em;
  font-style: italic;
  line-height: 1.2;
}
.opened.long {
  display: none;
}
.opened.short {
  display: block;
}
.postcode:after {
  content: ", ";
}
.city {
  font-weight: 700;
}

.journey-data {
  flex: 0 0 5em;
  position: relative;
  z-index: 1;
  padding: 0.5em 0.25em;
  text-align: right;
}
.journey-data:empty {
  flex: 0 1 4px;
}
.journey-data:before,
.journey-data:after {
  content: '';
  position: absolute;
  right: 0;
  width: 105px;
  height: calc(100% - 4px);
  z-index: -1;
}
.journey-data:before {
  background-image: url(../assets/rand-top.png);
  background-position: top right;
  background-repeat: no-repeat;
  top: 0;
}
.journey-data:after {
  background-image: url(../assets/rand-bottom.png);
  background-position: bottom right;
  background-repeat: no-repeat;
  bottom: 0;
}
.journey-data > * {
  display: inline-block;
  margin: 0 0.5em 0 0;
  vertical-align: top;
}
.distance:empty {
  display: none;
}
.distance {
  position: relative;
  height: 3em;
  width: 3em;
  background: red;
  border-radius: 50%;
  color: white;
  font-weight: 900;
  line-height: 2.333em;
  text-align: center;
}
.distance:after {
  content: "km";
  font-size: 80%;
  font-weight: 500;
  line-height: 2em;
  text-align: center;
  text-transform: none;
  position: absolute;
  display: block;
  bottom: 0;
  width: 100%;
}
a.directions {
  width: 2em;
}
a.directions svg {
  height: 3em;
  width: auto;
}

@media only screen and (max-width: 540px) {
  .directions,
  .distance {
    font-size: 80%;
  }
}

@media only screen and (min-width: 541px) {
  .journey-data {
    flex: 0 0 6em;
  }
  .opened.long {
    display: block;
  }
  .opened.short {
    display: none;
  }
}
</style>
