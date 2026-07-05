export interface CreateLinkData {
  title: string;
  url: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UpdateLinkData {
  title?: string;
  url?: string;
  createdAt?: Date;
  updatedAt: Date;
}

export interface LinkDTO {
  id: string;
  title: string;
  url: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ILinksRepository {
  create(data: CreateLinkData): Promise<LinkDTO>;
  findAll(): Promise<LinkDTO[]>;
  findById(id: string): Promise<LinkDTO | null>;
  findByUserId(userId: string): Promise<LinkDTO[]>;
  update(id: string, data: UpdateLinkData): Promise<LinkDTO>;
  delete(id: string): Promise<void>;
}
