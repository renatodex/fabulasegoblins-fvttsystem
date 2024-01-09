/**
 * Extend the basic ActorSheet with some very simple modifications
 * @extends {ActorSheet}
 */
/* global ActorSheet, mergeObject */
export class FEGActorSheet extends ActorSheet {
  /** @override */
  static get defaultOptions () {
    return mergeObject(super.defaultOptions, {
      classes: ['fegsystem', 'sheet', 'actor'],
      template: 'systems/fabulasegoblins-fvttsystem/templates/actor/actor-sheet.html',
      width: 860,
      height: 700,
      tabs: [{ navSelector: '.sheet-tabs', contentSelector: '.sheet-body', initial: 'character' }]
    })
  }

  /** @override */
  getData () {
    const data = super.getData()
    data.classes = [
      { label: 'Nenhum' },
      { label: 'Especial' },
      { label: 'Aventureiro' },
      { label: 'Caçador' },
      { label: 'Arcanista' },
      { label: 'Sacerdote' },
      { label: 'Fortuno' }
    ]

    data.species = [
      { label: 'Nenhum' },
      { label: 'Goblin' },
      { label: 'Metalóide' },
      { label: 'Armadon' },
      { label: 'Razalan' },
      { label: 'Snalgon' }
    ]
    return data
  }

  activateListeners (html) {
    super.activateListeners(html)

    html.find('.roll-attribute-check').click(event => {
      const template = 'systems/fabulasegoblins-fvttsystem/templates/chat/attribute_roll.html'

      const templateData = {
        attribute_name: 'Força'
      }

      const chatData = {
        user: game.user._id,
        speaker: {
          actor: this.actor._id,
          token: this.actor.token,
          alias: this.actor.name
        },
        type: CONST.CHAT_MESSAGE_TYPES.OTHER
      }

      renderTemplate(template, templateData).then((content) => {
        chatData.content = content

        ChatMessage.create(chatData, { displaySheet: false }).then(msg => {
          msg.setFlag('fabulasegoblins-fvttsystem', 'actorData', this.data)
        })
      })
    })

    html.find('.sheet-equipment__name').click((event) => {
      const itemId = $(event.target).data('id')
      console.log(this.actor.items)
      const actorItem = this.actor.items.get(itemId)
      actorItem.sheet.render(true)
      // temp1.get('Nxr3lQXEiIzegoWE').sheet.render(true)
      // console.log(item)
      // item.render(true)
    })

    html.find('.add-item').click(event => {
      // console.log('Actor', this.actor)
      event.preventDefault()
      // const header = event.currentTarget;
      // const data = duplicate(header.dataset);
      // console.log('Header', header)
      // console.log('Data', data);
      // mergeObject(data, {'type': 'item'});
      // console.log('Data after Merge', data);
      // data.name = `New Item`;

      // Aqui voce cria um item "global"
      // Item.create({name: "Test Weapon", type: "base"}).then(item => {
      //   console.log(item.data);
      // })

      // Aqui voce só cria um item para o personagem
      // this.actor.createOwnedItem({
      //   type: 'base',
      //   name: 'New Item'
      // }, {
      //   renderSheet: true
      // });
    })
  }

  _onDrop (event) {
    const dropData = JSON.parse(event.dataTransfer.getData('text/plain'));
    if (dropData.type === 'Item') {
      console.log('Find Item')
      let item = game.items.get(dropData.id)
      this.actor.createOwnedItem(item.data, {
        renderSheet: false
      })
    }
  }
}
