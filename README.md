# Kirara

A TypeScript library for fetching character data from the Enka API and generating card images using enka.cards. Supports Genshin Impact, Honkai: Star Rail, and Zenless Zone Zero.

## Features

- Fetch player profile data from Enka API
- Retrieve list of character IDs
- Generate image URLs for character cards
- Download card images as Buffers
- Support for customization options (language, substats, etc.)
- Simple and modular design
- Unified API for multiple games

## Installation

```bash
npm install @kiznavierr/kirara
```

## Quick Start

```typescript
import { Kirara } from "@kiznavierr/kirara";

const kirara = new Kirara("genshin"); // or "hsr" or "zzz"

// Get player summary
kirara
  .getPlayerSummary("856012067", { lang: "en" })
  .then((data) => console.log(data));
```

## Examples

### Genshin Impact

```typescript
const kirara = new Kirara("genshin");

// Get player summary
kirara
  .getPlayerSummary("856012067", { lang: "en" })
  .then((data) => console.log(data));
// Output: { nickname: 'Kiznavierr', level: 60, worldLevel: 8, theaterActIndex: 10, theaterModeIndex: 84, theaterStarIndex: 5, towerFloorIndex: 12, towerStarIndex: 36, avatarIds: [...], cardUrl: '...' }

// Get avatar list
kirara.getAvatarList("856012067").then((ids) => console.log(ids));

// Generate card URL
const cardUrl = kirara.generateCardUrl("856012067", "10000002", { lang: "en" });
```

### Honkai: Star Rail

```typescript
const kirara = new Kirara("hsr");

// Get player summary
kirara
  .getPlayerSummary("800069903", { lang: "en" })
  .then((data) => console.log(data));
// Output: { nickname: 'Player', level: 70, platform: 'PC', avatarIds: [...], cardUrl: '...' }

// Get avatar list
kirara.getAvatarList("800069903").then((ids) => console.log(ids));

// Generate card URL
const cardUrl = kirara.generateCardUrl("800069903", "1001", { lang: "en" });
```

### Zenless Zone Zero

```typescript
const kirara = new Kirara("zzz");

// Get player summary
kirara
  .getPlayerSummary("1500422486", { lang: "en" })
  .then((data) => console.log(data));
// Output: { uid: '1500422486', region: 'EU', nickname: 'Lumi', level: 60, avatarIds: [...], cardUrl: '...' }

// Get agent list
kirara.getAvatarList("1500422486").then((ids) => console.log(ids));

// Generate card URL
const cardUrl = kirara.generateCardUrl("1500422486", "1171", { lang: "en" });
```

## API Reference

### Constructor

```typescript
new Kirara(game: "genshin" | "hsr" | "zzz")
```

### Methods

- `getPlayerSummary(uid, options?)` - Get simplified player data
- `getPlayerData(uid)` - Get full player data from Enka API
- `getAvatarList(uid)` - Get array of character/agent IDs
- `getDefaultAvatarId(uid)` - Get first avatar ID
- `generateCardUrl(uid, avatarId, options?)` - Generate card image URL
- `generateCardImage(uid, avatarId, options?)` - Download card as Buffer
- `generateDefaultCardUrl(uid, options?)` - Generate URL for first avatar
- `generateDefaultCardImage(uid, options?)` - Download first avatar card

### Card Options

```typescript
{
  lang?: string;           // Language: "en", "jp", "id", etc. (default: "en")
  substats?: boolean;      // Show substats (default: false)
  subsBreakdown?: boolean; // Show substat breakdown (default: false)
  uid?: boolean;           // Show UID on card (default: false)
  hideNames?: boolean;     // Hide character names (default: false)
}
```

Example:

```typescript
const url = kirara.generateCardUrl("856012067", "10000002", {
  lang: "en",
  substats: true,
  uid: true,
});
```

## License

See [LICENSE](./LICENSE) file.
