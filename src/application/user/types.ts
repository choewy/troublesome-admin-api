import { User } from './user.entity';

export type UserTokenClaimType = Pick<User, 'id' | 'type' | 'email' | 'name'>;
