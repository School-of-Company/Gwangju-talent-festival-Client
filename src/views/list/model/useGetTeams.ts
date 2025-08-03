import { useQuery } from "@tanstack/react-query";
import { getTeams } from "../api/getTeams";

interface Teams {
  team_id: number;
  teamName: string;
  status: "PENDING" | "ONGOING" | "FINISHED";
}

export const useGetTeams = () => {
  return useQuery<Teams[]>({
    queryKey: ["teams"],
    queryFn: getTeams,
  });
};
