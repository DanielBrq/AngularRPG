import { CharacterEntity, FoeEntity, GameEntity } from "@app/core/entities/";


export class BattleTurnsSystem {
    constructor(
        private _charactersTeam: CharacterEntity[],
        private _foesTeam: FoeEntity[],
        private _currentTurn: number = 1,
        private _turnActionOrder: GameEntity[], // Based on speed
        private _previewNextActionOrder: GameEntity[], // Based on speed

        private finishedBattle: boolean = false,
    ) {
        // Start first turn round
        if (this._turnActionOrder.length === 0) {
            this.sortActionsBySpeed(true); // Sort current turn
            this.sortActionsBySpeed(false); // Sort preview
        }
    }

    public nextAction(): void {
        if (this.finishedBattle) return;

        if (this.checkBattleFinished().isFinished) {
            this.finishedBattle = true;
            // TODO: Publish event
            const { isFinished, winner } = this.checkBattleFinished();
        }
        else if (this.checkTurnFinished() && this.finishedBattle === false) {
            this.nextTurn();
        }

        const currentEntity = this._turnActionOrder.shift();
        if (currentEntity && !currentEntity.isAlive) {
            this.nextAction();
            return;
        }

    }

    public isPlayerAction(): boolean {
        if (this._turnActionOrder.length === 0) return false;
        return this._turnActionOrder[0] instanceof CharacterEntity;
    }

    public isFoeAction(): boolean {
        if (this.finishedBattle) throw new Error("Battle already finished");
        if (this._turnActionOrder.length === 0) return false;
        return this._turnActionOrder[0] instanceof FoeEntity;
    }

    public loadCharacterTeam(team: CharacterEntity[]): void {
        this._charactersTeam = team;
    }

    public addFoeToTeam(foe: FoeEntity): void {
        this._foesTeam.push(foe);   // May use for Foes invocation
    }

    public sortActionsBySpeed(currentTurn: boolean): void {
        const aliveEntities = [
            ...this.getAliveCharacters,
            ...this.getAliveFoes
        ];

        const sortBySpeedFormula = (a: GameEntity, b: GameEntity) => {
            if (b.getBaseStats._speed !== a.getBaseStats._speed) {
                return b.getBaseStats._speed - a.getBaseStats._speed;
            }
            return Math.random() - 0.5;
        };

        if (currentTurn) {
            // Filter out dead entities
            this._turnActionOrder = this._turnActionOrder.filter(entity => entity.isAlive);
            if (this._turnActionOrder.length === 0) {
                // Fill it with the alive entities only.
                this._turnActionOrder = [...aliveEntities];
            }
            this._turnActionOrder.sort(sortBySpeedFormula);

        } else {

            this._previewNextActionOrder = [...aliveEntities];
            this._previewNextActionOrder.sort(sortBySpeedFormula);
        }
    }

    public loadFoeTeam(team: FoeEntity[]): void {
        this._foesTeam = team;
    }

    public get getAliveCharacters(): CharacterEntity[] {
        // Use for AI logic and skills targetting, avoid taking action over dead entities
        return this._charactersTeam.filter(c => c.isAlive);
    }

    public get getDefeatedCharacters(): CharacterEntity[] {
        // May use for revive fallen characters (skills)
        return this._charactersTeam.filter(c => !c.isAlive);
    }

    public get getAliveFoes(): FoeEntity[] {
        // Use for AI logic and skills targetting, avoid taking action over dead entities
        return this._foesTeam.filter(f => f.isAlive);
    }

    public get getDefeatedFoes(): FoeEntity[] {
        return this._foesTeam.filter(f => !f.isAlive);
    }

    private nextTurn(): void {
        if (this.finishedBattle) return;

        this._turnActionOrder = [...this._previewNextActionOrder];
        this._currentTurn++;
        this.sortActionsBySpeed(false);
    }

    private checkBattleFinished(): { isFinished: boolean, winner: CharacterEntity | FoeEntity | undefined } {
        const isTeamDead = this._charactersTeam.every(character => !character.isAlive);
        const isFoeDead = this._foesTeam.every(foe => !foe.isAlive);

        if (isTeamDead || isFoeDead) {
            return { isFinished: true, winner: isTeamDead ? this._foesTeam[0] : this._charactersTeam[0] };
            // TODO: Hadle event
        }

        return { isFinished: false, winner: undefined };
    }

    private checkTurnFinished(): boolean {
        return this._turnActionOrder.length === 0;
    }

}
