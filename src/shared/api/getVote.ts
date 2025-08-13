import instance from "@/shared/lib/axios";

export const getVote = async () => {
  try {
    const res = await instance.get("/vote");
    return res.data;
  } catch (error) {
    throw error;
  }
};
