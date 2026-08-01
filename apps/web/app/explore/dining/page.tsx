import { safeSanityFetch } from "../../../lib/sanity";
import { SanityPlace } from "../../../lib/sanity";
import DiningClient from "./DiningClient";

export default async function DiningPage() {
  const { data: spots } = await safeSanityFetch<SanityPlace[]>(
    '*[_type == "place" && (category == "Dining" || category == "Cafes")]',
  );

  return <DiningClient initialSpots={spots} />;
}
