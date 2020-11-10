// UI Elements

const hud = document.getElementById('hud');
const gold = document.getElementById('gold');
const ship = document.getElementById('ship');
const speed = document.getElementById('speed');
const position = document.getElementById('position');

// UI Actions

export const updateHUD = data => {
  gold.innerText = `Gold: ${data.gold}`;
  ship.innerText = `Ship: ${data.ship}`;
  speed.innerText = `Speed: ${Math.floor(data.speed)}`;
  position.innerText = `Position: x:${Math.floor(data.x)}, y:${Math.floor(data.y)}`;
};

export const setHUDHidden = hidden => {
  if (hidden) {
    hud.classList.add('hidden');
  } else {
    hud.classList.remove('hidden');
  }
};

// Event Listeners
