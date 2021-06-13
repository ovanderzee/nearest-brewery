<script>
/* oberon data
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
    fetchBreweries() {
      fetch(`//${location.host}/brouwerijen.js`)
        .then((response) => response.json())
        .then((data) => {
          this.breweries = data.breweries.map((item) => {
            return {
              name: item.name,
              address: item.address,
              city: item.city,
              days: item.open,
              postcode: item.zipcode.trim().length > 4 ? item.zipcode : "",
            };
          });
        })
        .catch((err) => {
          this.breweries = [
            { error: err.error ? err.error.toString() : err.toString() },
          ];
        });
    },
  },
};

export default breweriesMixin;
</script>
