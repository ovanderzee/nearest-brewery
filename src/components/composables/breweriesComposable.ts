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

/**
 * Retrieve and normalise Brewery data
 * @return {Array} breweries
 */
const useFetchBreweries = async () => {
  let breweries: TBrewery[];

  try {
    const response = await fetch(`//${location.host}/brouwerijen.ts`);
    const data = await response.json();
    breweries = data.breweries.map((item: any) => {
      const postcode = item.zipcode.trim().replace(/\s/, "");
      return {
        id: `${item.address.replace(/\s/, "_")}__${postcode}`,
        name: item.name,
        address: item.address,
        city: item.city,
        days: item.open,
        postcode: postcode,
      } as TBrewery;
    });
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
    breweries = [errorBrewery];
  }

  return breweries;
};

export { useFetchBreweries };
