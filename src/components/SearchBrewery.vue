<template>
  <section class="search-brewery">
    <form>
      <label>
        lokale postcode<br />
        <input
          type="text"
          :value="postcode"
          placeholder="postcode"
          size="8"
          v-on:input="trackJourneys"
        />
      </label>
    </form>
    <ul>
      <FoundBrewery
        v-for="journey in journeys"
        :brewery="breweries.filter((brw) => brw.id === journey.id)[0]"
        :journey="journey"
        :key="journey.id"
      />
    </ul>
  </section>
</template>

<script>
import FoundBrewery from "./FoundBrewery.vue";
import breweriesMixin from "./mixins/breweriesMixin";
import journeyMixin from "./mixins/journeyMixin";

export default {
  name: "SearchBrewery",
  mixins: [breweriesMixin, journeyMixin],

  components: {
    FoundBrewery,
  },
  data() {
    return {
      postcode: "",
      breweries: [],
      journeys: [],
      results: 5,
    };
  },
  methods: {
    trackJourneys(event) {
      event.stopPropagation();
      const givenPostcode = this.normalisePostcode(event.target.value);
      if (!givenPostcode) return;
      this.journeys = [];

      this.breweries.forEach((brewery) =>
        this.fetchJourney(givenPostcode, brewery)
      );
      this.postcode = givenPostcode;
    },
  },
  created() {
    this.fetchBreweries();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
form {
  text-align: center;
}
form label {
  text-align: center;
}
input {
  font-size: 1.5em;
  font-family: inherit;
  font-weight: 700;
  text-align: inherit;
  background: hsl(223, 100%, 50%);
  border: 0 none;
  border-radius: 1em;
  box-shadow: inset -0.25em -0.125em 0.25em 0 hsl(223, 67%, 50%),
    inset 0.25em 0.125em 0.25em 0 hsl(223, 67%, 100%);
  color: white;
  padding: 0.25em;
}
input:focus {
  outline: none;
  transform: scale(1.5);
  transform-origin: bottom;
}
ul {
  margin: 2em 0;
  padding: 0;
}

@media only screen and (orientation: landscape) {
  .search-brewery {
    display: flex;
  }
  form {
    flex: 0 0 16em;
    text-align: left;
  }
  label {
    display: inline-block;
  }
  ul {
    flex: 1 0 16em;
    margin-top: 0;
  }
}
</style>
