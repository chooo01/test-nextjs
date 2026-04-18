// repositories/IUserRepository.ts
import { User } from '../../types/user';
import { BaseRepository } from '../baseRepository';

export interface IUserRepository extends BaseRepository<User, number> {
  findEmail(email: string): Promise<User | null>;
}
