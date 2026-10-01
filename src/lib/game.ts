"use client";

export type Locale="pl"|"en";
export type Status="available"|"invited"|"interested"|"declined"|"confirmed";
export type SponsorStatus="prospect"|"contacted"|"offered"|"partner"|"declined";
export type ScaleId="regional"|"national"|"international";
export type DepartmentId="airOps"|"safety"|"commercial"|"marketing";
export type Department={id:DepartmentId;name:string;level:number;monthlyCost:number;upgradeCost:number;description:string};
export type StaffRole="manager"|"specialist";
export type StaffMember={id:string;name:string;role:StaffRole;department:DepartmentId;skill:number;salary:number;hireCost:number;minReputation:number;description:string;hired:boolean};
export type OperationTask={id:string;title:string;description:string;department:DepartmentId;requiredLevel:number;cost:number;readiness:number;completed:boolean};
export type MarketingCampaign={id:string;name:string;description:string;cost:number;awareness:number;requiredLevel:number;completed:boolean};
export type TicketTierId="early"|"regular"|"vip";
export type TicketTier={id:TicketTierId;label:string;price:number;capacity:number;sold:number;enabled:boolean};
export type Ticketing={price:number;capacity:number;sold:number;salesOpened:boolean;tiers:TicketTier[]};
export type InfrastructureProject={id:string;name:string;description:string;cost:number;readiness:number;department:DepartmentId;requiredLevel:number;completed:boolean};
export type EventResult={score:number;attendance:number;attendanceRate:number;reputationGain:number;grade:"Operational"|"Strong"|"Excellent";completedAt:string};
export type SeasonRecord={season:number;eventName:string;eventDate:string;scaleId:ScaleId;score:number;attendance:number;grade:EventResult["grade"];closingCash:number};
export type IncidentEffect={cash?:number;reputation?:number;awareness?:number;readiness?:number};
export type IncidentChoice={id:"a"|"b";label:string;description:string;effect:IncidentEffect};
export type Incident={id:string;kind:"crisis"|"opportunity";title:string;description:string;triggerDays:number;choices:[IncidentChoice,IncidentChoice]};
export type FlightSlot={id:string;contactId:number;start:string;duration:number;buffer:number};
export type ParticipantLogistics={contactId:number;arrivalDate:string;arrivalTime:string;hotelBooked:boolean;transportReady:boolean;fuelReady:boolean;groundSupportReady:boolean;trainingDate:string;trainingTime:string};
export type WeatherCondition={time:string;windKts:number;visibilityKm:number;cloudBaseFt:number;precipitation:"none"|"light"|"moderate";temperatureC:number};
export type WeatherLimits={maxWindKts:number;minVisibilityKm:number;minCloudBaseFt:number};
export type EventDayIssueChoice={id:"a"|"b";label:string;description:string;delay:number;score:number;cancel:boolean;reputation:number};
export type EventDayIssue={id:string;title:string;description:string;slotId:string;choices:[EventDayIssueChoice,EventDayIssueChoice]};
export type EventDayState={status:"idle"|"running"|"completed";currentIndex:number;delay:number;scoreModifier:number;completedSlotIds:string[];canceledSlotIds:string[];log:string[];pendingIssue:EventDayIssue|null};

export type Career={eventName:string;location:string;eventDate:string;scaleId:ScaleId;budget:number};

export type Contact={
  id:number;name:string;country:string;aircraft:string;fee:number;hotel:number;fuel:number;support:number;
  status:Status;replyAt:string|null;offerExpiresAt:string|null;negotiationRound:number;agreedDiscount:number;minReputation:number;minSeason:number;tier:"Regional"|"National"|"International";
};

export type SponsorMetric="confirmedActs"|"awareness"|"marketing"|"ticketSales";
export type SponsorCommitment={metric:SponsorMetric;target:number;label:string};
export type Sponsor={
  id:number;name:string;industry:string;tier:"Lokalny"|"Strategiczny"|"Główny";
  baseOffer:number;perConfirmedAct:number;minReputation:number;requirement:string;exclusiveGroup:string;
  commitments:SponsorCommitment[];penaltyRate:number;
  status:SponsorStatus;replyAt:string|null;offer:number|null;negotiated:boolean;offerExpiresAt:string|null;negotiationRound:number;
};

export type Transaction={
  id:string;date:string;label:string;amount:number;
  category:"start"|"participant"|"operations"|"sponsor"|"ticketing"|"marketing"|"infrastructure"|"incident";
};

export type SaveGame={
  version:17;locale:Locale;season:number;career:Career;currentDate:string;cash:number;reputation:number;crisisReadiness:number;
  contacts:Contact[];sponsors:Sponsor[];departments:Department[];staff:StaffMember[];operations:OperationTask[];
  marketing:MarketingCampaign[];infrastructure:InfrastructureProject[];awareness:number;ticketing:Ticketing;
  feed:string[];transactions:Transaction[];milestonesSeen:number[];eventResult:EventResult|null;seasonHistory:SeasonRecord[];activeIncident:Incident|null;incidentsSeen:string[];flightProgram:FlightSlot[];participantLogistics:ParticipantLogistics[];eventDay:EventDayState;
};

export const SAVE_KEY="airshow-manager-save-v17";

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
  {id:1,name:"AeroFuel Polska",industry:"Paliwa lotnicze",tier:"Strategiczny",baseOffer:120000,perConfirmedAct:12000,minReputation:8,requirement:"Wyłączność branżowa w kategorii paliw i ekspozycja przy strefie operacyjnej.",exclusiveGroup:"fuel",commitments:[{metric:"confirmedActs",target:2,label:"Minimum 2 potwierdzone pokazy"},{metric:"marketing",target:1,label:"Minimum 1 kampania marketingowa"}],penaltyRate:.25,status:"prospect",replyAt:null,offer:null,negotiated:false,offerExpiresAt:null,negotiationRound:0},
  {id:2,name:"Northline Bank",industry:"Finanse",tier:"Główny",baseOffer:210000,perConfirmedAct:18000,minReputation:16,requirement:"Status sponsora głównego, branding sceny oraz pakiet hospitality dla klientów.",exclusiveGroup:"finance",commitments:[{metric:"awareness",target:55,label:"Rozpoznawalność 55+"},{metric:"ticketSales",target:35,label:"Sprzedaż min. 35% pojemności"},{metric:"confirmedActs",target:3,label:"Minimum 3 potwierdzone pokazy"}],penaltyRate:.35,status:"prospect",replyAt:null,offer:null,negotiated:false,offerExpiresAt:null,negotiationRound:0},
  {id:3,name:"SkyGrid Systems",industry:"Technologie",tier:"Strategiczny",baseOffer:95000,perConfirmedAct:10000,minReputation:10,requirement:"Strefa technologiczna i obecność marki w materiałach cyfrowych wydarzenia.",exclusiveGroup:"technology",commitments:[{metric:"awareness",target:40,label:"Rozpoznawalność 40+"},{metric:"marketing",target:2,label:"Minimum 2 kampanie marketingowe"}],penaltyRate:.25,status:"prospect",replyAt:null,offer:null,negotiated:false,offerExpiresAt:null,negotiationRound:0},
  {id:4,name:"Vistula Motors",industry:"Motoryzacja",tier:"Lokalny",baseOffer:70000,perConfirmedAct:7000,minReputation:6,requirement:"Ekspozycja pojazdów w strefie publiczności i 20 zaproszeń VIP.",exclusiveGroup:"automotive",commitments:[{metric:"ticketSales",target:20,label:"Sprzedaż min. 20% pojemności"}],penaltyRate:.2,status:"prospect",replyAt:null,offer:null,negotiated:false,offerExpiresAt:null,negotiationRound:0},
  {id:5,name:"JetCore Energy",industry:"Paliwa lotnicze",tier:"Główny",baseOffer:185000,perConfirmedAct:15000,minReputation:22,requirement:"Wyłączność paliwowa, branding strefy tankowania i ekspozycja przy zapleczu technicznym.",exclusiveGroup:"fuel",commitments:[{metric:"confirmedActs",target:3,label:"Minimum 3 potwierdzone pokazy"},{metric:"awareness",target:50,label:"Rozpoznawalność 50+"}],penaltyRate:.3,status:"prospect",replyAt:null,offer:null,negotiated:false,offerExpiresAt:null,negotiationRound:0},
  {id:6,name:"Meridian Financial",industry:"Finanse",tier:"Strategiczny",baseOffer:135000,perConfirmedAct:11000,minReputation:20,requirement:"Wyłączność w sektorze finansowym i branding strefy VIP.",exclusiveGroup:"finance",commitments:[{metric:"ticketSales",target:30,label:"Sprzedaż min. 30% pojemności"},{metric:"marketing",target:1,label:"Minimum 1 kampania marketingowa"}],penaltyRate:.25,status:"prospect",replyAt:null,offer:null,negotiated:false,offerExpiresAt:null,negotiationRound:0}
];

export const initialStaff:StaffMember[]=[
  {id:"ops-manager",name:"Marek Wysocki",role:"manager",department:"airOps",skill:3,salary:14000,hireCost:22000,minReputation:10,description:"Koordynator operacji lotniczych. Wzmacnia planowanie slotów, obsługę załóg i gotowość Event Day.",hired:false},
  {id:"ops-specialist",name:"Anna Zielińska",role:"specialist",department:"airOps",skill:2,salary:9000,hireCost:12000,minReputation:6,description:"Specjalistka ds. ruchu lotniczego i odpraw operacyjnych.",hired:false},
  {id:"safety-manager",name:"Piotr Nowak",role:"manager",department:"safety",skill:3,salary:15000,hireCost:24000,minReputation:12,description:"Manager bezpieczeństwa wydarzeń masowych i procedur kryzysowych.",hired:false},
  {id:"safety-specialist",name:"Karolina Mazur",role:"specialist",department:"safety",skill:2,salary:9500,hireCost:13000,minReputation:8,description:"Specjalistka ds. zabezpieczenia stref i współpracy ze służbami.",hired:false},
  {id:"commercial-manager",name:"Tomasz Lewandowski",role:"manager",department:"commercial",skill:3,salary:13500,hireCost:20000,minReputation:14,description:"Doświadczony negocjator kontraktów sponsorskich i partnerskich.",hired:false},
  {id:"commercial-specialist",name:"Julia Kaczmarek",role:"specialist",department:"commercial",skill:2,salary:8500,hireCost:11000,minReputation:7,description:"Specjalistka ds. hospitality i realizacji świadczeń sponsorskich.",hired:false},
  {id:"marketing-manager",name:"Natalia Wiśniewska",role:"manager",department:"marketing",skill:3,salary:13000,hireCost:19000,minReputation:12,description:"Manager kampanii, mediów i strategii sprzedaży wydarzenia.",hired:false},
  {id:"marketing-specialist",name:"Kamil Dąbrowski",role:"specialist",department:"marketing",skill:2,salary:8000,hireCost:10000,minReputation:6,description:"Specjalista od kampanii digital i konwersji sprzedaży biletów.",hired:false}
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

const createTicketTiers=(capacity:number):TicketTier[]=>{
  const early=Math.round(capacity*.18);
  const vip=Math.round(capacity*.06);
  const regular=capacity-early-vip;
  return [
    {id:"early",label:"Early Bird",price:69,capacity:early,sold:0,enabled:true},
    {id:"regular",label:"Regular",price:99,capacity:regular,sold:0,enabled:true},
    {id:"vip",label:"VIP",price:249,capacity:vip,sold:0,enabled:true}
  ];
};


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
  return {version:17,locale,season:1,career,currentDate,cash:career.budget,reputation:12,crisisReadiness:0,contacts:initialContacts,sponsors:initialSponsors,departments:initialDepartments,staff:initialStaff,operations:initialOperations,marketing:initialMarketing,infrastructure:initialInfrastructure,awareness:8,ticketing:{price:99,capacity:scaleCapacity[career.scaleId],sold:0,salesOpened:false,tiers:createTicketTiers(scaleCapacity[career.scaleId])},feed:["Organizacja została utworzona. Rozpoczyna się pierwszy sezon."],transactions:[{id:"opening",date:currentDate,label:"Budżet startowy organizacji",amount:career.budget,category:"start"}],milestonesSeen:[],eventResult:null,seasonHistory:[],activeIncident:null,incidentsSeen:[],flightProgram:[],participantLogistics:[],eventDay:{status:"idle",currentIndex:0,delay:0,scoreModifier:0,completedSlotIds:[],canceledSlotIds:[],log:[],pendingIssue:null}};
}

export function saveGame(save:SaveGame){localStorage.setItem(SAVE_KEY,JSON.stringify(save))}

const hydrateContacts=(existing:any[]=[])=>initialContacts.map(base=>{
  const old=existing.find(c=>c?.id===base.id);
  return old?{...base,...old,offerExpiresAt:old.offerExpiresAt??null,negotiationRound:old.negotiationRound??0,agreedDiscount:old.agreedDiscount??0,minReputation:base.minReputation,minSeason:base.minSeason,tier:base.tier}:({...base});
});

const hydrateSponsors=(existing:any[]=[])=>initialSponsors.map(base=>{
  const old=existing.find(s=>s?.id===base.id);
  return old?{...base,...old,exclusiveGroup:base.exclusiveGroup,commitments:base.commitments,penaltyRate:base.penaltyRate,offerExpiresAt:old.offerExpiresAt??null,negotiationRound:old.negotiationRound??0}:({...base});
});

const hydrateTicketing=(old:any):Ticketing=>{
  const capacity=Number(old?.capacity)||15000;
  if(Array.isArray(old?.tiers))return {...old,price:old.price??old.tiers.find((t:any)=>t?.id==="regular")?.price??99,capacity,sold:old.sold??old.tiers.reduce((sum:number,t:any)=>sum+(Number(t?.sold)||0),0),salesOpened:Boolean(old.salesOpened),tiers:createTicketTiers(capacity).map(base=>({...base,...old.tiers.find((t:any)=>t?.id===base.id)}))};
  const legacySold=Math.max(0,Number(old?.sold)||0);
  const tiers=createTicketTiers(capacity);
  let remaining=legacySold;
  const migrated=tiers.map(t=>{const sold=Math.min(t.capacity,remaining);remaining-=sold;return {...t,sold}});
  return {price:Number(old?.price)||99,capacity,sold:legacySold,salesOpened:Boolean(old?.salesOpened),tiers:migrated};
};

export const defaultParticipantLogistics=(contactId:number,eventDate:string):ParticipantLogistics=>({
  contactId,
  arrivalDate:addDays(eventDate,-2),
  arrivalTime:"12:00",
  hotelBooked:false,
  transportReady:false,
  fuelReady:false,
  groundSupportReady:false,
  trainingDate:addDays(eventDate,-1),
  trainingTime:"14:00"
});

const hydrateParticipantLogistics=(old:any,contacts:Contact[],eventDate:string):ParticipantLogistics[]=>{
  const existing=Array.isArray(old)?old:[];
  return contacts.filter(c=>c.status==="confirmed").map(c=>({
    ...defaultParticipantLogistics(c.id,eventDate),
    ...(existing.find((x:any)=>x?.contactId===c.id)??{})
  }));
};

function migrateV16(old:any):SaveGame{
  const contacts=hydrateContacts(old.contacts);
  return {...old,version:17,contacts,participantLogistics:hydrateParticipantLogistics(old.participantLogistics,contacts,old.career?.eventDate??addDays(new Date().toISOString().slice(0,10),332))};
}

function migrateV15(old:any):SaveGame{
  return {...old,version:17,participantLogistics:hydrateParticipantLogistics(old.participantLogistics,hydrateContacts(old.contacts),old.career?.eventDate??addDays(new Date().toISOString().slice(0,10),332)),staff:old.staff??initialStaff};
}

function migrateV14(old:any):SaveGame{
  return {...old,version:17,participantLogistics:hydrateParticipantLogistics(old.participantLogistics,hydrateContacts(old.contacts),old.career?.eventDate??addDays(new Date().toISOString().slice(0,10),332)),staff:old.staff??initialStaff,ticketing:hydrateTicketing(old.ticketing)};
}

function migrateV13(old:any):SaveGame{
  return {...old,version:17,participantLogistics:hydrateParticipantLogistics(old.participantLogistics,hydrateContacts(old.contacts),old.career?.eventDate??addDays(new Date().toISOString().slice(0,10),332)),staff:old.staff??initialStaff,ticketing:hydrateTicketing(old.ticketing),sponsors:hydrateSponsors(old.sponsors)};
}

function migrateV12(old:any):SaveGame{
  return {...old,version:17,participantLogistics:hydrateParticipantLogistics(old.participantLogistics,hydrateContacts(old.contacts),old.career?.eventDate??addDays(new Date().toISOString().slice(0,10),332)),staff:old.staff??initialStaff,ticketing:hydrateTicketing(old.ticketing),sponsors:hydrateSponsors(old.sponsors),eventDay:old.eventDay??{status:"idle",currentIndex:0,delay:0,scoreModifier:0,completedSlotIds:[],canceledSlotIds:[],log:[],pendingIssue:null}};
}

function migrateV11(old:any):SaveGame{
  return {...old,version:17,participantLogistics:hydrateParticipantLogistics(old.participantLogistics,hydrateContacts(old.contacts),old.career?.eventDate??addDays(new Date().toISOString().slice(0,10),332)),staff:old.staff??initialStaff,ticketing:hydrateTicketing(old.ticketing),sponsors:hydrateSponsors(old.sponsors),flightProgram:old.flightProgram??[],eventDay:old.eventDay??{status:"idle",currentIndex:0,delay:0,scoreModifier:0,completedSlotIds:[],canceledSlotIds:[],log:[],pendingIssue:null}};
}

function migrateV10(old:any):SaveGame{
  return {...old,version:17,participantLogistics:hydrateParticipantLogistics(old.participantLogistics,hydrateContacts(old.contacts),old.career?.eventDate??addDays(new Date().toISOString().slice(0,10),332)),staff:old.staff??initialStaff,ticketing:hydrateTicketing(old.ticketing),sponsors:hydrateSponsors(old.sponsors),crisisReadiness:old.crisisReadiness??0,activeIncident:old.activeIncident??null,incidentsSeen:old.incidentsSeen??[],flightProgram:old.flightProgram??[],eventDay:old.eventDay??{status:"idle",currentIndex:0,delay:0,scoreModifier:0,completedSlotIds:[],canceledSlotIds:[],log:[],pendingIssue:null}};
}

function migrateV9(old:any):SaveGame{
  return {...old,version:17,participantLogistics:hydrateParticipantLogistics(old.participantLogistics,hydrateContacts(old.contacts),old.career?.eventDate??addDays(new Date().toISOString().slice(0,10),332)),staff:old.staff??initialStaff,ticketing:hydrateTicketing(old.ticketing),contacts:hydrateContacts(old.contacts),sponsors:hydrateSponsors(old.sponsors),crisisReadiness:old.crisisReadiness??0,activeIncident:null,incidentsSeen:old.incidentsSeen??[],flightProgram:old.flightProgram??[],eventDay:old.eventDay??{status:"idle",currentIndex:0,delay:0,scoreModifier:0,completedSlotIds:[],canceledSlotIds:[],log:[],pendingIssue:null}};
}

function migrateV8(old:any):SaveGame{
  return {...old,version:17,participantLogistics:hydrateParticipantLogistics(old.participantLogistics,hydrateContacts(old.contacts),old.career?.eventDate??addDays(new Date().toISOString().slice(0,10),332)),staff:old.staff??initialStaff,ticketing:hydrateTicketing(old.ticketing),contacts:hydrateContacts(old.contacts),sponsors:hydrateSponsors(old.sponsors),crisisReadiness:old.crisisReadiness??0,activeIncident:null,incidentsSeen:old.incidentsSeen??[],flightProgram:old.flightProgram??[],eventDay:old.eventDay??{status:"idle",currentIndex:0,delay:0,scoreModifier:0,completedSlotIds:[],canceledSlotIds:[],log:[],pendingIssue:null}};
}

function migrateV7(old:any):SaveGame{
  return {...old,version:17,participantLogistics:hydrateParticipantLogistics(old.participantLogistics,hydrateContacts(old.contacts),old.career?.eventDate??addDays(new Date().toISOString().slice(0,10),332)),staff:old.staff??initialStaff,ticketing:hydrateTicketing(old.ticketing),sponsors:hydrateSponsors(old.sponsors),season:old.season??1,contacts:hydrateContacts(old.contacts),seasonHistory:old.seasonHistory??[],crisisReadiness:old.crisisReadiness??0,activeIncident:null,incidentsSeen:old.incidentsSeen??[],flightProgram:old.flightProgram??[],eventDay:old.eventDay??{status:"idle",currentIndex:0,delay:0,scoreModifier:0,completedSlotIds:[],canceledSlotIds:[],log:[],pendingIssue:null}};
}

function migrateV6(old:any):SaveGame{
  return {...old,version:17,participantLogistics:hydrateParticipantLogistics(old.participantLogistics,hydrateContacts(old.contacts),old.career?.eventDate??addDays(new Date().toISOString().slice(0,10),332)),staff:old.staff??initialStaff,ticketing:hydrateTicketing(old.ticketing),sponsors:hydrateSponsors(old.sponsors),season:old.season??1,contacts:hydrateContacts(old.contacts),eventResult:old.eventResult??null,seasonHistory:old.seasonHistory??[],crisisReadiness:old.crisisReadiness??0,activeIncident:null,incidentsSeen:old.incidentsSeen??[],flightProgram:old.flightProgram??[],eventDay:old.eventDay??{status:"idle",currentIndex:0,delay:0,scoreModifier:0,completedSlotIds:[],canceledSlotIds:[],log:[],pendingIssue:null}};
}

function migrateV5(old:any):SaveGame{
  return {...old,version:17,participantLogistics:hydrateParticipantLogistics(old.participantLogistics,hydrateContacts(old.contacts),old.career?.eventDate??addDays(new Date().toISOString().slice(0,10),332)),staff:old.staff??initialStaff,ticketing:hydrateTicketing(old.ticketing),sponsors:hydrateSponsors(old.sponsors),season:old.season??1,contacts:hydrateContacts(old.contacts),infrastructure:old.infrastructure??initialInfrastructure,eventResult:null,seasonHistory:old.seasonHistory??[],crisisReadiness:old.crisisReadiness??0,activeIncident:null,incidentsSeen:old.incidentsSeen??[],flightProgram:old.flightProgram??[],eventDay:old.eventDay??{status:"idle",currentIndex:0,delay:0,scoreModifier:0,completedSlotIds:[],canceledSlotIds:[],log:[],pendingIssue:null}};
}

function migrateV4(old:any):SaveGame{
  return {...old,version:17,participantLogistics:hydrateParticipantLogistics(old.participantLogistics,hydrateContacts(old.contacts),old.career?.eventDate??addDays(new Date().toISOString().slice(0,10),332)),staff:old.staff??initialStaff,ticketing:hydrateTicketing(old.ticketing??{price:99,capacity:legacyScaleCapacity(old),sold:0,salesOpened:false}),sponsors:hydrateSponsors(old.sponsors),season:old.season??1,contacts:hydrateContacts(old.contacts),crisisReadiness:old.crisisReadiness??0,activeIncident:null,incidentsSeen:old.incidentsSeen??[],flightProgram:old.flightProgram??[],eventDay:old.eventDay??{status:"idle",currentIndex:0,delay:0,scoreModifier:0,completedSlotIds:[],canceledSlotIds:[],log:[],pendingIssue:null},marketing:old.marketing??initialMarketing,infrastructure:initialInfrastructure,eventResult:null,seasonHistory:old.seasonHistory??[],awareness:old.awareness??8};
}

function migrateV3(old:any):SaveGame{
  return {...old,version:17,participantLogistics:hydrateParticipantLogistics(old.participantLogistics,hydrateContacts(old.contacts),old.career?.eventDate??addDays(new Date().toISOString().slice(0,10),332)),staff:old.staff??initialStaff,ticketing:hydrateTicketing(old.ticketing??{price:99,capacity:legacyScaleCapacity(old),sold:0,salesOpened:false}),sponsors:hydrateSponsors(old.sponsors),season:old.season??1,contacts:hydrateContacts(old.contacts),crisisReadiness:old.crisisReadiness??0,activeIncident:null,incidentsSeen:old.incidentsSeen??[],flightProgram:old.flightProgram??[],eventDay:old.eventDay??{status:"idle",currentIndex:0,delay:0,scoreModifier:0,completedSlotIds:[],canceledSlotIds:[],log:[],pendingIssue:null},departments:old.departments??initialDepartments,operations:old.operations??initialOperations,marketing:initialMarketing,infrastructure:initialInfrastructure,eventResult:null,seasonHistory:old.seasonHistory??[],awareness:8};
}

function migrateV2(old:any):SaveGame{
  return {
    version:17,locale:old.locale??"pl",season:old.season??1,crisisReadiness:old.crisisReadiness??0,career:old.career,currentDate:old.currentDate,cash:old.cash,reputation:old.reputation??12,
    contacts:hydrateContacts(old.contacts),sponsors:initialSponsors,departments:initialDepartments,staff:initialStaff,operations:initialOperations,marketing:initialMarketing,infrastructure:initialInfrastructure,awareness:8,ticketing:{price:99,capacity:legacyScaleCapacity(old),sold:0,salesOpened:false,tiers:createTicketTiers(legacyScaleCapacity(old))},feed:old.feed??[],
    participantLogistics:[],transactions:old.transactions??[{id:"migration-v2",date:old.currentDate,label:"Saldo przeniesione z poprzedniej wersji",amount:old.cash,category:"start"}],
    milestonesSeen:[],eventResult:null,seasonHistory:old.seasonHistory??[],activeIncident:null,incidentsSeen:old.incidentsSeen??[],flightProgram:old.flightProgram??[],eventDay:old.eventDay??{status:"idle",currentIndex:0,delay:0,scoreModifier:0,completedSlotIds:[],canceledSlotIds:[],log:[],pendingIssue:null}
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
  return {version:17,locale:"pl",season:1,crisisReadiness:0,career:{eventName:old.career?.eventName??"Mój AirShow",location:old.career?.location??"Polska",eventDate,scaleId:scale.id,budget:old.career?.budget??scale.budget},currentDate,cash:old.cash??scale.budget,reputation:12,contacts,sponsors:initialSponsors,departments:initialDepartments,staff:initialStaff,operations:initialOperations,marketing:initialMarketing,infrastructure:initialInfrastructure,awareness:8,ticketing:{price:99,capacity:scaleCapacity[scale.id],sold:0,salesOpened:false,tiers:createTicketTiers(scaleCapacity[scale.id])},feed:old.feed??[],participantLogistics:[],transactions:[{id:"migration-v1",date:currentDate,label:"Saldo przeniesione z poprzedniej wersji",amount:old.cash??scale.budget,category:"start"}],milestonesSeen:[],eventResult:null,seasonHistory:[],activeIncident:null,incidentsSeen:[],flightProgram:[],eventDay:{status:"idle",currentIndex:0,delay:0,scoreModifier:0,completedSlotIds:[],canceledSlotIds:[],log:[],pendingIssue:null}};
}

export function loadGame():SaveGame|null{
  const raw=localStorage.getItem(SAVE_KEY);
  if(raw){try{return JSON.parse(raw) as SaveGame}catch{localStorage.removeItem(SAVE_KEY)}}
  const v16=localStorage.getItem("airshow-manager-save-v16");
  if(v16){try{const migrated=migrateV16(JSON.parse(v16));saveGame(migrated);return migrated}catch{}}
  const v15=localStorage.getItem("airshow-manager-save-v15");
  if(v15){try{const migrated=migrateV15(JSON.parse(v15));saveGame(migrated);return migrated}catch{}}
  const v14=localStorage.getItem("airshow-manager-save-v14");
  if(v14){try{const migrated=migrateV14(JSON.parse(v14));saveGame(migrated);return migrated}catch{}}
  const v13=localStorage.getItem("airshow-manager-save-v13");
  if(v13){try{const migrated=migrateV13(JSON.parse(v13));saveGame(migrated);return migrated}catch{}}
  const v12=localStorage.getItem("airshow-manager-save-v12");
  if(v12){try{const migrated=migrateV12(JSON.parse(v12));saveGame(migrated);return migrated}catch{}}
  const v11=localStorage.getItem("airshow-manager-save-v11");
  if(v11){try{const migrated=migrateV11(JSON.parse(v11));saveGame(migrated);return migrated}catch{}}
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
  const staff=organizationStaffScore(save);
  const logistics=confirmed>0?Math.round(logisticsReadiness(save)/100*8):0;
  return Math.max(0,Math.min(100,4+confirmed*9+partners*5+budgetHealth+operations+infrastructure+team+staff+logistics+save.crisisReadiness));
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

export const staffPayroll=(save:SaveGame)=>save.staff.filter(s=>s.hired).reduce((sum,s)=>sum+s.salary,0);
export const monthlyPayroll=(save:SaveGame)=>save.departments.reduce((sum,d)=>sum+d.monthlyCost*d.level,0)+staffPayroll(save);

export const departmentStaffBonus=(save:SaveGame,id:DepartmentId)=>save.staff.filter(s=>s.hired&&s.department===id).reduce((sum,s)=>sum+s.skill,0);

export const effectiveDepartmentLevel=(save:SaveGame,id:DepartmentId)=>{
  const base=save.departments.find(d=>d.id===id)?.level??0;
  return base+Math.floor(departmentStaffBonus(save,id)/3);
};

export const departmentWorkload=(save:SaveGame,id:DepartmentId)=>{
  let load=0;
  if(id==="airOps"){
    load+=save.contacts.filter(c=>["invited","interested","confirmed"].includes(c.status)).length*7;
    load+=save.flightProgram.length*5;
    load+=save.operations.filter(o=>o.department==="airOps"&&!o.completed).length*10;
  }
  if(id==="safety"){
    load+=save.operations.filter(o=>o.department==="safety"&&!o.completed).length*15;
    load+=save.infrastructure.filter(i=>i.department==="safety"&&!i.completed).length*8;
  }
  if(id==="commercial"){
    load+=save.sponsors.filter(s=>["contacted","offered","partner"].includes(s.status)).length*10;
    load+=save.sponsors.filter(s=>s.status==="partner").reduce((sum,s)=>sum+s.commitments.length*4,0);
  }
  if(id==="marketing"){
    load+=save.marketing.filter(m=>!m.completed).length*8;
    if(save.ticketing.salesOpened)load+=20;
  }
  const capacity=35+(save.departments.find(d=>d.id===id)?.level??1)*15+departmentStaffBonus(save,id)*8;
  return Math.max(0,Math.min(150,Math.round(load/capacity*100)));
};

export const organizationStaffScore=(save:SaveGame)=>{
  const hired=save.staff.filter(s=>s.hired);
  if(!hired.length)return 0;
  const overloadPenalty=save.departments.reduce((sum,d)=>sum+Math.max(0,departmentWorkload(save,d.id)-100),0);
  return Math.max(0,Math.min(10,Math.round(hired.reduce((sum,s)=>sum+s.skill,0)/2-overloadPenalty/25)));
};
export const operationReadiness=(save:SaveGame)=>save.operations.filter(o=>o.completed).reduce((sum,o)=>sum+o.readiness,0);


export const ticketDemandByTier=(save:SaveGame):Record<TicketTierId,number>=>{
  if(!save.ticketing.salesOpened)return {early:0,regular:0,vip:0};
  const confirmed=save.contacts.filter(c=>c.status==="confirmed").length;
  const marketingLevel=effectiveDepartmentLevel(save,"marketing");
  const days=daysBetween(save.currentDate,save.career.eventDate);
  const base=Math.max(20,save.ticketing.capacity/220);
  const attractiveness=.38+confirmed*.18+(save.awareness/100)*.75+(save.reputation/100)*.45+marketingLevel*.06;
  const urgency=days<=30?1.8:days<=90?1.42:days<=180?1.18:1;
  const demand=(id:TicketTierId,anchor:number,mult:number)=>{
    const tier=save.ticketing.tiers.find(t=>t.id===id);
    if(!tier||!tier.enabled||tier.sold>=tier.capacity)return 0;
    const priceFactor=Math.max(.28,Math.min(1.65,anchor/tier.price));
    return Math.max(0,Math.round(base*attractiveness*urgency*priceFactor*mult));
  };
  return {early:demand("early",69,1.22),regular:demand("regular",99,1),vip:demand("vip",249,.18+.003*save.reputation+.025*confirmed)};
};

export const ticketDemandPerDay=(save:SaveGame)=>{
  const d=ticketDemandByTier(save);
  return d.early+d.regular+d.vip;
};

export const projectedAttendance=(save:SaveGame)=>{
  const days=daysBetween(save.currentDate,save.career.eventDate);
  const daily=ticketDemandPerDay(save);
  return Math.min(save.ticketing.capacity,save.ticketing.sold+daily*days);
};

export const ticketRevenuePotential=(save:SaveGame)=>save.ticketing.tiers.reduce((sum,t)=>sum+(t.capacity-t.sold)*t.price,0);


export const eventDayChecks=(save:SaveGame)=>{
  const confirmed=save.contacts.filter(c=>c.status==="confirmed").length;
  const criticalOps=["ops-plan","display-zone","emergency-plan"];
  const criticalInfra=["aircraft-apron","public-zone","emergency-access"];
  const safetyLevel=save.departments.find(d=>d.id==="safety")?.level??0;
  return [
    {id:"date",label:"Nadszedł dzień wydarzenia",passed:daysBetween(save.currentDate,save.career.eventDate)===0,detail:"Przesuń czas do daty AirShow."},
    {id:"program",label:"Minimum 2 potwierdzonych uczestników",passed:confirmed>=2,detail:`${confirmed}/2 potwierdzonych`},
    {id:"flight-program",label:"Program lotniczy bez konfliktów",passed:flightProgramReady(save),detail:flightProgramReady(save)?"Wszyscy potwierdzeni uczestnicy mają poprawne sloty.":flightProgramIssues(save)[0]??"Ułóż kompletny program pokazów."},
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
const resetSponsors=()=>initialSponsors.map(s=>({...s,status:"prospect" as SponsorStatus,replyAt:null,offer:null,negotiated:false,offerExpiresAt:null,negotiationRound:0}));
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
    ...save,version:17,season:save.season+1,career,currentDate,cash:budget.total,crisisReadiness:0,
    reputation:save.reputation,contacts:resetContacts(),sponsors:resetSponsors(),staff:save.staff,
    operations:resetOperations(),infrastructure:resetInfrastructure(),marketing:resetMarketing(),
    awareness:Math.max(8,Math.round(save.awareness*.45)),
    ticketing:{price:99,capacity:scaleCapacity[scaleId],sold:0,salesOpened:false,tiers:createTicketTiers(scaleCapacity[scaleId])},
    feed:[`Rozpoczyna się sezon ${save.season+1}. Budżet otwarcia: ${money(budget.total)}.`],
    transactions:[{id:`opening-s${save.season+1}`,date:currentDate,label:`Budżet otwarcia sezonu ${save.season+1}`,amount:budget.total,category:"start"}],
    milestonesSeen:[],eventResult:null,seasonHistory:[...save.seasonHistory,record],activeIncident:null,incidentsSeen:[],flightProgram:[],participantLogistics:[],eventDay:{status:"idle",currentIndex:0,delay:0,scoreModifier:0,completedSlotIds:[],canceledSlotIds:[],log:[],pendingIssue:null}
  };
};


export const contactUnlocked=(save:SaveGame,contact:Contact)=>save.season>=contact.minSeason&&save.reputation>=contact.minReputation;
export const unlockedContactCount=(save:SaveGame)=>save.contacts.filter(c=>contactUnlocked(save,c)).length;


export const participantBaseTotal=(contact:Contact)=>contact.fee+contact.hotel+contact.fuel+contact.support;

export const participantNegotiationRisk=(save:SaveGame,contact:Contact)=>{
  const commercialLevel=effectiveDepartmentLevel(save,"commercial");
  const leverage=save.reputation-contact.minReputation+commercialLevel*3-contact.negotiationRound*4;
  return leverage>=12?"low":leverage>=6?"medium":"high";
};

export const negotiateParticipantOffer=(save:SaveGame,contact:Contact)=>{
  const commercialLevel=effectiveDepartmentLevel(save,"commercial");
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


const toMinutes=(time:string)=>{const [h,m]=time.split(":").map(Number);return h*60+m};
export const flightSlotEnd=(slot:FlightSlot)=>{const total=toMinutes(slot.start)+slot.duration+slot.buffer;const h=Math.floor(total/60)%24;const m=total%60;return `${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}`};

export const flightProgramIssues=(save:SaveGame)=>{
  const confirmed=save.contacts.filter(c=>c.status==="confirmed");
  const issues:string[]=[];
  for(const contact of confirmed)if(!save.flightProgram.some(s=>s.contactId===contact.id))issues.push(`Brak slotu: ${contact.name}`);
  const sorted=[...save.flightProgram].sort((a,b)=>toMinutes(a.start)-toMinutes(b.start));
  for(let i=1;i<sorted.length;i++){
    const prev=sorted[i-1],curr=sorted[i];
    if(toMinutes(curr.start)<toMinutes(prev.start)+prev.duration+prev.buffer)issues.push(`Konflikt: ${prev.start} / ${curr.start}`);
  }
  if(save.flightProgram.length>0){
    const first=Math.min(...save.flightProgram.map(s=>toMinutes(s.start)));
    const last=Math.max(...save.flightProgram.map(s=>toMinutes(s.start)+s.duration+s.buffer));
    if(first<600)issues.push("Pierwszy pokaz nie może rozpocząć się przed 10:00.");
    if(last>1080)issues.push("Program musi zakończyć się do 18:00.");
  }
  return issues;
};

export const flightProgramReady=(save:SaveGame)=>{
  const confirmed=save.contacts.filter(c=>c.status==="confirmed").length;
  return confirmed>=2&&save.flightProgram.length===confirmed&&flightProgramIssues(save).length===0;
};


export const sortedFlightProgram=(save:SaveGame)=>[...save.flightProgram].sort((a,b)=>a.start.localeCompare(b.start));

export const startEventDaySimulation=(save:SaveGame):SaveGame=>{
  if(save.eventResult||save.eventDay.status!=="idle"||eventDayChecks(save).some(c=>!c.passed))return save;
  return {...save,eventDay:{status:"running",currentIndex:0,delay:0,scoreModifier:0,completedSlotIds:[],canceledSlotIds:[],log:["Bramy otwarte. Event Day rozpoczęty."],pendingIssue:null},feed:["Event Day rozpoczęty. Centrum operacyjne prowadzi program slot po slocie.",...save.feed].slice(0,10)};
};

const issueForSlot=(save:SaveGame,slot:FlightSlot,index:number):EventDayIssue|null=>{
  const contact=save.contacts.find(c=>c.id===slot.contactId);
  if(!contact)return null;
  const weatherIssues=weatherIssuesForSlot(save,contact,slot.start);
  if(weatherIssues.length>0)return {
    id:`event-weather-${save.season}-${slot.id}`,
    title:"Warunki poniżej minimów pokazu",
    description:`${contact.name}: ${weatherIssues.join(" · ")}.`,
    slotId:slot.id,
    choices:[
      {id:"a",label:"Wstrzymaj slot 20 minut",description:"Czekasz na poprawę warunków i próbujesz zachować pokaz w programie.",delay:20,score:-1,cancel:false,reputation:0},
      {id:"b",label:"Odwołaj pokaz",description:"Chronisz bezpieczeństwo i dalszy harmonogram kosztem programu.",delay:0,score:-9,cancel:true,reputation:-1}
    ]
  };
  const logisticsIssues=participantLogisticsIssues(save,slot.contactId);
  if(logisticsIssues.length>0)return {
    id:`event-logistics-${save.season}-${slot.id}`,
    title:"Problem logistyczny uczestnika",
    description:`${contact.name}: ${logisticsIssues.slice(0,2).join(" · ")}. Zespół nie jest w pełni przygotowany do slotu.`,
    slotId:slot.id,
    choices:[
      {id:"a",label:"Uruchom obsługę awaryjną",description:"Mobilizujesz zespół operacyjny i ratujesz pokaz kosztem dużego opóźnienia.",delay:20,score:-3,cancel:false,reputation:-1},
      {id:"b",label:"Odwołaj pokaz",description:"Chronisz resztę harmonogramu, ale tracisz występ i reputację.",delay:0,score:-10,cancel:true,reputation:-2}
    ]
  };
  if((slot.contactId+save.season+index)%3!==0)return null;
  const variants=[
    {title:"Opóźnienie techniczne",description:`${contact.name} zgłasza potrzebę dodatkowej kontroli przed startem.`,choices:[
      {id:"a" as const,label:"Daj zespołowi 15 minut",description:"Bezpieczna decyzja, ale program łapie opóźnienie.",delay:15,score:1,cancel:false,reputation:1},
      {id:"b" as const,label:"Skróć przygotowanie",description:"Chronisz harmonogram kosztem jakości i marginesu operacyjnego.",delay:0,score:-5,cancel:false,reputation:-1}
    ]},
    {title:"Pogorszenie warunków",description:`Warunki nad lotniskiem komplikują wykonanie slotu ${contact.name}.`,choices:[
      {id:"a" as const,label:"Wstrzymaj program 20 minut",description:"Czekasz na poprawę warunków i zachowujesz pokaz.",delay:20,score:0,cancel:false,reputation:0},
      {id:"b" as const,label:"Odwołaj slot",description:"Chronisz resztę programu, ale tracisz jeden z pokazów.",delay:0,score:-10,cancel:true,reputation:-2}
    ]},
    {title:"Konflikt na płycie",description:`Obsługa naziemna zgłasza przeciążenie przy przygotowaniu ${contact.name}.`,choices:[
      {id:"a" as const,label:"Przeorganizuj obsługę",description:"Program zyskuje 10 minut opóźnienia, ale pokaz dochodzi do skutku.",delay:10,score:1,cancel:false,reputation:0},
      {id:"b" as const,label:"Pomiń pokaz",description:"Brak dodatkowego opóźnienia, ale publiczność traci pozycję programu.",delay:0,score:-8,cancel:true,reputation:-1}
    ]}
  ] as const;
  const v=variants[(slot.contactId+index)%variants.length];
  return {id:`event-${save.season}-${slot.id}`,title:v.title,description:v.description,slotId:slot.id,choices:[v.choices[0],v.choices[1]]};
};

export const advanceEventDay=(save:SaveGame):SaveGame=>{
  if(save.eventDay.status!=="running"||save.eventDay.pendingIssue)return save;
  const program=sortedFlightProgram(save);
  if(save.eventDay.currentIndex>=program.length)return finishEventDay(save);
  const slot=program[save.eventDay.currentIndex];
  const contact=save.contacts.find(c=>c.id===slot.contactId);
  if(!contact)return {...save,eventDay:{...save.eventDay,currentIndex:save.eventDay.currentIndex+1}};
  const issue=issueForSlot(save,slot,save.eventDay.currentIndex);
  if(issue)return {...save,eventDay:{...save.eventDay,pendingIssue:issue,log:[`${slot.start} · ${issue.title} — wymagana decyzja.`,...save.eventDay.log]}};
  const next={...save,eventDay:{...save.eventDay,currentIndex:save.eventDay.currentIndex+1,completedSlotIds:[...save.eventDay.completedSlotIds,slot.id],scoreModifier:save.eventDay.scoreModifier+2,log:[`${slot.start} · ${contact.name}: pokaz wykonany zgodnie z planem.`,...save.eventDay.log]}};
  return next.eventDay.currentIndex>=program.length?finishEventDay(next):next;
};

export const resolveEventDayIssue=(save:SaveGame,choiceId:"a"|"b"):SaveGame=>{
  const issue=save.eventDay.pendingIssue;
  if(save.eventDay.status!=="running"||!issue)return save;
  const choice=issue.choices.find(c=>c.id===choiceId);
  if(!choice)return save;
  const slot=save.flightProgram.find(s=>s.id===issue.slotId);
  const contact=slot?save.contacts.find(c=>c.id===slot.contactId):null;
  const completed=choice.cancel?save.eventDay.completedSlotIds:[...save.eventDay.completedSlotIds,issue.slotId];
  const canceled=choice.cancel?[...save.eventDay.canceledSlotIds,issue.slotId]:save.eventDay.canceledSlotIds;
  const next={...save,reputation:Math.max(0,Math.min(100,save.reputation+choice.reputation)),eventDay:{...save.eventDay,currentIndex:save.eventDay.currentIndex+1,delay:save.eventDay.delay+choice.delay,scoreModifier:save.eventDay.scoreModifier+choice.score,completedSlotIds:completed,canceledSlotIds:canceled,pendingIssue:null,log:[`${contact?.name??"Slot"}: ${choice.label}. ${choice.cancel?"Pokaz odwołany.":choice.delay>0?`Opóźnienie +${choice.delay} min.`:"Program kontynuowany."}`,...save.eventDay.log]}};
  return next.eventDay.currentIndex>=sortedFlightProgram(next).length?finishEventDay(next):next;
};

export const finishEventDay=(save:SaveGame):SaveGame=>{
  if(save.eventDay.status==="completed"||save.eventResult)return save;
  const program=sortedFlightProgram(save);
  const completion=program.length?save.eventDay.completedSlotIds.length/program.length:0;
  const delayPenalty=Math.min(18,Math.floor(save.eventDay.delay/10)*2);
  const sponsorPenaltyTotal=totalSponsorPenalty(save);
  const brokenSponsors=save.sponsors.filter(s=>sponsorPenalty(save,s)>0).length;
  const base=calculateEventResult(save);
  const sponsorScorePenalty=brokenSponsors*4;
  const score=Math.max(0,Math.min(100,Math.round(base.score+save.eventDay.scoreModifier+(completion-1)*24-delayPenalty-sponsorScorePenalty)));
  const reputationGain=score>=85?10:score>=70?6:score>=55?3:0;
  const reputationPenalty=brokenSponsors*2;
  const result:EventResult={...base,score,reputationGain,grade:score>=85?"Excellent":score>=70?"Strong":"Operational"};
  const penaltyTx=sponsorPenaltyTotal>0?{id:`sponsor-penalty-${Date.now()}`,date:save.currentDate,label:"Kary za niewypełnione zobowiązania sponsorskie",amount:-sponsorPenaltyTotal,category:"sponsor" as const}:null;
  const feedLine=sponsorPenaltyTotal>0?`Event Day zakończony. Wynik ${score}/100. Rozliczenie sponsorów: -${money(sponsorPenaltyTotal)}.`:`Event Day zakończony. Wynik sezonu: ${score}/100 · reputacja +${reputationGain}.`;
  return {...save,cash:save.cash-sponsorPenaltyTotal,eventResult:result,reputation:Math.max(0,Math.min(100,save.reputation+reputationGain-reputationPenalty)),transactions:penaltyTx?[penaltyTx,...save.transactions]:save.transactions,eventDay:{...save.eventDay,status:"completed",pendingIssue:null,log:[`Event Day zakończony. Wynik: ${score}/100.`,...save.eventDay.log]},feed:[feedLine,...save.feed].slice(0,10)};
};


export const sponsorMetricValue=(save:SaveGame,metric:SponsorMetric)=>{
  if(metric==="confirmedActs")return save.contacts.filter(c=>c.status==="confirmed").length;
  if(metric==="awareness")return save.awareness;
  if(metric==="marketing")return save.marketing.filter(m=>m.completed).length;
  if(metric==="ticketSales")return save.ticketing.capacity>0?Math.round(save.ticketing.sold/save.ticketing.capacity*100):0;
  return 0;
};

export const sponsorCommitmentProgress=(save:SaveGame,sponsor:Sponsor)=>sponsor.commitments.map(c=>({...c,current:sponsorMetricValue(save,c.metric),fulfilled:sponsorMetricValue(save,c.metric)>=c.target}));

export const sponsorConflict=(save:SaveGame,sponsor:Sponsor)=>save.sponsors.find(s=>s.id!==sponsor.id&&s.status==="partner"&&s.exclusiveGroup===sponsor.exclusiveGroup)??null;

export const sponsorPenalty=(save:SaveGame,sponsor:Sponsor)=>{
  if(sponsor.status!=="partner"||!sponsor.offer)return 0;
  const progress=sponsorCommitmentProgress(save,sponsor);
  const missing=progress.filter(p=>!p.fulfilled).length;
  if(!missing)return 0;
  return Math.round(sponsor.offer*sponsor.penaltyRate*(missing/progress.length));
};

export const totalSponsorPenalty=(save:SaveGame)=>save.sponsors.reduce((sum,s)=>sum+sponsorPenalty(save,s),0);

export const sponsorNegotiationRisk=(save:SaveGame,sponsor:Sponsor)=>{
  const commercialLevel=effectiveDepartmentLevel(save,"commercial");
  const leverage=save.reputation-sponsor.minReputation+commercialLevel*4-sponsor.negotiationRound*5;
  return leverage>=14?"low":leverage>=7?"medium":"high";
};

export const negotiateSponsorOffer=(save:SaveGame,sponsor:Sponsor)=>{
  const commercialLevel=effectiveDepartmentLevel(save,"commercial");
  const leverage=save.reputation-sponsor.minReputation+commercialLevel*4-sponsor.negotiationRound*5;
  const nextRound=sponsor.negotiationRound+1;
  if(nextRound>2||!sponsor.offer)return {walked:false,offer:sponsor.offer??0,nextRound:sponsor.negotiationRound};
  const increase=nextRound===1?(leverage>=8?.08:leverage>=3?.04:0):(leverage>=13?.06:leverage>=8?.03:0);
  if(increase===0&&leverage<3)return {walked:true,offer:sponsor.offer,nextRound};
  return {walked:false,offer:Math.round(sponsor.offer*(1+increase)),nextRound};
};


export type CommandRisk={id:string;severity:"low"|"medium"|"high";title:string;detail:string};
export type CommandDeadline={id:string;days:number;title:string;detail:string;status:"done"|"open"|"urgent"};

export const forecastCashAtEvent=(save:SaveGame)=>{
  const days=daysBetween(save.currentDate,save.career.eventDate);
  const payroll=Math.round(monthlyPayroll(save)*days/30);
  const ticketDemand=ticketDemandByTier(save);
  const ticketRevenue=save.ticketing.salesOpened?save.ticketing.tiers.reduce((sum,t)=>{
    const potential=Math.min(t.capacity-t.sold,(ticketDemand[t.id]??0)*days);
    return sum+potential*t.price;
  },0):0;
  const sponsorRisk=totalSponsorPenalty(save);
  return save.cash-payroll+ticketRevenue-sponsorRisk;
};

export const commandRisks=(save:SaveGame):CommandRisk[]=>{
  const days=daysBetween(save.currentDate,save.career.eventDate);
  const risks:CommandRisk[]=[];
  const confirmed=save.contacts.filter(c=>c.status==="confirmed").length;
  const ready=readiness(save);
  const forecast=forecastCashAtEvent(save);
  const sponsorRisk=totalSponsorPenalty(save);
  const programIssues=flightProgramIssues(save);
  if(confirmed<2)risks.push({id:"program",severity:days<=120?"high":"medium",title:"Program lotniczy jest zbyt słaby",detail:`${confirmed}/2 wymaganych uczestników potwierdzonych.`});
  if(programIssues.length>0&&confirmed>=2)risks.push({id:"flight",severity:days<=60?"high":"medium",title:"Program lotniczy wymaga korekty",detail:programIssues[0]});
  const logistics=logisticsReadiness(save);
  if(confirmed>0&&logistics<100)risks.push({id:"logistics",severity:days<=30?"high":"medium",title:"Niepełna logistyka uczestników",detail:`Gotowość logistyczna: ${logistics}%.`});
  const weatherRisk=weatherRiskLevel(save);
  if(save.flightProgram.length>0&&weatherRisk!=="low")risks.push({id:"weather",severity:weatherRisk,title:"Ryzyko pogodowe dla programu",detail:"Co najmniej jeden slot przekracza minima pogodowe uczestnika."});
  if(forecast<0)risks.push({id:"cash",severity:"high",title:"Prognozowany deficyt budżetu",detail:`Prognoza na Event Day: ${money(forecast)}.`});
  else if(forecast<save.career.budget*.15)risks.push({id:"cash",severity:"medium",title:"Niska rezerwa finansowa",detail:`Prognozowane saldo na Event Day: ${money(forecast)}.`});
  if(sponsorRisk>0)risks.push({id:"sponsor",severity:days<=45?"high":"medium",title:"Ryzyko kar sponsorskich",detail:`Przewidywane kary: ${money(sponsorRisk)}.`});
  if(save.ticketing.salesOpened&&projectedAttendance(save)<save.ticketing.capacity*.35)risks.push({id:"sales",severity:days<=60?"high":"medium",title:"Słaba prognoza frekwencji",detail:`Prognoza: ${Math.round(projectedAttendance(save)/save.ticketing.capacity*100)}% pojemności.`});
  if(days<=60&&ready<70)risks.push({id:"readiness",severity:"high",title:"Gotowość poniżej bezpiecznego poziomu",detail:`Aktualna gotowość: ${ready}%.`});
  if(!risks.length)risks.push({id:"stable",severity:"low",title:"Brak krytycznych zagrożeń",detail:"Najważniejsze obszary sezonu są obecnie pod kontrolą."});
  return risks;
};

export const commandDeadlines=(save:SaveGame):CommandDeadline[]=>{
  const days=daysBetween(save.currentDate,save.career.eventDate);
  const confirmed=save.contacts.filter(c=>c.status==="confirmed").length;
  const partners=save.sponsors.filter(s=>s.status==="partner").length;
  const criticalOps=["ops-plan","display-zone","emergency-plan"].every(id=>save.operations.find(o=>o.id===id)?.completed);
  const criticalInfra=["aircraft-apron","public-zone","emergency-access"].every(id=>save.infrastructure.find(i=>i.id===id)?.completed);
  const items=[
    {id:"participants",days:240,title:"Zamknij rdzeń programu",detail:"Minimum 2 potwierdzonych uczestników.",done:confirmed>=2},
    {id:"sponsors",days:180,title:"Zabezpiecz partnerów komercyjnych",detail:"Minimum 1 aktywny sponsor.",done:partners>=1},
    {id:"tickets",days:150,title:"Uruchom sprzedaż biletów",detail:"Sprzedaż powinna działać przed fazą wysokiego popytu.",done:save.ticketing.salesOpened},
    {id:"operations",days:90,title:"Zamknij kluczowe operacje",detail:"Plan lotniska, strefa pokazów i plan kryzysowy.",done:criticalOps},
    {id:"infrastructure",days:60,title:"Zamknij krytyczną infrastrukturę",detail:"Płyta, strefa publiczności i drogi ratownicze.",done:criticalInfra},
    {id:"flight",days:30,title:"Zatwierdź finalny Flight Program",detail:"Wszyscy uczestnicy muszą mieć bezkolizyjne sloty.",done:flightProgramReady(save)}
  ];
  return items.map(item=>({...item,status:item.done?"done":days<=item.days?"urgent":"open"} as CommandDeadline));
};


export const participantLogisticsFor=(save:SaveGame,contactId:number)=>save.participantLogistics.find(l=>l.contactId===contactId)??null;

export const participantLogisticsIssues=(save:SaveGame,contactId:number)=>{
  const l=participantLogisticsFor(save,contactId);
  if(!l)return ["Brak planu logistycznego"];
  const issues:string[]=[];
  if(!l.hotelBooked)issues.push("Hotel niepotwierdzony");
  if(!l.transportReady)issues.push("Transport załogi niepotwierdzony");
  if(!l.fuelReady)issues.push("Paliwo nieprzygotowane");
  if(!l.groundSupportReady)issues.push("Obsługa naziemna nieprzygotowana");
  if(!l.arrivalDate||l.arrivalDate>save.career.eventDate)issues.push("Nieprawidłowy termin przylotu");
  if(!l.trainingDate||l.trainingDate>save.career.eventDate)issues.push("Nieprawidłowy slot treningowy");
  return issues;
};

export const participantLogisticsReady=(save:SaveGame,contactId:number)=>participantLogisticsIssues(save,contactId).length===0;

export const logisticsReadiness=(save:SaveGame)=>{
  const confirmed=save.contacts.filter(c=>c.status==="confirmed");
  if(!confirmed.length)return 0;
  const ready=confirmed.filter(c=>participantLogisticsReady(save,c.id)).length;
  return Math.round(ready/confirmed.length*100);
};


const weatherSeed=(save:SaveGame,time:string)=>{
  const raw=`${save.career.eventDate}-${save.season}-${time}`;
  let hash=0;
  for(let i=0;i<raw.length;i++)hash=(hash*31+raw.charCodeAt(i))>>>0;
  return hash;
};

export const weatherAt=(save:SaveGame,time:string):WeatherCondition=>{
  const seed=weatherSeed(save,time);
  const hour=Number(time.split(":")[0])||12;
  const windKts=8+(seed%15)+Math.max(0,hour-14);
  const visibilityKm=5+((seed>>3)%11);
  const cloudBaseFt=1400+((seed>>6)%43)*100;
  const precipitation=(seed%9===0?"moderate":seed%4===0?"light":"none") as WeatherCondition["precipitation"];
  const temperatureC=14+((seed>>9)%13);
  return {time,windKts,visibilityKm,cloudBaseFt,precipitation,temperatureC};
};

export const eventWeatherForecast=(save:SaveGame)=>["10:00","12:00","14:00","16:00","18:00"].map(time=>weatherAt(save,time));

export const weatherLimitsFor=(contact:Contact):WeatherLimits=>{
  const formation=/×|Team|Formation/i.test(contact.aircraft+" "+contact.name);
  const heritage=/Spitfire|Heritage/i.test(contact.aircraft+" "+contact.name);
  if(formation)return {maxWindKts:18,minVisibilityKm:8,minCloudBaseFt:3000};
  if(heritage)return {maxWindKts:16,minVisibilityKm:7,minCloudBaseFt:2500};
  if(contact.tier==="International")return {maxWindKts:24,minVisibilityKm:6,minCloudBaseFt:2000};
  return {maxWindKts:22,minVisibilityKm:6,minCloudBaseFt:2200};
};

export const weatherIssuesForSlot=(save:SaveGame,contact:Contact,time:string)=>{
  const weather=weatherAt(save,time);
  const limits=weatherLimitsFor(contact);
  const issues:string[]=[];
  if(weather.windKts>limits.maxWindKts)issues.push(`wiatr ${weather.windKts} kt > ${limits.maxWindKts} kt`);
  if(weather.visibilityKm<limits.minVisibilityKm)issues.push(`widzialność ${weather.visibilityKm} km < ${limits.minVisibilityKm} km`);
  if(weather.cloudBaseFt<limits.minCloudBaseFt)issues.push(`podstawa chmur ${weather.cloudBaseFt} ft < ${limits.minCloudBaseFt} ft`);
  if(weather.precipitation==="moderate")issues.push("umiarkowane opady");
  return issues;
};

export const weatherRiskLevel=(save:SaveGame)=>{
  const program=sortedFlightProgram(save);
  let affected=0;
  for(const slot of program){
    const contact=save.contacts.find(c=>c.id===slot.contactId);
    if(contact&&weatherIssuesForSlot(save,contact,slot.start).length)affected++;
  }
  return affected===0?"low":affected>=Math.max(2,Math.ceil(program.length/2))?"high":"medium";
};
