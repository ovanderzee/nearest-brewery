/* postcode-api.nl
   data: {"seconden":"870","reisafstand":"19006"}
   error: { error: "invalid zipcode" }
*/

/**
 * Get the name of the current weekday
 * @return {String} name of current weekday
 */
const findDayName = () => {
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const now = new Date();
  return dayNames[now.getDay()];
};
/**
 * Make a online maplink
 * @param {Object} brewery - one of the compared
 * @return {String} http address
 */
const buildMapLink = (brewery) => {
  const gMapDirection = "https://www.google.com/maps/dir/";
  const mailAddress = `${brewery.address}\n${brewery.postcode} ${brewery.city}`;
  const gMapParams = mailAddress.replace(/\s/g, "+");
  return `${gMapDirection}${gMapParams}`;
};

const journeyMixin = {
  methods: {
    /**
     * Journey list that shows all breweries
     * @this the calling component
     * @borrows this.journeys
     * @borrows this.breweries
     */
    noJourneys() {
      this.journeys = this.breweries.map((brewery) => {
        return {
          id: brewery.id,
        };
      });
    },
    /**
     * Normalise Postcode to do queries or calculations
     * @this the calling component
     * @param {String} rawString - string to find the postcode in.
     */
    normalisePostcode(rawString) {
      const numericWords = rawString.replace(/\D+/g, " ");
      const patternMatch = numericWords.match(/\b\d{4}\b/);
      if (patternMatch) {
        return patternMatch[0];
      }
    },
    /**
     * Gather sortable brewery data
     * Dismiss not-dutch postcodes (length <= 4)
     * @this the calling component
     * @param {String} from - postcode of comparison
     * @param {Object} brewery - one of the compared
     * @borrows this.journeys
     * @borrows this.breweries
     */
    fetchJourney(from, brewery) {
      let to =
        brewery.postcode.length > 4 && this.normalisePostcode(brewery.postcode);
      if (!to) {
        return;
      }

      // fetch something to have some asynchronicity
      fetch(`//${location.host}/brouwerijen.js`)
        .then((response) => response.json())
        .then(() => {
          this.journeys = [
            ...this.journeys,
            {
              id: brewery.id,
              from: from,
              to: to,
              distance: Math.round(Math.pow(Math.abs(+from - +to), 0.6)),
              openToday: brewery.days.includes(findDayName()),
              mapUrl: buildMapLink(brewery),
            },
          ];
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
