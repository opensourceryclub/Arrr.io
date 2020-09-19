function updateBullets(dt, bullets) {
  const bulletsToRemove = [];
  bullets.forEach(bullet => {
    if (bullet.update(dt)) {
      bulletsToRemove.push(bullet);
    }
  });
  return bullets.filter(bullet => !bulletsToRemove.includes(bullet));
}

module.exports = updateBullets
