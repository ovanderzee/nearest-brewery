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
          oninput=""
        />
      </label>
    </form>
    <ul>
      <FoundBrewery
        v-for="brewery in breweries"
        :brewery="brewery"
        :key="brewery.address.replace(' ', '_')"
      />
    </ul>
  </section>
</template>

<script>
import FoundBrewery from "./FoundBrewery.vue";
// import breweriesMixin from "./mixins/breweriesMixin";

export default {
  name: "SearchBrewery",
  // mixins: [breweriesMixin],
  components: {
    FoundBrewery,
  },
  data() {
    return {
      postcode: "",
      breweries: [{ error: "Not yet fetched data." }],
    };
  },
  methods: {
    fetchBreweries() {
      const fetchOberonBreweries = async () => {
 

    try {
      //     [{
      //       "address" : "Guido Gezellelaan 49",
      //       "city" : "Mechelen, België",
      //       "name" : "Brouwerij Het Anker",
      //       "open" : [ "Tuesday", "Wednesday", "Thursday", "Friday" ],
      //       "zipcode" : "2800"
      //     }]

		  const response = await fetch(`//${location.host}/brouwerijen.js`);
      console.log('response', response)
      const oberonData = await response.json();
      console.log('oberonData', oberonData)
      this.breweries = oberonData.breweries.map((item) => {
        return {
          name: item.name,
          address: item.address,
          city: item.city,
          days: item.open,
          postcode: item.zipcode,
        };
      });
      console.log('this.breweries', this.breweries)
    } catch (err) {
      console.log(err);
      this.breweries = [{ error: err.error.toString() || err.toString() }];
    }




      }
      fetchOberonBreweries()
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
