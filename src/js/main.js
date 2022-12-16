import '../style/style.css';
import { menuOpen, mynav } from './components/navbar';

const hamburgerMenu = document.querySelector('#hamburger');

if (window.location.href.includes('/dashboard/') && !window.location.href.includes('/dashboard/add-profile-pic') && !window.location.href.includes('/dashboard/update-avatar')) {
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
