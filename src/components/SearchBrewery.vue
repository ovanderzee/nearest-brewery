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
          address: `within ${maxDistance} km and opened today`,
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
import { computed, defineComponent, ref } from "vue";
import { TBrewery, TJourney } from "../types";
import FoundBrewery from "./FoundBrewery.vue";
import { useFetchBreweries } from "./composables/breweriesComposable";
import {
  useNoJourneys,
  useNormalisedPostcode,
  useFetchJourney,
} from "./composables/journeyComposable";

export default defineComponent({
  components: {
    FoundBrewery,
  },

  setup() {
    const postcode = ref("");
    const breweries = ref([] as TBrewery[]);
    const journeys = ref([] as TJourney[]);
    const maxDistance: number = 30;

    const journeySelection = computed(() => {
      const filtered: TJourney[] = journeys.value
        .filter((jrn: TJourney) =>
          isFinite(jrn.distance) ? jrn.distance < maxDistance : true
        )
        .filter((jrn: TJourney) =>
          jrn.openToday !== undefined ? jrn.openToday : true
        )
        .sort(
          (a: TJourney, b: TJourney) => (a.distance - b.distance) as number
        );
      return filtered;
    });

    /**
     * Reset form to show all breweries
     */
    const onReset = () => {
      journeys.value = useNoJourneys(breweries.value);
      postcode.value = "";
    };

    /**
     * Prevent a page reload
     * @param event
     */
    const noSubmit = (event: any) => {
      event.preventDefault();
    };

    /**
     * Engage the search
     */
    const trackJourneys = (event: any) => {
      event.stopPropagation();
      if (postcode.value && !event.target.value) {
        journeys.value = useNoJourneys(breweries.value);
        postcode.value = "";
      }
      const fromPostcode = useNormalisedPostcode(event.target.value);
      if (!fromPostcode) return;
      journeys.value = [];

      breweries.value.forEach(async (brewery) => {
        // use the dutch \d{4}[a-z] or \d{4}\s[a-z] format
        const toPostcode =
          brewery.postcode.length > 4 &&
          useNormalisedPostcode(brewery.postcode);
        if (!toPostcode) return;

        const extraJourney: TJourney = await useFetchJourney(
          fromPostcode,
          toPostcode,
          brewery
        );
        journeys.value.push(extraJourney);
      });
      journeys.value.slice();
      postcode.value = fromPostcode;
    };

    // set initial, unfiltered view
    (async () => {
      breweries.value = await useFetchBreweries();
      journeys.value = useNoJourneys(breweries.value);
    })();

    return {
      postcode,
      breweries,
      journeys,
      maxDistance,
      onReset,
      noSubmit,
      trackJourneys,
      journeySelection,
    };
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
