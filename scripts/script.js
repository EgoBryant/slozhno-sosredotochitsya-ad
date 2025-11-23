// ============================================
// ПЕРЕКЛЮЧЕНИЕ ТЕМ (Light / Dark / Auto)
// ============================================

const themeButtons = document.querySelectorAll('.header__theme-menu-button');
const page = document.querySelector('.page');

// Константы для названий тем
const THEME_LIGHT = 'light';
const THEME_DARK = 'dark';
const THEME_AUTO = 'auto';

/**
 * Применяет выбранную тему к странице
 * @param {string} theme - Название темы ('light', 'dark' или 'auto')
 */
function changeTheme(theme) {
  // Убираем все классы тем
  page.classList.remove('theme_light', 'theme_dark', 'theme_auto');
  
  // Добавляем новый класс темы
  page.classList.add(`theme_${theme}`);
  
  // Сохраняем выбор в localStorage
  localStorage.setItem('theme', theme);
}

/**
 * Обновляет состояние кнопок (активная/неактивная)
 * @param {string} theme - Текущая активная тема
 */
function updateButtons(theme) {
  // Убираем активное состояние со всех кнопок
  themeButtons.forEach((btn) => {
    btn.classList.remove('header__theme-menu-button_active');
    btn.removeAttribute('disabled');
  });
  
  // Находим кнопку с классом текущей темы и делаем её активной
  const activeButton = document.querySelector(
    `.header__theme-menu-button_type_${theme}`
  );
  
  if (activeButton) {
    activeButton.classList.add('header__theme-menu-button_active');
    activeButton.setAttribute('disabled', true);
  }
}

/**
 * Инициализирует тему при загрузке страницы
 * Если тема сохранена в localStorage, применяет её
 * Иначе использует 'auto' (системные предпочтения)
 */
function initTheme() {
  const savedTheme = localStorage.getItem('theme') || THEME_AUTO;
  changeTheme(savedTheme);
  updateButtons(savedTheme);
}

/**
 * Добавляет обработчики событий на все кнопки переключения тем
 */
function setupThemeButtons() {
  themeButtons.forEach((button) => {
    button.addEventListener('click', () => {
      // Определяем, какую тему выбрали
      let selectedTheme;
      
      if (button.classList.contains('header__theme-menu-button_type_light')) {
        selectedTheme = THEME_LIGHT;
      } else if (button.classList.contains('header__theme-menu-button_type_dark')) {
        selectedTheme = THEME_DARK;
      } else if (button.classList.contains('header__theme-menu-button_type_auto')) {
        selectedTheme = THEME_AUTO;
      }
      
      // Применяем тему и обновляем кнопки
      changeTheme(selectedTheme);
      updateButtons(selectedTheme);
    });
  });
}

/**
 * Слушаем изменения системных предпочтений
 * Если выбрана 'auto' тема, она автоматически обновится
 */
function setupSystemThemeListener() {
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    const currentTheme = localStorage.getItem('theme');
    
    // Если пользователь выбрал 'auto', перепроверяем системные настройки
    if (currentTheme === THEME_AUTO || !currentTheme) {
      changeTheme(THEME_AUTO);
    }
  });
}

/**
 * Главная функция инициализации
 * Вызывается при загрузке DOM
 */
function init() {
  initTheme();
  setupThemeButtons();
  setupSystemThemeListener();
}

// Запускаем инициализацию после загрузки DOM
document.addEventListener('DOMContentLoaded', init);

// Если DOM уже загружен (при динамической вставке скрипта)
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
