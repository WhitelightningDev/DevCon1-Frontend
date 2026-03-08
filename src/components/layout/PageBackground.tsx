export function PageBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(59,130,246,0.14),transparent_55%),radial-gradient(circle_at_82%_14%,rgba(37,99,235,0.10),transparent_55%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/35 to-background/95" />
    </div>
  )
}
