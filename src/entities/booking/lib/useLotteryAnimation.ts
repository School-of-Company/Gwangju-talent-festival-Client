import { useState, useCallback } from "react";
import { Seat } from "../model/types";

interface UseLotteryAnimationProps {
  seats: Seat[];
  duration?: number;
  interval?: number;
}

export const useLotteryAnimation = ({ 
  seats, 
  duration = 3000, 
  interval = 100 
}: UseLotteryAnimationProps) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentSeat, setCurrentSeat] = useState<Seat | null>(null);
  const [finalSeat, setFinalSeat] = useState<Seat | null>(null);

  const startAnimation = useCallback(() => {
    if (seats.length === 0) return;

    setIsAnimating(true);
    setFinalSeat(null);
    
    const startTime = Date.now();
    const endTime = startTime + duration;
    
    const animationInterval = setInterval(() => {
      const now = Date.now();
      
      if (now >= endTime) {
        const randomIndex = Math.floor(Math.random() * seats.length);
        const selectedSeat = seats[randomIndex];
        setCurrentSeat(selectedSeat);
        setFinalSeat(selectedSeat);
        setIsAnimating(false);
        clearInterval(animationInterval);
      } else {
        const randomIndex = Math.floor(Math.random() * seats.length);
        setCurrentSeat(seats[randomIndex]);
      }
    }, interval);

    return () => clearInterval(animationInterval);
  }, [seats, duration, interval]);

  const resetAnimation = useCallback(() => {
    setIsAnimating(false);
    setCurrentSeat(null);
    setFinalSeat(null);
  }, []);

  return {
    isAnimating,
    currentSeat,
    finalSeat,
    startAnimation,
    resetAnimation,
  };
};
