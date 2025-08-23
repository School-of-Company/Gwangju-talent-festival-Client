import instance from "@/shared/lib/axios";

export const getRank = async () => {
  try {
    const res = await instance.get("/team/ranking");
    return res.data;
  } catch (error) {
    throw error;
  }
};
