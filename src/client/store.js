import { purchaseShip } from './networking';

// UI Elements

const store = document.getElementById('store');

// Event listeners

document.getElementById('purchase-sloop').addEventListener('click', purchaseShip);
document.getElementById('purchase-caravel').addEventListener('click', purchaseShip);

// UI Actions

export const setStoreHidden = hidden => {
  if (hidden) {
    store.classList.add('hidden');
  } else {
    store.classList.remove('hidden');
  }
};

export const toggleStoreHidden = () => {
  if (store.classList.contains('hidden')) {
    store.classList.remove('hidden');
  } else {
    store.classList.add('hidden');
  }
};
