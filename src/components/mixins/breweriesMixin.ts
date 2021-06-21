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
     * Normalise Brewery data
     * @param {Function} setBreweries
     */
    fetchBreweries(setBreweries: (arg: TBrewery[]) => void) {
      fetch(`//${location.host}/brouwerijen.ts`)
        .then((response) => response.json())
        .then((data) => {
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
          setBreweries(breweries);
        })
        .catch((err) => {
          const errorBrewerys = [
            {
              id: "error_key",
              name: "",
              address: "",
              city: "",
              days: [],
              postcode: "",
              error: err.error ? err.error.toString() : err.toString(),
            } as TBrewery,
          ] as TBrewery[];
          setBreweries(errorBrewerys);
        });
    },
  },
});

export default breweriesMixin;
