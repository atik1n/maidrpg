export class MaidRPGActor extends Actor {
  /**
    * Augment the basic actor data with additional dynamic data.
    */
   prepareData() {
     super.prepareData();

     const actorData = this.data;
     const data = actorData.data;
     const flags = actorData.flags;

     // Make separate methods for each Actor type (character, npc, etc.) to keep
     // things organized.
     // Prepare items.
     if (actorData.type == 'maid') {
       this._prepareCharacterData(actorData);
     }
     else if (actorData.type == 'butler') {
       this._prepareCharacterData(actorData);
     }
     else if (actorData.type == 'master') {
       this._prepareCharacterData(actorData);
     }
}
   /**
    * Prepare Character type specific data
    */
   _prepareCharacterData(actorData) {
     const data = actorData.data;

     // Make modifications to data here. For example:

     // Loop through ability scores, and add their modifiers to our sheet output.

   }





}
