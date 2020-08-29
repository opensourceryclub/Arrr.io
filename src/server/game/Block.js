/* Is a block placed in the scene */

// import { generateNumericID } from './Utils.js'
const generateNumericID = require('./Utils').generateNumericID;


let friction = 0.98
let bounce = 0.25

let allObjects = {}

class Block {

    /* Creates a new object */
    constructor ( posX, posY, sizeX, sizeY, vx, vy ){

        this.posX = posX
        this.posY = posY

        this.sizeX = sizeX
        this.sizeY = sizeY
        
        this.right = posX + sizeX
        this.bottom = posY + sizeY

        this.vx = vx
        this.vy = vy

        // Gives each block an id in the scene
        this.id = generateNumericID()
        allObjects[this.id] = this
    }

    move ( collision ){
        
        // X motion
        if ( this.vx != 0 ){

            let [ hit, id ] = collision.checkMovementOnAxis( this.id, this.vx, 'x' )
            if ( !hit ){
                this.posX += this.vx;
                collision.moveObjectOnAxis( this.id, this.vx, 'x')
            }
            else {
                allObjects[ id ].vx = ( allObjects[ id ].vx + this.vx ) / 2
                this.vx = allObjects[ id ].vx + ((this.vx - allObjects[ id ].vx) * -1)
                
            }
            this.vx *= friction;
            if ( Math.abs(this.vx) < 0.01 ) this.vx = 0

        }

        // Y motion
        if ( this.vy != 0 ){

            let [ hit, id ] = collision.checkMovementOnAxis( this.id, this.vy, 'y' )
            if ( !hit ){
                this.posY += this.vy;
                collision.moveObjectOnAxis( this.id, this.vy, 'y')
            }
            else {
                allObjects[ id ].vy = ( allObjects[ id ].vy + this.vy ) / 2
                this.vy = allObjects[ id ].vy + ((this.vy - allObjects[ id ].vy) * -1)
            }
            this.vy *= friction;
            if ( Math.abs(this.vy) < 0.01 ) this.vy = 0
            
        }
    }

    /* Draw the block */
    render ( ctx ){
        
        ctx.fillStyle  = "rgb(191, 224, 255)";
        ctx.fillRect( this.posX - this.vx * 3, this.posY - this.vy * 3, this.sizeX, this.sizeY )
        ctx.fillStyle  = "rgb(105, 180, 250)";
        ctx.fillRect( this.posX, this.posY, this.sizeX, this.sizeY )
        ctx.beginPath();
        ctx.rect( this.posX, this.posY, this.sizeX, this.sizeY )
        ctx.stroke();
    }

}

module.exports = Block 