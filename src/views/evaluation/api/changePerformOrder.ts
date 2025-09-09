import { toast } from "sonner";

export const changePerformOrder = (onTeamChange: (teamId: number) => void) => {
  const es = new EventSource("/api/judge/changes", {
    withCredentials: true,
  });

  const handler = (event: MessageEvent) => {
    try {
      const payload = JSON.parse(event.data);
      if (payload && typeof payload.team_id === "number") {
        onTeamChange(payload.team_id);
      }
    } catch (E) {
      throw E;
    }
  };

  es.addEventListener("PERFORM_TEAM_CHANGE", handler as EventListener);

  es.onmessage = handler;

  es.onopen = () => {
    console.log("SSE connected: /api/judge/changes");
  };

  es.onerror = e => {
    console.error(e);
    toast.error("현재 공연 중인 팀 조회 실패");
  };
};
