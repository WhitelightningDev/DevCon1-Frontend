export function PageBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-background" />
      <div
        className={[
          // Primary cluster (top-right): keep subtle, but visible on pure white.
          'absolute inset-0 opacity-[0.55] mix-blend-multiply',
          '[background-image:url(/imagery/abstract-network.svg)]',
          'bg-[length:1500px_965px] bg-no-repeat bg-[position:92%_16%]',
        ].join(' ')}
      />
      <div
        className={[
          // Secondary cluster (bottom-left): add rhythm without competing with content.
          'absolute inset-0 opacity-[0.28] mix-blend-multiply',
          '[background-image:url(/imagery/abstract-network.svg)]',
          'bg-[length:1150px_740px] bg-no-repeat bg-[position:10%_92%]',
        ].join(' ')}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/10 to-background/35" />
    </div>
  )
}
