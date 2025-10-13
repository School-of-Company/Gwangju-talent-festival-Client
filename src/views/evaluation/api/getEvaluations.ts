import instance from "@/shared/lib/axios";

export const getEvaluations = async () => {
  try {
    const res = await instance.get("/api/judge");
    return res.data;
  } catch (error) {
    throw error;
  }
};
