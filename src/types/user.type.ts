export type UserType = {
  name: string;
  email: string;
  password: string;
  adminRights: boolean;
}

export type SafeUserType = {
  name: string;
  email: string;
  adminRights: string
}
