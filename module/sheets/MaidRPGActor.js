extend class MaidRPGActor extends Actor {
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
     if (this.actor.data.type == 'maid') {
       this._prepareCharacterItems(actorData);
     }
     else if (this.actor.data.type == 'butler') {
       this._prepareCharacterItems(actorData);
     }
     else if (this.actor.data.type == 'master') {
       this._prepareCharacterItems(actorData);
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
