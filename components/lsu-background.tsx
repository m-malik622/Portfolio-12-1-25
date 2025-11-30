export default function LSUBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {/* Big LSU purple → gold gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#461D7C] via-transparent to-[#FDD023] opacity-70" />
    </div>
  )
}