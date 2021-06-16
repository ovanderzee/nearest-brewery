<script>
/* postcode-api.nl
   data: {"seconden":"870","reisafstand":"19006"}
   error: { error: "invalid zipcode" }
*/

const journeyMixin = {
  methods: {
    /**
     * Normalise Postcode to do queries or calculations
     */
    normalisePostcode(rawString) {
      const patternMatch = rawString.match(/\d\d\d\d/);
      if (patternMatch) {
        return patternMatch[0];
      }
    },
    /**
     * Gather sortable brewery data
     * @this the calling component
     * @borrows this.journeys
     * @borrows this.breweries
     */
    fetchJourney(from, brewery) {
      let to =
        brewery.postcode.length > 4 && this.normalisePostcode(brewery.postcode);
      if (!to) {
        return;
      }

      const now = new Date();
      const dayNames = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      const dayName = dayNames[now.getDay()] //eslint-disable-line

      const gMapDirection = "https://www.google.com/maps/dir/";
      const gMapParams = `${brewery.address},+${brewery.postcode}+${brewery.city}`;

      // fetch something to have some asynchronicity
      fetch(`//${location.host}/brouwerijen.js`)
        .then((response) => {
          return response.json();
        })
        .then(() => {
          this.journeys = [
            ...this.journeys,
            {
              id: brewery.id,
              from: from,
              to: to,
              distance: Math.round(Math.pow(Math.abs(+from - +to), 0.6)),
              openToday: brewery.days.includes(dayName),
              gMapURL: `${gMapDirection}${gMapParams}`,
            },
          ];
          this.journeys.sort((a, b) => {
            return a.distance > b.distance;
          });
          this.journeys = this.journeys.map((jrn) => jrn);
        })
        .catch((err) => {
          this.journeys = [
            ...this.journeys,
            {
              id: brewery.id,
              from: from,
              to: to,
              error: err.error ? err.error.toString() : err.toString(),
            },
          ];
        });
    },
  },
};

export default journeyMixin;
</script>
