/* Handles controlling of the scene itself */

// import { Block } from './Block.js'
// import { Collisions } from './Collisions.js'

const Block = require('./Block')
const Collisions = require('./Collisions')

class Scene {


    /* Creation of a scene */
    constructor () { 
        this.sceneObjects = []
        this.collisions = new Collisions() 
        this.update_speed = 0;
    }

    /* Insert a new block */
    createBlock ( posX, posY, sizeX, sizeY, vx, vy ) {
        let block = new Block( posX, posY, sizeX, sizeY, vx, vy )
        this.sceneObjects.push( block )
        this.collisions.insertBlockIntoCollision ( block )
        return block
    }


    /* Render the scene on context and updates objects */
    render ( ctx ) {

        ctx.fillStyle = 'white';
        ctx.fillRect(0,0,800,800)
        
        ctx.lineWidth = "2";
        ctx.strokeStyle = "rgb(18, 32, 120)";
        ctx.fillStyle  = "rgb(105, 180, 250)";
        ctx.font = "15px Arial";

        // Calcualtes time to do collision checks
        var start = performance.now()
        this.sceneObjects.forEach( e => e.move( this.collisions ) )
        var end = performance.now()

        this.sceneObjects.forEach( e => e.render( ctx ) )
 
        // Speed 
        let this_update = end-start
        this.update_speed = (this_update + (this.update_speed * 49)) / 50
        
        ctx.fillStyle  = "black";
        ctx.fillText("Blocks: " + this.sceneObjects.length, 10, 25);
        ctx.fillText("Instantanous Speed: " +  this_update.toFixed(3) + ' ms' , 10, 50);
        ctx.fillText("1-Sec Average: " + this.update_speed.toFixed(3) + ' ms'  , 10, 75);
    }

}

module.exports = Scene;

// export { Scene }