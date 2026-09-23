import { cn } from "@/lib/utils";

const LABEL: Record<string, string> = {
  live: "Live",
  pilot: "In pilot",
  build: "In build",
  custom: "Priced per engagement",
  coming: "Coming soon",
};

// A printed status mark. Ice is reserved for "live"; everything else prints as an outline.
export function StatusChip({ status, className }: { status: string; className?: string }) {
  const live = status === "live";
  return (
    <span className={cn("lbl inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap text-[0.64rem]", live ? "text-ice" : "text-textsec", className)}>
      <span aria-hidden="true" className={cn("h-1.5 w-1.5", live ? "bg-ice" : "border border-textsec")} />
      {LABEL[status] ?? status}
    </span>
  );
}
