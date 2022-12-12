import '../style/style.css';
import mynav from './components/navbar';

mynav();

if (window.location.href.includes('/dashboard/')) {
  if (!localStorage.getItem('user')) {
    window.location.href = '/';
  }
}

if (window.location.href.includes('/login') || window.location.href.includes('/signup')) {
  if (localStorage.getItem('user')) {
    window.location.href = '/';
  }
}
