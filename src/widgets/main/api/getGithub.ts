export const getGithub = async (userID: string) => {
  try {
    const res = await fetch(`/api/github/${encodeURIComponent(userID)}`);
    
    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }
    
    return await res.json();
  } catch (error) {
    throw error;
  }
};
