import { User } from '../../types/user';
import { IUserRepository } from '../repositoryImpl/IUserRepository';
import prisma from '../../lib/prisma';
import { CreateUpdateUserDto } from '@/services/user.service';

export class UserPrismaRepository implements IUserRepository {

    async findAll(opts?: { skip?: number; take?: number }): Promise<User[]> {
        return prisma.user.findMany({
            skip: opts?.skip,
            take: opts?.take,
            orderBy: { id: 'asc' },
        });
    }

    async findById(id: number): Promise<User | null> {
        return prisma.user.findUnique({ where: { id } });
    }

    async create(data: CreateUpdateUserDto): Promise<User> {
        return prisma.user.create({ data });
    }

    async update(id: number, data: Partial<User>): Promise<User> {
        return prisma.user.update({ where: { id }, data });
    }

    async remove(id: number): Promise<User> {
        return prisma.user.delete({ where: { id } });
    }

    async findEmail(email: string): Promise<User | null> {
        return prisma.user.findUnique({ where: { email } });
    }

    async findEmailUpdate(email: string, id: number): Promise<User | null> {
        return prisma.user.findUnique({ where: { email, NOT: { id } } });
    }

    async count(): Promise<number> {
        return prisma.user.count();
    }
}
