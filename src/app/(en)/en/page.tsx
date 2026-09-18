import type { Metadata } from "next";
import { HomeView } from "@/views/HomeView";
import { lingue } from "@/lib/alternate";

export const metadata: Metadata = {
  alternates: { canonical: "/en", languages: lingue("/") },
};

export default function HomeEn() {
  return <HomeView lingua="en" />;
}
