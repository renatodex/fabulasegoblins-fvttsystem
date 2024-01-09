/**
 * Extend the base Actor entity by defining a custom roll data structure which is ideal for the Simple system.
 * @extends {Actor}
 */
/* global Actor */
export class FEGActor extends Actor {
  /**
   * Augment the basic actor data with additional dynamic data.
  */
  prepareData () {
    super.prepareData()
    console.log('Vamo ve', this.data)
    const { data } = this.data

    console.log('Owned items', this.items)
    if (data.createdAt) {
      data.createdAt = new Date()
    }

    // Calculate Attribute Modifiers
    for (const attributeLabel in data.attributes) {
      const tempAttribute = data.attributes[attributeLabel]
      tempAttribute.mod = this.modifierRule(tempAttribute.value)
    }

    const hpBonuses = 0
    data.hit_points.max = 10 + data.attributes.str.value + hpBonuses

    const mpBonuses = 0
    data.magic_points.max = 5 + data.attributes.int.value + mpBonuses

    // data.attack.main_hand = 10 + this.modifierRule(data.attributes.)

    console.log('Updated/Created', data)
  }

  getMainWeapon () {

  }

  modifierRule (value) {
    return Math.floor(value / 3) - 2
  }

  getAttributeModifier (attributeLabel) {
    const { data } = this.data
    const tempAttribute = data.attributes[attributeLabel]
    return this.modifierRule(tempAttribute.value)
  }
}
