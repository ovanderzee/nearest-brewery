import { defineComponent } from "vue";
import { TBrewery, TJourney } from "../../types";

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
const buildMapLink = (brewery: TBrewery) => {
  const gMapDirection = "https://www.google.com/maps/dir/";
  const mailAddress = `${brewery.address}\n${brewery.postcode} ${brewery.city}`;
  const gMapParams = mailAddress.replace(/\s/g, "+");
  return `${gMapDirection}${gMapParams}`;
};

const journeyMixin = defineComponent({
  methods: {
    /**
     * Journey list that shows all breweries
     * @param {Array} breweries
     * @return {Array} journeys
     */
    noJourneys(breweries: TBrewery[]) {
      const journeys = breweries.map((brewery) => {
        return {
          id: brewery.id,
          distance: Infinity,
        };
      }) as TJourney[];
      return journeys;
    },
    /**
     * Normalise Postcode to do queries or calculations
     * @param {String} rawString - string to find the postcode in.
     */
    normalisePostcode(rawString: string) {
      const numericWords = rawString.replace(/\D+/g, " ");
      const patternMatch = numericWords.match(/\b\d{4}\b/);
      if (patternMatch) {
        return patternMatch[0];
      }
    },
    /**
     * Gather sortable brewery data
     * Dismiss not-dutch postcodes (length <= 4)
     * @param {String} from - postcode of comparison
     * @param {Object} brewery - one of the compared
     */
    async fetchJourney(from: string, to: string, brewery: TBrewery) {
      try {
        const response = await fetch(`//${location.host}/brouwerijen.ts`);
        const data = await response.json();
        const journey = {
          id: brewery.id,
          from: from,
          to: to,
          distance: Math.round(Math.pow(Math.abs(+from - +to), 0.6)),
          openToday: brewery.days.includes(findDayName()),
          mapUrl: buildMapLink(brewery),
        } as TJourney;
        return journey;
      } catch (err) {
        const journey = {
          id: brewery.id,
          from: from,
          to: to,
          distance: Infinity,
          error: err.error ? err.error.toString() : err.toString(),
        } as TJourney;
        return journey;
      }
    },
  },
});

export default journeyMixin;
