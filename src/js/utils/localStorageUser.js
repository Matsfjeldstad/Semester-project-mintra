const userObject = JSON.parse(localStorage.getItem('user'));

const userToken = userObject.accessToken;
const userName = userObject.name;
const userEmail = userObject.email;

export { userToken, userEmail, userName };
