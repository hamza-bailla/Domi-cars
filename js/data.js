/* ============================================================
   Laghrad Cars — Données du parc automobile
   Tarifs : prix/jour de base · semaine = jour×6 · mois = jour×20
   ============================================================ */

const VILLE = 'Laayoune';

const FLEET = [
  {
    id: 'logan',
    name: 'Dacia Logan',
    year: 2023,
    cat: 'eco',
    catLabel: 'Berline économique',
    tagline: "La référence qui ne déçoit jamais.",
    desc: "Sobre, fiable et incroyablement économe, la Logan est le choix malin pour la ville comme pour la route. Coffre généreux, climatisation et conduite douce : tout l'essentiel, sans superflu.",
    day: 240,
    trans: 'Manuelle', fuel: 'Diesel', seats: 5, doors: 4, bags: 2, ac: true,
    img: ['Dacia Logan 2023.png', 'dacia logan blanche.jpg', 'dacia logan noir.webp'],
    featured: true
  },
  {
    id: 'sandero',
    name: 'Dacia Sandero',
    year: 2023,
    cat: 'citadine',
    catLabel: 'Citadine',
    tagline: "Petite par la taille, grande par le caractère.",
    desc: "Maniable, agile et parfaite pour se faufiler dans Laayoune et ses environs. La Sandero combine consommation minimale et habitabilité étonnante pour une citadine.",
    day: 360,
    trans: 'Manuelle', fuel: 'Essence', seats: 5, doors: 4, bags: 2, ac: true,
    img: ['dacia sandero blanche.jpg', 'dacia sandero noir.jpg', 'dacia sandero 3eme generation.jpg']
  },
  {
    id: 'stepway',
    name: 'Dacia Sandero Stepway',
    year: 2023,
    cat: 'citadine',
    catLabel: 'Crossover urbain',
    tagline: "L'esprit aventure, version citadine.",
    desc: "Garde au sol surélevée, look baroudeur et confort de citadine. La Stepway encaisse les routes irrégulières sans broncher tout en restant économique.",
    day: 230,
    trans: 'Manuelle', fuel: 'Essence', seats: 5, doors: 4, bags: 3, ac: true,
    img: ['dacia sandero stepway game complette.png', 'dacia sandero stepway.jpg']
  },
  {
    id: 'duster',
    name: 'Dacia Duster',
    year: 2024,
    cat: 'suv',
    catLabel: 'SUV',
    tagline: "Le SUV qui ne recule devant rien.",
    desc: "Robuste, spacieux et étonnamment polyvalent, le Duster est taillé pour la ville, la plage et la montagne. Boîte automatique douce et position de conduite dominante.",
    day: 350,
    trans: 'Automatique', fuel: 'Diesel', seats: 5, doors: 5, bags: 4, ac: true,
    img: ['dacia duster automatique.jpg', 'new dacia duster hybris.jpg', 'dacia duster accessible.jpg'],
    featured: true
  },
  {
    id: 'megane',
    name: 'Renault Mégane',
    year: 2023,
    cat: 'berline',
    catLabel: 'Berline',
    tagline: "Le confort à la française.",
    desc: "Lignes élégantes, intérieur soigné et tenue de route rassurante. La Mégane automatique avale les kilomètres dans un silence feutré.",
    day: 320,
    trans: 'Automatique', fuel: 'Diesel', seats: 5, doors: 5, bags: 3, ac: true,
    img: ['renault megane.jpg']
  },
  {
    id: 'c3',
    name: 'Citroën C3',
    year: 2023,
    cat: 'citadine',
    catLabel: 'Citadine',
    tagline: "Pétillante, douillette, attachante.",
    desc: "Avec ses suspensions à butées hydrauliques, la C3 offre un confort de tapis volant. Idéale pour les trajets quotidiens en toute sérénité.",
    day: 220,
    trans: 'Manuelle', fuel: 'Essence', seats: 5, doors: 4, bags: 2, ac: true,
    img: ['citroen c3.jpg', 'citroen c3 elle.jpg']
  },
  {
    id: 'c4',
    name: 'Citroën C4',
    year: 2023,
    cat: 'berline',
    catLabel: 'Compacte',
    tagline: "Le design qui se remarque.",
    desc: "Silhouette de coupé surélevé, intérieur high-tech et confort signé Citroën. La C4 automatique apporte une touche d'audace à chaque trajet.",
    day: 290,
    trans: 'Automatique', fuel: 'Diesel', seats: 5, doors: 5, bags: 3, ac: true,
    img: ['citroen c4.jpg', 'citrooen.jpg']
  },
  {
    id: 'accent',
    name: 'Hyundai Accent',
    year: 2023,
    cat: 'berline',
    catLabel: 'Berline automatique',
    tagline: "Spacieuse, fluide, sans effort.",
    desc: "Boîte automatique souple, grand coffre et habitacle aéré. L'Accent est la berline idéale pour les longues distances en toute décontraction.",
    day: 260,
    trans: 'Automatique', fuel: 'Essence', seats: 5, doors: 4, bags: 3, ac: true,
    img: ['hundai accent automa.jpg']
  },
  {
    id: 'creta',
    name: 'Hyundai Creta',
    year: 2024,
    cat: 'suv',
    catLabel: 'SUV nouvelle génération',
    tagline: "Le SUV qui voit grand.",
    desc: "Design affirmé, technologie embarquée et habitabilité record. Le Creta marie prestance et praticité pour les familles exigeantes.",
    day: 420,
    trans: 'Automatique', fuel: 'Diesel', seats: 5, doors: 5, bags: 4, ac: true,
    img: ['humdai creta automatique.jpg'],
    featured: true
  },
  {
    id: 'a3',
    name: 'Audi A3 Sportback',
    year: 2025,
    cat: 'luxe',
    catLabel: 'Premium — 40 TFSI',
    tagline: "L'élégance sportive, sans compromis.",
    desc: "Châssis affûté, finition germanique et virtual cockpit. La A3 Sportback 40 TFSI offre une expérience premium dès la première seconde au volant.",
    day: 650,
    trans: 'Automatique', fuel: 'Essence', seats: 5, doors: 5, bags: 3, ac: true,
    img: ['Audi A3 Sportback 40 TFSI.webp', 'voiture de luxe 2025 Audi A3.webp', 'voiture de luxe 2025 Audi A3 blanche.jpg'],
    lux: true, featured: true
  },
  {
    id: 'a4',
    name: 'Audi A4',
    year: 2025,
    cat: 'luxe',
    catLabel: 'Berline de luxe',
    tagline: "La berline d'exception.",
    desc: "Le raffinement à l'état pur : intérieur cuir, conduite veloutée et présence indéniable. L'A4 transforme chaque déplacement en moment d'exception.",
    day: 750,
    trans: 'Automatique', fuel: 'Diesel', seats: 5, doors: 4, bags: 4, ac: true,
    img: ['voiture de luxe 2025 Audi A4.webp', 'voiture de luxe Audi A4 in San Antonio.jpg', 'voiture de luxe Audi A4 in San Antonio green.webp'],
    lux: true
  },
  {
    id: 'jeep',
    name: 'Jeep Compass Altitude',
    year: 2024,
    cat: 'luxe',
    catLabel: 'SUV Premium',
    tagline: "La robustesse, version chic.",
    desc: "Le caractère iconique Jeep allié à une finition Altitude raffinée. Un SUV qui impose le respect sur le bitume comme sur les pistes.",
    day: 600,
    trans: 'Automatique', fuel: 'Diesel', seats: 5, doors: 5, bags: 4, ac: true,
    img: ['jeep-altitude-my24-graphite-grey-br.png'],
    lux: true
  }
];

/* Paliers tarifaires : jour / semaine (×6) / mois (×20) */
function tiers(day) {
  return { jour: day, semaine: day * 6, mois: day * 20 };
}

/* Équipements affichés sur la fiche détail */
function equipements(c) {
  return [
    'Climatisation',
    'Direction assistée',
    c.trans === 'Automatique' ? 'Boîte automatique' : 'Boîte manuelle',
    'Bluetooth',
    c.bags >= 4 ? 'Grand coffre' : 'Coffre spacieux',
    c.lux ? 'Finition premium' : 'Économique'
  ];
}

const img = (file) => 'images/' + encodeURIComponent(file);
const fmtN = (n) => n.toLocaleString('fr-FR');

