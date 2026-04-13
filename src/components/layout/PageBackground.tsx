export function PageBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(900px_circle_at_18%_0%,hsl(var(--primary)_/_0.12),transparent_60%)]" />
      <div className="absolute inset-0 opacity-[0.1] dark:opacity-[0.05] [background-image:linear-gradient(to_right,rgba(2,6,23,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(2,6,23,0.06)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(60%_45%_at_50%_0%,black,transparent_80%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/45 to-background/95" />
    </div>
  )
}
