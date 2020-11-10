import { toggleStoreHidden } from './store';

// UI Elements

const buttons = document.getElementById('buttons');

// Event Listeners

document.getElementById('open-store').addEventListener('click', toggleStoreHidden);

// UI Actions

export const setButtonsHidden = hidden => {
  if (hidden) {
    buttons.classList.add('hidden');
  } else {
    buttons.classList.remove('hidden');
  }
};
