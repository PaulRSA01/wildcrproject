/**
 * Public tour catalogue. Static data — not the operations store (`lib/store.ts`).
 *
 * Tour names, prices and durations mirror a real Costa Rica shore-excursion
 * operator at the client's request; all descriptive copy here is original.
 */

export type RegionSlug = "limon" | "puntarenas" | "san-jose";

export type SceneKey =
  | "rainforest"
  | "canals"
  | "reef"
  | "cacao"
  | "wildlife"
  | "pacific"
  | "crocodile"
  | "atv"
  | "city"
  | "coffee"
  | "theatre"
  | "hero";

export type GroupType = "Shared" | "Small group" | "Private";

export interface RegionInfo {
  slug: RegionSlug;
  name: string;
  short: string;
  kind: string;
  port: string;
  blurb: string;
}

export interface ItineraryStop {
  time?: string;
  title: string;
  detail: string;
}

export interface CatalogTour {
  slug: string;
  title: string;
  region: RegionSlug;
  priceUSD: number;
  durationHours: string;
  groupType: GroupType;
  freeCancellation: boolean;
  scene: SceneKey;
  tagline: string;
  overview: string;
  highlights: string[];
  includes: string[];
  notIncluded: string[];
  itinerary: ItineraryStop[];
  featured?: boolean;
}

export const regions: RegionInfo[] = [
  {
    slug: "limon",
    name: "Limón & the Caribbean coast",
    short: "Limón",
    kind: "Caribbean shore excursions",
    port: "Puerto Limón cruise terminal",
    blurb:
      "Rainforest, reef and Afro-Caribbean culture on Costa Rica's wilder eastern shore — sloths in Cahuita, jungle canals toward Tortuguero, and cacao farms in Bribrí territory.",
  },
  {
    slug: "puntarenas",
    name: "Puntarenas & the Central Pacific",
    short: "Puntarenas",
    kind: "Pacific shore excursions",
    port: "Puntarenas cruise pier",
    blurb:
      "Big-adventure country: mangrove crocodile rivers, canopy ziplines, backroad ATV trails and one of the country's most respected wildlife rescue centres.",
  },
  {
    slug: "san-jose",
    name: "San José",
    short: "San José",
    kind: "Capital day tours",
    port: "San José hotels & city centre",
    blurb:
      "The capital on foot — colonial avenues, the Gran Teatro Nacional, central market sodas, and tastings of the coffee and chocolate that built the city.",
  },
];

export const regionName = (slug: RegionSlug) =>
  regions.find((r) => r.slug === slug)?.name ?? slug;

export const regionShort = (slug: RegionSlug) =>
  regions.find((r) => r.slug === slug)?.short ?? slug;

export const tours: CatalogTour[] = [
  /* ------------------------------- LIMÓN ------------------------------- */
  {
    slug: "7-in-1-combo-tour",
    title: "7 in 1 Combo Tour",
    region: "limon",
    priceUSD: 85,
    durationHours: "5 hours",
    groupType: "Shared",
    freeCancellation: true,
    scene: "rainforest",
    tagline:
      "Seven of Limón's best stops — rainforest, plantations and a river cruise — in one easy morning.",
    overview:
      "The most efficient way to see the Caribbean lowlands when you only have a port day. A comfortable loop links a lowland rainforest walk, a working banana and pineapple plantation, an animal-spotting boat ride and a stop for Caribbean lunch, with your guide narrating the whole way. Ideal for first-time visitors who want breadth rather than a single deep dive.",
    highlights: [
      "Guided walk on rainforest boardwalks with sloth and toucan spotting",
      "Behind-the-scenes look at a working banana plantation and packing line",
      "Calm-water boat ride for herons, caimans and howler monkeys",
      "Taste tropical fruit straight off the tree",
      "Panoramic drive through Limón's canal country",
    ],
    includes: [
      "Round-trip transport from the pier in an air-conditioned vehicle",
      "Licensed naturalist guide",
      "Boat ride and all entrance fees",
      "Bottled water and seasonal fruit",
    ],
    notIncluded: ["Lunch (stop available)", "Gratuities", "Souvenirs"],
    itinerary: [
      { time: "0:00", title: "Pier pickup", detail: "Meet your guide dockside and settle into the coach." },
      { time: "0:40", title: "Rainforest boardwalk", detail: "Slow walk through primary forest looking for sloths, poison-dart frogs and nesting toucans." },
      { time: "1:45", title: "Plantation stop", detail: "Walk a banana row, see the washing and boxing shed, and taste fruit at the source." },
      { time: "3:00", title: "River cruise", detail: "Flat-water boat ride through the canals for wading birds and monkeys." },
      { time: "4:15", title: "Return to port", detail: "Scenic drive back with time to spare before all-aboard." },
    ],
  },
  {
    slug: "cahuita-tortuguero-6-in-1",
    title: "6 in 1: Cahuita N.P, Tortuguero Canals & More",
    region: "limon",
    priceUSD: 112,
    durationHours: "6 hours",
    groupType: "Shared",
    freeCancellation: true,
    scene: "canals",
    tagline:
      "Cahuita's coastal rainforest plus a boat run through the Tortuguero-style canals.",
    overview:
      "A fuller day that pairs Costa Rica's prettiest coastal national park with a boat ride into the maze of freshwater canals that run north toward Tortuguero. You walk the Cahuita trail between jungle and white sand, then trade your boots for a covered boat to look for river turtles, sloths and caiman from the water. A relaxed, wildlife-heavy option for travellers who want more than a quick stop.",
    highlights: [
      "Ranger-station entry to Cahuita National Park",
      "Beachfront rainforest trail — sloths, monkeys, agoutis and land crabs",
      "Covered-boat cruise through the northern canals",
      "Caribbean lunch stop in Cahuita village",
      "Time for a quick swim if conditions allow",
    ],
    includes: [
      "Round-trip pier transport",
      "Naturalist guide and park donation/entry",
      "Canal boat ride",
      "Water and fresh fruit",
    ],
    notIncluded: ["Lunch", "Gratuities", "Optional souvenirs"],
    itinerary: [
      { time: "0:00", title: "Depart the pier", detail: "Coastal drive south to Cahuita, about 45 minutes." },
      { time: "0:50", title: "Cahuita National Park", detail: "Guided walk on the flat shoreline trail with frequent wildlife stops." },
      { time: "2:45", title: "Cahuita village", detail: "Break for Caribbean-style lunch and a look around town." },
      { time: "3:45", title: "Canal cruise", detail: "Board a covered boat for the freshwater canals and their birdlife." },
      { time: "5:15", title: "Back to port", detail: "Return drive with a comfortable buffer before departure." },
    ],
    featured: true,
  },
  {
    slug: "cahuita-national-park-snorkeling",
    title: "Cahuita National Park & Snorkeling (Small Group)",
    region: "limon",
    priceUSD: 169,
    durationHours: "4–5 hours",
    groupType: "Small group",
    freeCancellation: true,
    scene: "reef",
    tagline:
      "Snorkel Costa Rica's largest living coral reef, then walk the Cahuita jungle trail.",
    overview:
      "A small-group day built around the reef off Cahuita Point — one of the few coral reefs on the country's Caribbean side and a protected part of the national park. A short boat trip takes you to the snorkel site to drift over coral heads, parrotfish and the occasional reef shark or turtle, followed by a guided walk on the park trail. Group size is capped so everyone gets attention in the water.",
    highlights: [
      "Boat-access snorkeling on a protected coral reef",
      "Small group with a dedicated in-water guide",
      "Cahuita National Park shoreline walk",
      "Reef fish, rays, and sea turtles in season",
      "Beach time between activities",
    ],
    includes: [
      "Pier transfers",
      "Boat to the reef and snorkel gear (mask, snorkel, fins, vest)",
      "Certified guide and park entry",
      "Water and fruit",
    ],
    notIncluded: ["Lunch", "Wetsuit", "Gratuities"],
    itinerary: [
      { time: "0:00", title: "Pier pickup", detail: "Drive to the Cahuita boat launch." },
      { time: "0:50", title: "Safety briefing", detail: "Fit gear and cover snorkel basics with your guide." },
      { time: "1:10", title: "Reef snorkel", detail: "Two guided passes over the coral with a surface rest between." },
      { time: "2:40", title: "Park trail walk", detail: "Guided rainforest walk from Cahuita Point back toward the village." },
      { time: "4:00", title: "Return", detail: "Back to the pier well before all-aboard." },
    ],
    featured: true,
  },
  {
    slug: "bribri-chocolate-cahuita",
    title: "Chocolate Tour in Bribrí Indigenous Area & Cahuita",
    region: "limon",
    priceUSD: 110,
    durationHours: "5–7 hours",
    groupType: "Shared",
    freeCancellation: true,
    scene: "cacao",
    tagline:
      "Make chocolate from the pod with a Bribrí family, then explore Cahuita National Park.",
    overview:
      "A cultural day in the Talamanca foothills with a Bribrí family who farm cacao the way it has been done for generations. You cross a river, walk their forest garden, roast and grind the beans by hand and drink chocolate the traditional way — then continue to Cahuita National Park for a wildlife walk. Your visit directly supports the community's land and language work.",
    highlights: [
      "Welcome and forest-garden walk with a Bribrí host family",
      "Roast, peel and grind cacao; taste it at every stage",
      "Learn how cacao ties into Bribrí cosmology and daily life",
      "Guided walk in Cahuita National Park",
      "Community-run project — fees stay local",
    ],
    includes: [
      "Round-trip transport from the pier",
      "Bilingual guide plus the family's presentation",
      "Chocolate-making session and tastings",
      "Park entry, water and fruit",
    ],
    notIncluded: ["Lunch", "Gratuities", "Craft purchases"],
    itinerary: [
      { time: "0:00", title: "Leave the pier", detail: "Drive south into Talamanca, about an hour." },
      { time: "1:10", title: "Arrive in Bribrí territory", detail: "Short river crossing and walk to the farm." },
      { time: "1:40", title: "Cacao to chocolate", detail: "Hands-on session from pod to cup with the family." },
      { time: "3:30", title: "Cahuita National Park", detail: "Guided shoreline trail walk for sloths and monkeys." },
      { time: "5:30", title: "Return to port", detail: "Drive back with buffer time; longer itineraries add a lunch stop." },
    ],
  },

  /* ---------------------------- PUNTARENAS ---------------------------- */
  {
    slug: "natuwa-wildlife-rescue-private",
    title: "Natuwa Wildlife Rescue Center (Private)",
    region: "puntarenas",
    priceUSD: 189,
    durationHours: "4–5 hours",
    groupType: "Private",
    freeCancellation: true,
    scene: "wildlife",
    tagline:
      "A private visit to a serious sanctuary for macaws, big cats and rescued wildlife.",
    overview:
      "A private, unhurried day at Natuwa, a rescue and breeding centre known for its scarlet and great green macaw programmes and for jaguars, pumas and monkeys that cannot be released. A keeper-led walk explains where each animal came from and how the release projects work. Because it is private, the pace and stops are yours, and photography time is generous.",
    highlights: [
      "Private, keeper-guided tour of the sanctuary",
      "Scarlet and great green macaw breeding aviaries",
      "Rescued jaguars, pumas and ocelots",
      "Straight talk on wildlife trafficking and rehabilitation",
      "Flexible timing and stops",
    ],
    includes: [
      "Private round-trip transport from the pier",
      "Private guide and sanctuary entrance donation",
      "Keeper-led walk",
      "Water and fruit",
    ],
    notIncluded: ["Lunch", "Gratuities", "Personal expenses"],
    itinerary: [
      { time: "0:00", title: "Private pickup", detail: "Meet your driver-guide at the pier." },
      { time: "1:00", title: "Arrive at Natuwa", detail: "Near Aranjuez, about an hour from Puntarenas." },
      { time: "1:15", title: "Guided sanctuary walk", detail: "Macaw aviaries, cat enclosures and the recovery areas with a keeper." },
      { time: "3:00", title: "Free time", detail: "Return to favourite enclosures for photos at your own pace." },
      { time: "3:45", title: "Return drive", detail: "Back to the ship with time in hand." },
    ],
  },
  {
    slug: "puntarenas-central-pacific-7-in-1",
    title: "Puntarenas Central Pacific 7 in 1",
    region: "puntarenas",
    priceUSD: 89,
    durationHours: "6 hours",
    groupType: "Shared",
    freeCancellation: true,
    scene: "pacific",
    tagline:
      "A sampler of the Central Pacific — crocodile river, canopy, fruit farm and coastal views.",
    overview:
      "The Pacific-side counterpart to our Limón combo: one loop that strings together a Tárcoles River crocodile viewpoint, a short canopy or hanging-bridges stop, a tropical fruit farm and a photo halt on the Nicoya Gulf. A lot of variety for the money, with a guide connecting the dots between mangrove, dry forest and farmland.",
    highlights: [
      "Tárcoles River crocodiles from a safe vantage point",
      "Canopy bridges or a short zipline segment",
      "Tropical fruit farm tasting",
      "Gulf of Nicoya coastal viewpoint",
      "Local-life stop in a Pacific town",
    ],
    includes: [
      "Round-trip pier transport",
      "Naturalist guide and all entry fees",
      "Canopy/bridges activity",
      "Water and fruit",
    ],
    notIncluded: ["Lunch", "Gratuities", "Souvenirs"],
    itinerary: [
      { time: "0:00", title: "Depart Puntarenas", detail: "Coastal highway south toward Tárcoles." },
      { time: "1:00", title: "Crocodile viewpoint", detail: "Spot large crocodiles and shorebirds from the bridge area." },
      { time: "2:00", title: "Canopy stop", detail: "Hanging bridges or a short zipline through the forest." },
      { time: "3:30", title: "Fruit farm", detail: "Walk the orchard and taste what's in season." },
      { time: "4:30", title: "Coastal viewpoint", detail: "Photo stop over the Gulf of Nicoya before returning." },
      { time: "5:30", title: "Back to port", detail: "Return with a comfortable buffer." },
    ],
  },
  {
    slug: "crocodile-safari-zipline-private",
    title: "Crocodile Safari & Zipline (Private)",
    region: "puntarenas",
    priceUSD: 210,
    durationHours: "5 hours",
    groupType: "Private",
    freeCancellation: true,
    scene: "crocodile",
    tagline:
      "A private boat safari for wild crocodiles on the Tárcoles, then a full canopy zipline circuit.",
    overview:
      "Two headline Central Pacific experiences back to back, run privately for your group. First a boat safari on the Tárcoles River — mangrove channels, dozens of American crocodiles and some of the best waterbird watching in the country. Then a full zipline circuit through the forest canopy nearby. Private transport and guide throughout, so timing flexes to your ship.",
    highlights: [
      "Private Tárcoles River boat safari",
      "Wild American crocodiles at close range from the boat",
      "Roseate spoonbills, herons and kingfishers in the mangroves",
      "Full canopy zipline circuit with certified operators",
      "Private vehicle and guide — flexible schedule",
    ],
    includes: [
      "Private round-trip pier transport",
      "Private guide",
      "River safari boat ride and zipline circuit",
      "All harness/gear, water and fruit",
    ],
    notIncluded: ["Lunch", "Gratuities", "Photos from the zipline operator"],
    itinerary: [
      { time: "0:00", title: "Private pickup", detail: "Leave the pier for the Tárcoles, about an hour." },
      { time: "1:00", title: "River safari", detail: "Roughly 90 minutes through the mangroves with a boat captain and your guide." },
      { time: "2:45", title: "Canopy circuit", detail: "Gear up and run the zipline lines through the forest." },
      { time: "4:00", title: "Return drive", detail: "Back to the ship with buffer time." },
    ],
    featured: true,
  },
  {
    slug: "atv-canopy-adventure",
    title: "ATV & Canopy Adventure",
    region: "puntarenas",
    priceUSD: 235,
    durationHours: "5 hours",
    groupType: "Small group",
    freeCancellation: true,
    scene: "atv",
    tagline:
      "Ride ATVs through backroads and river crossings, then zipline the canopy.",
    overview:
      "The high-energy Puntarenas day. You take a guided ATV through farm tracks, forest and shallow river crossings in the hills behind the coast, with viewpoints over the Pacific, then finish on a canopy zipline circuit. Single or tandem quads, a lead and sweep guide, and a briefing for first-timers. Bring clothes you don't mind getting muddy.",
    highlights: [
      "Guided ATV ride on backroads, trails and river crossings",
      "Ridge viewpoints over the Central Pacific coast",
      "Canopy zipline circuit to finish",
      "Single or tandem quads; instruction for beginners",
      "Small group with lead and sweep guides",
    ],
    includes: [
      "Round-trip pier transport",
      "ATV rental, fuel and helmet",
      "Zipline circuit and gear",
      "Guides, water and fruit",
    ],
    notIncluded: ["Lunch", "Gratuities", "Damage waiver (optional, paid locally)"],
    itinerary: [
      { time: "0:00", title: "Pier pickup", detail: "Drive to the ATV base in the coastal hills." },
      { time: "0:50", title: "Briefing & fitting", detail: "Helmets, controls and trail rules with your guides." },
      { time: "1:15", title: "ATV ride", detail: "About 2 hours through trails, farmland and river crossings with photo stops." },
      { time: "3:15", title: "Canopy zipline", detail: "Cool off on the zipline circuit through the forest." },
      { time: "4:15", title: "Return", detail: "Back to port with time to clean up before boarding." },
    ],
    featured: true,
  },

  /* ----------------------------- SAN JOSÉ ----------------------------- */
  {
    slug: "san-jose-history-culture-chocolate",
    title: "San José Walking Tour: History, Culture & Chocolate",
    region: "san-jose",
    priceUSD: 72,
    durationHours: "3 hours",
    groupType: "Shared",
    freeCancellation: true,
    scene: "city",
    tagline:
      "The capital's historic core on foot, finishing with a proper chocolate tasting.",
    overview:
      "A guided walk through downtown San José — the National Theatre, Central Avenue, the old Post Office, Parque Central and the Mercado Central — with the stories of how coffee money built the city. It ends at a small-batch chocolatier for a guided tasting that traces Costa Rican cacao from bean to bar.",
    highlights: [
      "Gran Teatro Nacional and Plaza de la Cultura",
      "Mercado Central — sodas, spice stalls and coffee vendors",
      "Correos de Costa Rica and the historic centre",
      "Guided chocolate tasting to finish",
      "Local guide with time for questions",
    ],
    includes: [
      "Licensed local guide",
      "Chocolate tasting",
      "Bottled water",
    ],
    notIncluded: ["Hotel transport (meet at the start point)", "Food and drink beyond the tasting", "Gratuities"],
    itinerary: [
      { title: "Plaza de la Cultura", detail: "Meet your guide and start at the National Theatre." },
      { title: "Historic centre walk", detail: "Central Avenue, Parque Central and the Metropolitan Cathedral with context along the way." },
      { title: "Mercado Central", detail: "Walk the aisles of the 1880s market; smell the coffee roasters." },
      { title: "Chocolate tasting", detail: "Sit-down tasting flight at a local chocolate maker." },
    ],
  },
  {
    slug: "san-jose-history-culture-coffee",
    title: "San José Walking Tour: History, Culture & Coffee Tasting",
    region: "san-jose",
    priceUSD: 55,
    durationHours: "3 hours",
    groupType: "Shared",
    freeCancellation: true,
    scene: "coffee",
    tagline:
      "Downtown San José on foot with a guided cupping of Costa Rican coffee.",
    overview:
      "The same historic-centre walk — National Theatre, Central Avenue, the Mercado Central — with the focus on coffee: the crop that funded the theatre, the railways and the city itself. You finish with a guided cupping led by a barista, comparing beans from different growing regions.",
    highlights: [
      "Gran Teatro Nacional and the Plaza de la Cultura",
      "The story of the 'grano de oro' and how it shaped San José",
      "Mercado Central coffee stalls",
      "Guided cupping across Costa Rican regions",
      "Compact, walkable route",
    ],
    includes: ["Licensed local guide", "Guided coffee tasting", "Bottled water"],
    notIncluded: ["Hotel transport (meet at the start point)", "Additional food and drink", "Gratuities"],
    itinerary: [
      { title: "Plaza de la Cultura", detail: "Start at the National Theatre with the coffee-boom backstory." },
      { title: "Historic avenues", detail: "Walk Central Avenue and Parque Central toward the market." },
      { title: "Mercado Central", detail: "Coffee vendors, sodas and the everyday life of downtown." },
      { title: "Coffee cupping", detail: "Barista-led tasting comparing beans from Tarrazú, Naranjo and beyond." },
    ],
    featured: true,
  },
  {
    slug: "san-jose-small-group-cultural-walk",
    title: "Small Group Cultural Walking Tour in San José",
    region: "san-jose",
    priceUSD: 45,
    durationHours: "3 hours",
    groupType: "Small group",
    freeCancellation: true,
    scene: "city",
    tagline:
      "An unhurried, small-group walk through the neighbourhoods locals actually use.",
    overview:
      "A relaxed small-group walk that goes past the monuments into the texture of the city — Barrio Amón's coffee-baron mansions, neighbourhood parks, street art and the sodas where office workers eat lunch. Designed for travellers who like context and conversation over checklists.",
    highlights: [
      "Barrio Amón's historic mansions and murals",
      "Local parks and everyday plazas",
      "Street-food and soda culture explained",
      "Small group — easy to ask questions",
      "Gentle pace",
    ],
    includes: ["Licensed local guide", "Bottled water"],
    notIncluded: ["Hotel transport (meet at the start point)", "Food and drink", "Gratuities"],
    itinerary: [
      { title: "City centre start", detail: "Meet near the Plaza de la Cultura." },
      { title: "Barrio Amón", detail: "Walk the tree-lined streets of the old coffee elite and their converted mansions." },
      { title: "Parks and murals", detail: "Neighbourhood green space and the city's street-art corners." },
      { title: "Soda stop", detail: "Optional coffee or casado at a working-class lunch counter." },
    ],
  },
  {
    slug: "san-jose-national-theatre-walk",
    title: "Explore San José Walking Tour with National Theatre Access",
    region: "san-jose",
    priceUSD: 45,
    durationHours: "2 hours",
    groupType: "Shared",
    freeCancellation: true,
    scene: "theatre",
    tagline:
      "A short historic-centre walk that goes inside the Teatro Nacional.",
    overview:
      "A focused two-hour walk built around the Gran Teatro Nacional, with ticketed entry to see the marble staircase, the painted ceilings and the 1897 auditorium. Around it, the essential downtown landmarks — Plaza de la Cultura, Central Avenue and the Post Office — with your guide filling in the history.",
    highlights: [
      "Interior visit to the Gran Teatro Nacional (entry included)",
      "Foyer frescoes, marble staircase and auditorium",
      "Plaza de la Cultura and Central Avenue",
      "Correos de Costa Rica building",
      "Short and easy — good for a tight schedule",
    ],
    includes: ["Licensed local guide", "National Theatre entrance ticket", "Bottled water"],
    notIncluded: ["Hotel transport (meet at the start point)", "Food and drink", "Gratuities"],
    itinerary: [
      { title: "Plaza de la Cultura", detail: "Meet your guide outside the theatre." },
      { title: "Inside the Teatro Nacional", detail: "Guided visit through the foyer, staircase and auditorium." },
      { title: "Historic centre", detail: "Central Avenue and the Post Office building." },
      { title: "Wrap up", detail: "Finish downtown, close to hotels and pickup points." },
    ],
    featured: true,
  },
];

/** Photograph that pairs with each illustrated scene (files in /public/img/tours). */
export const sceneImage: Record<SceneKey, string> = {
  rainforest: "/img/tours/rainforest.jpg",
  canals: "/img/tours/canal.jpg",
  reef: "/img/tours/reef.jpg",
  cacao: "/img/tours/cacao.jpg",
  wildlife: "/img/tours/macaw.jpg",
  pacific: "/img/tours/pacific.jpg",
  crocodile: "/img/tours/crocodile.jpg",
  atv: "/img/tours/atv.jpg",
  city: "/img/tours/sanjose.jpg",
  coffee: "/img/tours/coffee.jpg",
  theatre: "/img/tours/theatre.jpg",
  hero: "/img/tours/hero.jpg",
};

export const tourImage = (t: Pick<CatalogTour, "scene">) => sceneImage[t.scene];

export const toursByRegion = (r: RegionSlug) =>
  tours.filter((t) => t.region === r);

export const getTourBySlug = (slug: string) =>
  tours.find((t) => t.slug === slug);

export const featuredTours = () => tours.filter((t) => t.featured);

export const relatedTours = (tour: CatalogTour, count = 3) =>
  tours
    .filter((t) => t.region === tour.region && t.slug !== tour.slug)
    .slice(0, count);

export const priceRange = () => {
  const prices = tours.map((t) => t.priceUSD);
  return { min: Math.min(...prices), max: Math.max(...prices) };
};
