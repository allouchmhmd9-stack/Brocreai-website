const LABEL: Record<string, string> = {
  live: "Live",
  pilot: "In pilot",
  build: "In build",
  custom: "Priced per engagement",
  coming: "Coming soon",
};

// Quiet outlined chip. Ice is reserved for "live"; everything else stays in textsec.
export function StatusChip({ status, className = "" }: { status: string; className?: string }) {
  const live = status === "live";
  return (
    <span
      className={`inline-flex shrink-0 items-center whitespace-nowrap rounded-md border px-2 py-0.5 text-xs font-medium ${
        live ? "border-ice/60 text-ice" : "border-textsec/50 text-textsec"
      } ${className}`}
    >
      {LABEL[status] ?? status}
    </span>
  );
}
