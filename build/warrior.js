"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Warrior = void 0;
const character_1 = require("./character");
class Warrior extends character_1.Сharacter {
    constructor() {
        super();
        this.healthPoint = 200;
        this.maxHP = 200;
        this.attackPower = 50;
        this.class = "Warrior";
        this.attackName = "Sword Strike";
        this.abilityName = "Defense";
    }
    ability() {
    }
}
exports.Warrior = Warrior;
