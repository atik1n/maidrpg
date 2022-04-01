export default class MaidRPGCharacterSheet extends ActorSheet{
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      template: "systems/maidrpg/templates/sheets/character-sheet.hbs",
      classes: ["maidrpg", "sheet", "charactersheet"],
      width: 800,
      height: 800,
      tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "vitals" }]
    });
  }

  /* -------------------------------------------- */

  /** @override */
  getData() {
    const data = super.getData();
    data.dtypes = ["String", "Number", "Boolean"];
    for (let attr of Object.values(data.data.data.attributes)) {
     attr.isCheckbox = attr.dtype === "Boolean";
   }

   // Prepare items.
   if (this.actor.data.type == 'maid') {
     this._prepareCharacterItems(data);
   }
   else if (this.actor.data.type == 'butler') {
     this._prepareCharacterItems(data);
   }
   else if (this.actor.data.type == 'master') {
     this._prepareCharacterItems(data);
   }

    return data;
  }

  /**
   * Organize and classify Items for Character sheets.
   *
   * @param {Object} actorData The actor to prepare.
   *
   * @return {undefined}
   */
  _prepareCharacterItems(sheetData) {
    const actorData = sheetData.actor;

    // Initialize containers.
    const roots = [];
    const power = [];
    const special = [];
    const stress = [];
    const character_type = [];
    const weapon = [];

    // Iterate through items, allocating to containers
    // let totalWeight = 0;
    for (let i of sheetData.items) {
      let item = i.data;
      i.img = i.img || DEFAULT_TOKEN;
      // Append to gear.
      if (i.type === 'weapon') {
        weapon.push(i);
      }
      // Append to maid roots.
      else if (i.type === 'roots') {
        roots.push(i);
      }
      // Append to powers.
      else if (i.type === 'power') {
        power.push(i);
      }
      // Append to special.
      else if (i.type === 'special') {
        special.push(i);
      }
      // Append to types.
      else if (i.type === 'character_type') {
        character_type.push(i);
      }
      // Append to stress explosion.
      else if (i.type === 'stress') {
        stress.push(i);
      }
    }

    // Assign and return
    actorData.roots = roots;
    actorData.power = power;
    actorData.special = special;
    actorData.stress = stress;
    actorData.character_type = character_type;
    actorData.weapon = weapon;
  }

  /* -------------------------------------------- */

  /** @override */


  activateListeners(html) {
    super.activateListeners(html);

    // Everything below here is only needed if the sheet is editable
    if (!this.options.editable) return;

    // Add Inventory Item
    html.find('.item-create').click(this._onItemCreate.bind(this));

    // Update Inventory Item
    html.find('.item-edit').click(ev => {
      const li = $(ev.currentTarget).parents(".item");
      const item = this.actor.items.get(li.data("itemId"));
      item.sheet.render(true);
    });

    // Delete Inventory Item
    html.find('.item-delete').click(ev => {
      const li = $(ev.currentTarget).parents(".item");
      this.actor.items.get(li.data("itemId")).delete();
      li.slideUp(200, () => this.render(false));
    });

    // Rollable abilities.
    html.find('.rollable').click(this._onRoll.bind(this));

    // Drag events for macros.
    if (this.actor.owner) {
      let handler = ev => this._onDragItemStart(ev);
      html.find('li.item').each((i, li) => {
        if (li.classList.contains("inventory-header")) return;
        li.setAttribute("draggable", true);
        li.addEventListener("dragstart", handler, false);
      });
    }
  }

  /**
   * Handle creating a new Owned Item for the actor using initial data defined in the HTML dataset
   * @param {Event} event   The originating click event
   * @private
   */
  _onItemCreate(event) {
    event.preventDefault();
    const header = event.currentTarget;
    // Get the type of item to create.
    const type = header.dataset.type;
    // Grab any data associated with this control.
    const data = duplicate(header.dataset);
    // Initialize a default name.
    const name = `New ${type.capitalize()}`;
    // Prepare the item object.
    const itemData = {
      name: name,
      type: type,
      data: data
    };
    // Remove the type from the dataset since it's in the itemData.type prop.
    delete itemData.data["type"];

    // Finally, create the item!
    return this.actor.createOwnedItem(itemData);
  }

  /**
   * Handle clickable rolls.
   * @param {Event} event   The originating click event
   * @private
   */
  _onRoll(event) {
    event.preventDefault();
    const element = event.currentTarget;
    const dataset = element.dataset;

    if (dataset.roll) {
      let roll = new Roll(dataset.roll, this.actor.data.data);
      let label = dataset.label ? `Rolling ${dataset.label} Check` : '';
      roll.roll({async:false}).toMessage({
        // speaker: ChatMessage.getSpeaker({ actor: this.actor }),
        speaker: ChatMessage.getSpeaker({ actor: this.Actor }),
        flavor: label
      });
    }
  }
}
