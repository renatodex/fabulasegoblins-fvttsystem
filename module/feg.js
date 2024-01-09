// Import Modules
import { FEGActor } from './actor/FEGActor.js'
import { FEGActorSheet } from './actor/FEGActorSheet.js'
import { FEGItem } from './item/FEGItem.js'
import { FEGItemSheet } from './item/FEGItemSheet.js'

/* global ItemSheet, game, Hooks, CONFIG, Actors, Items, ActorSheet */

Hooks.once('init', async function () {
  game.fegsystem = {
    FEGActor,
    FEGItem
  }

  /**
   * Set an initiative formula for the system
   * @type {String}
   */
  CONFIG.Combat.initiative = {
    formula: '1d20 + @abilities.dex.mod',
    decimals: 2
  }

  // Define custom Entity classes
  CONFIG.Actor.entityClass = FEGActor
  CONFIG.Item.entityClass = FEGItem

  // Register sheet application classes
  Actors.unregisterSheet('core', ActorSheet)
  Actors.registerSheet('fegsystem', FEGActorSheet, { makeDefault: true })
  Items.unregisterSheet('core', ItemSheet)
  Items.registerSheet('fegsystem', FEGItemSheet, { makeDefault: true })

  // If you need to add Handlebars helpers, here are a few useful examples:
  // Handlebars.registerHelper('concat', function() {
  //   var outStr = ''
  //   for (var arg in arguments) {
  //     if (typeof arguments[arg] != 'object') {
  //       outStr += arguments[arg]
  //     }
  //   }
  //   return outStr
  // })
  //
  // Handlebars.registerHelper('toLowerCase', function(str) {
  //   return str.toLowerCase()
  // })
})

Hooks.on('renderChatLog', (log, html, data) => {
  html.on('click', '.roll-attr-with-advantage', ev => {
    const target = $(ev.currentTarget)
    const messageId = target.parents('.message').attr('data-message-id')
    const message = game.messages.get(messageId)
    const actor = game.actors.get(message.data.speaker.actor)
    console.log('Roll with Advantage!', actor)
  })
})
