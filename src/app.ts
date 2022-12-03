import { Provider } from './characterClasses';
import { CharacterClasses } from './enums';

let thief1 = Provider.createCharacter("Thief");
let thief2 = Provider.createCharacter("Thief");

console.log(thief1);
console.log(thief2);

let warrior1 = Provider.createCharacter("Warrior");
let warrior2 = Provider.createCharacter("Warrior");

console.log(warrior1);
console.log(warrior2);

let mage1 = Provider.createCharacter("Mage");
let mage2 = Provider.createCharacter("Mage");

console.log(mage1);
console.log(mage2);


console.log("Test of Archery Shot:");

thief1.attack(warrior2);
thief1.attack(thief2);
thief1.attack(mage2);

console.log(`Warrior2 HP: ${warrior2.currentHP}`);
console.log(`Thief2 HP: ${thief2.currentHP}`);
console.log(`Mage2 HP: ${mage2.currentHP}`);


console.log("Test of Sword Strike:");

warrior1.attack(warrior2);
warrior1.attack(thief2);
warrior1.attack(mage2);

console.log(`Warrior2 HP: ${warrior2.currentHP}`);
console.log(`Thief2 HP: ${thief2.currentHP}`);
console.log(`Mage2 HP: ${mage2.currentHP}`);


console.log("Test of Fireball:");

mage1.attack(warrior2);
mage1.attack(thief2);
mage1.attack(mage2);

console.log(`Warrior2 HP: ${warrior2.currentHP}`);
console.log(`Thief2 HP: ${thief2.currentHP}`);
console.log(`Mage2 HP: ${mage2.currentHP}`);


console.log("Test of Relive:");

warrior2.relive();
thief2.relive();
mage2.relive();

console.log(`Warrior2 HP: ${warrior2.currentHP}`);
console.log(`Thief2 HP: ${thief2.currentHP}`);
console.log(`Mage2 HP: ${mage2.currentHP}`);