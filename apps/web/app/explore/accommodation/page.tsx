import { safeSanityFetch } from "../../../lib/sanity";
import { SanityPlace } from "../../../lib/sanity";
import AccommodationClient from "../accomodation/AccommodationClient";

export default async function AccommodationPage() {
  const { data: spots } = await safeSanityFetch<SanityPlace[]>(
    '*[_type == "place" && category == "Stay"]',
  );

  return <AccommodationClient initialSpots={spots} />;
}
