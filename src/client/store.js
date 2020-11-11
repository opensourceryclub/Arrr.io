import { purchaseShip } from './networking';

// UI Elements

const store = document.getElementById('store');
const storeItems = document.getElementById('store-items');

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

// Add items to the store

const items = [
  { name: 'sloop', goldCost: 250 },
  // { name: 'caravel', goldCost: 500 },
];

items.forEach(item => {
  const storeItem = document.createElement('div');
  storeItem.classList.add('store-item');
  storeItems.insertAdjacentElement('beforeend', storeItem);

  storeItem.innerHTML = `
    <img src="/assets/${item.name.toLowerCase()}.png">
    <h3>${item.name}</h3>
    <button id="purchase-${item.name}">${item.goldCost}</button>
  `;

  document.getElementById(`purchase-${item.name}`).addEventListener('click', purchaseShip);
});

// Add event listeners to store close store button

document.getElementById('close-store').addEventListener('click', toggleStoreHidden);
