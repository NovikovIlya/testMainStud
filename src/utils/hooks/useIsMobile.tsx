export function isMobileDevice() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  
    // Регулярное выражение для проверки мобильных устройств
    const regexp = /iPhone|iPod|iPad|Android|BlackBerry|Opera Mini|IEMobile/i;
  
    return regexp.test(userAgent);
}