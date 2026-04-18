import { logger } from './logger';
import { UserPrismaRepository } from '@/repositories/repository/userRepositoryImpl';
import { USER_EMAIL_EXISTS, USER_NOT_FOUND } from '@/constants/messages';
import { User } from '@/app/generated/prisma/client';
const userRepo = new UserPrismaRepository();

export interface CreateUpdateUserDto {
  name: string;
  email: string;
}

export const getAllUsers = async (opts?: { skip?: number; take?: number }): Promise<User[]> => {
  logger.info('Fetching all users', opts);
  try {
    return userRepo.findAll(opts);
  } catch (error) {
    logger.error('Error fetching users', error);
    throw new Error('Failed to fetch users');
  }
};

export const createUser = async (data: CreateUpdateUserDto): Promise<User> => {
  const emailFound = await userRepo.findEmail(data.email);
  if (emailFound) throw new Error(USER_EMAIL_EXISTS);
  return userRepo.create(data);
};

export const getUserCount = async (): Promise<number> => {
  logger.info('Counting users');
  try {
    return userRepo.count();
  } catch (error) {
    logger.error('Error counting users', error);
    throw new Error('Failed to count users');
  }
};

export const updateUser = async (id: number, data: Partial<CreateUpdateUserDto>) => {
  if (data.email) {
    const existingEmailUser = await userRepo.findEmailUpdate(data.email, id);
    if (existingEmailUser) throw new Error(USER_EMAIL_EXISTS);
  }
  return userRepo.update(id, data);
};


export const deleteUser = async (id: number) => {
  logger.info('Deleting user', { id });
  const user = await userRepo.findById(id);

  if (!user) {
    throw new Error(USER_NOT_FOUND);
  }

  return userRepo.remove(id);
};
