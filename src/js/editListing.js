/* eslint-disable prefer-destructuring */
import { singleListingURL } from './api/endpoints';
import dashboardNav from './components/dashboardNav';
import { getSingleListing } from './components/fetch-listings';
import { titleValidation } from './components/formValidation';

dashboardNav();
const userObject = JSON.parse(localStorage.getItem('user'));

const url = new URL(document.location);
const searchParams = new URLSearchParams(url.search);
const paramId = searchParams.get('id');
const formTitleInput = document.querySelector('#title');
const descriptionInput = document.querySelector('#description');
const tagsInput = document.querySelector('#tagsInput');
const mediaInput = document.querySelector('#mediaInput');
const mediaInputBtn = document.querySelector('#mediaInputBtn');
const formErrorContainer = document.querySelector('.formErrorContainer');
const mediaInputErrorContainer = mediaInput.parentElement.parentElement.querySelector('.errorContainer');
const imgPreviews = document.querySelector('.imgPreview');
const imgOverlay = document.createElement('div');
imgOverlay.className = 'duration-200 w-full h-full top-0 left-0 bg-black/50 z-10 absolute flex justify-center items-center font-bold text-3xl text-white hover:backdrop-blur-sm';
const main = document.querySelector('main');
let mediaArray = [];

function openImgModal(array) {
  const ImgModal = document.createElement('div');
  ImgModal.className = 'absolute top-0 left-0 bg-black/50 backdrop-blur-md h-full w-full z-[20] flex flex-col gap-3 justify-center items-center min-h-screen';
  ImgModal.innerHTML = `
            <h3 class="text-white font-bold text-2xl">
              You Images
            </h3>
            <p class="text-gray-300">Are you sure you want to delete this?</p>
            <div class="left-0 flex gap-2 w-fit max-w-full overflow-scroll p-6">
            <div id="imgContainer" class="relative flex gap-4">
            </div>
            </div>
            
            <button id="closeImgModal" class ='btn-ghost'>Close</button>
            `;

  const imgContainer = ImgModal.querySelector('#imgContainer');
  function closeImgModal() {
    if (mediaArray.length < 1) {
      imgOverlay.remove();
      imgPreviews.src = '';
    }
    imgOverlay.innerHTML = `${mediaArray.length}+`;
    ImgModal.remove();
  }
  array.forEach((img) => {
    const imgElementContainer = document.createElement('div');
    imgElementContainer.className = 'h-80 w-80 bg-lime-300 rounded-xl overflow-hidden relative';
    const imgDeleteButton = document.createElement('button');
    imgDeleteButton.classList = 'imgDelete duration-200 w-10 h-10 bg-red-200 flex justify-center items-center bg-white rounded-full absolute z-[35] top-3 right-3 hover:scale-110 hover:bg-red-300';
    imgDeleteButton.innerHTML = `
        <svg width="18" height="20" viewBox="0 0 18 20" xmlns="http://www.w3.org/2000/svg" class="w-3 fill-red-700">
          <path d="M17.25 3.5H13.5V2.75C13.4975 2.15402 13.2597 1.58316 12.8383 1.16174C12.4168 0.740313 11.846 0.502468 11.25 0.5H6.75C6.15402 0.502468 5.58316 0.740313 5.16174 1.16174C4.74031 1.58316 4.50247 2.15402 4.5 2.75V3.5H0.75C0.551088 3.5 0.360322 3.57902 0.21967 3.71967C0.0790178 3.86032 0 4.05109 0 4.25C0 4.44891 0.0790178 4.63968 0.21967 4.78033C0.360322 4.92098 0.551088 5 0.75 5H1.5V18.5C1.5 18.8978 1.65804 19.2794 1.93934 19.5607C2.22064 19.842 2.60218 20 3 20H15C15.3978 20 15.7794 19.842 16.0607 19.5607C16.342 19.2794 16.5 18.8978 16.5 18.5V5H17.25C17.4489 5 17.6397 4.92098 17.7803 4.78033C17.921 4.63968 18 4.44891 18 4.25C18 4.05109 17.921 3.86032 17.7803 3.71967C17.6397 3.57902 17.4489 3.5 17.25 3.5ZM7.5 14.75C7.5 14.9489 7.42098 15.1397 7.28033 15.2803C7.13968 15.421 6.94891 15.5 6.75 15.5C6.55109 15.5 6.36032 15.421 6.21967 15.2803C6.07902 15.1397 6 14.9489 6 14.75V8.75C6 8.55109 6.07902 8.36032 6.21967 8.21967C6.36032 8.07902 6.55109 8 6.75 8C6.94891 8 7.13968 8.07902 7.28033 8.21967C7.42098 8.36032 7.5 8.55109 7.5 8.75V14.75ZM12 14.75C12 14.9489 11.921 15.1397 11.7803 15.2803C11.6397 15.421 11.4489 15.5 11.25 15.5C11.0511 15.5 10.8603 15.421 10.7197 15.2803C10.579 15.1397 10.5 14.9489 10.5 14.75V8.75C10.5 8.55109 10.579 8.36032 10.7197 8.21967C10.8603 8.07902 11.0511 8 11.25 8C11.4489 8 11.6397 8.07902 11.7803 8.21967C11.921 8.36032 12 8.55109 12 8.75V14.75ZM12 3.5H6V2.75C6 2.55109 6.07902 2.36032 6.21967 2.21967C6.36032 2.07902 6.55109 2 6.75 2H11.25C11.4489 2 11.6397 2.07902 11.7803 2.21967C11.921 2.36032 12 2.55109 12 2.75V3.5Z"/>
        </svg>`;
    const imgElement = document.createElement('img');
    imgElement.className = 'relative w-full h-full top-0 left-0 z-[30] object-cover';
    imgElement.src = img;
    imgElementContainer.append(imgElement, imgDeleteButton);
    imgContainer.appendChild(imgElementContainer);
    const deleteImgBTNs = ImgModal.querySelectorAll('.imgDelete');
    deleteImgBTNs.forEach((deleteImgBTN) => {
      const btn = deleteImgBTN;
      btn.onclick = () => {
        const currentImg = btn.parentElement.querySelector('img');
        const index = mediaArray.indexOf(currentImg.src);
        mediaArray.splice(index, 1);
        if (mediaArray.length <= 0) {
          closeImgModal();
        }
        btn.parentElement.remove();
      };
    });
  });
  main.prepend(ImgModal);
  const closeImgModalBtn = ImgModal.querySelector('#closeImgModal');
  closeImgModalBtn.onclick = () => { closeImgModal(); };
}

(async () => {
  const listingFetch = await getSingleListing(paramId);
  if (listingFetch.response.ok) {
    const listingData = listingFetch.data;
    formTitleInput.value = listingData.title;
    if (listingData.description) {
      descriptionInput.value = listingData.description;
    }
    if (listingData.tags.length > 0) {
      listingData.tags.forEach((tag) => {
        tagsInput.value += `${tag},`;
      });
      // removes the last character of the input.
      tagsInput.value = tagsInput.value.substring(0, tagsInput.value.length - 1);
    }
    if (listingData.media.length > 0) {
      listingData.media.forEach((img) => {
        mediaArray.push(img);
        imgPreviews.src = listingData.media[0];
        imgOverlay.innerHTML = `${listingData.media.length}+`;
        imgPreviews.parentElement.prepend(imgOverlay);
        imgOverlay.onclick = () => {
          openImgModal(mediaArray);
        };
      });
    }
  }

  const makeListingForm = document.querySelector('#makeListingForm');

  let tagArray = [];
  if (tagsInput.value) {
    const spitTags = tagsInput.value.split(',');
    tagArray = spitTags.map((tag) => tag.trim());
  }
  tagsInput.onkeyup = function splitArray() {
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

  mediaInputBtn.onclick = function addImgToArray(e) {
    e.preventDefault();
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
        // console.log(mediaArray);
        mediaInputErrorContainer.innerHTML = '';
        return true;
      });
    }
    if (mediaArray.length > 0) {
      imgPreviews.src = mediaArray[0];
      imgOverlay.innerHTML = `${mediaArray.length}+`;
      imgPreviews.parentElement.prepend(imgOverlay);
      imgOverlay.onclick = () => {
        openImgModal(mediaArray);
      };
    }
  };

  async function updateListing(listingBody) {
    try {
      const response = await fetch(singleListingURL(paramId), {
        method: 'PUT',
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

  makeListingForm.onsubmit = function fomrSubmit(e) {
    e.preventDefault();
    const bodyObject = {};
    titleValidation(formTitleInput);
    if (titleValidation(formTitleInput)) {
      bodyObject.title = formTitleInput.value;
      bodyObject.description = descriptionInput.value.trim();
      bodyObject.tags = tagArray;
      bodyObject.media = mediaArray;
      updateListing(bodyObject);
    }
  };
})();
