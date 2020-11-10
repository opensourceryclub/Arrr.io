const gold = document.getElementById('gold');
const ship = document.getElementById('ship');
const speed = document.getElementById('speed');
const position = document.getElementById('position');

function updateHUD(data) {
  gold.innerText = `Gold: ${data.gold}`;
  ship.innerText = `Ship: ${data.ship}`;
  speed.innerText = `Speed: ${Math.floor(data.speed)}`;
  position.innerText = `Position: x:${Math.floor(data.x)}, y:${Math.floor(data.y)}`;
}

module.exports = { updateHUD };
