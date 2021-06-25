import { defineComponent } from "vue";
import { TBrewery } from "../../types";

/* brewery data
  { breweries: [
    {
      "address" : "Gedempte Voldersgracht 2",
      "city" : "Haarlem",
      "name" : "Jopen",
      "open" : [ "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday" ],
      "zipcode" : "2011 WB"
    }, {
      "address" : "Guido Gezellelaan 49",
      "city" : "Mechelen, België",
      "name" : "Brouwerij Het Anker",
      "open" : [ "Tuesday", "Wednesday", "Thursday", "Friday" ],
      "zipcode" : "2800"
    }]
  ]}
*/

const breweriesMixin = defineComponent({
  methods: {
    /**
     * Retrieve and normalise Brewery data
     * @return {Array} breweries
     */
    async fetchBreweries() {
      try {
        const response = await fetch(`//${location.host}/brouwerijen.ts`);
        const data = await response.json();
        const breweries = data.breweries.map((item: any) => {
          const postcode = item.zipcode.trim().replace(/\s/, "");
          return {
            id: `${item.address.replace(/\s/, "_")}__${postcode}`,
            name: item.name,
            address: item.address,
            city: item.city,
            days: item.open,
            postcode: postcode,
          } as TBrewery;
        }) as TBrewery[];
        return breweries;
      } catch (err) {
        const errorBrewery = {
          id: "error_key",
          name: "",
          address: "",
          city: "",
          days: [],
          postcode: "",
          error: err.error ? err.error.toString() : err.toString(),
        } as TBrewery;
        return [errorBrewery];
      }
    },
  },
});

export default breweriesMixin;
