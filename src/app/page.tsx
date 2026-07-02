import type { Metadata } from "next";
import { LocaleShell } from "@/components/locale-shell";
import { generateHomeMetadata, HomePageContent } from "./[locale]/page";

export async function generateMetadata(): Promise<Metadata> {
  return generateHomeMetadata("en");
}

export default async function RootPage() {
  return (
    <LocaleShell locale="en">
      <HomePageContent locale="en" />
    </LocaleShell>
  );
}
