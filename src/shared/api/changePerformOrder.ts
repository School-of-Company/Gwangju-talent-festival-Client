import { toast } from "sonner";

export const changePerformOrder = () => {
  const es = new EventSource("/api/judge/changes", {
    withCredentials: true,
  });

  es.onmessage = event => {
    try {
      const payload = JSON.parse(event.data);
      return payload.team_id;
    } catch (error) {
      throw error;
    }
  };

  es.onopen = () => {
    console.log("연결 됨");
  };

  es.onerror = e => {
    toast.error("현재 공연 중인 팀 조회 실패");
    console.log(e);
  };
};
