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

const breweriesMixin = {
  methods: {
    /**
     * Normalise Brewery data
     * @this the calling component
     * @borrows this.breweries
     * @borrows this.journeys
     */
    fetchBreweries() {
      this.journeys = [];

      fetch(`//${location.host}/brouwerijen.js`)
        .then((response) => response.json())
        .then((data) => {
          this.breweries = data.breweries.map((item) => {
            const postcode = item.zipcode.trim().replace(/\s/, "");
            return {
              id: `${item.address.replace(/\s/, "_")}__${postcode}`,
              name: item.name,
              address: item.address,
              city: item.city,
              days: item.open,
              postcode: postcode,
            };
          });
        })
        .then(() => this.noJourneys())
        .catch((err) => {
          this.breweries = [
            {
              id: "error_key",
              error: err.error ? err.error.toString() : err.toString(),
            },
          ];
        });
    },
  },
};

export default breweriesMixin;
