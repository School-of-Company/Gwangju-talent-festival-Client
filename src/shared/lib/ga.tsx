"use client";

import { GoogleAnalytics } from "nextjs-google-analytics";
import { useEffect, useState } from "react";

export default function GA() {
  const [shouldLoad, setShouldLoad] = useState(false);
  const GA_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS;

  useEffect(() => {
    if (!GA_ID || shouldLoad) return;

    const loadGA = () => setShouldLoad(true);
    const timer = setTimeout(loadGA, 5000);

    const interactionEvents = ["mousedown", "mousemove", "keypress", "scroll", "touchstart", "click"];
    interactionEvents.forEach(evt =>
      document.addEventListener(evt, loadGA, { once: true, passive: true })
    );

    return () => {
      clearTimeout(timer);
      interactionEvents.forEach(evt =>
        document.removeEventListener(evt, loadGA)
      );
    };
  }, [GA_ID, shouldLoad]);

  if (!GA_ID || !shouldLoad) return null;

  return (
    <GoogleAnalytics trackPageViews gaMeasurementId={GA_ID} />
  );
}
