export type CategoryId =
  | "medical"
  | "horeca"
  | "beauty"
  | "comert"
  | "servicii"
  | "auto"
  | "educatie"
  | "altele";

export interface CategoryConfig {
  id: CategoryId;
  label: string;
  emoji: string;
  step2: {
    question: string;
    options: string[];
  };
  step4: {
    question: string;
    options: string[];
  };
  step5: {
    question: string;
    options: string[];
  };
}

/**
 * Lista mare de tipuri de afaceri pentru autocomplete.
 * Fiecare entry mapat direct la una din cele 8 categorii.
 * Make poate revalida/recategoriza dacă userul scrie ceva nestandard.
 */
export interface BusinessType {
  label: string;
  category: CategoryId;
  aliases?: string[]; // alternative names pentru search
}

export const BUSINESS_TYPES: BusinessType[] = [
  // === MEDICAL ===
  { label: "Clinică dentară", category: "medical", aliases: ["dentist", "dentar", "stomatolog"] },
  { label: "Cabinet stomatologic", category: "medical", aliases: ["stoma"] },
  { label: "Cabinet veterinar", category: "medical", aliases: ["vet", "veterinar"] },
  { label: "Clinică estetică", category: "medical", aliases: ["estetică", "estetic"] },
  { label: "Cabinet medical", category: "medical", aliases: ["medic", "doctor"] },
  { label: "Cabinet psihologic", category: "medical", aliases: ["psiholog", "psihoterapeut"] },
  { label: "Cabinet kinetoterapie", category: "medical", aliases: ["kineto"] },
  { label: "Cabinet ortopedic", category: "medical", aliases: ["ortoped"] },
  { label: "Centru medical", category: "medical" },
  { label: "Clinică dermatologie", category: "medical", aliases: ["dermatolog"] },
  { label: "Cabinet ginecologie", category: "medical", aliases: ["ginecolog"] },
  { label: "Cabinet pediatrie", category: "medical", aliases: ["pediatru"] },
  { label: "Optică medicală", category: "medical", aliases: ["optica"] },
  { label: "Farmacie", category: "medical" },
  { label: "Laborator analize", category: "medical", aliases: ["laborator"] },

  // === HORECA ===
  { label: "Restaurant", category: "horeca" },
  { label: "Pizzerie", category: "horeca", aliases: ["pizza"] },
  { label: "Cafenea", category: "horeca", aliases: ["café", "cafe"] },
  { label: "Bar", category: "horeca", aliases: ["pub"] },
  { label: "Bistro", category: "horeca" },
  { label: "Fast food", category: "horeca", aliases: ["fastfood"] },
  { label: "Hotel", category: "horeca" },
  { label: "Pensiune", category: "horeca" },
  { label: "Cofetărie", category: "horeca", aliases: ["cofetarie", "patiserie"] },
  { label: "Cofetărie / patiserie", category: "horeca" },
  { label: "Catering", category: "horeca" },
  { label: "Food truck", category: "horeca" },
  { label: "Club / lounge", category: "horeca", aliases: ["club"] },
  { label: "Vinotecă", category: "horeca", aliases: ["vinoteca"] },

  // === BEAUTY & WELLNESS ===
  { label: "Salon de înfrumusețare", category: "beauty", aliases: ["salon"] },
  { label: "Frizerie / Barbershop", category: "beauty", aliases: ["frizer", "barber"] },
  { label: "Coafor", category: "beauty", aliases: ["coafură", "tuns"] },
  { label: "Studio nails", category: "beauty", aliases: ["manichiură", "manichiura", "nails"] },
  { label: "Studio extensii gene", category: "beauty", aliases: ["extensii"] },
  { label: "Salon SPA", category: "beauty", aliases: ["spa"] },
  { label: "Centru masaj", category: "beauty", aliases: ["masaj"] },
  { label: "Salon machiaj", category: "beauty", aliases: ["machiaj", "make-up"] },
  { label: "Cosmetică / cosmetician", category: "beauty", aliases: ["cosmetica"] },
  { label: "Salon depilare", category: "beauty", aliases: ["depilare"] },
  { label: "Tatuaje / piercing", category: "beauty", aliases: ["tatuaj", "tattoo"] },

  // === COMERȚ DIGITAL ===
  { label: "Magazin online", category: "comert", aliases: ["ecommerce", "e-commerce", "shop"] },
  { label: "Brand online (D2C)", category: "comert" },
  { label: "Magazin Shopify", category: "comert", aliases: ["shopify"] },
  { label: "Magazin WooCommerce", category: "comert", aliases: ["woocommerce"] },
  { label: "Marketplace seller", category: "comert", aliases: ["emag", "amazon"] },
  { label: "Print on demand", category: "comert" },
  { label: "Dropshipping", category: "comert" },
  { label: "Magazin fashion online", category: "comert", aliases: ["fashion"] },
  { label: "Magazin produse handmade", category: "comert", aliases: ["handmade"] },

  // === SERVICII PROFESIONALE ===
  { label: "Cabinet avocatură", category: "servicii", aliases: ["avocat"] },
  { label: "Firmă contabilitate", category: "servicii", aliases: ["contabil"] },
  { label: "Birou notarial", category: "servicii", aliases: ["notar"] },
  { label: "Consultant business", category: "servicii", aliases: ["consultanță", "consultanta"] },
  { label: "Broker asigurări", category: "servicii", aliases: ["asigurări", "asigurari"] },
  { label: "Audit fiscal", category: "servicii", aliases: ["fiscal"] },
  { label: "Birou arhitectură", category: "servicii", aliases: ["arhitect"] },
  { label: "Birou inginerie", category: "servicii", aliases: ["inginer"] },
  { label: "Agenție traduceri", category: "servicii", aliases: ["traducător", "traducator"] },
  { label: "Coach / mentor", category: "servicii", aliases: ["coaching"] },
  { label: "Agenție marketing", category: "servicii", aliases: ["marketing"] },
  { label: "Agenție recrutare HR", category: "servicii", aliases: ["recrutare", "hr"] },
  { label: "Agenție IT / dev", category: "servicii", aliases: ["software", "programare"] },

  // === AUTO ===
  { label: "Service auto", category: "auto", aliases: ["service masini", "service mașini"] },
  { label: "Vulcanizare", category: "auto" },
  { label: "Tinichigerie / vopsitorie", category: "auto", aliases: ["tinichigerie"] },
  { label: "Spălătorie auto", category: "auto", aliases: ["spalatorie auto"] },
  { label: "Dealer auto", category: "auto", aliases: ["dealer mașini"] },
  { label: "Rent a car", category: "auto", aliases: ["rent-a-car", "închirieri auto"] },
  { label: "Școală șoferi", category: "auto", aliases: ["scoala soferi", "auto-școală"] },
  { label: "Tractări auto", category: "auto", aliases: ["tractari"] },
  { label: "ITP", category: "auto" },
  { label: "Magazin piese auto", category: "auto", aliases: ["piese auto"] },
  { label: "Service motociclete", category: "auto", aliases: ["moto"] },

  // === EDUCAȚIE ===
  { label: "After-school", category: "educatie", aliases: ["afterschool"] },
  { label: "Centru cursuri", category: "educatie", aliases: ["cursuri"] },
  { label: "Profesor meditații", category: "educatie", aliases: ["meditații", "meditatii"] },
  { label: "Grădiniță", category: "educatie", aliases: ["gradinita"] },
  { label: "Creșă", category: "educatie", aliases: ["cresa"] },
  { label: "Școală privată", category: "educatie", aliases: ["scoala privata"] },
  { label: "Academie limbi străine", category: "educatie", aliases: ["limbi străine"] },
  { label: "Centru cursuri programare", category: "educatie" },
  { label: "Studio dans / muzică", category: "educatie", aliases: ["dans", "muzica"] },
  { label: "Centru pregătire sportivă", category: "educatie", aliases: ["sport"] },

  // === ALTELE ===
  { label: "Agenție imobiliară", category: "altele", aliases: ["imobiliare", "real estate"] },
  { label: "Sală fitness", category: "altele", aliases: ["sala fitness", "gym"] },
  { label: "Personal trainer", category: "altele", aliases: ["antrenor"] },
  { label: "Pet shop / pet services", category: "altele", aliases: ["pet"] },
  { label: "Foto / video evenimente", category: "altele", aliases: ["fotograf", "videograf"] },
  { label: "Organizator evenimente", category: "altele", aliases: ["evenimente", "wedding planner"] },
  { label: "Florărie", category: "altele", aliases: ["florarie", "flori"] },
  { label: "Instalator", category: "altele", aliases: ["instalații"] },
  { label: "Electrician", category: "altele", aliases: ["instalații electrice"] },
  { label: "Construcții / firme construcții", category: "altele", aliases: ["constructor", "constructii"] },
  { label: "Curățenie / firme curățenie", category: "altele", aliases: ["curatenie"] },
  { label: "Mutare / transport", category: "altele", aliases: ["mutari"] },
  { label: "DJ / muzică evenimente", category: "altele", aliases: ["dj"] },
  { label: "Closet / croitorie", category: "altele", aliases: ["croitor", "croitorie"] },
];

/**
 * Cele 8 categorii cu întrebări specifice (pașii 2, 4, 5).
 */
export const CATEGORIES: Record<CategoryId, CategoryConfig> = {
  medical: {
    id: "medical",
    label: "Medical",
    emoji: "🏥",
    step2: {
      question: "Câți pacienți vin la tine într-o săptămână obișnuită?",
      options: ["Sub 20", "20-50", "50-100", "100-200", "Peste 200"],
    },
    step4: {
      question: "Cum te contactează cel mai des pacienții?",
      options: ["Telefon", "WhatsApp", "Formular site", "Direct la recepție", "Mix din toate"],
    },
    step5: {
      question: "Care dintre situațiile astea ți se întâmplă des?",
      options: [
        "Pierd apeluri când sunt cu pacientul",
        "Pacienți care nu se prezintă la programare (no-show)",
        "Recepționista e copleșită cu întrebări repetitive",
        "Nimeni nu răspunde după program",
        "Pacienți noi pierduți pentru că suna ocupat",
      ],
    },
  },
  horeca: {
    id: "horeca",
    label: "HoReCa",
    emoji: "🍽️",
    step2: {
      question: "Câte rezervări/comenzi gestionezi într-o săptămână?",
      options: ["Sub 50", "50-150", "150-300", "300-500", "Peste 500"],
    },
    step4: {
      question: "Cum primești cel mai des rezervările?",
      options: ["Telefon", "WhatsApp", "Site / formular", "Walk-in", "Platforme (Booking, etc.)"],
    },
    step5: {
      question: "Care dintre situațiile astea îți sună familiar?",
      options: [
        "Telefonul sună neîncetat vinerea-sâmbăta",
        "Mese rezervate și nu vine nimeni (no-show)",
        "Răspund la aceleași întrebări despre meniu de zeci de ori",
        "Pierd rezervări noaptea pentru că nu răspunde nimeni",
      ],
    },
  },
  beauty: {
    id: "beauty",
    label: "Beauty & Wellness",
    emoji: "💅",
    step2: {
      question: "Câți clienți treci pe la tine într-o săptămână?",
      options: ["Sub 20", "20-50", "50-100", "100-150", "Peste 150"],
    },
    step4: {
      question: "Cum își fac clienții programările?",
      options: ["Telefon", "WhatsApp", "DM Instagram", "Site / formular", "Aplicație programări"],
    },
    step5: {
      question: "Care dintre situațiile astea ți se întâmplă des?",
      options: [
        "Sun manual fiecare client să confirm",
        "Slot rămas gol și nu apuc să anunț pe nimeni",
        "Clienți inactivi de luni de zile pe care nu i-am mai contactat",
        "Pierd apeluri pentru că am mâinile ocupate",
      ],
    },
  },
  comert: {
    id: "comert",
    label: "Comerț Digital",
    emoji: "🛒",
    step2: {
      question: "Câte comenzi procesezi într-o săptămână?",
      options: ["Sub 30", "30-100", "100-300", "300-700", "Peste 700"],
    },
    step4: {
      question: "Pe ce canal primești cele mai multe întrebări de la clienți?",
      options: ["Email", "WhatsApp", "Chat pe site", "DM social media", "Telefon"],
    },
    step5: {
      question: "Care dintre situațiile astea îți sună familiar?",
      options: [
        "Coșuri abandonate fără urmărire",
        "Răspund la aceleași întrebări de sute de ori (livrare, retur, mărimi)",
        "Chat-ul rămâne fără răspuns când nu sunt online",
        "Retururile mă consumă mult timp manual",
      ],
    },
  },
  servicii: {
    id: "servicii",
    label: "Servicii Profesionale",
    emoji: "💼",
    step2: {
      question: "Cu câți clienți activi lucrezi într-o lună?",
      options: ["Sub 10", "10-30", "30-70", "70-150", "Peste 150"],
    },
    step4: {
      question: "Cum te contactează cel mai des clienții?",
      options: ["Email", "Telefon", "WhatsApp", "Întâlniri programate", "Recomandări"],
    },
    step5: {
      question: "Care dintre situațiile astea îți sună familiar?",
      options: [
        "Pierd ore cu întrebări de bază pe care le-am explicat de 100 de ori",
        "Clienți care nu trimit documentele la timp",
        "Nu îmi permit secretară dar am nevoie de una",
        "Programări haotice, dublate sau uitate",
      ],
    },
  },
  auto: {
    id: "auto",
    label: "Auto",
    emoji: "🚗",
    step2: {
      question: "Câți clienți treci prin service într-o săptămână?",
      options: ["Sub 15", "15-40", "40-80", "80-150", "Peste 150"],
    },
    step4: {
      question: "Cum te contactează cel mai des clienții?",
      options: ["Telefon", "WhatsApp", "Walk-in", "Site / formular", "Recomandări"],
    },
    step5: {
      question: "Care dintre situațiile astea îți sună familiar?",
      options: [
        "Sunt sub mașină când sună telefonul",
        'Telefoane zilnice cu "e gata mașina?"',
        "Lead pierdut pentru că n-am răspuns în prima oră",
        "Clienți care uită ITP, RCA, revizii — îi pierd la concurență",
      ],
    },
  },
  educatie: {
    id: "educatie",
    label: "Educație",
    emoji: "📚",
    step2: {
      question: "Câți elevi/cursanți gestionezi în prezent?",
      options: ["Sub 20", "20-50", "50-100", "100-200", "Peste 200"],
    },
    step4: {
      question: "Cum te contactează părinții cel mai des?",
      options: ["Telefon", "WhatsApp", "Email", "Site / formular", "Direct la sediu"],
    },
    step5: {
      question: "Care dintre situațiile astea îți sună familiar?",
      options: [
        "Sunt copleșit complet în perioada înscrierilor",
        "Lead-uri care întreabă de preț și nu mai răspund",
        "Mi-e stânjenitor să cer banii / să dau follow-up părinților",
        "Pierd copii la alte centre pentru că nu răspund destul de repede",
      ],
    },
  },
  altele: {
    id: "altele",
    label: "Altele",
    emoji: "✨",
    step2: {
      question: "Câți clienți / lead-uri ai într-o săptămână?",
      options: ["Sub 10", "10-30", "30-70", "70-150", "Peste 150"],
    },
    step4: {
      question: "Cum te contactează cel mai des clienții?",
      options: ["Telefon", "WhatsApp", "Email", "Site / formular", "Direct"],
    },
    step5: {
      question: "Care dintre situațiile astea îți sună familiar?",
      options: [
        "Nu prinde nimeni telefonul când sună clienți noi",
        "Trimit deviz / ofertă și nu mai urmăresc niciodată",
        "Programările și confirmările le fac manual",
        "Nu am un sistem clar de contact, totul e haotic",
      ],
    },
  },
};

/**
 * Caută în lista mare după textul scris de user.
 * Returnează matches sortate (label match înaintea alias match).
 */
export function searchBusinessTypes(query: string, limit = 8): BusinessType[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];

  const labelMatches: BusinessType[] = [];
  const aliasMatches: BusinessType[] = [];

  for (const bt of BUSINESS_TYPES) {
    if (bt.label.toLowerCase().includes(q)) {
      labelMatches.push(bt);
    } else if (bt.aliases?.some((a) => a.toLowerCase().includes(q))) {
      aliasMatches.push(bt);
    }
  }

  return [...labelMatches, ...aliasMatches].slice(0, limit);
}

/**
 * Găsește categoria pentru un text liber.
 * Dacă matchează exact un business type → returnează categoria mapată.
 * Altfel → "altele" (Make va revalida server-side).
 */
export function findCategoryForText(text: string): CategoryId {
  const q = text.toLowerCase().trim();
  if (!q) return "altele";

  // Exact label match
  const exact = BUSINESS_TYPES.find((bt) => bt.label.toLowerCase() === q);
  if (exact) return exact.category;

  // Alias exact match
  const aliasExact = BUSINESS_TYPES.find((bt) =>
    bt.aliases?.some((a) => a.toLowerCase() === q)
  );
  if (aliasExact) return aliasExact.category;

  // Partial match (label sau alias conține textul)
  const partial = BUSINESS_TYPES.find(
    (bt) =>
      bt.label.toLowerCase().includes(q) ||
      bt.aliases?.some((a) => a.toLowerCase().includes(q))
  );
  if (partial) return partial.category;

  return "altele";
}

export function getCategory(id: CategoryId): CategoryConfig {
  return CATEGORIES[id];
}

export const EMPLOYEE_OPTIONS = [
  "Doar eu (0)",
  "1-2 angajați",
  "3-5 angajați",
  "Peste 5 angajați",
];
