# Kirara

A TypeScript library for fetching Genshin Impact character data from the Enka API and generating card images using enka.cards. (HSR and ZZZ support coming soon)

## Features

- Fetch player profile data from Enka API
- Retrieve list of character IDs
- Generate image URLs for character cards
- Download card images as Buffers
- Support for customization options (language, substats, etc.)
- Simple and modular design

## Installation

```bash
npm install @kiznaiverr/kirara
```

## Usage

Import the library and create an instance:

```typescript
import { Kirara } from "@kiznaiverr/kirara";

const kirara = new Kirara();
```

Fetch player data:

```typescript
const playerData = await kirara.getPlayerData("856012067");
console.log(playerData.playerInfo.nickname); // Output: Kiznavierr
```

Get list of character IDs:

```typescript
const avatars = await kirara.getAvatarList("856012067");
console.log(avatars); // Output: ['10000047', '10000096', ...]
```

Generate image URL for the first character:

```typescript
const cardUrl = await kirara.generateDefaultCardUrl("856012067", {
  lang: "en",
});
console.log(cardUrl); // Output: https://cards.enka.network/u/856012067/10000047/image?lang=en
```

Fetch image as Buffer:

```typescript
const imageBuffer = await kirara.generateDefaultCardImage("856012067");
```

```

## API

- `getPlayerData(uid: string)`: Fetch player data.
- `getAvatarList(uid: string)`: Get list of avatar IDs.
- `getDefaultAvatarId(uid: string)`: Get first avatar ID.
- `generateCardUrl(uid: string, avatarId: string, options?)`: Generate image URL.
- `generateCardImage(uid: string, avatarId: string, options?)`: Fetch image as Buffer.
- `generateDefaultCardUrl(uid: string, options?)`: Generate URL for default avatar.
- `generateDefaultCardImage(uid: string, options?)`: Fetch image for default avatar.


```
