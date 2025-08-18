import { useQuery } from "@tanstack/react-query";
import { getTeams } from "../api/getTeams";
import { StatusType } from "@/entities/list/consts/status";

interface Teams {
  team_id: number;
  team_name: string;
  status: StatusType;
  star: number;
}

export const useGetTeams = () => {
  return useQuery<Teams[]>({
    queryKey: ["teams"],
    queryFn: getTeams,
  });
};
