import instance from "@/shared/lib/axios";

export const getVotes = async () => {
  try {
    const res = await instance.get("/admin/vote");
    return res.data;
  } catch (error) {
    throw error;
  }
};
