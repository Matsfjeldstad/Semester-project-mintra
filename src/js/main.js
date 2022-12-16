import '../style/style.css';
import { menuOpen, mynav } from './components/navbar';

const hamburgerMenu = document.querySelector('#hamburger');

if (window.location.href.includes('/dashboard/')) {
  if (!localStorage.getItem('user')) {
    window.location.href = '/';
  }
  hamburgerMenu.onclick = function triggerNav() {
    menuOpen('dashboardNav', 'dashboard-nav');
  };
}

if (window.location.href.includes('/login') || window.location.href.includes('/signup')) {
  if (localStorage.getItem('user')) {
    window.location.href = '/';
  }
}

if (!window.location.href.includes('/login') && !window.location.href.includes('/signup') && !window.location.href.includes('/dashboard/')) {
  mynav();
  hamburgerMenu.onclick = function triggerNav() {
    menuOpen('mobileNav', 'test');
  };
}
