/**
 * Salva um valor no localStorage, convertendo para string JSON
 * @param {string} key - chave para armazenar o dado
 * @param {any} value - valor a ser salvo (qualquer tipo serializável em JSON)
 */
export function saveInLocalStorage(key, value) {
  try {
    const valorSerializado = JSON.stringify(value);
    localStorage.setItem(key, valorSerializado);
  } catch (error) {
    console.error('Erro ao salvar item no localStorage:', error);
  }
}

/**
 * Recupera um valor do localStorage e converte de JSON para objeto
 * @param {string} key - chave do dado a recuperar
 * @returns {any|null} - valor armazenado, ou null se não existir ou erro
 */
export function loadInLocalStorageItem(key) {
  try {
    const valorSerializado = localStorage.getItem(key);
    if (!valorSerializado) { return null };
    return JSON.parse(valorSerializado);
  } catch (error) {
    console.error('Erro ao pegar item do localStorage:', error);
    return null;
  }
}

/**
 * Remove um item do localStorage
 * @param {string} key - chave do dado a remover
 */
export function removeItem(key) {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Erro ao remover item do localStorage:', error);
  }
}