import { safeSanityFetch } from "../../lib/sanity";
import { SanityService, SanityStudentGuide } from "../../lib/sanity";
import ServicesPageClient from "./ServicesPageClient";

export default async function ServicesPage() {
  const { data: services } = await safeSanityFetch<SanityService[]>(
    '*[_type == "service"]',
  );
  const { data: guide } = await safeSanityFetch<SanityStudentGuide>(
    '*[_type == "studentGuide"][0]',
  );

  return (
    <ServicesPageClient
      initialServices={services}
      initialGuide={guide}
    />
  );
}
