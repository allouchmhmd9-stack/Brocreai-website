import { LegalPage, legalMetadata } from "@/components/LegalPage";

export const metadata = legalMetadata("refunds");

export default function Page() {
  return <LegalPage page="refunds" />;
}
