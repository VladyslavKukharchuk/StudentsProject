"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Thief = void 0;
const character_1 = require("./character");
class Thief extends character_1.Сharacter {
    constructor() {
        super();
        this.healthPoint = 100;
        this.maxHP = 100;
        this.attackPower = 25;
        this.class = "Thief";
        this.attackName = "Archery Shot";
        this.abilityName = "Run Away";
    }
    ability() {
    }
}
exports.Thief = Thief;
