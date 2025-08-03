export class ListSchema {
  constructor(name, createdDate = null, id = null) {
    if (typeof id !== 'undefined' && id !== null) {
      this.id = id;
    }
    this.name = name?.trim();
    (createdDate) ? this.createdDate = createdDate : this.createdDate = new Date().toISOString();
  }

  validate() {
    const errors = [];

    if (!this.name || this.name.length === 0) {
      errors.push('O nome da lista é obrigatório.');
    }

    if (this.name.length < 3) {
      errors.push('O nome deve ter pelo menos 3 caracteres.');
    }

    return errors;
  }
}
