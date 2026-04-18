// repositories/baseRepository.ts

export abstract class BaseRepository<T, K = number> {
    abstract findAll(opts?: { skip?: number; take?: number }): Promise<T[]>;
    abstract findById(id: K): Promise<T | null>;
    abstract create(data: Partial<T>): Promise<T>;
    abstract update(id: K, data: Partial<T>): Promise<T>;
    abstract remove(id: K): Promise<T>;
}
