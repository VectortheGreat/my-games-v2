export enum Platform {
  Steam = "steam",
  EpicGames = "epicGames",
  Ubisoft = "ubisoft",
  XboxPc = "xboxPc",
  EaGames = "eaGames",
  Torrent = "torrent",
  Playstation = "playstation",
  XboxSeries = "xboxSeries",
  Nintendo = "nintendo",
  Mobile = "mobile",
  OtherPlatforms = "otherPlatforms"
}

export enum Status {
  Completed = "completed",
  Abandoned = "abandoned",
  ToBeCompleted = "toBeCompleted",
  ActivePlaying = "activePlaying"
}

export type GamesData = {
  rating: number
  playTime: number
  status: Status
  lastPlay: string
  photo: string
  platform: Platform
  name: string
  review: string
  _id: string
  userId: string
  screenshotSize: number
  createdAt: Date
}

export type DialogGameData = Omit<
  GamesData,
  "userId" | "screenshotSize" | "createdAt"
>
