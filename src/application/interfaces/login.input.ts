import { UserType } from '@/domain';

export interface LoginInput {
  type: UserType;
  email: string;
  password: string;
}
