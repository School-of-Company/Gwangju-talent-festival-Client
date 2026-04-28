import { cn } from "@/shared/utils/cn";

const youtubeId = "8iM_JB8u-Vo";
const params = new URLSearchParams({
  autoplay: "1",
  mute: "1",
  controls: "0",
  playsinline: "1",
  loop: "1",
  playlist: youtubeId,
  modestbranding: "1",
  rel: "0",
  iv_load_policy: "3",
  disablekb: "1",
  fs: "0",
  cc_load_policy: "0",
});
const src = `https://www.youtube.com/embed/${youtubeId}?${params}`;

export default function MainYoutubeVideo() {
  return (
    <>
      <div className={cn("absolute", "inset-0", "overflow-hidden")}>
        <iframe
          className={cn(
            "absolute",
            "top-1/2",
            "left-1/2",
            "-translate-x-1/2",
            "-translate-y-1/2",
            "w-[177.78vh]",
            "h-[56.25vw]",
            "min-w-full",
            "min-h-full",
            "scale-[1.15]",
            "pointer-events-none",
          )}
          src={src}
          title="Intro video"
          allow="autoplay; encrypted-media; picture-in-picture"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>

      <div
        className={cn(
          "absolute",
          "inset-0",
          "bg-gradient-to-t",
          "from-black",
          "via-black/30",
          "to-black/10",
        )}
      />
      <div
        className={cn(
          "absolute",
          "inset-0",
          "bg-gradient-to-b",
          "from-black/60",
          "to-transparent",
        )}
      />
    </>
  );
}
