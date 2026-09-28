import { recordData } from "../data/moodData";

function AlbumLabel({ selection }: { selection: string }) {
  const colors = recordData[selection].colorFamily;

  return (
    <div
      className="relative h-full w-full overflow-hidden rounded-full"
      style={{ backgroundColor: colors[0] }}
    >
      <div
        className="absolute -right-2 top-1 h-[70%] w-[70%] rounded-full"
        style={{ backgroundColor: colors[2] }}
      />

      <div
        className="absolute bottom-0 h-[25%] w-full"
        style={{ backgroundColor: colors[4] }}
      />

      <div
        className="absolute left-[15%] top-[25%] h-[32%] w-[32%] rounded-full"
        style={{ backgroundColor: colors[6] }}
      />
    </div>
  );
}

type RecordCardProps = {
  name: string;
  onSelect: () => void;
};

export default function RecordCard({
  name,
  onSelect,
}: RecordCardProps) {
  const colors = recordData[name].colorFamily;

  return (
    <button
      type="button"
      onClick={onSelect}
      className="group shrink-0 text-left"
    >
      <div className="relative h-32 w-36">
        <div className="absolute right-0 top-2 h-28 w-28 rounded-full border border-zinc-700 bg-zinc-950 transition-transform duration-300 group-hover:translate-x-3">
          <div
            className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ backgroundColor: colors[0] }}
          />
        </div>

        <div
          className="absolute left-0 top-0 h-32 w-32 overflow-hidden rounded transition-transform duration-300 group-hover:-translate-y-2"
          style={{ backgroundColor: colors[0] }}
        >
          <div
            className="absolute -right-4 top-3 h-20 w-20 rounded-full"
            style={{ backgroundColor: colors[2] }}
          />

          <div
            className="absolute bottom-0 h-8 w-full"
            style={{ backgroundColor: colors[4] }}
          />

          <div
            className="absolute left-4 top-6 h-10 w-10 rounded-full"
            style={{ backgroundColor: colors[6] }}
          />
        </div>
      </div>

      <p className="mt-2 text-sm">{name}</p>
    </button>
  );
}

export { AlbumLabel };