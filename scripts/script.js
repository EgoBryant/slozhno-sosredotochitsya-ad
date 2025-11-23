// ✅ ИСПРАВЛЕННЫЙ КОД

const themeButtons = document.querySelectorAll('.header__theme-menu-button');

themeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    themeButtons.forEach((btn) => {
      btn.classList.remove('header__theme-menu-button_active');
      btn.removeAttribute('disabled');
    });
    if (
      [...button.classList].includes('header__theme-menu-button_type_light')
    ) {
      changeTheme('light');
    } else if (
      [...button.classList].includes('header__theme-menu-button_type_dark')
    ) {
      changeTheme('dark');
    } else {
      changeTheme('auto');
    }
    button.classList.add('header__theme-menu-button_active');
    button.setAttribute('disabled', true);
  });
});

function changeTheme(theme) {
  const page = document.querySelector('.page');
  // Убираем старые классы тем
  page.classList.remove('theme_light', 'theme_dark', 'theme_auto');
  // Добавляем новый класс темы
  page.classList.add(`theme_${theme}`);
  localStorage.setItem('theme', theme);
}

function initTheme() {
  const theme = localStorage.getItem('theme') || 'auto';
  changeTheme(theme);
  
  themeButtons.forEach((btn) => {
    btn.classList.remove('header__theme-menu-button_active');
    btn.removeAttribute('disabled');
  });
  
  const activeButton = document.querySelector(
    `.header__theme-menu-button_type_${theme}`
  );
  if (activeButton) {
    activeButton.classList.add('header__theme-menu-button_active');
    activeButton.setAttribute('disabled', true);
  }
}

initTheme();
