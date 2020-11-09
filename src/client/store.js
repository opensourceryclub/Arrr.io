// Handle all interactions with the store menu

import { purchaseShip } from './networking';

export const setStoreHidden = hidden => {
  const store = document.getElementById('store');
  if (hidden) {
    store.classList.add('hidden');
  } else {
    store.classList.remove('hidden');
  }
};

document.getElementById('purchase-sloop').addEventListener('click', purchaseShip);
document.getElementById('purchase-caravel').addEventListener('click', purchaseShip);
