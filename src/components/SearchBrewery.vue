<template>
  <section class="search-brewery">
    <form v-on:submit="noSubmit">
      <label>
        local postcode<br />
        <input
          type="text"
          :value="postcode"
          placeholder="postcode"
          v-on:input="trackJourneys"
        />
      </label>
      <div class="label" v-if="postcode">
        <button type="button" v-on:click="onReset">reset</button>
      </div>
    </form>
    <ul>
      <FoundBrewery
        v-if="!journeySelection.length"
        :brewery="{
          id: '',
          name: 'No breweries found',
          address: `within ${findDistance} km and opened today`,
          days: [],
        }"
        :journey="{ id: '' }"
      />
      <FoundBrewery
        v-for="journey in journeySelection"
        :brewery="breweries.filter((brw) => brw.id === journey.id)[0]"
        :journey="journey"
        :key="journey.id"
      />
    </ul>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { TBrewery, TJourney } from "../types";
import FoundBrewery from "./FoundBrewery.vue";
import breweriesMixin from "./mixins/breweriesMixin";
import journeyMixin from "./mixins/journeyMixin";

export default defineComponent({
  name: "SearchBrewery",
  mixins: [breweriesMixin, journeyMixin],

  components: {
    FoundBrewery,
  },
  data() {
    return {
      postcode: "" as string,
      breweries: [] as TBrewery[],
      journeys: [] as TJourney[],
      findDistance: 30 as number,
    };
  },
  methods: {
    /**
     * Reset form to show all breweries
     * @this the calling component
     * @borrows this.journeys (implicit)
     * @borrows this.breweries (implicit)
     * @borrows this.postcode
     */
    onReset() {
      this.noJourneys(this.breweries, this.setJourneys);
      this.postcode = "";
    },
    /**
     * Prevent a page reload
     * @param event
     */
    noSubmit(event: any) {
      event.preventDefault();
    },
    /**
     * Set this.breweries
     * @param {Array} breweries
     */
    setBreweries(breweries: TBrewery[]) {
      this.breweries = breweries;
      this.noJourneys(breweries, this.setJourneys);
    },
    /**
     * Set this.journeys thru replacement
     * @param {Array} journeys
     */
    setJourneys(journeys: TJourney[]) {
      this.journeys = journeys;
    },
    /**
     * Set this.journeys thru addition
     * @param {Object} journey
     */
    setExtraJourney(journey: TJourney) {
      this.journeys = [...this.journeys, journey];
    },
    /**
     * Engage the search
     * @borrows this.journeys
     * @borrows this.breweries
     * @borrows this.postcode
     */
    trackJourneys(event: any) {
      event.stopPropagation();
      if (this.postcode && !event.target.value) {
        this.noJourneys(this.breweries, this.setJourneys);
        this.postcode = "";
      }
      const postcodeString = this.normalisePostcode(event.target.value);
      if (!postcodeString) return;
      this.journeys = [];

      this.breweries.forEach((brewery) =>
        this.fetchJourney(postcodeString, brewery, this.setExtraJourney)
      );
      this.postcode = postcodeString;
    },
  },
  created() {
    this.fetchBreweries(this.setBreweries);
  },
  computed: {
    journeySelection() {
      const filtered: TJourney[] = this.journeys
        .filter((jrn: TJourney) =>
          isFinite(jrn.distance) ? jrn.distance < this.findDistance : true
        )
        .filter((jrn: TJourney) =>
          jrn.openToday !== undefined ? jrn.openToday : true
        )
        .sort(
          (a: TJourney, b: TJourney) => (a.distance - b.distance) as number
        );
      return filtered;
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
form {
  text-align: center;
}
form .label,
form label {
  text-align: center;
  display: block;
}
button,
input {
  font-size: 1.5em;
  font-family: inherit;
  font-weight: 700;
  text-align: inherit;
  /* #0099ff */
  background: hsl(204, 100%, 50%);
  border: 0 none;
  border-radius: 1em;
  box-shadow: inset -0.25em -0.125em 0.25em 0 hsl(204, 100%, 25%),
    inset 0.25em 0.125em 0.25em 0 hsl(204, 67%, 100%);
  color: white;
  padding: 0.25em 1em;
  width: 4.333em;
}
button {
  font-size: 1em;
  padding: 0.25em 1em;
  margin: 0.5em 2em;
}
input::placeholder {
  color: white;
  opacity: 0.667;
}
button:focus,
button:hover,
input:focus,
input:hover {
  outline: none;
  box-shadow: inset -0.25em -0.125em 0.25em 0 hsl(204, 67%, 100%),
    inset 0.25em 0.125em 0.25em 0 hsl(204, 100%, 25%);
}
input:hover::placeholder,
input:focus::placeholder {
  opacity: 0.333;
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
    flex: 0 0 10em;
    margin: 0 4em 0 0;
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
