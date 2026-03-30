"use client";

import React, { memo, useCallback, useEffect, useState } from "react";
import { slogansMock } from "@/entities/home/mock/sloganMock";
import { getRandomSubset } from "./utils/getRandomSubset";
import { FONTS, FontType } from "./model/fonts";
import { MarqueeRow } from "./ui/MarqueeRow";

const getRandomFonts = (count: number): FontType[] => {
  const shuffledFonts = [...FONTS].sort(() => Math.random() - 0.5);
  return shuffledFonts.slice(0, count);
};

const assignFonts = (slogans1: ReadonlyArray<string>, slogans2: ReadonlyArray<string>) => {
  const fonts1 = getRandomFonts(slogans1.length);
  const remaining = FONTS.filter(font => !fonts1.includes(font));
  const fonts2 = [...remaining].sort(() => Math.random() - 0.5).slice(0, slogans2.length);
  return [fonts1, fonts2] as const;
};

const SloganMarquee = (): React.ReactElement => {
  const [slogans1, setSlogans1] = useState<ReadonlyArray<string>>([]);
  const [slogans2, setSlogans2] = useState<ReadonlyArray<string>>([]);
  const [fonts1, setFonts1] = useState<ReadonlyArray<FontType>>([]);
  const [fonts2, setFonts2] = useState<ReadonlyArray<FontType>>([]);

  const initializeSlogans = useCallback(() => {
    let firstSlogans: ReadonlyArray<string>;
    let secondSlogans: ReadonlyArray<string>;

    try {
      [firstSlogans, secondSlogans] = getRandomSubset(slogansMock, 8);
    } catch {
      firstSlogans = slogansMock.slice(0, 4);
      secondSlogans = slogansMock.slice(4, 8);
    }

    const [f1, f2] = assignFonts(firstSlogans, secondSlogans);
    setSlogans1(firstSlogans);
    setSlogans2(secondSlogans);
    setFonts1(f1);
    setFonts2(f2);
  }, []);

  useEffect(() => {
    initializeSlogans();
  }, [initializeSlogans]);

  return (
    <section className="w-full overflow-hidden bg-orange-200 py-28 mobile:py-14 space-y-10 relative">
      <MarqueeRow slogans={slogans1} fonts={fonts1} color="text-orange-500" />
      <MarqueeRow slogans={slogans2} fonts={fonts2} reverse={true} color="text-orange-500" />
    </section>
  );
};

export default memo(SloganMarquee);
