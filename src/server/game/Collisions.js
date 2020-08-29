/*
    Registers collisions on the scene through a span and sweep method
    Insertion of new objects is slow ( reletivly )
    Shifting objects around is fast
*/

// import { binaryInsertIndex, swapValues } from './Utils.js'
const Utils = require('./Utils');

const binaryInsertIndex = Utils.binaryInsertIndex;
const swapValues = Utils.swapValues;

class Collisions {

    constructor () {
        // For each axis in the scene, keep an ordered
        // List of each object id and its position
        // Each item represents the start or end of an object on a given span
        this.spans = { 'x' : [], 'y' : [] }

        // Keeps track of what objects are hitting what
        // Also provides a link from object id to its location in given spans
        this.object_tracker = {}
    }



    /* Insertion of new object */

    insertBlockIntoCollision ( block ) {

        // Everything is referenced through this id
        let id = block.id

        // Create link between a given object id and its position in the scene 
        this.object_tracker[ id ] = { 'x' : [-1,-1], 'y' : [-1,-1], 'spans' : {} }

        // Insert each of the four identiying value of the blocks
        // The true or false determines if this is the start or the end of a block on a given axis
        this.insertValueOnAxis ( block.posX, id, true, 'x' )
        this.insertValueOnAxis ( block.right, id, false, 'x' )

        // Update the spans on that axis to include a new block ( rather slow )
        this.registerNewIdOnAxis( id, 'x' )

        // Do the same for the y axis
        this.insertValueOnAxis ( block.posY, id, true, 'y' )
        this.insertValueOnAxis ( block.bottom, id, false, 'y' )
        this.registerNewIdOnAxis( id, 'y' )

    }

    insertValueOnAxis ( position, id, start, axis ){

        // Create a a three-value constant array to represent span marker
        // Position: position on given axis
        // Id : block_id
        // Start: if this is the start or end of the span
        const insertion = [position, id, start ]
        let target_span = this.spans[axis]

        // Gets the index that the insertion needs to happen at
        let insertion_index = binaryInsertIndex( target_span, position, e => e[0] )
        
        // Sets the target block's insertion index
        this.object_tracker[ id ][ axis ][ start ? 0 : 1 ] = insertion_index

        // Shifts the pointers from other object_collisions to make room
        this.shiftSpanPointersOnObjectChange( insertion_index, axis, 1)

        // Inserts the pointer
        target_span.splice( insertion_index, 0, insertion)

    }

    /* Updating an the spans when objects are added or removed */

    // Shifts all the block's pointers over to make room for insertion or deletion
    shiftSpanPointersOnObjectChange ( index, axis, amount ){
        
        let target_span = this.spans[axis]

        for (; index < target_span.length; index++ ){

            let [pos, block_id, start] = target_span[ index ]
            let span_index = start ? 0 : 1

            this.object_tracker[ block_id ][ axis ][ span_index ] += amount

        }
    }

    // Registers a new span by sweeping through the array and inserting the values into place
    registerNewIdOnAxis (id, axis) {

        let target_span = this.spans[axis]
        let in_new_span = false;

        // Set of all open object ids currently active
        // Items are added to this when their 'begin' is seen
        // Items are removed when their 'end' is seen
        let open_spans = new Set()

        // Go through the whole span in O(n)
        for ( let i = 0; i < target_span.length; i++){

            // Get the info about every index
            let [pos, block_id, start] = target_span[ i ]

            // Just found the start of a new block
            if ( start ){

                // Found target span
                if ( block_id == id ) {
                    // Add mappings for all the open spans
                    open_spans.forEach( e => this.addAxisCollision( e, id ))
                    // Register you are now in your span
                    in_new_span = true;
                }
                
                // Object inside target span
                else if ( in_new_span )
                    this.addAxisCollision( block_id, id )

                // Register new span
                open_spans.add( block_id )
            }
            else{

                // Found end of target span, no need to be here any more
                if ( block_id == id )
                    break;

                // Remove objects when you find their ends
                open_spans.delete(block_id)
            }

        }

    }

    /* Collision Detection */

    // Checks if a given movement along a given axis will hit anything
    checkMovementOnAxis ( id, delta, axis ){
        
        // Easy check
        if ( delta == 0 ) return []

        // Gets the indexes of the start and end of this object on the given axis
        let [index_low, index_high] = this.object_tracker[ id ][ axis ]
        
        // Moving forward
        if ( delta > 0){
            let target_value = this.spans[ axis ][ index_high ][ 0 ] + delta
            return  this.checkMovementWithCollisionSweepOnAxis( axis, index_high, target_value, 1, id)
        }
        // Moving backwards
        else{
            let target_value = this.spans[ axis ][ index_low ][ 0 ] + delta
            return  this.checkMovementWithCollisionSweepOnAxis( axis, index_low, target_value, -1, id)
        }
    }

    // Takes a given index on an axis, sweeps through and finds all the indexs you collide with
    checkMovementWithCollisionSweepOnAxis ( axis, index, target, increment, id){

        let target_span = this.spans[ axis ]
        let end = increment > 0 ? target_span.length : -1
        
        // Go through the axis in a given direction, stating at the next index
        let check_index = index + increment
        for (; check_index != end; check_index += increment ){

            // Get the next point along the axis
            let [ _pos, _id, _start ] = target_span[ check_index ]

            // Moving down the list and the next element is lowwer than your target
            // Then you are done as you have no where else to go
            if ( _pos < target && increment < 0) return [ false, 0]

            // Moving up the list and the next element is greater than your target
            // Then you are done as you have no where else to go
            if ( _pos > target && increment > 0) return [ false, 0]

            // Only certain indexes need to be considered

            // If you are moving forward and run into the start of an object
            if ( _start && increment > 0) {
                if (this.is_critical_id( _id, id))
                    return [ true, _id ]
            }

            // If you are moving back and run into the end of an object
            if ( !_start && increment < 0){
                if (this.is_critical_id( _id, id))
                    return [ true, _id ]
            }

            // All other cases could not result in a new collision!

        }

        return [ false, 0]

    }

    // Takes in a new potential collision, see if any would throw you over the limit
    is_critical_id  ( id1, id2 ) {
        return this.object_tracker[id1]['spans'][id2] == 1 || false
    }

    /* Object Motion */

    // Moves a given object by a delta
    moveObject ( id, dx, dy ){

        // Apply to each axis
        
        this.moveObjectOnAxis( id, dx, 'x' )
        this.moveObjectOnAxis( id, dy, 'y' )
    
    }

    // Moves an object on agiven axis
    moveObjectOnAxis ( id, delta, axis ) {

        // Quick check
        if ( delta == 0) return

        // Apply motion to both points on axis
        let [index_low, index_high] = this.object_tracker[ id ][ axis ]

        this.moveObjectPointOnAxis( index_low, delta, axis )
        this.moveObjectPointOnAxis( index_high, delta, axis )

    }

    // Moves a given index on an axis by a certain delta of pixels
    moveObjectPointOnAxis ( index, delta, axis){

        let target_span = this.spans[ axis ]

        // Gets the new target value for the point
        let [ value, id, start] = target_span[ index ]
        let target_value = value + delta

        // Gets the bounds for the loop
        let increment = delta > 0 ? 1 : -1
        let end = delta > 0 ? target_span.length : -1

        // Loop over values on given axis span
        let check_index = index + increment;
        for ( ; check_index != end; check_index += increment ) {

            let [ _value, _id, _start] = target_span[ check_index ]
            // Break when the object has hit its furthest point
            if ( _value > target_value && increment > 0) break;
            if ( _value < target_value && increment < 0) break;

            // Swap values if the values are not in order
            swapValues( target_span, check_index, check_index - increment)
            
            // Update object tracker pointers
            this.object_tracker[_id][ axis ][_start ? 0 : 1] -= increment

            // Update collision now that object order is different
            
            // Front edge moves out of a span
            if ( increment > 0 && start && !_start ) this.removeAxisCollision( id, _id)
            // Back edge moved into a span
            if ( increment > 0 && !start && _start ) this.addAxisCollision( id, _id)
            // Front edge moves into a span
            if ( increment < 0 && start && !_start ) this.addAxisCollision( id, _id)
            // Back edge moved out of a span
            if ( increment < 0 && !start && _start ) this.removeAxisCollision( id, _id)
            

        }

        let final_index = check_index - increment
        // Set the final value and the span pointer for the object
        target_span[ final_index ][ 0 ] = target_value
        this.object_tracker[ id ][ axis ][start ? 0 : 1] = final_index

    }

    /* Adjust axis collisions */

    // Add a collision between two ids both ways
    addAxisCollision ( id1, id2) {

        // Add a collision both ways
        this.addOneWayObjectCollision( id1, id2 )
        this.addOneWayObjectCollision( id2, id1 )

    }
    
    // Add a one way collision betwen objects
    addOneWayObjectCollision ( id1, id2 ){
        let target_collision_span = this.object_tracker[id1]['spans']
        
        // See if key exists, if not, 1 collision
        if (! (id2 in target_collision_span) )
            target_collision_span[ id2 ] = 1

        // Key allready exists? add another collision
        else
            target_collision_span[ id2 ] += 1
    }

    // Remove collision both ways
    removeAxisCollision ( id1, id2){

        this.removeOneWayObjectCollision ( id1, id2 )
        this.removeOneWayObjectCollision ( id2, id1 )

    }

    // Remove collision one way
    removeOneWayObjectCollision ( id1, id2 ){
        
        let target_collision_span = this.object_tracker[id1]['spans']

        // Remove collision
        target_collision_span[ id2 ] -= 1

        // See if value now 0, if so, remove the key
        if ( target_collision_span[id2] == 0 )
            delete target_collision_span[id2]

    }

    /* Debug info */

    debugLog () {
        console.log( this.spans )
        console.log( this.object_tracker )
    }


}

module.exports = Collisions
