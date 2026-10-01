import type { Locale } from "./game";

const pl={
  "nav.center":"Centrum dowodzenia","nav.operations":"Operacje","nav.program":"Program lotniczy","nav.participants":"Uczestnicy","nav.sponsors":"Sponsorzy","nav.team":"Zespół","nav.infrastructure":"Infrastruktura","nav.tickets":"Bilety","nav.marketing":"Marketing","nav.finance":"Finanse","nav.eventDay":"Event Day",
  "status.available":"Dostępny","status.invited":"Zaproszony","status.interested":"Zainteresowany","status.declined":"Odmowa","status.confirmed":"Potwierdzony",
  "common.season":"Sezon 01","common.days":"dni do pokazu"
};
const en={
  "nav.center":"Command center","nav.operations":"Operations","nav.program":"Flight program","nav.participants":"Participants","nav.sponsors":"Sponsors","nav.team":"Team","nav.infrastructure":"Infrastructure","nav.tickets":"Tickets","nav.marketing":"Marketing","nav.finance":"Finance","nav.eventDay":"Event Day",
  "status.available":"Available","status.invited":"Invited","status.interested":"Interested","status.declined":"Declined","status.confirmed":"Confirmed",
  "common.season":"Season 01","common.days":"days to show"
};
const dictionaries={pl,en};
export type TranslationKey=keyof typeof pl;
export const t=(locale:Locale,key:TranslationKey)=>dictionaries[locale][key]??pl[key];
