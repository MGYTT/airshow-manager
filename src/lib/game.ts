"use client";

export type Locale="pl"|"en";
export type Status="available"|"invited"|"interested"|"declined"|"confirmed";
export type SponsorStatus="prospect"|"contacted"|"offered"|"partner"|"declined";
export type ScaleId="regional"|"national"|"international";
export type DepartmentId="airOps"|"safety"|"commercial"|"marketing";
export type Department={id:DepartmentId;name:string;level:number;monthlyCost:number;upgradeCost:number;description:string};
export type OperationTask={id:string;title:string;description:string;department:DepartmentId;requiredLevel:number;cost:number;readiness:number;completed:boolean};
export type MarketingCampaign={id:string;name:string;description:string;cost:number;awareness:number;requiredLevel:number;completed:boolean};
export type Ticketing={price:number;capacity:number;sold:number;salesOpened:boolean};
export type InfrastructureProject={id:string;name:string;description:string;cost:number;readiness:number;department:DepartmentId;requiredLevel:number;completed:boolean};
export type EventResult={score:number;attendance:number;attendanceRate:number;reputationGain:number;grade:"Operational"|"Strong"|"Excellent";completedAt:string};
export type SeasonRecord={season:number;eventName:string;eventDate:string;scaleId:ScaleId;score:number;attendance:number;grade:EventResult["grade"];closingCash:number};
export type IncidentEffect={cash?:number;reputation?:number;awareness?:number;readiness?:number};
export type IncidentChoice={id:"a"|"b";label:string;description:string;effect:IncidentEffect};
export type Incident={id:string;kind:"crisis"|"opportunity";title:string;description:string;triggerDays:number;choices:[IncidentChoice,IncidentChoice]};

export type Career={eventName:string;location:string;eventDate:string;scaleId:ScaleId;budget:number};

export type Contact={
  id:number;name:string;country:string;aircraft:string;fee:number;hotel:number;fuel:number;support:number;
  status:Status;replyAt:string|null;offerExpiresAt:string|null;negotiationRound:number;agreedDiscount:number;minReputation:number;minSeason:number;tier:"Regional"|"National"|"International";
};

export type Sponsor={
  id:number;name:string;industry:string;tier:"Lokalny"|"Strategiczny"|"Główny";
  baseOffer:number;perConfirmedAct:number;minReputation:number;requirement:string;
  status:SponsorStatus;replyAt:string|null;offer:number|null;negotiated:boolean;
};

export type Transaction={
  id:string;date:string;label:string;amount:number;
  category:"start"|"participant"|"operations"|"sponsor"|"ticketing"|"marketing"|"infrastructure"|"incident";
};

export type SaveGame={
  version:11;locale:Locale;season:number;career:Career;currentDate:string;cash:number;reputation:number;crisisReadiness:number;
  contacts:Contact[];sponsors:Sponsor[];departments:Department[];operations:OperationTask[];
  marketing:MarketingCampaign[];infrastructure:InfrastructureProject[];awareness:number;ticketing:Ticketing;
  feed:string[];transactions:Transaction[];milestonesSeen:number[];eventResult:EventResult|null;seasonHistory:SeasonRecord[];activeIncident:Incident|null;incidentsSeen:string[];
};

export const SAVE_KEY="airshow-manager-save-v11";

export const scales=[
  {id:"regional" as const,label:"Regionalny AirShow",budget:650000,audience:"do 15 tys. widzów",tone:"Kontrolowany start",description:"Mniejsza skala, prostsza logistyka i większy margines bezpieczeństwa finansowego."},
  {id:"national" as const,label:"Krajowy AirShow",budget:1250000,audience:"do 40 tys. widzów",tone:"Duże wydarzenie",description:"Większy program, więcej partnerów i wyższe wymagania operacyjne."},
  {id:"international" as const,label:"Międzynarodowy AirShow",budget:2400000,audience:"60 tys.+ widzów",tone:"Ambitny projekt",description:"Najwyższa presja, największy budżet i najbardziej wymagający program."},
];

export const initialContacts:Contact[]=[
  {id:1,name:"Falcon Demo Team",country:"Polska",aircraft:"F-16",fee:85000,hotel:12000,fuel:18000,support:7000,status:"available",replyAt:null,offerExpiresAt:null,negotiationRound:0,agreedDiscount:0,minReputation:0,minSeason:1,tier:"Regional"},
  {id:2,name:"Baltic Jet Team",country:"Litwa",aircraft:"L-39 × 6",fee:145000,hotel:26000,fuel:32000,support:14000,status:"available",replyAt:null,offerExpiresAt:null,negotiationRound:0,agreedDiscount:0,minReputation:0,minSeason:1,tier:"Regional"},
  {id:3,name:"Heritage Flight",country:"Wielka Brytania",aircraft:"Spitfire",fee:62000,hotel:9000,fuel:11000,support:6000,status:"available",replyAt:null,offerExpiresAt:null,negotiationRound:0,agreedDiscount:0,minReputation:0,minSeason:1,tier:"Regional"},
  {id:4,name:"Alpine Solo Display",country:"Szwajcaria",aircraft:"F/A-18",fee:110000,hotel:14000,fuel:24000,support:9000,status:"available",replyAt:null,offerExpiresAt:null,negotiationRound:0,agreedDiscount:0,minReputation:0,minSeason:1,tier:"Regional"},
  {id:5,name:"Nordic Thunder",country:"Finlandia",aircraft:"F/A-18",fee:175000,hotel:18000,fuel:30000,support:12000,status:"available",replyAt:null,offerExpiresAt:null,negotiationRound:0,agreedDiscount:0,minReputation:18,minSeason:2,tier:"National"},
  {id:6,name:"Viper Tactical Demo",country:"Belgia",aircraft:"F-16",fee:190000,hotel:20000,fuel:34000,support:14000,status:"available",replyAt:null,offerExpiresAt:null,negotiationRound:0,agreedDiscount:0,minReputation:22,minSeason:2,tier:"National"},
  {id:7,name:"Atlantic Aerobatic Team",country:"Francja",aircraft:"Alpha Jet × 8",fee:260000,hotel:42000,fuel:52000,support:24000,status:"available",replyAt:null,offerExpiresAt:null,negotiationRound:0,agreedDiscount:0,minReputation:28,minSeason:2,tier:"National"},
  {id:8,name:"Typhoon Performance Flight",country:"Wielka Brytania",aircraft:"Typhoon",fee:235000,hotel:22000,fuel:44000,support:18000,status:"available",replyAt:null,offerExpiresAt:null,negotiationRound:0,agreedDiscount:0,minReputation:34,minSeason:3,tier:"International"},
  {id:9,name:"Mediterranean Formation Team",country:"Włochy",aircraft:"MB-339 × 9",fee:340000,hotel:52000,fuel:68000,support:30000,status:"available",replyAt:null,offerExpiresAt:null,negotiationRound:0,agreedDiscount:0,minReputation:42,minSeason:3,tier:"International"},
  {id:10,name:"Transatlantic Heavy Demo",country:"USA",aircraft:"F-15EX",fee:390000,hotel:48000,fuel:82000,support:36000,status:"available",replyAt:null,offerExpiresAt:null,negotiationRound:0,agreedDiscount:0,minReputation:50,minSeason:4,tier:"International"}
];

export const initialSponsors:Sponsor[]=[
  {id:1,name:"AeroFuel Polska",industry:"Paliwa lotnicze",tier:"Strategiczny",baseOffer:120000,perConfirmedAct:12000,minReputation:8,requirement:"Wyłączność branżowa w kategorii paliw i ekspozycja przy strefie operacyjnej.",status:"prospect",replyAt:null,offer:null,negotiated:false},
  {id:2,name:"Northline Bank",industry:"Finanse",tier:"Główny",baseOffer:210000,perConfirmedAct:18000,minReputation:16,requirement:"Status sponsora głównego, branding sceny oraz pakiet hospitality dla klientów.",status:"prospect",replyAt:null,offer:null,negotiated:false},
  {id:3,name:"SkyGrid Systems",industry:"Technologie",tier:"Strategiczny",baseOffer:95000,perConfirmedAct:10000,minReputation:10,requirement:"Strefa technologiczna i obecność marki w materiałach cyfrowych wydarzenia.",status:"prospect",replyAt:null,offer:null,negotiated:false},
  {id:4,name:"Vistula Motors",industry:"Motoryzacja",tier:"Lokalny",baseOffer:70000,perConfirmedAct:7000,minReputation:6,requirement:"Ekspozycja pojazdów w strefie publiczności i 20 zaproszeń VIP.",status:"prospect",replyAt:null,offer:null,negotiated:false},
];

export const initialDepartments:Department[]=[
  {id:"airOps",name:"Operacje lotnicze",level:1,monthlyCost:18000,upgradeCost:60000,description:"Koordynacja programu, slotów, prób, odpraw i ruchu statków powietrznych."},
  {id:"safety",name:"Bezpieczeństwo",level:1,monthlyCost:16000,upgradeCost:55000,description:"Strefy bezpieczeństwa, procedury awaryjne i współpraca ze służbami."},
  {id:"commercial",name:"Komercja",level:1,monthlyCost:13000,upgradeCost:45000,description:"Sponsorzy, partnerstwa, hospitality i rozwój przychodów komercyjnych."},
  {id:"marketing",name:"Marketing",level:1,monthlyCost:11000,upgradeCost:40000,description:"Komunikacja wydarzenia, kampanie, media i budowanie popytu."},
];

export const initialOperations:OperationTask[]=[
  {id:"ops-plan",title:"Plan operacyjny lotniska",description:"Zdefiniuj ruch lotniczy, strefy robocze, procedury i odpowiedzialności.",department:"airOps",requiredLevel:1,cost:18000,readiness:7,completed:false},
  {id:"display-zone",title:"Zatwierdzenie strefy pokazów",description:"Przygotuj geometrię strefy, punkty odniesienia i wymagane zabezpieczenia.",department:"safety",requiredLevel:2,cost:42000,readiness:10,completed:false},
  {id:"emergency-plan",title:"Plan reagowania kryzysowego",description:"Uzgodnij procedury z ratownictwem, ochroną, medykami i lotniskiem.",department:"safety",requiredLevel:2,cost:35000,readiness:9,completed:false},
  {id:"crew-flow",title:"Logistyka załóg i uczestników",description:"Zaplanuj transport, odprawy, dostęp do płyty i obsługę zespołów.",department:"airOps",requiredLevel:2,cost:30000,readiness:8,completed:false},
];

export const initialInfrastructure:InfrastructureProject[]=[
  {id:"aircraft-apron",name:"Płyta dla uczestników",description:"Wydzielona i zabezpieczona przestrzeń postojowa dla statków powietrznych programu.",cost:45000,readiness:7,department:"airOps",requiredLevel:1,completed:false},
  {id:"ops-center",name:"Centrum operacyjne",description:"Zaplecze odpraw, koordynacji slotów, załóg i bieżących decyzji w czasie wydarzenia.",cost:38000,readiness:6,department:"airOps",requiredLevel:2,completed:false},
  {id:"public-zone",name:"Strefa publiczności",description:"Ciągi komunikacyjne, bariery, punkty obsługi i podstawowa infrastruktura dla widzów.",cost:60000,readiness:8,department:"safety",requiredLevel:2,completed:false},
  {id:"emergency-access",name:"Drogi ratownicze",description:"Dostęp dla służb, punkty medyczne i zabezpieczone trasy reagowania awaryjnego.",cost:42000,readiness:9,department:"safety",requiredLevel:2,completed:false}
];

export const initialMarketing:MarketingCampaign[]=[
  {id:"social",name:"Kampania social media",description:"Regularna komunikacja, krótkie formaty wideo i promocja potwierdzonych uczestników.",cost:18000,awareness:12,requiredLevel:1,completed:false},
  {id:"aviation-media",name:"Media lotnicze",description:"Partnerstwa z portalami i twórcami specjalizującymi się w lotnictwie.",cost:32000,awareness:15,requiredLevel:1,completed:false},
  {id:"regional",name:"Kampania regionalna",description:"Outdoor, radio i media lokalne w regionie wydarzenia.",cost:45000,awareness:20,requiredLevel:2,completed:false},
  {id:"national",name:"Kampania ogólnopolska",description:"Szeroka kampania wizerunkowa przed kluczową fazą sprzedaży.",cost:110000,awareness:28,requiredLevel:3,completed:false},
];

export const scaleCapacity:Record<ScaleId,number>={regional:15000,national:40000,international:65000};

const isScaleId=(value:unknown):value is ScaleId=>value==="regional"||value==="national"||value==="international";
const legacyScaleCapacity=(old:any)=>{
  const rawScaleId:unknown=old?.career?.scaleId;
  const scaleId:ScaleId=isScaleId(rawScaleId)?rawScaleId:"regional";
  return scaleCapacity[scaleId];
};



const DAY=86400000;
export const addDays=(iso:string,days:number)=>new Date(new Date(iso+"T12:00:00").getTime()+days*DAY).toISOString().slice(0,10);
export const daysBetween=(from:string,to:string)=>Math.max(0,Math.ceil((new Date(to+"T12:00:00").getTime()-new Date(from+"T12:00:00").getTime())/DAY));
export const formatDate=(iso:string)=>new Intl.DateTimeFormat("pl-PL",{day:"2-digit",month:"long",year:"numeric"}).format(new Date(iso+"T12:00:00"));
export const money=(n:number)=>new Intl.NumberFormat("pl-PL",{style:"currency",currency:"PLN",maximumFractionDigits:0}).format(n);

export function createGame(career:Career,locale:Locale="pl"):SaveGame{
  const currentDate=addDays(career.eventDate,-332);
  return {version:11,locale,season:1,career,currentDate,cash:career.budget,reputation:12,crisisReadiness:0,contacts:initialContacts,sponsors:initialSponsors,departments:initialDepartments,operations:initialOperations,marketing:initialMarketing,infrastructure:initialInfrastructure,awareness:8,ticketing:{price:89,capacity:scaleCapacity[career.scaleId],sold:0,salesOpened:false},feed:["Organizacja została utworzona. Rozpoczyna się pierwszy sezon."],transactions:[{id:"opening",date:currentDate,label:"Budżet startowy organizacji",amount:career.budget,category:"start"}],milestonesSeen:[],eventResult:null,seasonHistory:[],activeIncident:null,incidentsSeen:[]};
}

export function saveGame(save:SaveGame){localStorage.setItem(SAVE_KEY,JSON.stringify(save))}

const hydrateContacts=(existing:any[]=[])=>initialContacts.map(base=>{
  const old=existing.find(c=>c?.id===base.id);
  return old?{...base,...old,offerExpiresAt:old.offerExpiresAt??null,negotiationRound:old.negotiationRound??0,agreedDiscount:old.agreedDiscount??0,minReputation:base.minReputation,minSeason:base.minSeason,tier:base.tier}:({...base});
});

function migrateV10(old:any):SaveGame{
  return {...old,version:11,crisisReadiness:old.crisisReadiness??0,activeIncident:old.activeIncident??null,incidentsSeen:old.incidentsSeen??[]};
}

function migrateV9(old:any):SaveGame{
  return {...old,version:11,contacts:hydrateContacts(old.contacts),crisisReadiness:old.crisisReadiness??0,activeIncident:null,incidentsSeen:old.incidentsSeen??[]};
}

function migrateV8(old:any):SaveGame{
  return {...old,version:11,contacts:hydrateContacts(old.contacts)};
}

function migrateV7(old:any):SaveGame{
  return {...old,version:11,season:old.season??1,contacts:hydrateContacts(old.contacts),seasonHistory:old.seasonHistory??[],crisisReadiness:old.crisisReadiness??0,activeIncident:null,incidentsSeen:old.incidentsSeen??[]};
}

function migrateV6(old:any):SaveGame{
  return {...old,version:11,season:old.season??1,contacts:hydrateContacts(old.contacts),eventResult:old.eventResult??null,seasonHistory:old.seasonHistory??[],crisisReadiness:old.crisisReadiness??0,activeIncident:null,incidentsSeen:old.incidentsSeen??[]};
}

function migrateV5(old:any):SaveGame{
  return {...old,version:11,season:old.season??1,contacts:hydrateContacts(old.contacts),infrastructure:old.infrastructure??initialInfrastructure,eventResult:null,seasonHistory:old.seasonHistory??[],crisisReadiness:old.crisisReadiness??0,activeIncident:null,incidentsSeen:old.incidentsSeen??[]};
}

function migrateV4(old:any):SaveGame{
  return {...old,version:11,season:old.season??1,contacts:hydrateContacts(old.contacts),crisisReadiness:old.crisisReadiness??0,activeIncident:null,incidentsSeen:old.incidentsSeen??[],marketing:old.marketing??initialMarketing,infrastructure:initialInfrastructure,eventResult:null,seasonHistory:old.seasonHistory??[],awareness:old.awareness??8,ticketing:old.ticketing??{price:89,capacity:legacyScaleCapacity(old),sold:0,salesOpened:false}};
}

function migrateV3(old:any):SaveGame{
  return {...old,version:11,season:old.season??1,contacts:hydrateContacts(old.contacts),crisisReadiness:old.crisisReadiness??0,activeIncident:null,incidentsSeen:old.incidentsSeen??[],departments:old.departments??initialDepartments,operations:old.operations??initialOperations,marketing:initialMarketing,infrastructure:initialInfrastructure,eventResult:null,seasonHistory:old.seasonHistory??[],awareness:8,ticketing:{price:89,capacity:legacyScaleCapacity(old),sold:0,salesOpened:false}};
}

function migrateV2(old:any):SaveGame{
  return {
    version:11,locale:old.locale??"pl",season:old.season??1,crisisReadiness:old.crisisReadiness??0,career:old.career,currentDate:old.currentDate,cash:old.cash,reputation:old.reputation??12,
    contacts:old.contacts??initialContacts,sponsors:initialSponsors,departments:initialDepartments,operations:initialOperations,marketing:initialMarketing,infrastructure:initialInfrastructure,awareness:8,ticketing:{price:89,capacity:legacyScaleCapacity(old),sold:0,salesOpened:false},feed:old.feed??[],
    transactions:old.transactions??[{id:"migration-v2",date:old.currentDate,label:"Saldo przeniesione z poprzedniej wersji",amount:old.cash,category:"start"}],
    milestonesSeen:[],eventResult:null,seasonHistory:old.seasonHistory??[],activeIncident:null,incidentsSeen:old.incidentsSeen??[]
  };
}

function migrateV1(old:any):SaveGame{
  const scale=scales.find(x=>x.label===old.career?.scale)??scales[0];
  const eventDate=old.career?.eventDate??addDays(new Date().toISOString().slice(0,10),332);
  const currentDate=addDays(eventDate,-Number(old.days??332));
  const contacts:Contact[]=(old.contacts??initialContacts).map((c:any)=>({
    ...initialContacts.find(base=>base.id===c.id)!,id:c.id,name:c.name,country:c.country,aircraft:c.aircraft,fee:c.fee,hotel:c.hotel,fuel:c.fuel,support:c.support,
    status:({Available:"available",Invited:"invited",Interested:"interested",Declined:"declined",Confirmed:"confirmed"} as Record<string,Status>)[c.status]??c.status??"available",replyAt:null,offerExpiresAt:null,negotiationRound:0,agreedDiscount:0
  }));
  return {version:11,locale:"pl",season:1,crisisReadiness:0,career:{eventName:old.career?.eventName??"Mój AirShow",location:old.career?.location??"Polska",eventDate,scaleId:scale.id,budget:old.career?.budget??scale.budget},currentDate,cash:old.cash??scale.budget,reputation:12,contacts,sponsors:initialSponsors,departments:initialDepartments,operations:initialOperations,marketing:initialMarketing,infrastructure:initialInfrastructure,awareness:8,ticketing:{price:89,capacity:scaleCapacity[scale.id],sold:0,salesOpened:false},feed:old.feed??[],transactions:[{id:"migration-v1",date:currentDate,label:"Saldo przeniesione z poprzedniej wersji",amount:old.cash??scale.budget,category:"start"}],milestonesSeen:[],eventResult:null,seasonHistory:[],activeIncident:null,incidentsSeen:[]};
}

export function loadGame():SaveGame|null{
  const raw=localStorage.getItem(SAVE_KEY);
  if(raw){try{return JSON.parse(raw) as SaveGame}catch{localStorage.removeItem(SAVE_KEY)}}
  const v10=localStorage.getItem("airshow-manager-save-v10");
  if(v10){try{const migrated=migrateV10(JSON.parse(v10));saveGame(migrated);return migrated}catch{}}
  const v9=localStorage.getItem("airshow-manager-save-v9");
  if(v9){try{const migrated=migrateV9(JSON.parse(v9));saveGame(migrated);return migrated}catch{}}
  const v8=localStorage.getItem("airshow-manager-save-v8");
  if(v8){try{const migrated=migrateV8(JSON.parse(v8));saveGame(migrated);return migrated}catch{}}
  const v7=localStorage.getItem("airshow-manager-save-v7");
  if(v7){try{const migrated=migrateV7(JSON.parse(v7));saveGame(migrated);return migrated}catch{}}
  const v6=localStorage.getItem("airshow-manager-save-v6");
  if(v6){try{const migrated=migrateV6(JSON.parse(v6));saveGame(migrated);return migrated}catch{}}
  const v5=localStorage.getItem("airshow-manager-save-v5");
  if(v5){try{const migrated=migrateV5(JSON.parse(v5));saveGame(migrated);return migrated}catch{}}
  const v4=localStorage.getItem("airshow-manager-save-v4");
  if(v4){try{const migrated=migrateV4(JSON.parse(v4));saveGame(migrated);return migrated}catch{}}
  const v3=localStorage.getItem("airshow-manager-save-v3");
  if(v3){try{const migrated=migrateV3(JSON.parse(v3));saveGame(migrated);return migrated}catch{}}
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
  const operations=save.operations.filter(o=>o.completed).reduce((sum,o)=>sum+o.readiness,0);
  const infrastructure=save.infrastructure.filter(i=>i.completed).reduce((sum,i)=>sum+i.readiness,0);
  const team=Math.min(12,save.departments.reduce((sum,d)=>sum+d.level,0));
  return Math.max(0,Math.min(100,4+confirmed*9+partners*5+budgetHealth+operations+infrastructure+team+save.crisisReadiness));
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

export const monthlyPayroll=(save:SaveGame)=>save.departments.reduce((sum,d)=>sum+d.monthlyCost*d.level,0);
export const operationReadiness=(save:SaveGame)=>save.operations.filter(o=>o.completed).reduce((sum,o)=>sum+o.readiness,0);


export const ticketDemandPerDay=(save:SaveGame)=>{
  if(!save.ticketing.salesOpened)return 0;
  const confirmed=save.contacts.filter(c=>c.status==="confirmed").length;
  const marketingLevel=save.departments.find(d=>d.id==="marketing")?.level??1;
  const days=daysBetween(save.currentDate,save.career.eventDate);
  const base=Math.max(20,save.ticketing.capacity/220);
  const attractiveness=.38+confirmed*.18+(save.awareness/100)*.75+(save.reputation/100)*.45+marketingLevel*.06;
  const priceFactor=Math.max(.42,Math.min(1.4,89/save.ticketing.price));
  const urgency=days<=30?1.8:days<=90?1.42:days<=180?1.18:1;
  return Math.max(0,Math.round(base*attractiveness*priceFactor*urgency));
};


export const eventDayChecks=(save:SaveGame)=>{
  const confirmed=save.contacts.filter(c=>c.status==="confirmed").length;
  const criticalOps=["ops-plan","display-zone","emergency-plan"];
  const criticalInfra=["aircraft-apron","public-zone","emergency-access"];
  const safetyLevel=save.departments.find(d=>d.id==="safety")?.level??0;
  return [
    {id:"date",label:"Nadszedł dzień wydarzenia",passed:daysBetween(save.currentDate,save.career.eventDate)===0,detail:"Przesuń czas do daty AirShow."},
    {id:"program",label:"Minimum 2 potwierdzonych uczestników",passed:confirmed>=2,detail:`${confirmed}/2 potwierdzonych`},
    {id:"operations",label:"Kluczowe procedury operacyjne",passed:criticalOps.every(id=>save.operations.find(o=>o.id===id)?.completed),detail:"Plan lotniska, strefa pokazów i plan kryzysowy."},
    {id:"infrastructure",label:"Krytyczna infrastruktura gotowa",passed:criticalInfra.every(id=>save.infrastructure.find(i=>i.id===id)?.completed),detail:"Płyta, strefa publiczności i drogi ratownicze."},
    {id:"safety",label:"Bezpieczeństwo na poziomie 2+",passed:safetyLevel>=2,detail:`Aktualny poziom: ${safetyLevel}`}
  ];
};

export const calculateEventResult=(save:SaveGame):EventResult=>{
  const confirmed=save.contacts.filter(c=>c.status==="confirmed").length;
  const ready=readiness(save);
  const attendanceRate=save.ticketing.capacity>0?save.ticketing.sold/save.ticketing.capacity:0;
  const cashHealth=Math.max(0,Math.min(1,save.cash/save.career.budget));
  const score=Math.max(0,Math.min(100,Math.round(ready*.48+Math.min(1,attendanceRate)*22+Math.min(1,confirmed/4)*15+(save.reputation/100)*8+cashHealth*7)));
  const reputationGain=score>=85?10:score>=70?6:3;
  return {score,attendance:save.ticketing.sold,attendanceRate:Math.round(attendanceRate*100),reputationGain,grade:score>=85?"Excellent":score>=70?"Strong":"Operational",completedAt:save.career.eventDate};
};


const resetContacts=()=>initialContacts.map(c=>({...c,status:"available" as Status,replyAt:null,offerExpiresAt:null,negotiationRound:0,agreedDiscount:0}));
const resetSponsors=()=>initialSponsors.map(s=>({...s,status:"prospect" as SponsorStatus,replyAt:null,offer:null,negotiated:false}));
const resetOperations=()=>initialOperations.map(o=>({...o,completed:false}));
const resetInfrastructure=()=>initialInfrastructure.map(i=>({...i,completed:false}));
const resetMarketing=()=>initialMarketing.map(m=>({...m,completed:false}));

export const nextSeasonBudget=(save:SaveGame,scaleId:ScaleId)=>{
  const scale=scales.find(s=>s.id===scaleId)!;
  const carryover=Math.max(0,Math.round(save.cash*.3));
  const performanceBonus=save.eventResult?Math.round(scale.budget*(save.eventResult.score>=85?.14:save.eventResult.score>=70?.08:.04)):0;
  return {base:scale.budget,carryover,performanceBonus,total:scale.budget+carryover+performanceBonus};
};

export const startNextSeason=(save:SaveGame,scaleId:ScaleId):SaveGame=>{
  if(!save.eventResult)return save;
  const budget=nextSeasonBudget(save,scaleId);
  const nextEventDate=addDays(save.career.eventDate,365);
  const record:SeasonRecord={season:save.season,eventName:save.career.eventName,eventDate:save.career.eventDate,scaleId:save.career.scaleId,score:save.eventResult.score,attendance:save.eventResult.attendance,grade:save.eventResult.grade,closingCash:save.cash};
  const career:Career={...save.career,eventDate:nextEventDate,scaleId,budget:budget.total};
  const currentDate=addDays(nextEventDate,-332);
  return {
    ...save,version:11,season:save.season+1,career,currentDate,cash:budget.total,crisisReadiness:0,
    reputation:save.reputation,contacts:resetContacts(),sponsors:resetSponsors(),
    operations:resetOperations(),infrastructure:resetInfrastructure(),marketing:resetMarketing(),
    awareness:Math.max(8,Math.round(save.awareness*.45)),
    ticketing:{price:89,capacity:scaleCapacity[scaleId],sold:0,salesOpened:false},
    feed:[`Rozpoczyna się sezon ${save.season+1}. Budżet otwarcia: ${money(budget.total)}.`],
    transactions:[{id:`opening-s${save.season+1}`,date:currentDate,label:`Budżet otwarcia sezonu ${save.season+1}`,amount:budget.total,category:"start"}],
    milestonesSeen:[],eventResult:null,seasonHistory:[...save.seasonHistory,record],activeIncident:null,incidentsSeen:[]
  };
};


export const contactUnlocked=(save:SaveGame,contact:Contact)=>save.season>=contact.minSeason&&save.reputation>=contact.minReputation;
export const unlockedContactCount=(save:SaveGame)=>save.contacts.filter(c=>contactUnlocked(save,c)).length;


export const participantBaseTotal=(contact:Contact)=>contact.fee+contact.hotel+contact.fuel+contact.support;

export const participantNegotiationRisk=(save:SaveGame,contact:Contact)=>{
  const commercialLevel=save.departments.find(d=>d.id==="commercial")?.level??1;
  const leverage=save.reputation-contact.minReputation+commercialLevel*3-contact.negotiationRound*4;
  return leverage>=12?"low":leverage>=6?"medium":"high";
};

export const negotiateParticipantOffer=(save:SaveGame,contact:Contact)=>{
  const commercialLevel=save.departments.find(d=>d.id==="commercial")?.level??1;
  const leverage=save.reputation-contact.minReputation+commercialLevel*3-contact.negotiationRound*4;
  const nextRound=contact.negotiationRound+1;
  if(nextRound>2)return {accepted:false,walked:false,discount:contact.agreedDiscount,nextRound:contact.negotiationRound};
  const gain=nextRound===1?(leverage>=5?5:leverage>=1?3:0):(leverage>=10?4:leverage>=6?2:0);
  if(gain===0)return {accepted:false,walked:true,discount:contact.agreedDiscount,nextRound};
  return {accepted:true,walked:false,discount:Math.min(12,contact.agreedDiscount+gain),nextRound};
};


export const incidentPool:Omit<Incident,"id"|"triggerDays">[]=[
  {kind:"crisis",title:"Dodatkowe wymagania służb",description:"Służby bezpieczeństwa oczekują rozszerzenia zabezpieczenia strefy publiczności po aktualizacji planu wydarzenia.",choices:[
    {id:"a",label:"Rozszerz zabezpieczenie",description:"Ponosisz dodatkowy koszt, ale wzmacniasz gotowość operacyjną.",effect:{cash:-28000,readiness:5,reputation:1}},
    {id:"b",label:"Ogranicz zakres strefy",description:"Unikasz dużego wydatku, ale wydarzenie traci część przygotowania i rozpoznawalności.",effect:{cash:-6000,readiness:-3,awareness:-3}}
  ]},
  {kind:"opportunity",title:"Lokalny partner medialny",description:"Regionalna grupa medialna proponuje intensywny pakiet promocyjny w zamian za szybkie potwierdzenie współpracy.",choices:[
    {id:"a",label:"Kup pakiet medialny",description:"Koszt kampanii zwiększa rozpoznawalność i reputację.",effect:{cash:-22000,awareness:10,reputation:2}},
    {id:"b",label:"Pozostań przy obecnym planie",description:"Zachowujesz środki, ale rezygnujesz z dodatkowego zasięgu.",effect:{}}
  ]},
  {kind:"crisis",title:"Problem z dostępnością sprzętu",description:"Dostawca infrastruktury informuje o wzroście kosztów i ograniczonej dostępności sprzętu przed wydarzeniem.",choices:[
    {id:"a",label:"Zabezpiecz dostawę teraz",description:"Płacisz premię za gwarancję realizacji.",effect:{cash:-35000,readiness:4}},
    {id:"b",label:"Poszukaj alternatywy",description:"Tańsza ścieżka oszczędza część budżetu, ale zwiększa ryzyko operacyjne.",effect:{cash:-12000,readiness:-4,reputation:-1}}
  ]},
  {kind:"opportunity",title:"Dodatkowy slot promocyjny",description:"Partner lotniska udostępnia dodatkową przestrzeń do ekspozycji i aktywacji sponsorów.",choices:[
    {id:"a",label:"Uruchom strefę",description:"Inwestujesz w przygotowanie przestrzeni i zwiększasz atrakcyjność komercyjną wydarzenia.",effect:{cash:-18000,awareness:6,reputation:2}},
    {id:"b",label:"Nie rozszerzaj wydarzenia",description:"Brak dodatkowych kosztów i brak dodatkowego efektu.",effect:{}}
  ]},
  {kind:"crisis",title:"Presja na transport publiczności",description:"Prognozowana frekwencja wymusza dodatkowe działania transportowe i organizację dojazdu do terenu AirShow.",choices:[
    {id:"a",label:"Uruchom dodatkowy transport",description:"Wyższy koszt poprawia gotowość i odbiór wydarzenia.",effect:{cash:-30000,readiness:5,reputation:2}},
    {id:"b",label:"Pozostaw obecny plan",description:"Oszczędzasz, ale logistyka publiczności staje się słabszym punktem.",effect:{readiness:-5,reputation:-2}}
  ]}
];

export const nextIncident=(save:SaveGame,oldDays:number,newDays:number):Incident|null=>{
  const windows=[250,190,130,70,25];
  const trigger=windows.find(day=>oldDays>day&&newDays<=day&&!save.incidentsSeen.includes(`${save.season}-${day}`));
  if(trigger===undefined)return null;
  const base=incidentPool[(save.season*3+trigger)%incidentPool.length];
  return {...base,id:`${save.season}-${trigger}`,triggerDays:trigger};
};
