import { useQuery } from "@tanstack/react-query";
import { getGithub } from "../api/getGithub";
import { GithubUser } from "./githubDataType";

export const useGetGithub = (userID: string) => {
  return useQuery<GithubUser>({
    queryKey: ["github", userID],
    queryFn: () => getGithub(userID),
    enabled: Boolean(userID),
  });
};
