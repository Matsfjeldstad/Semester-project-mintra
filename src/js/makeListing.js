/* eslint-disable prefer-destructuring */
import { DateTime } from 'luxon';
import { allListingURL } from './api/endpoints';
import dashboardNav from './components/dashboardNav';
import { titleValidation } from './components/formValidation';

dashboardNav();
const userObject = JSON.parse(localStorage.getItem('user'));

const formTitleInput = document.querySelector('#title');
const descriptionInput = document.querySelector('#description');
const endsAtInput = document.querySelector('#endsAtInput');
const tagsInput = document.querySelector('#tagsInput');
const mediaInput = document.querySelector('#mediaInput');
const mediaInputBtn = document.querySelector('#mediaInputBtn');
const formErrorContainer = document.querySelector('.formErrorContainer');

const nowDate = DateTime.now().toFormat('yyyy-MM-dd');
const nowTime = DateTime.now().toFormat('HH:mm');
endsAtInput.min = `${nowDate}T${nowTime}`;

const makeListingForm = document.querySelector('#makeListingForm');

let tagArray = [];
tagsInput.onkeyup = function tagSplit() {
  const spitTags = tagsInput.value.split(',');
  tagArray = spitTags.map((tag) => tag.trim());
  tagArray = tagArray.filter((value, index) => {
    if (tagArray.indexOf(value) !== index) {
      if (tagArray.indexOf(value) < tagArray.lastIndexOf(value)) {
        return false;
      }
    }
    return true;
  });
};

const isValidUrl = (urlString) => {
  try {
    return Boolean(new URL(urlString));
  } catch (e) {
    return false;
  }
};

const mediaInputErrorContainer = mediaInput.parentElement.parentElement.querySelector('.errorContainer');
const imgPreviews = document.querySelectorAll('.imgPreview');

let mediaArray = [];
mediaInputBtn.onclick = function addImgToArray(e) {
  e.preventDefault();
  if (mediaArray.length > 2) {
    mediaInputBtn.disabled = true;
  }
  if (mediaArray.length < 3) {
    if (isValidUrl(mediaInput.value.trim())) {
      mediaArray.push(mediaInput.value.trim());
      mediaInput.value = '';
      mediaArray = mediaArray.filter((value, index) => {
        if (mediaArray.indexOf(value) !== index) {
          if (mediaArray.indexOf(value) < mediaArray.lastIndexOf(value)) {
            mediaInputErrorContainer.innerHTML = 'this img is already loaded...';
            return false;
          }
        }
        mediaInputErrorContainer.innerHTML = '';
        return true;
      });
    }
  }
  if (mediaArray.length > 0 && mediaArray.length < 2) {
    imgPreviews[0].src = mediaArray[0];
  }
  if (mediaArray.length > 1 && mediaArray.length < 3) {
    imgPreviews[1].src = mediaArray[1];
  }
  if (mediaArray.length > 2 && mediaArray.length < 4) {
    imgPreviews[2].src = mediaArray[2];
  }
};

imgPreviews.forEach((img) => {
  const currentImg = img;
  currentImg.onerror = function imgError() {
    const index = mediaArray.indexOf(currentImg.src);
    if (index > -1) { // only splice array when item is found
      mediaArray.splice(index, 1); // 2nd parameter means remove one item only
    }
    currentImg.src = '/mintra.jpg';
    mediaInputErrorContainer.innerHTML = 'You entered a broken URL, please enter a valid one';
  };
});

async function postListing(listingBody) {
  try {
    const response = await fetch(allListingURL(), {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userObject.accessToken}`,
      },
      body: JSON.stringify(listingBody),
    });
    const data = await response.json();
    if (response.ok) {
      window.location.href = `/spesific-listing.html?id=${data.id}`;
    } else {
      formErrorContainer.innerHTML = data.errors[0].message;
      formErrorContainer.classList.remove('hidden');
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
}

makeListingForm.onsubmit = function formSubmit(e) {
  e.preventDefault();
  const bodyObject = {};
  titleValidation(formTitleInput);
  titleValidation(endsAtInput);
  if (titleValidation(formTitleInput) && titleValidation(endsAtInput)) {
    bodyObject.title = formTitleInput.value;
    bodyObject.endsAt = endsAtInput.value;
    bodyObject.description = descriptionInput.value.trim();
    bodyObject.tags = tagArray;
    bodyObject.media = mediaArray;
    postListing(bodyObject);
  }
};
