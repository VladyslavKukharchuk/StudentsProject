import {Thief} from './thief';
import {Warrior} from './warrior';
import {Mage} from './mage';

let thief1 = new Thief();
let thief2= new Thief();

console.log(thief1);
console.log(thief2);

let warrior1 = new Warrior();
let warrior2= new Warrior();

console.log(warrior1);
console.log(warrior2);

let mage1 = new Mage();
let mage2= new Mage();

console.log(mage1);
console.log(mage2);


console.log("Test of Archery Shot:");

thief1.archeryShot(warrior2);
thief1.archeryShot(thief2);
thief1.archeryShot(mage2);

console.log(warrior2);
console.log(thief2);
console.log(mage2);


console.log("Test of Sword Strike:");

warrior1.swordStrike(warrior2);
warrior1.swordStrike(thief2);
warrior1.swordStrike(mage2);

console.log(warrior2);
console.log(thief2);
console.log(mage2);


console.log("Test of Fireball:");

mage1.fireball(warrior2);
mage1.fireball(thief2);
mage1.fireball(mage2);

console.log(warrior2);
console.log(thief2);
console.log(mage2);


console.log("Test of Relive:");

warrior2.relive();
thief2.relive();
mage2.relive();

console.log(warrior2);
console.log(thief2);
console.log(mage2);