export default class MaidRPGItemSheet extends ItemSheet {

  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      width: 530,
      height: 250,
      classes: ["maidrpg", "sheet", "item"]
    });
  }

  get template() {
    return `systems/maidrpg/templates/sheets/${this.item.data.type}-sheet.html`;
  }

  getData() {
    const data = super.getData();

    data.config = CONFIG.maidrpg;

    return data;
  }
}
