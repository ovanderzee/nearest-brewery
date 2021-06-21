export type TBrewery = {
    id: string;
    name: string;
    address: string;
    city: string;
    days: string[];
    postcode: string;
    error?: string;
}

export type TJourney = {
    id: string;
    from?: string;
    to?: string;
    distance: number;
    openToday?: boolean;
    mapUrl?: string;
    error?: string;
}