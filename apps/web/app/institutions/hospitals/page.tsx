import { safeSanityFetch } from "../../../lib/sanity";
import { SanityInstitution } from "../../../lib/sanity";
import HospitalsClient from "./HospitalsClient";

export default async function HospitalsPage() {
  const { data: hospitals } = await safeSanityFetch<SanityInstitution[]>(
    '*[_type == "institution" && category == "health"]',
  );

  return <HospitalsClient initialHospitals={hospitals} />;
}
