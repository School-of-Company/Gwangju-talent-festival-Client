export interface GithubUser {
  login: string; // 깃허브 아이디 (username)
  id: number; // 내부적으로 쓰는 고유 id
  node_id: string;
  avatar_url: string; // 프로필 아바타 이미지 URL
  html_url: string; // 깃허브 프로필 URL
  name: string | null; // 사용자가 설정한 이름 (없으면 null)
  company: string | null;
  blog: string | null;
  location: string | null;
  email?: string | null; // 공개 설정 안 하면 null 또는 없음
  bio: string | null;
  twitter_username: string | null;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string; // ISO 날짜 문자열
  updated_at: string; // ISO 날짜 문자열
}
