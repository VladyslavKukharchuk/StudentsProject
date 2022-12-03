"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mage = void 0;
const character_1 = require("./character");
class Mage extends character_1.Сharacter {
    constructor() {
        super();
        this.healthPoint = 80;
        this.maxHP = 80;
        this.attackPower = 100;
        this.class = "Mage";
        this.attackName = "Fireball";
        this.abilityName = "Bewitch";
    }
    ability() {
    }
}
exports.Mage = Mage;
