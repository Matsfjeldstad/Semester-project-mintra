export default function getProfilecheckIMG(imgElement) {
  const img = imgElement;
  img.onload = function loadImg() {
    img.className = 'duration-300 avatarIMG w-full h-full object-cover absolute top-0 left-0';
  };
  img.onerror = function errorImg() {
    img.remove();
  };
}
