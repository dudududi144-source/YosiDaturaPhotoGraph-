export default function SectionHeader({ number, name, heading, headingAccent = 'text-gold', numberColor, intro }) {
  return (
    <div className="mb-16 md:mb-24">
      <div className="section-number reveal" style={numberColor ? { color: numberColor } : undefined}>
        {number} / {name}
      </div>
      <h2 className="font-display text-5xl md:text-7xl lg:text-8xl font-black mt-4 md:mt-6 reveal">
        {heading[0]}
        <br />
        <span className={headingAccent}>{heading[1]}</span>
      </h2>
      {intro && (
        <p className="font-mono text-sm text-white/50 mt-6 md:mt-8 max-w-2xl leading-relaxed reveal">
          {intro}
        </p>
      )}
    </div>
  );
}
