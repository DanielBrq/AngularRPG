# Auditoría de alcance — AngularRPG → Combat Prototype

> Objetivo: redefinir el proyecto como un **Combat Prototype** completo y bien terminado. NO se construye el juego completo. Este documento es un diagnóstico técnico y un plan de reducción de alcance. No implementa cambios.

---

## 1. Diagnóstico general del estado actual

**Es un prototipo de dominio, no una app jugable.** No hay combate ejecutable:

- El router está vacío (`app.routes.ts` son 3 líneas).
- La UI es la página de bienvenida por defecto de Angular (`app.html` con logos SVG y enlaces placeholder).
- **No existen `BattleState`, `BattleSystem`, `TurnManager` ni event bus** — los 4 pilares del prototipo. `BattleTurnsSystem.ts` y `LevelUpSystem.ts` son stubs vacíos (`export {}`).

El dominio `core/` está poblado pero **a medio construir**:

- `DamageCalculator.calcDmg` **siempre retorna `0`** (`core/combat/DamageCalculator.ts:67`), tiene un `forEach` vacío sobre weaknesses y un switch duplicado sobre los 10 tipos de daño.
- `GameEntity.takeDamage` **suma** el daño en vez de restarlo (`core/entities/gameEntity/GameEntity.ts:70`); `mpRecover` no actualiza MP (líneas 81-83).
- `HeavySlice.execute` pasa `target.takeDamage(-dmg)` → siempre lanza `Value must be positive` (`core/skills/offensive/HeavySlice.ts:29`).
- `BattleStats.calculate` tiene 3 copy-paste bugs: aplica `speed` y `spearResistance` sobre `spearDmg`, y `daggerResistance` sobre `daggerDmg` (`core/entities/gameEntity/BattleStats.ts:91,95,97`).
- **12 archivos vacíos/stub**: `BattleTurnsSystem`, `LevelUpSystem`, `Healing`, `MusicPlayer`, `SfxPlayer` y los 7 de `ui/hud`.
- **No hay ninguna subclase concreta de `CharacterEntity`** (es abstracta): no existen personajes instanciables, pese a `CharactersMetadata` y 7 skills especiales.
- **Cero tests**, aunque la infraestructura (vitest + jsdom + `@angular/build:unit-test`) ya está configurada.
- Hay cambios WIP sin commitear en `DamageCalculator`, `FoeEntity`, `BuildStats`, `GameEntity`, `Skill` y `Timing.ts` (sin trackear).

**Tejido de dependencias frágil:** `core/entities/index.ts` re-exporta `combat`, `items` y `shared/utils`, creando dependencias circulares (entities → combat → entities, entities → items → entities).

**Duplicación estructural:** el mismo set de ~30 stats (4 armas + 6 elementos + resistencias) se repite en `BaseStats`, `BattleStats`, `ItemStats` y `BuildStats`.

---

## 2. Tabla Mantener / Simplificar / Aislar / Eliminar

| # | Candidato | Dónde está | Responsabilidad actual | ¿Necesario? | Dificultad | Dependencias | ¿Qué rompería? | Acción recomendada | Qué debería quedar |
|---|-----------|-----------|------------------------|-------------|------------|--------------|----------------|--------------------|--------------------|
| 1 | DamageCalculator | `core/combat/DamageCalculator.ts` | Daño multi-capa (físico/elemental, crit tiers, stacks, weaknesses) | **SÍ (núcleo)** | Media (hay que completar) | GameEntity, BattleStats, DamageType, Randomizer | Todo el daño del juego (ya roto: retorna 0) | **MANTENER — completar** | Mismo archivo, corregido |
| 2 | GameEntity | `core/entities/gameEntity/GameEntity.ts` | HP/MP, ataques a blancos, efectos | **SÍ (núcleo)** | Media | DamageCalculator, Effect, Skill | Todas las entidades | **MANTENER — arreglar bugs** (takeDamage suma, mpRecover no-op) | Mismo archivo |
| 3 | BaseStats / BattleStats | `core/entities/gameEntity/` | Stats base y runtime de batalla | **SÍ (núcleo)** | Baja (typos puntuales) | — | Todas las entidades | **MANTENER** | Igual, arreglar typos de `calculate` |
| 4 | DamageWeaknessData | `core/entities/gameEntity/DamageData.ts` | Weak Points (innato + extra exploit) | **SÍ (núcleo)** | Baja | DamageType | Explotar debilidad | **MANTENER — unificar con el `_weakness` duplicado de FoeEntity** | Un único representación (DamageData) |
| 5 | FoeEntity + sistema Pressure | `core/entities/foes/FoeEntity.ts` | Foe con mecánica de presión (dmg reduction/bonus por presión) | **SÍ (mecánica única de combate)** | Baja | BaseStats, BattleStats, DamageType | FoEs completos | **MANTENER** | Igual, des-dupear weakness |
| 6 | Effect + EffectList (Burn/Frostbite/Paralysis/Poison) | `core/effects/` | Status effects con duración y stacks | **SÍ (núcleo)** | Media (apply incompletos/dead code) | DamageCalculator, i18n, types | Buffs/debuffs (meta del prototipo) | **MANTENER — completar apply/expire** | Igual, con lógica real |
| 7 | Skill + offensive + support | `core/skills/Skill.ts`, `offensive/{HeavySlice,BlazingWaterfall}`, `support/Healing` (stub) | Ejecutar acciones de combate | **SÍ (núcleo)** | Media | GameEntity, Effect, i18n | Skills del prototipo | **MANTENER — completar ejecución** | Igual; decisión de mecanismo único de stat-mods (ver #21) |
| 8 | DamageType (WEAPONS/ELEMENT/DAMAGE) | `shared/types/DamageType.ts` | Tipos de daño físico/elemental | **SÍ** | — | — | Todo | **MANTENER** | — |
| 9 | Randomizer / Clamp | `shared/utils/` | Azar y clamp de barras | **SÍ** | — | — | Random | **MANTENER** | — |
| 10 | BattleTurnsSystem | `core/combat/BattleTurnsSystem.ts` (stub) | Turn manager / timeline dinámica | **SÍ (meta explícita)** | Media-alta (por construir) | GameEntity, BattleState, events | Nada (no existe) | **MANTENER → implementar** | BattleTurnsSystem + BattleState + event bus (nuevos) |
| 11 | LevelUpSystem | `core/combat/LevelUpSystem.ts` (stub) | Subida de nivel / UP | **Tal vez** ("Sistema UP si permanece") | Baja | BaseStats | Nada | **AISLAR o borrar** — sin diseño no aporta | Borrar stub; reintroducir si el UP entra. No tocar `scaleByLevel` |
| 12 | ItemStats / BuildStats | `core/items/ItemStats.ts`, `gameEntity/BuildStats.ts` | Stats agregadas por equipo | **Sí, acotado a equipo de combate** | Media | Equipment, CharacterEntity | Build de personajes | **SIMPLIFICAR** — reducir a stats que el combate consume (arma + 1-2 defensas); quitar las 30 duplicadas | BuildStats compacto en `entities/` |
| 13 | Inventory | `core/entities/player/Inventory.ts` | Inventario como sistema | **NO** (progresión fuera de scope) | Baja | Consumable, Equipment | Equipar/des-equipar, consumibles | **ELIMINAR** | Equipo como datos de configuración de combate |
| 14 | Consumable + BasicPotions.json + provider + interfaces | `core/items/consumable/`, `catalog/`, `interfaces/` | Pociones en batalla | **NO** | Baja | Item, ItemStats, clamp | Nada crítico (datos muertos: keys `"hp"` no existen en la interfaz; "MagicPotion" usa `hp`) | **ELIMINAR** | Si se quiere un item de batalla, un `Consumable` mínimo bajo `core/combat` |
| 15 | Equipment + catálogos JSON (Iron/Silver) + providers | `core/items/equipment/`, `catalog/*.json` | Stats vía equipo | **Sí, mínimo** | Baja | ItemStats, types | Build de personajes | **SIMPLIFICAR** — pocas configs relevantes; mover a `core/data` | CatalogProvider mínimo + JSON compactos |
| 16 | CharacterEntity con 6 slots | `core/entities/player/CharacterEntity.ts` | Slots helmet/chest/ring/belt/boots/weapon | **Parcial** (equipo solo para probar combate) | Media | Inventory, Equipment, BuildStats | Build de personajes | **SIMPLIFICAR** — slots opcionales o solo arma+1 defensa; quitar dependencia de Inventory | CharacterEntity sin Inventory, stats vía config |
| 17 | SpecialSkill + 7 shard skills | `core/skills/special/` | Buffs/debuffs manuales por skill | **Sí, 1-2 como patrón** | Media | Effect (sin usar), BattleStats | Skills únicas (sin personajes concretos aun) | **SIMPLIFICAR** — conservar SpecialSkill + 1-2 representativos implementados vía Effect/mods genérico; quitar el resto | Esqueleto SpecialSkill + modificador genérico |
| 18 | EffectType.ts (MODIFIERS/PASSIVE/SPECIAL) | `shared/types/EffectType.ts` | Catálogo de efectos (20+ skills de diseño con comentarios) | **Parcial** | Baja | types | Skills futuras (no existen) | **SIMPLIFICAR** — dejar STATUS_EFFECTS + solo lo usado | EffectType reducido + notas fuera del código |
| 19 | CharactersMetadata | `shared/types/CharactersMetadata.ts` | IDs/nombres de los 5 personajes | **SÍ (al existir personajes)** | Baja | types | Owner-validation de skills | **MANTENER** | Igual |
| 20 | i18n (i18next + I18nService + en/es.json) | `shared/i18n/` | Traducciones EN/ES de labels | **NO** (fuera de scope) | Media si se elimina (toca skills+effects) | i18next, Angular inject, localStorage, skills/effects | Labels traducidas | **AISLAR** — dejar funcionando y autocontenido, no extenderlo | Igual, marcado out-of-scope |
| 21 | Duplicación de sistemas de buffs (SpecialSkill vs Effect) | `skills/special/*` vs `effects/*` | Dos mecanismos paralelos mutando BattleStats | **Sí resolver** | Media | — | Consistencia de buffs/debuffs | **SIMPLIFICAR** — elegir UN mecanismo (recomiendo Effect + StatMod) y migrar lo que sobreviva | Un solo sistema de modificadores |
| 22 | Barrel `core/entities/index.ts` | `core/entities/index.ts` | Re-exporta combat, items, shared/utils (causa ciclos) | — | Baja | — | Imports existentes | **SIMPLIFICAR** — quitar `LevelUpSystem`, `items` y `utils` del barrel | Barrel solo de entities |
| 23 | IdGenerator + dependencia `uuid` | `shared/utils/IdGenerator.ts` | IDs v7 | **NO necesario** | Muy baja | uuid | IDs | **ELIMINAR deps** — usar `crypto.randomUUID()` nativo | util de 1 línea sin dep |
| 24 | Sounds (MusicPlayer/SfxPlayer) + `howler` | `sounds/` | Audio de combate (meta del prototipo) | **SÍ (meta)** | Media (implementar) | howler (ya instalado) | Nada (archivos vacíos) | **MANTENER carpeta e implementar con howler** | SfxPlayer/MusicPlayer funcionales |
| 25 | ui/hud (7 archivos vacíos) | `ui/hud/**` | HUD (healthbars, weak points, status, party) | **SÍ (meta)** | Media (implementar) | core/entities | Nada (vacíos) | **MANTENER como blueprint e implementar**; quitar archivos vacíos hasta entonces | HUD real por componente |
| 26 | SettingsService | `ui/shell/settings.ts` | Facade fino de I18nService | **NO** | Muy baja | I18nService | Settings UI (no existe) | **ELIMINAR** (y el bloque `settings.*` de i18n si se quiere) | Nada |
| 27 | Router + app.routes vacío | `app.routes.ts`, `app.config.ts` | — | **Sí, mínimo** (inicializar batalla desde UI previa) | Baja | @angular/router | Nada | **MANTENER y agregar 2 rutas** (setup + battle) | Routes reales |
| 28 | app.html placeholder | `src/app/app.html` | Página welcome de Angular | **NO** | Muy baja | — | Nada | **ELIMINAR** contenido placeholder → pantalla inicial del prototipo | BattleSetup screen |
| 29 | Tailwind + postcss | `styles.css`, `.postcssrc.json` | Estilizar HUD | **SÍ** | — | — | — | **MANTENER** | — |

---

## 3. Top 10 recortes/simplificaciones con mayor reducción de complejidad

1. **Eliminar el árbol `core/items` completo** (Inventory, Consumable, catálogos, providers, interfaces, JSON) → el equipo pasa a datos de configuración bajo `core/data` (o `core/combat/config`). Elimina ~12 archivos y rompe la dependencia circular entities↔items↔shared.
2. **Unificar el sistema de buffs**: sacar los 7 SpecialSkill del árbol de skills y mantener 1-2 como ejemplo vía un `StatModifier` genérico que usa el `Effect` existente. Elimina ~180 líneas de mutación manual duplicada.
3. **Completar `DamageCalculator`** (impedimiento: hoy todo daño = 0): colapsar el switch de 10 tipos, implementar weaknesses/exploits y el retorno real. Mayor multiplicador de valor (reduce riesgo, no líneas).
4. **Recortar `EffectType.ts`** a STATUS_EFFECTS + solo lo usado → elimina ~90 líneas de catálogo de diseño futuro.
5. **Eliminar `uuid` → `crypto.randomUUID()`**, borrar `IdGenerator` de la caja → una dependencia runtime menos.
6. **Eliminar `SettingsService`** y el bloque `settings` de i18n (o marcarlo out-of-scope).
7. **Sanear el barrel de `core/entities/index.ts`** (quitar combat, items, utils → elimina ciclos de imports).
8. **Borrar stubs vacíos** (`LevelUpSystem` hasta tener diseño, `Healing` si no hay heal) y los 7 archivos `ui/hud` vacíos hasta construir componentes reales.
9. **Reducir `CharacterEntity`** a stats + skills + config (sin Inventory, slots opcionales).
10. **Reemplazar `app.html` placeholder** por el BattleSetup real → convierte el prototipo en demostrable (es lo que corta el defecto de que "no se ve nada").

---

## 4. Funcionalidades mínimas del Combat Prototype terminado

- Pantalla de **configuración de batalla**: elegir party (de personajes concretos disponibles) y foes participantes; inicializar el Battle State.
- **BattleState** (roster, turnos, entidades vivas, victoria/derrota) + **TurnManager** con orden dinámico por speed.
- **Ejecución de acciones** (attack/skills básicos) con cálculo de daño real (físico, elemental, crítico, weaknesses, resistencias) y **Damage Limit** si se decide.
- **Eventos de combate** (damage-dealt, turn-start/end, effect-apply, death) que alimenten la UI y el log.
- **HUD de combate**: HP/MP bars, weak points, status effects, timeline/turn order, números de daño, log de eventos, botones de acciones/skills.
- **Buffs/debuffs/status effects** funcionales (al menos Burn/Poison + 1 buff de ejemplo).
- **Feedback audiovisual**: animación simple (spritesheet/secuencia CSS) para ataques y efectos, SfxPlayer/MusicPlayer mínimos.
- **Reiniciar/volver a setup** sin mundo persistente.

---

## 5. Qué NO se debería tocar todavía

- **Núcleo ya razonable**: estructura de `GameEntity`/`FoeEntity`, `BaseStats`/`BattleStats` (más allá de fixes de typos), `DamageType`, `Randomizer`/`Clamp`, `DamageWeaknessData`, `CharactersMetadata`.
- **Infraestructura de test** (vitest/jsdom/builder de test) — hoy vacía, pero es la base para testear el core de combate. No borrarla.
- **Blueprint de la UI de combate** (`ui/hud/foes|player|shared`) — conservar nombres/estructura como plan de componentes.
- **`howler`** — dependencia para audio, a usar.
- **FoeEntity pressure system** — mecanismo ya diseñado; no desarmarlo.

---

## 6. Propuesta de estructura final (orientada al combate)

```
src/
├─ main.ts, index.html, styles.css
└─ app/
   ├─ core/                          # dominio puro (sin Angular)
   │  ├─ combat/
   │  │  ├─ BattleSystem.ts          # orquesta la batalla (nuevo, reemplaza stubs)
   │  │  ├─ TurnManager.ts           # timeline dinámico por speed (nuevo)
   │  │  ├─ BattleState.ts           # estado de batalla (nuevo)
   │  │  ├─ events.ts                # bus de eventos de combate (nuevo)
   │  │  ├─ DamageCalculator.ts      # completar
   │  │  └─ config/ (o data/)        # datos planos: characters.json/.ts, foes.json/.ts, equipment.json (reemplaza items/)
   │  ├─ entities/
   │  │  ├─ gameEntity/  BaseStats, BattleStats, GameEntity, DamageData, BuildStats (compacto)
   │  │  ├─ player/      CharacterEntity (+ subclases concretas o factory desde config)
   │  │  └─ foes/        FoeEntity
   │  ├─ skills/   Skill.ts, offensive/{HeavySlice,BlazingWaterfall}, special/SpecialSkill (patrón vía Effect)
   │  └─ effects/  Effect.ts, EffectList/{Burn,Poison,...}
   ├─ shared/
   │  ├─ types/    DamageType.ts, EffectType.ts (recortado), CharactersMetadata.ts
   │  ├─ utils/    Clamp.ts, Randomizer.ts
   │  └─ i18n/     (aislado, out-of-scope, sin tocar)
   ├─ sounds/  SfxPlayer.ts, MusicPlayer.ts               # implementar con howler
   └─ ui/
      ├─ battle-setup/  # selección party/foes → init battle state
      ├─ battle/        # tablero: foes, party, timeline, log, dmg numbers
      │   ├─ components/  HealthBar, WeakPoints, StatusEffect...
      │   └─ views/       battle, timeline, log, actions
      └─ shell/    (eliminar settings.ts o solo si se usa idioma, out-of-scope)
```

Routing mínimo: `/` → setup, `/battle` → combate (o un único componente con dos vistas).

---

## 7. Explícitamente fuera de scope

World map, exploración, farming, economía, **I18n** (funciona pero no se extiende), shops, quests, NPCs, historia/narrativa, inventario completo como progresión, save/load de progreso, crafting, progresión del mundo, **LevelUp/UP** hasta que el diseño lo pida, y cualquier sistema fuera de combate que no sirva para inicializar o configurar una batalla.

---

## 8. Riesgos por recorte

- **Eliminar items/Inventory**: no rompe nada ejecutable (hoy nada lo construye), pero hay datos de equipo no integrados (Iron/Silver) → se pierde contenido demo; mitigar conservando un JSON mínimo en `core/data`.
- **Unificar SpecialSkill → Effect**: rompería las 7 skills actuales (ninguna tiene personaje concreto que las use → sin impacto real); riesgo de perder la semántica de skills únicas → conservar SpecialSkill como contenedor.
- **Completar DamageCalculator**: toca el corazón de todas las entidades; alto riesgo de desbalance → acompañar con tests vitest (la infra ya está).
- **Recortar EffectType**: si más adelante se reimplementan esas skills habrá que volver a agregarlas; riesgo bajo.
- **Quitar uuid**: trivial.
- **Borrar stubs vacíos**: riesgo nulo (no hacen nada); solo se pierde el blueprint de LevelUpSystem → conservarlo como ficha de diseño fuera del código si se quiere.

---

## 9. Orden recomendado para realizar los recortes

1. **Base estable primero** (cero riesgo, valor inmediato): arreglar typos de `BattleStats.calculate`, bugs de `GameEntity.takeDamage`/`mpRecover`, negativo de `HeavySlice`, barrel circular.
2. **Completar `DamageCalculator`** con tests vitest del cálculo (físico/elemental/crit/weakness).
3. **Eliminar el árbol `core/items`** → mover config de equipo a `core/data`; eliminar `Inventory`, consumibles, `uuid`, `SettingsService`.
4. **Unificar el sistema de buffs** (SpecialSkill vía Effect) y recortar `EffectType`.
5. **Construir el esqueleto ejecutable**: BattleState + TurnManager + events (reemplazan los stubs) con una mini batalla scripteada.
6. **UI**: reemplazar `app.html` por BattleSetup → Battle screen con HUD mínimo (bars, débiles, log, dmg numbers).
7. **Feedback audiovisual**: SfxPlayer/MusicPlayer con howler y una secuencia de ataque simple.
8. **Aislar i18n** de la ruta de combate (labels default inline si se prefiere desacoplar) y marcarlo out-of-scope.
9. Commit atómico por cada paso; bump de versión al final.