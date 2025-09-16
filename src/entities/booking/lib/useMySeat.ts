import { useQuery } from "@tanstack/react-query";
import { getMySeat, getMySeats } from "../api/getMySeat";
import { Seat } from "../model/types";
import { getTokenFromCookie } from "@/shared/utils/auth";
import { useEffect, useState } from "react";

export const useMySeat = () => {
  return useQuery<Seat, Error, Seat>({
    queryKey: ["mySeat"],
    queryFn: () => getMySeat(),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    enabled: true,
  });
};

export const useMySeats = () => {
  return useQuery<Seat[], Error, Seat[]>({
    queryKey: ["mySeats"],
    queryFn: () => getMySeats(),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    enabled: true,
  });
};

export const useMyBookedSeats = () => {
  const [role, setRole] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (typeof window !== "undefined") {
      const userRole = getTokenFromCookie("role");
      setRole(userRole);
    }
  }, []);

  const isPerformer = role === "ROLE_PERFORMER";
  
  const singleSeatQueryWithCondition = useQuery<Seat, Error, Seat>({
    queryKey: ["mySeat"],
    queryFn: () => getMySeat(),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    enabled: isClient && !isPerformer,
  });

  const multiSeatsQueryWithCondition = useQuery<Seat[], Error, Seat[]>({
    queryKey: ["mySeats"],
    queryFn: () => getMySeats(),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    enabled: isClient && isPerformer,
  });
  
  if (!isClient) {
    return {
      data: [],
      seats: [],
      isMultiple: false,
      isLoading: true,
      error: null,
    };
  }

  if (isPerformer) {
    return {
      ...multiSeatsQueryWithCondition,
      data: multiSeatsQueryWithCondition.data || [],
      seats: multiSeatsQueryWithCondition.data || [],
      isMultiple: true,
    };
  } else {
    return {
      ...singleSeatQueryWithCondition,
      data: singleSeatQueryWithCondition.data ? [singleSeatQueryWithCondition.data] : [],
      seats: singleSeatQueryWithCondition.data ? [singleSeatQueryWithCondition.data] : [],
      isMultiple: false,
    };
  }
};
