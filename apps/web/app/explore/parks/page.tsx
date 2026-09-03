import { safeSanityFetch } from "../../../lib/sanity";
import { SanityPlace } from "../../../lib/sanity";
import ParksClient from "./ParksClient";

export default async function ParksPage() {
  const { data: spots } = await safeSanityFetch<SanityPlace[]>(
    '*[_type == "place" && category == "Parks"]',
  );

  return <ParksClient initialSpots={spots} />;
}
