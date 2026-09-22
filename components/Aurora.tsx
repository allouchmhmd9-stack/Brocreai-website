// Slow-drifting ambient light. Radial gradients only (no blur filter), so it stays cheap on phones.
export function Aurora({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <div
        className="absolute -left-[12vmax] -top-[22vmax] h-[62vmax] w-[62vmax] animate-drift-a rounded-full opacity-60"
        style={{
          background:
            "radial-gradient(closest-side, rgba(45,111,255,.42), rgba(21,101,192,.16) 55%, transparent 72%)",
        }}
      />
      <div
        className="absolute -bottom-[18vmax] -right-[14vmax] h-[56vmax] w-[56vmax] animate-drift-b rounded-full opacity-50"
        style={{
          background:
            "radial-gradient(closest-side, rgba(21,101,192,.5), rgba(26,59,219,.15) 58%, transparent 74%)",
        }}
      />
    </div>
  );
}
