import { safeSanityFetch } from "../../../lib/sanity";
import { SanityInstitution } from "../../../lib/sanity";
import UniversitiesClient from "./UniversitiesClient";

export default async function UniversitiesPage() {
  const { data: unis } = await safeSanityFetch<SanityInstitution[]>(
    '*[_type == "institution" && category == "education"]',
  );

  return <UniversitiesClient initialUnis={unis} />;
}
