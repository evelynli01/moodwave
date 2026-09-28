import type { GeneratedVisual } from "../data/moodData";

type GeneratedArtworkProps = {
  visual: GeneratedVisual;
  rounded?: boolean;
};

export default function GeneratedArtwork({
  visual,
  rounded = true,
}: GeneratedArtworkProps) {
  const [c1, c2, c3, c4, c5] = visual.colors;

  const containerClass = `relative h-full w-full overflow-hidden ${
    rounded ? "rounded-[26px]" : ""
  }`;

  if (visual.style === "gradient") {
    return (
      <div
        className={containerClass}
        style={{
          background: `
            radial-gradient(circle at 20% 25%, ${c1} 0%, transparent 38%),
            radial-gradient(circle at 80% 20%, ${c3} 0%, transparent 40%),
            radial-gradient(circle at 65% 80%, ${c5} 0%, transparent 42%),
            linear-gradient(135deg, ${c2}, ${c4})
          `,
        }}
      >
        <div
          className="absolute -bottom-[12%] -left-[8%] h-[45%] w-[70%] rotate-[-10deg] rounded-[50%]"
          style={{ backgroundColor: c4, opacity: 0.45 }}
        />
      </div>
    );
  }

  if (visual.style === "waves") {
    return (
      <div
        className={containerClass}
        style={{
          background: `linear-gradient(145deg, ${c1}, ${c2})`,
        }}
      >
        <div
          className="absolute -left-[18%] top-[8%] h-[28%] w-[140%] rotate-[-8deg] rounded-[50%]"
          style={{ backgroundColor: c3 }}
        />

        <div
          className="absolute -left-[15%] top-[34%] h-[32%] w-[135%] rotate-[7deg] rounded-[50%]"
          style={{ backgroundColor: c4 }}
        />

        <div
          className="absolute -left-[20%] bottom-[-5%] h-[42%] w-[145%] rotate-[-5deg] rounded-[50%]"
          style={{ backgroundColor: c5 }}
        />

        <div
          className="absolute right-[8%] top-[14%] h-[18%] w-[18%] rotate-12 rounded-[35%]"
          style={{ backgroundColor: c1 }}
        />
      </div>
    );
  }

  if (visual.style === "orbit") {
    return (
      <div
        className={containerClass}
        style={{
          background: `linear-gradient(160deg, ${c5}, ${c2})`,
        }}
      >
        <div
          className="absolute left-[10%] top-[12%] h-[58%] w-[58%] rotate-[18deg] rounded-[38%]"
          style={{ backgroundColor: c1 }}
        />

        <div
          className="absolute right-[7%] top-[9%] h-[28%] w-[28%] rotate-45 rounded-[28%]"
          style={{ backgroundColor: c3 }}
        />

        <div
          className="absolute bottom-[8%] right-[12%] h-[42%] w-[42%] rounded-full border-[18px]"
          style={{ borderColor: c4 }}
        />

        <div
          className="absolute bottom-[13%] left-[13%] h-[13%] w-[36%] rotate-[-18deg] rounded-full"
          style={{ backgroundColor: c3 }}
        />
      </div>
    );
  }

  return (
    <div
      className={containerClass}
      style={{
        background: `linear-gradient(135deg, ${c4}, ${c2})`,
      }}
    >
      <div
        className="absolute -bottom-[18%] -left-[18%] h-[82%] w-[82%] rotate-12 rounded-[45%_55%_38%_62%]"
        style={{ backgroundColor: c1 }}
      />

      <div
        className="absolute -right-[18%] -top-[15%] h-[72%] w-[72%] -rotate-12 rounded-[62%_38%_58%_42%]"
        style={{ backgroundColor: c3 }}
      />

      <div
        className="absolute bottom-[8%] right-[5%] h-[34%] w-[42%] rotate-[20deg] rounded-[30%_70%_60%_40%]"
        style={{ backgroundColor: c5 }}
      />

      <div
        className="absolute left-[38%] top-[38%] h-[18%] w-[35%] -rotate-[25deg] rounded-full"
        style={{ backgroundColor: c2 }}
      />
    </div>
  );
}