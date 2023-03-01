function getRandomValue(min, max) {

    return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            currentRound: 0,
            winner: null
        };
    },
    computed: {

        monsterBarStyles() {

            if (this.monsterHealth < 0) {
                return { width: '0%'};
            }

            return {width: this.monsterHealth + '%'};
        },
        playerBarStyles() {

            if (this.playerHealth < 0) {
                return { width: '0%' };
            }

            return {width: this.playerHealth + '%'};
        },
        isSpecialAttackDisabled() {

            return this.currentRound % 3 != 0;
        }

    },
    watch: {
        playerHealth(value) {

            if (value <= 0 && this.monsterHealth <= 0) {
                // draw
                this.winner = 'draw';
            } else if (value <= 0) {
                // monster won
                this.winner='monster';
            }

        },
        monsterHealth(value) {

            if (value <= 0 && this.playerHealth <= 0) {
                // draw
                this.winner = 'draw';
            } else if (value <= 0) {
                // player won
                this.winner = 'player';
            }
        }
    },
    methods: {
        startNewGame() {

            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.currentRound = 0;
            this.winner = null;
        },
        attackMonster() {

            this.currentRound++;

            const attackValue = getRandomValue(5, 12);
            this.monsterHealth -= attackValue;

            this.attackPlayer();
        },
        attackPlayer() {
            const attackValue = getRandomValue(8, 15);
            this.playerHealth -= attackValue;
        },
        specialAttackMonster() {

            this.currentRound++;

            const attackValue = getRandomValue(10, 25);

            this.monsterHealth -= attackValue;

            this.attackPlayer();
        },
        healPlayer() {

            this.currentRound++;

            const healValue = getRandomValue(8, 20);

            this.playerHealth += healValue;

            if (this.playerHealth > 100)
            {
                this.playerHealth = 100;
            }

            this.attackPlayer();
        },
        surrender() {
            this.winner = 'monster';
        }
    }
});

app.mount("#game");