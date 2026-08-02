import { safeSanityFetch } from "../../lib/sanity";
import { SanityInstitution } from "../../lib/sanity";
import InstitutionsLandingClient from "./InstitutionsLandingClient";

export default async function InstitutionsLandingPage() {
  const { data: institutions } = await safeSanityFetch<SanityInstitution[]>(
    '*[_type == "institution"]',
  );

  return <InstitutionsLandingClient initialInstitutions={institutions} />;
}
