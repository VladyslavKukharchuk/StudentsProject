import { CharacterActions } from './characterActions';
import { Creator } from './Creator';
import { CharacterClasses } from './enums';

let thief1 = Creator.createCharacter(CharacterClasses.Thief);
let thief2 = Creator.createCharacter(CharacterClasses.Thief);

console.log(thief1);
console.log(thief2);

let warrior1 = Creator.createCharacter(CharacterClasses.Warrior);
let warrior2 = Creator.createCharacter(CharacterClasses.Warrior);

console.log(warrior1);
console.log(warrior2);

let mage1 = Creator.createCharacter(CharacterClasses.Mage);
let mage2 = Creator.createCharacter(CharacterClasses.Mage);

console.log(mage1);
console.log(mage2);

console.log("Test of Archery Shot:");

CharacterActions.useAttack(thief1, warrior2);
CharacterActions.useAttack(thief1, thief2);
CharacterActions.useAttack(thief1, mage2);

console.log(`Warrior2 HP: ${warrior2.characterHP}`);
console.log(`Thief2 HP: ${thief2.characterHP}`);
console.log(`Mage2 HP: ${mage2.characterHP}`);


console.log("Test of Sword Strike:");

CharacterActions.useAttack(warrior1, warrior2);
CharacterActions.useAttack(warrior1, thief2);
CharacterActions.useAttack(warrior1, mage2);

console.log(`Warrior2 HP: ${warrior2.characterHP}`);
console.log(`Thief2 HP: ${thief2.characterHP}`);
console.log(`Mage2 HP: ${mage2.characterHP}`);


console.log("Test of Fireball:");

CharacterActions.useAttack(mage1, warrior2);
CharacterActions.useAttack(mage1, thief2);
CharacterActions.useAttack(mage1, mage2);

console.log(`Warrior2 HP: ${warrior2.characterHP}`);
console.log(`Thief2 HP: ${thief2.characterHP}`);
console.log(`Mage2 HP: ${mage2.characterHP}`);


console.log("Test of Relive:");

CharacterActions.useRelive(warrior2);
CharacterActions.useRelive(thief2);
CharacterActions.useRelive(mage2);

console.log(`Warrior2 HP: ${warrior2.characterHP}`);
console.log(`Thief2 HP: ${thief2.characterHP}`);
console.log(`Mage2 HP: ${mage2.characterHP}`);