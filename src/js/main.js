import '../style/style.css';
import { menuOpen, mynav } from './components/navbar';

mynav();

const hamburgerMenu = document.querySelector('#hamburger');

if (window.location.href.includes('/dashboard/')) {
  if (!localStorage.getItem('user')) {
    window.location.href = '/';
  }
  hamburgerMenu.onclick = function triggerNav() {
    menuOpen('dashboardNav', 'dashboard-nav');
  };
} else {
  hamburgerMenu.onclick = function triggerNav() {
    menuOpen('mobileNav', 'test');
  };
}

if (window.location.href.includes('/login') || window.location.href.includes('/signup')) {
  if (localStorage.getItem('user')) {
    window.location.href = '/';
  }
}
