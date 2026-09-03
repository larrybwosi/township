import { safeSanityFetch } from "../../lib/sanity";
import { SanityEvent } from "../../lib/sanity";
import EventsPageClient from "./EventsPageClient";

export default async function EventsPage() {
  const { data: events } = await safeSanityFetch<SanityEvent[]>(
    '*[_type == "event"]',
  );

  return <EventsPageClient initialEvents={events} />;
}
