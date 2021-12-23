export interface Entity<T, I> {
  find(id: I): Promise<T>;
  findAll(): Promise<T[]>;
  create(entity: T): Promise<void>;
  update(entity: T): Promise<T>;
  delete(id: I): Promise<void>;
}
