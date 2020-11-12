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
  { name: 'sloop', goldCost: 250, stats: [{ name: 'Health', val: 100 }, { name: 'Storage', val: 2 }, { name: 'Cannons', val: 2 }, { name: 'Speed', val: 20 }] },
  { name: 'caravel', goldCost: 600, stats: [{ name: 'Health', val: 175 }, { name: 'Storage', val: 4 }, { name: 'Cannons', val: 4 }, { name: 'Speed', val: 20 }] },
  { name: 'frigate', goldCost: 2500, stats: [{ name: 'Health', val: 500 }, { name: 'Storage', val: 10 }, { name: 'Cannons', val: 10 }, { name: 'Speed', val: 16 }] },
];

items.forEach(item => {
  const storeItem = document.createElement('div');
  storeItem.classList.add('store-item');
  storeItems.insertAdjacentElement('beforeend', storeItem);

  const itemNameLowercase = item.name.toLowerCase();
  const itemAsset = itemNameLowercase;
  const itemName = item.name[0].toUpperCase() + item.name.substring(1);
  const goldCost = item.goldCost;

  let statsHTML = '';
  item.stats.forEach(stat => {
    statsHTML += `
      <div class="store-item-stat">
        <div class="item-stat">
          <img class="item-stat-image" src=""></img>
          <p class="item-stat-name">${stat.name}</p>
        </div>
        <p class="item-stat-val">${stat.val}</p>
      </div>
    `;
  });

  storeItem.innerHTML = `
    <div class="store-item-header">
      <p class="store-item-header-text">${itemName}</p>
    </div>
    <div class="store-item-image">
      <img class="item-image" src="/assets/sloop.png">
    </div>
    <div class="store-item-stats">
      ${statsHTML}
    </div>
    <div class="store-item-purchase">
      <button id="purchase-${itemNameLowercase}">${goldCost}</button>
    </div>
  `;

  document.getElementById(`purchase-${item.name}`).addEventListener('click', purchaseShip);
});

// Add event listeners to store close store button

document.getElementById('close-store').addEventListener('click', toggleStoreHidden);
