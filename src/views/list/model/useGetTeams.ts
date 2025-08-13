import { useQuery } from "@tanstack/react-query";
import { getTeams } from "../api/getTeams";
import { StatusType } from "@/entities/list/consts/status";

interface Teams {
  team_id: number;
  teamName: string;
  status: StatusType;
}

export const useGetTeams = () => {
  return useQuery<Teams[]>({
    queryKey: ["teams"],
    queryFn: getTeams,
  });
};
