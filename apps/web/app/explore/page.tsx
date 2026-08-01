import { safeSanityFetch } from "../../lib/sanity";
import { SanityPlace } from "../../lib/sanity";
import ExploreLandingClient from "./ExploreLandingClient";

export default async function ExplorePage() {
  const { data: places } = await safeSanityFetch<SanityPlace[]>(
    '*[_type == "place"]',
  );

  return <ExploreLandingClient initialPlaces={places} />;
}
