"use client";

import { usePathname } from "next/navigation";
import Script from "next/script";
import { useEffect, useState } from "react";

const ChannelTalk = () => {
  const pathname = usePathname();
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const handleUserInteraction = () => {
      if (!shouldLoad) {
        setShouldLoad(true);
      }
    };

    const timer = setTimeout(() => {
      setShouldLoad(true);
    }, 5000);

    const events = ["mousedown", "mousemove", "keypress", "scroll", "touchstart", "click"];

    events.forEach(event => {
      document.addEventListener(event, handleUserInteraction, {
        once: true,
        passive: true,
      });
    });

    return () => {
      clearTimeout(timer);
      events.forEach(event => {
        document.removeEventListener(event, handleUserInteraction);
      });
    };
  }, [shouldLoad]);

  if (!shouldLoad) {
    return null;
  }
  if (pathname.startsWith("/admin") || pathname.startsWith("/vote")) return;
  return (
    <Script
      id="channelTalk"
      strategy="lazyOnload"
      dangerouslySetInnerHTML={{
        __html: `(function() {
          var w = window;
          if (w.ChannelIO) {
          return (window.console.error || window.console.log || function(){})('ChannelIO script included twice.');
          }
          var ch = function() {
          ch.c(arguments);
          };
          ch.q = [];
          ch.c = function(args) {
          ch.q.push(args);
          };
          w.ChannelIO = ch;
          function l() {
          if (w.ChannelIOInitialized) {
              return;
          }
          w.ChannelIOInitialized = true;
          var s = document.createElement('script');
          s.type = 'text/javascript';
          s.async = true;
          s.src = 'https://cdn.channel.io/plugin/ch-plugin-web.js';
          s.charset = 'UTF-8';
          var x = document.getElementsByTagName('script')[0];
          x.parentNode.insertBefore(s, x);
          }
          if (document.readyState === 'complete') {
          l();
          } else if (window.attachEvent) {
          window.attachEvent('onload', l);
          } else {
          window.addEventListener('DOMContentLoaded', l, false);
          window.addEventListener('load', l, false);
          }
      })();
      ChannelIO('boot', {
        "pluginKey": "${process.env.NEXT_PUBLIC_CHANNEL_PLUGIN_KEY}"
      });
        `,
      }}
    />
  );
};

export default ChannelTalk;
