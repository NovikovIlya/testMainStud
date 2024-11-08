// Текущая версия хранилища
export const STORAGE_VERSION = '1.0.1';

// Ключ для хранения версии
const VERSION_KEY = 'app_storage_version';

export function checkAndResetStorage() {
  const currentVersion = localStorage.getItem(VERSION_KEY);
  
  // Если версии нет или она отличается от текущей
  if (currentVersion !== STORAGE_VERSION) {
    // Очищаем всё хранилище
    localStorage.clear();
    
    // Устанавливаем новую версию
    localStorage.setItem(VERSION_KEY, STORAGE_VERSION);
    
    return true; // хранилище было сброшено
  }
  
  return false; // сброс не требовался
}