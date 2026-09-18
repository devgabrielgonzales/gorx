import FadeIn from "./FadeIn";

type Props = {
  num: string;
  title: string;
  desc?: string;
};

export default function SectionHeader({ num, title, desc }: Props) {
  return (
    <FadeIn className="flex items-baseline gap-6 mb-8 pb-6 border-b hairline border-solid border-b-[#1f1f1f]">
      <span className="mono text-[13px] text-accent font-medium">{num}</span>
      <h2 className="text-[28px] md:text-[32px] font-semibold tracking-tight">{title}</h2>
      {desc && (
        <p className="ml-auto text-[13px] text-[#666] max-w-[320px] text-right hidden md:block">
          {desc}
        </p>
      )}
    </FadeIn>
  );
}
