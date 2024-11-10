import { UserType } from './enums';

export interface GetUserListParams {
  type?: UserType;
  name?: string;
  email?: string;
  skip: number;
  take: number;
}
