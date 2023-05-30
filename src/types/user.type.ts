export type UserType = {
  name: string;
  email: string;
  password: string;
  hasAdminRights: boolean;
}

export type SafeUserType = {
  name: string;
  email: string;
  hasAdminRights: boolean
}
