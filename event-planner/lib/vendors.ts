export type VendorCategory = "Venue" | "Catering" | "Music" | "Activities";

export type VendorPackage = {
  name: string;
  price: number;
  description: string;
};

export type VendorReview = {
  author: string;
  rating: number;
  date: string;
  text: string;
};

export type Vendor = {
  id: string;
  name: string;
  category: VendorCategory;
  /** Estimated starting price in USD */
  price: number;
  blurb: string;
  rating: number;
  imageUrl: string;
  description: string;
  galleryUrls: string[];
  packages: VendorPackage[];
  reviews: VendorReview[];
};

export const CATEGORY_ORDER: VendorCategory[] = [
  "Venue",
  "Catering",
  "Music",
  "Activities",
];

export const VENDORS: Vendor[] = [
  {
    id: "v1",
    name: "Harbor Lights Venue",
    category: "Venue",
    price: 3200,
    blurb: "Waterfront hall, up to 200 guests",
    rating: 4.9,
    imageUrl: "https://picsum.photos/seed/ep-v1-hero/1200/675",
    description:
      "Harbor Lights is a light-filled waterfront ballroom with floor-to-ceiling views, dedicated bridal suites, and a terrace for cocktails at sunset. Our team coordinates layout, lighting, and vendor load-in so your timeline stays smooth from ceremony to last dance. Hosting up to 200 guests, we include tables, chairs, and in-house AV basics with upgrades available.",
    galleryUrls: [
      "https://picsum.photos/seed/ep-v1-hero/1200/675",
      "https://picsum.photos/seed/ep-v1-g1/800/600",
      "https://picsum.photos/seed/ep-v1-g2/800/600",
      "https://picsum.photos/seed/ep-v1-g3/800/600",
    ],
    packages: [
      {
        name: "Ceremony + reception (6 hr)",
        price: 3200,
        description: "Main hall, terrace access, basic AV, event coordinator for the day.",
      },
      {
        name: "Full weekend",
        price: 5200,
        description: "Friday rehearsal, Saturday event, Sunday brunch space; extended access.",
      },
      {
        name: "Premium lighting & draping",
        price: 1800,
        description: "Add-on uplighting, fabric accents, and custom monogram projection.",
      },
    ],
    reviews: [
      {
        author: "Maya R.",
        rating: 5,
        date: "2025-11-02",
        text: "The view sold us and the staff delivered. Rain plan was seamless and the coordinator was calm all day.",
      },
      {
        author: "Chris L.",
        rating: 4.8,
        date: "2025-08-18",
        text: "Guests still talk about the terrace. Parking was easy; only wish the bar line was shorter during peak.",
      },
      {
        author: "Jordan & Sam",
        rating: 5,
        date: "2025-05-10",
        text: "Inclusive and organized. They worked great with our caterer and band.",
      },
    ],
  },
  {
    id: "v2",
    name: "Garden Estate",
    category: "Venue",
    price: 2800,
    blurb: "Outdoor gardens and tent options",
    rating: 4.8,
    imageUrl: "https://picsum.photos/seed/ep-v2-hero/1200/675",
    description:
      "Garden Estate blends manicured lawns, an oak grove ceremony site, and a clear-span tent option for receptions. We specialize in outdoor-forward layouts with generator power, climate considerations, and curated vendor lists familiar with the property. Perfect for couples who want nature as the backdrop without sacrificing comfort.",
    galleryUrls: [
      "https://picsum.photos/seed/ep-v2-hero/1200/675",
      "https://picsum.photos/seed/ep-v2-g1/800/600",
      "https://picsum.photos/seed/ep-v2-g2/800/600",
      "https://picsum.photos/seed/ep-v2-g3/800/600",
    ],
    packages: [
      {
        name: "Garden ceremony + tented reception",
        price: 2800,
        description: "Ceremony lawn, reception tent shell, restrooms, and parking attendant.",
      },
      {
        name: "Estate exclusive (full day)",
        price: 4200,
        description: "Morning prep through evening; extra hour and lawn games area included.",
      },
      {
        name: "Rain backup tent",
        price: 900,
        description: "Sidewalls and heating or fans depending on season.",
      },
    ],
    reviews: [
      {
        author: "Elena V.",
        rating: 5,
        date: "2025-09-22",
        text: "Magical setting. The team thought of everything including bug spray and sunscreen stations.",
      },
      {
        author: "Tom W.",
        rating: 4.5,
        date: "2025-06-14",
        text: "Stunning photos. Slight walk from parking for older guests — they offered shuttles when we asked.",
      },
    ],
  },
  {
    id: "v3",
    name: "Bloom & Feast Catering",
    category: "Catering",
    price: 4500,
    blurb: "Full-service plated and buffet",
    rating: 4.9,
    imageUrl: "https://picsum.photos/seed/ep-v3-hero/1200/675",
    description:
      "Bloom & Feast is a full-service catering crew focused on seasonal menus, dietary clarity, and polished service. From passed apps to plated mains and late-night snacks, we handle staffing, rentals coordination, and timeline alignment with your venue. Tastings are available monthly by appointment.",
    galleryUrls: [
      "https://picsum.photos/seed/ep-v3-hero/1200/675",
      "https://picsum.photos/seed/ep-v3-g1/800/600",
      "https://picsum.photos/seed/ep-v3-g2/800/600",
      "https://picsum.photos/seed/ep-v3-g3/800/600",
    ],
    packages: [
      {
        name: "Buffet (75 guests)",
        price: 4500,
        description: "Two mains, three sides, salad, dessert display; service staff included.",
      },
      {
        name: "Plated dinner (75 guests)",
        price: 5800,
        description: "Three-course plated with bread, intermezzo option, and coffee station.",
      },
      {
        name: "Cocktail + stations",
        price: 3200,
        description: "Heavy apps and two interactive stations; ideal for shorter receptions.",
      },
    ],
    reviews: [
      {
        author: "Priya K.",
        rating: 5,
        date: "2025-10-05",
        text: "Vegan and gluten-free guests were thrilled. Service was quiet and professional.",
      },
      {
        author: "Alex M.",
        rating: 4.8,
        date: "2025-07-28",
        text: "Tasting was generous. The team adjusted spice levels for our families perfectly.",
      },
      {
        author: "Samira D.",
        rating: 5,
        date: "2025-04-12",
        text: "Late-night sliders were a hit. Worth the add-on.",
      },
    ],
  },
  {
    id: "v4",
    name: "Urban Bites Co.",
    category: "Catering",
    price: 3200,
    blurb: "Trendy small plates and bars",
    rating: 4.6,
    imageUrl: "https://picsum.photos/seed/ep-v4-hero/1200/675",
    description:
      "Urban Bites brings chef-driven small plates, craft cocktail bars, and flexible formats for modern weddings. We love warehouse venues and rooftops where guests mingle rather than sit through long courses. Menu design emphasizes bold flavors and Instagram-worthy presentation.",
    galleryUrls: [
      "https://picsum.photos/seed/ep-v4-hero/1200/675",
      "https://picsum.photos/seed/ep-v4-g1/800/600",
      "https://picsum.photos/seed/ep-v4-g2/800/600",
      "https://picsum.photos/seed/ep-v4-g3/800/600",
    ],
    packages: [
      {
        name: "Cocktail reception (100 guests)",
        price: 3200,
        description: "Eight bite-sized items, two dessert bites, disposable eco ware or rental upgrade.",
      },
      {
        name: "Family-style dinner",
        price: 4100,
        description: "Shared platters per table, salad, and one family dessert.",
      },
      {
        name: "Bar package",
        price: 1800,
        description: "Beer, wine, signature cocktail; bartenders and soft drinks included.",
      },
    ],
    reviews: [
      {
        author: "Riley P.",
        rating: 4.5,
        date: "2025-08-30",
        text: "Cool vibe and great flavors. A few vegetarians wanted one more entrée option.",
      },
      {
        author: "Dan & Lee",
        rating: 4.7,
        date: "2025-03-20",
        text: "Our rooftop party felt like a lounge. Setup was fast.",
      },
    ],
  },
  {
    id: "v5",
    name: "Nightwave DJs",
    category: "Music",
    price: 1200,
    blurb: "DJ + lighting packages",
    rating: 4.7,
    imageUrl: "https://picsum.photos/seed/ep-v5-hero/1200/675",
    description:
      "Nightwave DJs pairs professional MC skills with dance-floor-focused mixing. Packages include sound for ceremony and reception, wireless mics, and optional dance lighting. We plan must-play and do-not-play lists with you and read the crowd all night.",
    galleryUrls: [
      "https://picsum.photos/seed/ep-v5-hero/1200/675",
      "https://picsum.photos/seed/ep-v5-g1/800/600",
      "https://picsum.photos/seed/ep-v5-g2/800/600",
      "https://picsum.photos/seed/ep-v5-g3/800/600",
    ],
    packages: [
      {
        name: "Reception DJ (5 hr)",
        price: 1200,
        description: "DJ, sound, basic dance lighting, one ceremony mic add-on available.",
      },
      {
        name: "Ceremony + reception",
        price: 1650,
        description: "Separate zones for ceremony cocktail and reception with extra speaker.",
      },
      {
        name: "Uplighting pack",
        price: 400,
        description: "Twelve wireless uplights, color-matched to your palette.",
      },
    ],
    reviews: [
      {
        author: "Nicole F.",
        rating: 5,
        date: "2025-09-08",
        text: "Packed dance floor without cheesy chatter. He nailed our genre mix.",
      },
      {
        author: "Henry B.",
        rating: 4.5,
        date: "2025-06-01",
        text: "Great value. Slight feedback during speeches — fixed quickly.",
      },
    ],
  },
  {
    id: "v6",
    name: "Blue River Band",
    category: "Music",
    price: 2400,
    blurb: "Live band, 4-piece",
    rating: 5.0,
    imageUrl: "https://picsum.photos/seed/ep-v6-hero/1200/675",
    description:
      "Blue River Band is a tight four-piece covering soul, pop, and classic rock with optional horns for larger budgets. We bring full PA, stage plot diagrams for your planner, and learn a reasonable number of custom requests for first dances and parent dances.",
    galleryUrls: [
      "https://picsum.photos/seed/ep-v6-hero/1200/675",
      "https://picsum.photos/seed/ep-v6-g1/800/600",
      "https://picsum.photos/seed/ep-v6-g2/800/600",
      "https://picsum.photos/seed/ep-v6-g3/800/600",
    ],
    packages: [
      {
        name: "4-piece (4 hr)",
        price: 2400,
        description: "Band, PA, breaks handled with curated playlists.",
      },
      {
        name: "Ceremony duo + band",
        price: 3100,
        description: "Acoustic duo for ceremony cocktails; full band for reception.",
      },
      {
        name: "Horn section add-on",
        price: 700,
        description: "Trumpet + sax for select sets.",
      },
    ],
    reviews: [
      {
        author: "Olivia S.",
        rating: 5,
        date: "2025-10-19",
        text: "Insanely talented. They learned our first dance in two weeks.",
      },
      {
        author: "Marcus T.",
        rating: 5,
        date: "2025-04-25",
        text: "Energy all night. Sound was balanced — we could still talk at the tables.",
      },
    ],
  },
  {
    id: "v7",
    name: "Snap & Smile Photo",
    category: "Activities",
    price: 900,
    blurb: "Photo booth + digital gallery",
    rating: 4.5,
    imageUrl: "https://picsum.photos/seed/ep-v7-hero/1200/675",
    description:
      "Snap & Smile delivers a modern open-air booth with instant prints, GIFs, and a live gallery guests can download from. We customize backdrops and prop crates to match your theme, and an attendant stays on-site to keep the line moving.",
    galleryUrls: [
      "https://picsum.photos/seed/ep-v7-hero/1200/675",
      "https://picsum.photos/seed/ep-v7-g1/800/600",
      "https://picsum.photos/seed/ep-v7-g2/800/600",
      "https://picsum.photos/seed/ep-v7-g3/800/600",
    ],
    packages: [
      {
        name: "Classic booth (3 hr)",
        price: 900,
        description: "Unlimited sessions, prints, digital gallery for 90 days.",
      },
      {
        name: "Booth + guest book",
        price: 1150,
        description: "Adds scrapbook station with double prints and adhesive pens.",
      },
      {
        name: "Backdrop upgrade",
        price: 200,
        description: "Custom floral or sequin backdrop from partner florist.",
      },
    ],
    reviews: [
      {
        author: "Tessa G.",
        rating: 4.5,
        date: "2025-07-14",
        text: "Line was long because everyone loved it — attendant kept it organized.",
      },
      {
        author: "Brian K.",
        rating: 4.5,
        date: "2025-05-03",
        text: "GIFs were hilarious. Gallery link worked perfectly.",
      },
    ],
  },
  {
    id: "v8",
    name: "Playful Events",
    category: "Activities",
    price: 650,
    blurb: "Games and kids' corner",
    rating: 4.4,
    imageUrl: "https://picsum.photos/seed/ep-v8-hero/1200/675",
    description:
      "Playful Events sets up lawn games, kids’ activity corners, and casual icebreakers so mixed-age weddings feel welcoming. We deliver, set up, and strike giant Jenga, cornhole, coloring stations, and optional supervised crafts for defined windows.",
    galleryUrls: [
      "https://picsum.photos/seed/ep-v8-hero/1200/675",
      "https://picsum.photos/seed/ep-v8-g1/800/600",
      "https://picsum.photos/seed/ep-v8-g2/800/600",
      "https://picsum.photos/seed/ep-v8-g3/800/600",
    ],
    packages: [
      {
        name: "Lawn games bundle",
        price: 650,
        description: "Cornhole, giant Jenga, ring toss; 4-hour rental with staff.",
      },
      {
        name: "Kids’ corner",
        price: 450,
        description: "Two-hour crafts + games; parent stays responsible; we provide mats.",
      },
      {
        name: "Games + coordination",
        price: 950,
        description: "Full afternoon coverage with host to rotate activities.",
      },
    ],
    reviews: [
      {
        author: "Helen J.",
        rating: 4.5,
        date: "2025-08-09",
        text: "Kept the kids busy during cocktail hour. Setup looked neat.",
      },
      {
        author: "Rob N.",
        rating: 4.2,
        date: "2025-04-17",
        text: "Fun add-on. Wish we’d booked an extra hour for the teens.",
      },
    ],
  },
];

export function formatVendorMoney(n: number) {
  return n.toLocaleString(undefined, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

export function getVendorById(id: string): Vendor | undefined {
  return VENDORS.find((v) => v.id === id);
}
