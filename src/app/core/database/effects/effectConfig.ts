
export type statModifierEffectId =
    'max_hp_up' | 'max_hp_down' |
    'speed_up' | 'speed_down' |
    'phys_atk_up' | 'phys_atk_down' |
    'phys_def_up' | 'phys_def_down' |
    'crit_chance_up' | 'crit_chance_down' |
    'crit_dmg_up' | 'crit_dmg_down' |
    'mag_atk_up' | 'mag_atk_down' |
    'mag_def_up' | 'mag_def_down' |
    'max_mp_up' | 'max_mp_up' |
    'heat_dmg_up' | 'heat_dmg_down' |
    'cold_dmg_up' | 'cold_dmg_down' |
    'lightning_dmg_up' | 'lightning_dmg_down' |
    'toxin_dmg_up' | 'toxin_dmg_down' |
    'dark_dmg_up' | 'dark_dmg_down' |
    'light_dmg_up' | 'light_dmg_down' |
    'heat_def_up' | 'heat_def_down' |
    'cold_def_up' | 'cold_def_down' |
    'lightning_def_up' | 'lightning_def_down' |
    'toxin_def_up' | 'toxin_def_down' |
    'dark_def_up' | 'dark_def_down' |
    'light_def_up' | 'light_def_down';

export type elementalEffectId = 'burn' | 'frostbite' | 'electrified' | 'poison' | 'solidification' | 'swirling';

export type statusEffectId = statModifierEffectId | elementalEffectId;

export interface EffectConfig {
    readonly name: string;
    readonly description: string;
    readonly type: 'buffs' | 'debuffs' | 'elemental' | 'special';
    readonly duration: number;
    readonly isBeneficial: boolean;
    readonly statModifiers?: {
        readonly stat: statModifierEffectId;
        readonly value: number;
    }[]
}