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

## Usage

Import the library and create an instance with the desired game:

```typescript
import { Kirara } from "@kiznavierr/kirara";

const kiraraGenshin = new Kirara("genshin");
const kiraraHsr = new Kirara("hsr");
const kiraraZzz = new Kirara("zzz");
```

### Examples

#### Genshin Impact

```typescript
// Fetch simplified player summary
const summary = await kiraraGenshin.getPlayerSummary("856012067", {
  lang: "en",
});
console.log(summary); // { nickname: 'Kiznavierr', level: 60, signature: '...', avatarIds: [...], ... }

// Fetch full player data
const playerData = await kiraraGenshin.getPlayerData("856012067");

// Generate card URL for default character
const cardUrl = await kiraraGenshin.generateDefaultCardUrl("856012067", {
  lang: "en",
});
```

#### Honkai: Star Rail

```typescript
// Fetch simplified player summary
const summary = await kiraraHsr.getPlayerSummary("800069903", { lang: "en" });
console.log(summary); // { nickname: 'Player name', level: 70, platform: 'PC', recordInfo: {...}, avatarIds: [...], ... }

// Fetch full player data
const playerData = await kiraraHsr.getPlayerData("800069903");

// Generate card URL for default character
const cardUrl = await kiraraHsr.generateDefaultCardUrl("800069903", {
  lang: "en",
});
```

#### Zenless Zone Zero

```typescript
// Fetch simplified player summary
const summary = await kiraraZzz.getPlayerSummary("1500422486", { lang: "en" });
console.log(summary); // { uid: '1500422486', region: 'EU', nickname: 'Lumi', level: 60, signature: '...', avatarIds: [...], ... }

// Fetch full player data
const playerData = await kiraraZzz.getPlayerData("1500422486");

// Generate card URL for default character
const cardUrl = await kiraraZzz.generateDefaultCardUrl("1500422486", {
  lang: "en",
});
```

## API

- `new Kirara(game: "genshin" | "hsr" | "zzz")`: Create instance for specific game.
- `getPlayerSummary(uid: string, options?: CardOptions)`: Fetch simplified player data with avatar list and card URL.
- `getPlayerData(uid: string)`: Fetch full player data from Enka API.
- `getAvatarList(uid: string)`: Get list of avatar IDs.
- `getDefaultAvatarId(uid: string)`: Get first avatar ID.
- `generateCardUrl(uid: string, avatarId: string, options?: CardOptions)`: Generate image URL.
- `generateCardImage(uid: string, avatarId: string, options?: CardOptions)`: Fetch image as Buffer.
- `generateDefaultCardUrl(uid: string, options?: CardOptions)`: Generate URL for default avatar.
- `generateDefaultCardImage(uid: string, options?: CardOptions)`: Fetch image for default avatar.

```

```
