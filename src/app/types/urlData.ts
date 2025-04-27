export type UrlData = {
  id: number;
  users_id: number | null;
  workspaces_id: number | null;
  short_code: string;
  origin_url: string;
  shorten_url: string;
  comments: string | null;
  created_at: string;
  update_at: string;
  deleted_at: string | null;
  expires_at: string | null;
  _count: {
    clicks: number;
  };
};
