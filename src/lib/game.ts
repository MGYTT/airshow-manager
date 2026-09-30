"use client";

export type Locale="pl"|"en";
export type Status="available"|"invited"|"interested"|"declined"|"confirmed";
export type SponsorStatus="prospect"|"contacted"|"offered"|"partner"|"declined";
export type ScaleId="regional"|"national"|"international";

export type Career={eventName:string;location:string;eventDate:string;scaleId:ScaleId;budget:number};

export type Contact={
  id:number;name:string;country:string;aircraft:string;fee:number;hotel:number;fuel:number;support:number;
  status:Status;replyAt:string|null;
};

export type Sponsor={
  id:number;name:string;industry:string;tier:"Lokalny"|"Strategiczny"|"Główny";
  baseOffer:number;perConfirmedAct:number;minReputation:number;requirement:string;
  status:SponsorStatus;replyAt:string|null;offer:number|null;negotiated:boolean;
};

export type Transaction={
  id:string;date:string;label:string;amount:number;
  category:"start"|"participant"|"operations"|"sponsor"|"ticketing";
};

export type SaveGame={
  version:3;locale:Locale;career:Career;currentDate:string;cash:number;reputation:number;
  contacts:Contact[];sponsors:Sponsor[];feed:string[];transactions:Transaction[];milestonesSeen:number[];
};

export const SAVE_KEY="airshow-manager-save-v3";

export const scales=[
  {id:"regional" as const,label:"Regionalny AirShow",budget:650000,audience:"do 15 tys. widzów",tone:"Kontrolowany start",description:"Mniejsza skala, prostsza logistyka i większy margines bezpieczeństwa finansowego."},
  {id:"national" as const,label:"Krajowy AirShow",budget:1250000,audience:"do 40 tys. widzów",tone:"Duże wydarzenie",description:"Większy program, więcej partnerów i wyższe wymagania operacyjne."},
  {id:"international" as const,label:"Międzynarodowy AirShow",budget:2400000,audience:"60 tys.+ widzów",tone:"Ambitny projekt",description:"Najwyższa presja, największy budżet i najbardziej wymagający program."},
];

export const initialContacts:Contact[]=[
  {id:1,name:"Falcon Demo Team",country:"Polska",aircraft:"F-16",fee:85000,hotel:12000,fuel:18000,support:7000,status:"available",replyAt:null},
  {id:2,name:"Baltic Jet Team",country:"Litwa",aircraft:"L-39 × 6",fee:145000,hotel:26000,fuel:32000,support:14000,status:"available",replyAt:null},
  {id:3,name:"Heritage Flight",country:"Wielka Brytania",aircraft:"Spitfire",fee:62000,hotel:9000,fuel:11000,support:6000,status:"available",replyAt:null},
  {id:4,name:"Alpine Solo Display",country:"Szwajcaria",aircraft:"F/A-18",fee:110000,hotel:14000,fuel:24000,support:9000,status:"available",replyAt:null},
];

export const initialSponsors:Sponsor[]=[
  {id:1,name:"AeroFuel Polska",industry:"Paliwa lotnicze",tier:"Strategiczny",baseOffer:120000,perConfirmedAct:12000,minReputation:8,requirement:"Wyłączność branżowa w kategorii paliw i ekspozycja przy strefie operacyjnej.",status:"prospect",replyAt:null,offer:null,negotiated:false},
  {id:2,name:"Northline Bank",industry:"Finanse",tier:"Główny",baseOffer:210000,perConfirmedAct:18000,minReputation:16,requirement:"Status sponsora głównego, branding sceny oraz pakiet hospitality dla klientów.",status:"prospect",replyAt:null,offer:null,negotiated:false},
  {id:3,name:"SkyGrid Systems",industry:"Technologie",tier:"Strategiczny",baseOffer:95000,perConfirmedAct:10000,minReputation:10,requirement:"Strefa technologiczna i obecność marki w materiałach cyfrowych wydarzenia.",status:"prospect",replyAt:null,offer:null,negotiated:false},
  {id:4,name:"Vistula Motors",industry:"Motoryzacja",tier:"Lokalny",baseOffer:70000,perConfirmedAct:7000,minReputation:6,requirement:"Ekspozycja pojazdów w strefie publiczności i 20 zaproszeń VIP.",status:"prospect",replyAt:null,offer:null,negotiated:false},
];

const DAY=86400000;
export const addDays=(iso:string,days:number)=>new Date(new Date(iso+"T12:00:00").getTime()+days*DAY).toISOString().slice(0,10);
export const daysBetween=(from:string,to:string)=>Math.max(0,Math.ceil((new Date(to+"T12:00:00").getTime()-new Date(from+"T12:00:00").getTime())/DAY));
export const formatDate=(iso:string)=>new Intl.DateTimeFormat("pl-PL",{day:"2-digit",month:"long",year:"numeric"}).format(new Date(iso+"T12:00:00"));
export const money=(n:number)=>new Intl.NumberFormat("pl-PL",{style:"currency",currency:"PLN",maximumFractionDigits:0}).format(n);

export function createGame(career:Career,locale:Locale="pl"):SaveGame{
  const currentDate=addDays(career.eventDate,-332);
  return {version:3,locale,career,currentDate,cash:career.budget,reputation:12,contacts:initialContacts,sponsors:initialSponsors,feed:["Organizacja została utworzona. Rozpoczyna się pierwszy sezon."],transactions:[{id:"opening",date:currentDate,label:"Budżet startowy organizacji",amount:career.budget,category:"start"}],milestonesSeen:[]};
}

export function saveGame(save:SaveGame){localStorage.setItem(SAVE_KEY,JSON.stringify(save))}

function migrateV2(old:any):SaveGame{
  return {
    version:3,locale:old.locale??"pl",career:old.career,currentDate:old.currentDate,cash:old.cash,reputation:old.reputation??12,
    contacts:old.contacts??initialContacts,sponsors:initialSponsors,feed:old.feed??[],
    transactions:old.transactions??[{id:"migration-v2",date:old.currentDate,label:"Saldo przeniesione z poprzedniej wersji",amount:old.cash,category:"start"}],
    milestonesSeen:[]
  };
}

function migrateV1(old:any):SaveGame{
  const scale=scales.find(x=>x.label===old.career?.scale)??scales[0];
  const eventDate=old.career?.eventDate??addDays(new Date().toISOString().slice(0,10),332);
  const currentDate=addDays(eventDate,-Number(old.days??332));
  const contacts:Contact[]=(old.contacts??initialContacts).map((c:any)=>({
    id:c.id,name:c.name,country:c.country,aircraft:c.aircraft,fee:c.fee,hotel:c.hotel,fuel:c.fuel,support:c.support,
    status:({Available:"available",Invited:"invited",Interested:"interested",Declined:"declined",Confirmed:"confirmed"} as Record<string,Status>)[c.status]??c.status??"available",replyAt:null
  }));
  return {version:3,locale:"pl",career:{eventName:old.career?.eventName??"Mój AirShow",location:old.career?.location??"Polska",eventDate,scaleId:scale.id,budget:old.career?.budget??scale.budget},currentDate,cash:old.cash??scale.budget,reputation:12,contacts,sponsors:initialSponsors,feed:old.feed??[],transactions:[{id:"migration-v1",date:currentDate,label:"Saldo przeniesione z poprzedniej wersji",amount:old.cash??scale.budget,category:"start"}],milestonesSeen:[]};
}

export function loadGame():SaveGame|null{
  const raw=localStorage.getItem(SAVE_KEY);
  if(raw){try{return JSON.parse(raw) as SaveGame}catch{localStorage.removeItem(SAVE_KEY)}}
  const v2=localStorage.getItem("airshow-manager-save-v2");
  if(v2){try{const migrated=migrateV2(JSON.parse(v2));saveGame(migrated);return migrated}catch{}}
  const v1=localStorage.getItem("airshow-manager-save-v1");
  if(v1){try{const migrated=migrateV1(JSON.parse(v1));saveGame(migrated);return migrated}catch{}}
  return null;
}

export const readiness=(save:SaveGame)=>{
  const confirmed=save.contacts.filter(c=>c.status==="confirmed").length;
  const partners=save.sponsors.filter(s=>s.status==="partner").length;
  const budgetHealth=Math.max(0,Math.min(16,Math.round((save.cash/save.career.budget)*16)));
  return Math.min(100,8+confirmed*9+partners*5+budgetHealth);
};

export const sponsorOffer=(sponsor:Sponsor,confirmedActs:number)=>sponsor.baseOffer+sponsor.perConfirmedAct*confirmedActs;

export const seasonMilestones=[
  {days:300,text:"Pierwszy miesiąc planowania za tobą. Rynek oczekuje pierwszych konkretnych informacji o programie."},
  {days:270,text:"Okno komercyjne nabiera znaczenia. Sponsorzy będą wyżej wyceniać wydarzenie z potwierdzonym programem."},
  {days:240,text:"Rozpoczyna się faza rozwoju programu. Brak potwierdzonych uczestników zacznie zwiększać presję na organizację."},
  {days:180,text:"Do wydarzenia pozostało około pół roku. Operacje, infrastruktura i sprzedaż powinny wejść w aktywną fazę."},
  {days:120,text:"Cztery miesiące do pokazu. Każde opóźnienie będzie od teraz trudniejsze i droższe do odrobienia."},
  {days:60,text:"Ostatnie dwa miesiące. Priorytetem staje się gotowość operacyjna i finalizacja wszystkich zobowiązań."}
] as const;
