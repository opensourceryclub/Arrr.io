This directory contains the JSON data for the ships that players can use in the game. The ship schema descibes all the aspects of the ships.

| Property | Description |
|---|---|
| type | A unique value for this ship schema |
| hitbox | A set of points that defines the hitbox for this ship |
| cannons | An object that describes the cannons for this ship |
| cannons.sides | A 2D array that represents the number of cannons on the left [0] and right [1] of the ship |
| cannons.strength | The damage that any cannon shots will do |
| cannons.speed | The velocity per second that any cannon shots will have |
| cannons.cooldown | The number of milliseconds that these cannons take to reload |
| hull | An object that describes the ship's hull |
| hull.maxHp | The max health points for this ship |
| hull.hp | The current health points for this ship |
| hull.armor | The armor rating (modifies the damage taken) |
| hull.length | The ship's length |
| hull.width | The ship's width |
| steering | An object that describes the steering ability of the ship |
| steering.angle | The max steering angle for the ship's rudder |
| speed | An object that describes the speed ability of the ship |
| speed.maxSpeed | The max speed per second for the ship | 
| speed.acceleration | The acceleration per second for the ship |
| cargo | An object that describes the ship's cargo |
| cargo.maxCapacity | The max units of storage that the ship has | 
| cargo.capacity | The units of storage the ship is using | 
| cargo.store | An array of the contents of the ships cargo | 

```json
{
  "type": 1,
  "hitbox": [[0, 0], [20, 0], [20, 20], [0, 20]],
  "cannons":  {
    "sides": [2, 1],
    "strength": 1,
    "speed": 1
  },
  "hull": {
    "hp": 10,
    "armor": 1,
    "length": 20,
    "width": 5
  },
  "steering": {
    "angle": 0.20
  },
  "speed": {
    "maxSpeed": 10,
    "acceleration": 1
  },
  "cargo": {
    "capacity": 100,
    "capacityUsed": 0,
    "store": {},
  }
}
```

