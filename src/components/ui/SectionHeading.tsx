import Reveal from "@/components/ui/Reveal";

type SectionHeadingProps = {
  number: string;
  eyebrow: string;
  title: string;
  lead?: string;
  align?: "left" | "center";
};

export default function SectionHeading({ number, eyebrow, title, lead, align = "left" }: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <Reveal className={centered ? "text-center" : ""}>
      <p className="eyebrow">
        <span className="text-faint">{number}</span>
        <span className="mx-3 inline-block h-px w-8 translate-y-[-3px] bg-accent/50" aria-hidden="true" />
        {eyebrow}
      </p>
      <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
        {title}
      </h2>
      {lead ? (
        <p className={`mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg ${centered ? "mx-auto" : ""}`}>
          {lead}
        </p>
      ) : null}
    </Reveal>
  );
}
