# AGENTS.md

JRPG Game with Angular.

Read necesary file only depending of user request (save tokens and speed up responses).

## Commands

- `pnpm build` to verify build errors.

## Import conventions

- Internal imports use the `@src/*` alias → `src/*`. Use it instead of relative `../..` paths.

## Architecture (src/app)

Layered, framework-agnostic where possible. Data flows top-down: UI -> core (domain); sounds/shared are cross-cutting adapters.

```
src/app/
|-- core/                  PURE GAME DOMAIN - plain TS classes, NO Angular/DI/decorators
|   |-- combat/            BattleSystem.ts, DamageCalculator.ts, LevelUpSystem.ts
|   |-- effects/           Effect.ts + EffectList/{Burn,Frostbite,Paralysis,Poison}
|   |-- entities/          game objects
|   |   |-- gameEntity/    GameEntity.ts, BaseStats.ts, BattleStats.ts, BuildStats.ts
|   |   |-- player/        CharacterEntity.ts
|   |   `-- foes/          FoeEntity.ts
|   |-- items/             Item.ts, ItemStats.ts + consumable/Consumable.ts, equipment/Equipment.ts, weapons/Weapons.ts
|   `-- skills/            Skill.ts + offensive/{BlazingWaterfall,HeavySlice}, support/Healing.ts, special/{SpecialSkill + skills/}
|-- shared/                cross-layer helpers, no Angular
|   |-- types/             CharactersMetadata.ts, EffectType.ts, ElementType.ts, EquipmentType.ts, SkillType.ts, WeaponType.ts
|   |-- utils/             Clamp.ts, IdGenerator.ts, Randomizer.ts
|   `-- i18n/              en.json, es.json, i18n.ts
|-- sounds/                music/MusicPlayer.ts + sound/SfxPlayer.ts  (audio playback)
`-- ui/                    ANGULAR LAYER - components only here
    |-- shell/             settings.ts
    `-- hud/               in-game HUD
        |-- foes/          components/WeakPoints.ts, view/StatusEffectView.ts
        |-- player/        components/HealthBar.ts, view/{character,inventory,team}.ts
        `-- shared/        components/StatusEffect.ts
```

**Where to put things:** new game logic/class -> `core/`; screen/component -> matching `ui/` subfolder; save/load -> `shared/` or new `data/` when reintroduced; audio -> `sounds/`.

Note: many `ui/` files are currently empty stubs - the UI layer is scaffolded but not implemented.
## i18n editing rules

- Spanish translations must use the correct accents and the ñ character.
- Keep keys in en.json and es.json in alphabetical order within each object.
- Keep standard video game stat abbreviations unchanged in every language, especially HP and MP.

## Commits

Conventional **atomic** commits: one commit = one semantic change type. No descriptions, short imperative titles. Push at the end.

**Speed rule:** do NOT over-analyze. One `git status` + one quick `git diff --stat`, then stage and commit by groups immediately. No reading every file's full content.

**Commit grouping - split changes BY TYPE, one commit per type:**
- `refactor:` - code moved/renamed/restructured without behavior change (a move + its import fixes go together in ONE commit)
- `feat:` - new functionality
- `fix:` - bug fix
- `chore:` - config, tooling, deps, .gitignore, .vscode
- `docs:` - documentation only

Example: deletions + renames + new files from one restructuring = ONE `refactor:` commit; `.gitignore`/`.vscode` tweaks = separate `chore:` commit.

**Checklist:**
1. `git status` + `git diff --stat` - glance only
2. Group files by change type (see above)
3. Per group: `git add <files>` then `git commit -m "<type>: <short title>"`
4. Bump package.json "version" once, in its own final `chore:` commit
5. `git push` after all commits are done
