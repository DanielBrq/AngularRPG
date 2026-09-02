import { BaseStats, BattleStats, BuildStats, CharacterEntity, DamageWeaknessData } from '@src/app/core/entities'
import { CharactersMetadata } from '@src/app/shared/types';
import { Skill } from '@src/app/core/skills/';
import { Equipment } from "@src/app/core/items";

export class CharacterFactory {

    private static warriorData = CharactersMetadata.WARRIOR;
    private static wizardData = CharactersMetadata.WIZARD;
    private static survivorData = CharactersMetadata.SURVIVOR;
    private static liberatorData = CharactersMetadata.LIBERATOR;
    private static scholarData = CharactersMetadata.SCHOLAR;

    public static create(
        id: string,
        currentLvl: number,
        baseStats: {
            level: number,
            maxHp: number,
            speed: number,
            physAtk: number,
            physDef: number,
            critChance: number,
            critDmg: number,
            magAtk: number,
            magDef: number,
            maxMp: number,
        },
        skills: Skill[],
        damageData: DamageWeaknessData,
        weapon: Equipment | undefined = undefined,
        helmet: Equipment | undefined = undefined,
        chest: Equipment | undefined = undefined,
        ring: Equipment | undefined = undefined,
        belt: Equipment | undefined = undefined,
        boots: Equipment | undefined = undefined,
    ): CharacterEntity {

        const _baseStats = BaseStats.build(
            baseStats.level,
            baseStats.maxHp,
            baseStats.speed,
            baseStats.physAtk,
            baseStats.physDef,
            baseStats.critChance,
            baseStats.critDmg,
            baseStats.magAtk,
            baseStats.magDef,
            baseStats.maxMp
        );
        const _buildStats = BuildStats.build([weapon, helmet, chest, ring, belt, boots]);
        const _battleStats = BattleStats.build(_baseStats);

        switch (id) {
            case this.warriorData.id:
                return new CharacterEntity(
                    this.warriorData.id,
                    this.warriorData.name,
                    true,
                    currentLvl,
                    _baseStats,
                    _battleStats,
                    skills,
                    [],
                    damageData,
                    2,
                    _buildStats,
                    weapon,
                    helmet,
                    chest,
                    ring,
                    belt,
                    boots,
                );

            case this.wizardData.id:
                return new CharacterEntity(
                    this.wizardData.id,
                    this.wizardData.name,
                    true,
                    currentLvl,
                    _baseStats,
                    _battleStats,
                    skills,
                    [],
                    damageData,
                    2,
                    _buildStats,
                    weapon,
                    helmet,
                    chest,
                    ring,
                    belt,
                    boots,
                );

            case this.survivorData.id:
                return new CharacterEntity(
                    this.survivorData.id,
                    this.survivorData.name,
                    true,
                    currentLvl,
                    _baseStats,
                    _battleStats,
                    skills,
                    [],
                    damageData,
                    2,
                    _buildStats,
                    weapon,
                    helmet,
                    chest,
                    ring,
                    belt,
                    boots,
                );

            case this.liberatorData.id:
                return new CharacterEntity(
                    this.liberatorData.id,
                    this.liberatorData.name,
                    true,
                    currentLvl,
                    _baseStats,
                    _battleStats,
                    skills,
                    [],
                    damageData,
                    2,
                    _buildStats,
                    weapon,
                    helmet,
                    chest,
                    ring,
                    belt,
                    boots,
                );

            case this.scholarData.id:
                return new CharacterEntity(
                    this.scholarData.id,
                    this.scholarData.name,
                    true,
                    currentLvl,
                    _baseStats,
                    _battleStats,
                    skills,
                    [],
                    damageData,
                    2,
                    _buildStats,
                    weapon,
                    helmet,
                    chest,
                    ring,
                    belt,
                    boots,
                );

            default:
                throw new Error('Character not found');
        }

    }

}