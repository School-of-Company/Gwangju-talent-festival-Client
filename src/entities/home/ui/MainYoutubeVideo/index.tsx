
export default function MainYoutubeVideo() {
  const youtubeId = "8iM_JB8u-Vo";
  const src = `https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&controls=0&playsinline=1&loop=1&playlist=${youtubeId}&modestbranding=1&rel=0`;

  const iframeProps = {
    src,
    title: "Intro video",
    allow: "autoplay; encrypted-media; picture-in-picture",
    referrerPolicy: "strict-origin-when-cross-origin" as const,
  };

  return (
    <>
      <iframe
        className="max-[1199px]:hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[177.78vh] h-[100vh] min-w-full min-h-full pointer-events-none"
        {...iframeProps}
      />

      <div className="min-[1200px]:hidden relative w-full aspect-video">
        <iframe
          className="absolute inset-0 w-full h-full pointer-events-none"
          {...iframeProps}
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/10" />
    </>
  );
}
