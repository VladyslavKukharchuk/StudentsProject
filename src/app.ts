import { Provider } from './Provider';

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

thief1.useAttack(warrior2);
thief1.useAttack(thief2);
thief1.useAttack(mage2);


console.log("Test of Sword Strike:");

warrior1.useAttack(warrior2);
warrior1.useAttack(thief2);
warrior1.useAttack(mage2);


console.log("Test of Fireball:");

mage1.useAttack(warrior2);
mage1.useAttack(thief2);
mage1.useAttack(mage2);


console.log("Test of Relive:");

warrior2.useRelive();
thief2.useRelive();
mage2.useRelive();