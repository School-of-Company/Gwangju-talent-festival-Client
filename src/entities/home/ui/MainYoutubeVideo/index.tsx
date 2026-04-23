import { cn } from "@/shared/utils/cn";

export default function MainYoutubeVideo() {
  const youtubeId = "8iM_JB8u-Vo";
  return (
    <>
      <iframe
        className={cn(
          "absolute",
          "top-1/2",
          "left-1/2",
          "-translate-x-1/2",
          "-translate-y-1/2",
          "w-[177.78vh]",
          "h-[56.25vw]",
          "mobile:w-full",
          "mobile:h-full",
          "min-w-full",
          "min-h-full",
          "pointer-events-none",
        )}
        src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&controls=0&playsinline=1&loop=1&playlist=${youtubeId}&modestbranding=1&rel=0`}
        title="Intro video"
        allow="autoplay; encrypted-media; picture-in-picture"
        referrerPolicy="strict-origin-when-cross-origin"
      />

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
    </>
  );
}
