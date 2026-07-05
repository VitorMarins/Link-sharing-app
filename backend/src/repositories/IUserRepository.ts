import type { LinkDTO } from "./ILinkRepository";

export interface CreateUserData {
  name: string;
  email: string;
  password: string;
  username: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UpdateUserData {
  name: string;
  email: string;
  password: string;
  username: string;
  updatedAt: Date;
}

export interface UserDTO {
  id: string;
  name: string;
  email: string;
  password: string;
  username: string;
  links?: LinkDTO[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IUsersRepository {
  create(data: CreateUserData): Promise<UserDTO>;
  findById(id: string): Promise<UserDTO | null>;
  findByEmail(email: string): Promise<UserDTO | null>;
  findByUsername(username: string): Promise<UserDTO | null>;
  update(id: string, data: Partial<UpdateUserData>): Promise<UserDTO>;
  delete(id: string): Promise<void>;
  findAll(): Promise<UserDTO[]>;
}
