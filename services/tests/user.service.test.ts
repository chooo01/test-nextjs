
const mockCreate = jest.fn();
const mockUpdate = jest.fn();
const mockFindEmailUpdate = jest.fn();
const mockFindEmail = jest.fn();

jest.mock('@/repositories/repository/userRepositoryImpl', () => {
  return {
    UserPrismaRepository: jest.fn().mockImplementation(() => ({
      findAll: jest.fn().mockResolvedValue([
        { id: 1, name: 'Test', email: 'test@mail.com', createdAt: new Date() },
      ]),
      findEmailUpdate: mockFindEmailUpdate,
      update: mockUpdate,
      findEmail: mockFindEmail,
      create: mockCreate,
    })),
  };
});

import { USER_EMAIL_EXISTS } from '@/constants/messages';
import { createUser, getAllUsers, updateUser } from '@/services/user.service';

describe('findAll', () => {
  it('should return users', async () => {
    const users = await getAllUsers();
    expect(users).toHaveLength(1);
    expect(users[0].name).toBe('Test');
  });
});

describe('updateUser', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should throw validation error if email already exists in another user', async () => {

    const id = 1;
    const updateData = { name: 'Updated', email: 'test@mailsssss.com' };
    const userWithSameEmail = { id: 1, name: 'Other', email: 'test@mailssss.com', createdAt: new Date() };

    mockFindEmailUpdate.mockResolvedValue(userWithSameEmail);
    await expect(updateUser(id, updateData)).rejects.toThrow(USER_EMAIL_EXISTS);

    expect(mockFindEmailUpdate).toHaveBeenCalledWith(updateData.email, id);
    expect(mockUpdate).not.toHaveBeenCalled();
  });
});

describe('createUser', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should throw validation error if email already exists in another user', async () => {

    const updateData = { name: 'Updated', email: 'test@mailsssss.com' };
    const userWithSameEmail = { name: 'Other', email: 'test@mailssss.com' };

    mockFindEmail.mockResolvedValue(userWithSameEmail);
    await expect(createUser(updateData)).rejects.toThrow(USER_EMAIL_EXISTS);

    expect(mockFindEmail).toHaveBeenCalledWith(updateData.email);
    expect(mockCreate).not.toHaveBeenCalled();
  });
});

