import {maidrpg} from "./config.js";
import MaidRPGItemSheet from "./sheets/MaidRPGItemSheet.js";
import MaidRPGCharacterSheet from "./sheets/MaidRPGCharacterSheet.js";

async function preloadHandlebarsTemplates() {
  const templatePaths = [
    "systems/maidrpg/templates/partials/character-stat-block.hbs",
  ];

  return loadTemplates(templatePaths);
};

Hooks.once("init", function() {
  console.log("maidrpg | Intializing Maid RPG System");

  CONFIG.maidrpg = maidrpg;

  Items.unregisterSheet("core", ItemSheet);
  Items.registerSheet("maidrpg", MaidRPGItemSheet, { makeDefault: true});

  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("maidrpg", MaidRPGCharacterSheet, { makeDefault: true});

  preloadHandlebarsTemplates();

  Handlebars.registerHelper("times", function (n, content) {
    let result = "";
    for (let i = 0; i < n; ++i) {
      result += content.fn(i);
    }

    return result;
  });
});