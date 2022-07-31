export class BaseRepository<EntityType extends { id: string }> {
  private entities: EntityType[] = [];

  create(newEntity: EntityType) {
    this.entities.push(newEntity);
    return newEntity;
  }

  findAll() {
    return this.entities;
  }

  findOne(id: string) {
    const item = this.entities.find((item) => item.id === id);

    return item;
  }

  update(id: string, updatedEntity: EntityType) {
    const indexUpdatedentity = this.entities.findIndex(
      (item) => item.id === id,
    );
    this.entities[indexUpdatedentity] = updatedEntity;
    return this.entities[indexUpdatedentity];
  }

  remove(id: string) {
    this.entities = this.entities.filter((item) => item.id !== id);
    return id;
  }
}
