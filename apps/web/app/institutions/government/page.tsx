import { safeSanityFetch } from "../../../lib/sanity";
import { SanityInstitution } from "../../../lib/sanity";
import GovernmentClient from "./GovernmentClient";

export default async function GovernmentPage() {
  const { data: offices } = await safeSanityFetch<SanityInstitution[]>(
    '*[_type == "institution" && category == "government"]',
  );

  return <GovernmentClient initialOffices={offices} />;
}
