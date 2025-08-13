import instance from "@/shared/lib/axios";

export const getEvaluation = async () => {
  try {
    const res = await instance.get("/judge");
    return res.data;
  } catch (error) {
    throw error;
  }
};
