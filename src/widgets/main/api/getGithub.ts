import instance from "@/shared/lib/axios";

export const getGithub = async (userID: string) => {
  try {
    const res = await instance.get(`/api/github/${encodeURIComponent(userID)}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
