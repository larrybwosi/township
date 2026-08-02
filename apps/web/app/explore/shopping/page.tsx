import { safeSanityFetch } from "../../../lib/sanity";
import { SanityPlace } from "../../../lib/sanity";
import ShoppingClient from "./ShoppingClient";

export default async function ShoppingPage() {
  const { data: spots } = await safeSanityFetch<SanityPlace[]>(
    '*[_type == "place" && category == "Shopping"]',
  );

  return <ShoppingClient initialSpots={spots} />;
}
