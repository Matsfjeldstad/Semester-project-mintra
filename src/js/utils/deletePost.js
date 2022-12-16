const userObject = JSON.parse(localStorage.getItem('user'));

async function deleteForm(id) {
  try {
    const response = await fetch(`https://nf-api.onrender.com/api/v1/auction/listings/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userObject.accessToken}`,
      },
    });
    const data = await response.json();
    return { response, data };
  } catch (err) {
    return err;
  }
}

export default deleteForm;
