/**
 * Extend the basic ItemSheet with some very simple modifications
 * @extends {ItemSheet}
 */
/* global ItemSheet, mergeObject */

export class FEGItemSheet extends ItemSheet {
  /** @override */
  static get defaultOptions () {
    return mergeObject(super.defaultOptions, {
      classes: ['fegsystem', 'sheet', 'item'],
      width: 1280,
      height: 700,
      tabs: [{ navSelector: '.sheet-tabs', contentSelector: '.sheet-body', initial: 'details' }]
    })
  }

  /** @override */
  get template () {
    const path = 'systems/fabulasegoblins-fvttsystem/templates/item'
    // Return a single sheet for all item types.
    // return `${path}/item-sheet.html`

    // Alternatively, you could use the following return statement to do a
    // unique item sheet by type, like `weapon-sheet.html`.
    const template = `${path}/${this.item.data.type}.html`

    console.log('Item', this.item.data, template)
    return template
  }

  /* -------------------------------------------- */

  /** @override */
  getData () {
    const data = super.getData()

    const types = {
      equipment: 'Equipamento'
    }

    console.log('Typo', types[this.item.data.type])
    data.item_header = types[this.item.data.type]

    console.log('Owned?', this.item.isOwned)
    data.owned = this.item.isOwned

    data.attributes = [
      { label: 'Força', name: 'str' },
      { label: 'Agilidade', name: 'agi' },
      { label: 'Inteligência', name: 'int' },
      { label: 'Carisma', name: 'cha' },
      { label: 'Destino', name: 'des' }
    ]

    data.attack_types = [
      { label: 'Nenhum', name: '' },
      { label: 'Corpo a Corpo', name: 'melee' },
      { label: 'Distância', name: 'ranged' }
    ]

    return data
  }

  activateListeners (html) {
    super.activateListeners(html)
    const { data } = super.getData()

    html.find('.item-actions__equip').click(() => {
      this.item.update({ 'data.equipped': !data.equipped })
    })

    html.find('.item-actions__roll-attack').click(() => {
      const attributeModifier = this.actor.getAttributeModifier(data.item_attribute)
      const weaponAttackModifier = data.attack_modifier

      const formula = `/d20 + @attributeModifier + @weaponAttackModifier`

      const roll = new Roll(formula, {
        attributeModifier: attributeModifier,
        weaponAttackModifier: weaponAttackModifier
      })
      roll.evaluate()
      roll.toMessage()
    })

    html.find('.item-actions__roll-damage').click(() => {
      console.log('123', data.damage_formula)
      const formula = data.damage_formula
      const roll = new Roll(formula)
      roll.evaluate()
      roll.toMessage()
    })
  }

  getAttackFormula () {
    console.log(this)
    // let actorData = this.actor
  }
}
