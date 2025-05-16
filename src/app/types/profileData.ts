export type Workspace = {
  id: string;
  name: string;
  slug: string
};

export type UserProfile = {
  name: string;
  email: string;
  workspaces: Workspace[];
};
