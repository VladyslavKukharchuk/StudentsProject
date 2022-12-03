/**
 * The CharacterActions class is our Facade
 */
class CharacterActions {
    private character: any;

    constructor(CharacterClass: any) {
        this.character = new CharacterClass;
    }

    public useAttack(enemy: any): number {

        if (this.character.characterHP === 0) {
            throw new Error('You are dead, if you want to continue the fight, first relive!');
        }

        if (enemy.character.characterHP === 0) {
            throw new Error('Your opponent is already dead, you can attack another!');
        }

        if (((enemy.character.characterHP - this.character.characterAP) < 0)) {
            return this.character.finishTheEnemy(enemy.character);
        }

        this.character.attack(enemy.character);
    }

    public useAbility(): void {
        if (this.character.characterHP === 0) {
            throw new Error('You are dead, if you want to continue the fight, first relive!');
        }

        this.character.ability();
    }

    public useRelive(): void {
        if (this.character.characterHP !== 0) {
            throw new Error('Your character is still alive, you can continue the battle!!!');
        }

        this.character.relive()
    }
}

export { CharacterActions };