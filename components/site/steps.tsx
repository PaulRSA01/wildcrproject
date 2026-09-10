const steps = [
  {
    n: "01",
    title: "Send an enquiry",
    text: "Tell us your ship or hotel, your date and how many people. No payment yet.",
  },
  {
    n: "02",
    title: "We confirm the details",
    text: "You get a reply the same day with pickup time, what to bring and a firm price.",
  },
  {
    n: "03",
    title: "Meet your guide",
    text: "Your guide is waiting at the agreed spot. Pay on the day, by card or cash.",
  },
];

export function Steps() {
  return (
    <ol className="grid gap-6 md:grid-cols-3">
      {steps.map((s) => (
        <li
          key={s.n}
          className="rounded-xl2 border border-black/5 bg-white p-6 shadow-sm"
        >
          <span className="font-display text-3xl font-semibold text-jungle-300">
            {s.n}
          </span>
          <h3 className="mt-2 font-display text-lg font-semibold text-ink">
            {s.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-ink/65">{s.text}</p>
        </li>
      ))}
    </ol>
  );
}
