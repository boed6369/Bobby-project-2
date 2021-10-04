const mongoose = require('mongoose')
const unitSchema = new mongoose.Schema({
    name: { type: String, required: true},
    movement: { type: String, require: true},
    weaponSkill: {type: String, require: true},
    ballisticSkill: { type: String, require: true},
    strength: { type: String, require: true},
    toughness: { type: String, require: true},
    wounds: { type: String, require: true},
    attack: { type: String, require: true},
    leadership: { type: String, require: true},
    saveCharacteristic: { type: String, require: true},
    abilities: { type: String, require: true},
    unitImage: { type: String, require: true},

    weaponName: { type: String, require: true},
    range: { type: String, require: true},
    type: { type: String, require: true},
    weaponStrength: { type: String, require: true},
    ap: { type: String, require: true},
    damage: { type: String, require: true},
    weaponAbilites : { type: String, require: true},
    weaponImage: { type: String, require: true},
})

const unit = mongoose.model('unit', unitSchema)

module.exports=unit