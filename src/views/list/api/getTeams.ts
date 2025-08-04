import instance from "@/shared/lib/axios";

export const getTeams = async () => {
  try {
    const res = await instance("/admin/team");
    return res.data;
  } catch (error) {
    throw error;
  }
};
