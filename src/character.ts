class Сharacter {

    protected HP: number;
    protected maxHP: number;
    protected class: string;

    relive() {
        if (this.HP === 0) {
            this.HP = this.maxHP;
        } else {
            throw new Error('Your character is still alive, you can continue the battle!!!');
        }
    }
}

export { Сharacter };