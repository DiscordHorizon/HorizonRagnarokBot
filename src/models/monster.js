const { Schema, model } = require("mongoose");

const Monster = Schema({
    id: Number,
    name: {
        ptBr: String,
        en: String,
    },
    info: {
        atributos: {
            level: String,
            hp: String,
            atk: String,
            def: String,
            mdef: String,
            agi: String,
            vit: String,
            int: String,
            dex: String,
            luk: String,
            flee: String,
            hit: String,
            baseExp: Number,
            jobExp: Number,
            race: String,
            element: String,
            size: String,
        },
        drops: Array,
        skills: String,
        respawn: Array,
        outros: {
            agressive: Boolean,
            helpAllies: Boolean,
            castDetect: Boolean,
            looter: Boolean,
            changeTarget: Boolean,
            positionFixed: Boolean,
            hideDetect: Boolean,
            antiSteal: Boolean,
            boss: Boolean,
        },
    },
});

module.exports = model("Monster", Monster);
