export function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('AppLCCDB', 1);

    request.onupgradeneeded = function (e) {
      const db = e.target.result;

      // Tabela de listas
      if (!db.objectStoreNames.contains('lists')) {
        db.createObjectStore('lists', {
          keyPath: 'id', autoIncrement: true
        });
      }

      // Tabela de itens (ainda será usada depois)
      if (!db.objectStoreNames.contains('itens')) {
        const itemStore = db.createObjectStore('itens', {
          keyPath: 'id',
          autoIncrement: true
        });
        itemStore.createIndex('name', 'name', { unique: false });
        itemStore.createIndex('categoriaId', 'categoriaId', { unique: false });
      }

      // Tabela de categorias (futura)
      if (!db.objectStoreNames.contains('categorias')) {
        const categoriaStore = db.createObjectStore('categorias', {
          keyPath: 'id',
          autoIncrement: true
        });
        categoriaStore.createIndex('name', 'name', { unique: true });
      }

      // Tabela de ligação lista <-> item
      if (!db.objectStoreNames.contains('lista_item')) {
        const listaItemStore = db.createObjectStore('lista_item', {
          keyPath: 'id',
          autoIncrement: true
        });
        listaItemStore.createIndex('listaId', 'listaId', { unique: false });
        listaItemStore.createIndex('itemId', 'itemId', { unique: false });
        listaItemStore.createIndex('lista_item_unique', ['listaId', 'itemId'], { unique: true });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}



export function withStore(db, storeName, mode = 'readonly') {
  const tx = db.transaction(storeName, mode);
  return tx.objectStore(storeName);
}