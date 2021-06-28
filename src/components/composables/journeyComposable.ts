import { TBrewery, TJourney } from "../../types";

/* postcode-api.nl
   data: {"seconden":"870","reisafstand":"19006"}
   error: { error: "invalid zipcode" }
*/

/**
 * Get the name of the current weekday
 * @private
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
 * @private
 * @param {Object} brewery - one of the compared
 * @return {String} http address
 */
const buildMapLink = (brewery: TBrewery) => {
  const gMapDirection = "https://www.google.com/maps/dir/";
  const mailAddress = `${brewery.address}\n${brewery.postcode} ${brewery.city}`;
  const gMapParams = mailAddress.replace(/\s/g, "+");
  return `${gMapDirection}${gMapParams}`;
};

/**
 * Journey list that shows all breweries
 * @param {Array} breweries
 * @return {Array} journeys
 */
const useNoJourneys = (breweries: TBrewery[]) => {
  const journeys = breweries.map((brewery) => {
    return {
      id: brewery.id,
      distance: Infinity,
    };
  }) as TJourney[];
  return journeys;
};

/**
 * Normalise Postcode to do queries or calculations
 * @param {String} rawString - string to find the postcode in.
 */
const useNormalisedPostcode = (rawString: string) => {
  const numericWords = rawString.replace(/\D+/g, " ");
  const patternMatch = numericWords.match(/\b\d{4}\b/);
  if (patternMatch) {
    return patternMatch[0];
  }
};

/**
 * Gather sortable brewery data
 * Dismiss not-dutch postcodes (length <= 4)
 * @param {String} from - postcode of comparison
 * @param {Object} brewery - one of the compared
 */
const useFetchJourney = async (from: string, to: string, brewery: TBrewery) => {
  let journey: TJourney;

  try {
    const response = await fetch(`//${location.host}/brouwerijen.ts`);
    const data = await response.json();
    journey = {
      id: brewery.id,
      from: from,
      to: to,
      distance: Math.round(Math.pow(Math.abs(+from - +to), 0.6)),
      openToday: brewery.days.includes(findDayName()),
      mapUrl: buildMapLink(brewery),
    };
  } catch (err) {
    journey = {
      id: brewery.id,
      from: from,
      to: to,
      distance: Infinity,
      error: err.error ? err.error.toString() : err.toString(),
    };
  }

  return journey;
};

export { useNoJourneys, useNormalisedPostcode, useFetchJourney };
