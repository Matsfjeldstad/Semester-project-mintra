import { DateTime } from 'luxon';
import dashboardNav from './dashboard';

dashboardNav();

const endsAtInput = document.querySelector('#endsAtInput');

const nowDate = DateTime.now().toFormat('yyyy-MM-dd');
const nowDatejs = DateTime.now().toJSDate();
console.log(nowDatejs);
const nowTime = DateTime.now().toFormat('HH:mm');
endsAtInput.min = `${nowDate}T${nowTime}`;

const makeListingForm = document.querySelector('#makeListingForm');

makeListingForm.onsubmit = {};
