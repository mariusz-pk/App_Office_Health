import { Activity, Droplet, Moon, Sun, Hexagon, Zap, Shield, Wind } from 'lucide-react';

export const HABITS_LIST = [
  "Poranny Izotonik",
  "Kawa po 90 minutach",
  "Mikro-przerwa (Ruch co 60 min)",
  "Wieczorny Magnez",
  "Dzienny limit kroków"
];

export const SHOPPING_BASE = [
  "Kasza jaglana i gryczana",
  "Jajka (klasa 0 lub 1)",
  "Olej lniany z lodówki",
  "Dzikie ryby (śledź/łosoś)",
  "Glicynian magnezu",
  "Witamina D3 + K2 MK7"
];

export const SHOPPING_WEEKLY = [
  "Domowe kiszonki / Zakwas",
  "Świeży imbir i kurkuma",
  "Dzika borówka",
  "Pyłek pszczeli / Rokitnik",
  "Mleko roślinne"
];

export const DRINKS_CATALOG = [
  { id: 1, title: "Poranny Izotonik", effect: "Nawodnienie na start", when: "07:00 po wstaniu", ingredients: "300ml ciepłej wody, sól kłodawska, ocet jabłkowy", icon: Droplet },
  { id: 2, title: "Zielona Matcha Latte", effect: "Skupienie 3-4 h", when: "09:00 start pracy", ingredients: "matcha, woda max 80°C, mleko roślinne", timer: 120, icon: Activity, color: "text-emerald-500", bg: "bg-emerald-500/10" },
  { id: 3, title: "Złoty Eliksir Imbirowy", effect: "Przeciwzapalny", when: "11:00/14:00", ingredients: "świeży imbir, cytryna, ciepła woda, miód", timer: 300, icon: Sun, color: "text-amber-500", bg: "bg-amber-500/10" },
  { id: 4, title: "Szot z Zakwasu Buraka", effect: "Wsparcie mikrobiomu", when: "Do obiadu", ingredients: "100ml zakwasu z buraka", icon: Hexagon, color: "text-rose-500", bg: "bg-rose-500/10" },
  { id: 5, title: "Złote Mleko Kardamonowe", effect: "Sen i relaks", when: "20:00", ingredients: "mleko roślinne, kurkuma, cynamon, kardamon, olej kokosowy", timer: 300, icon: Moon, color: "text-amber-400", bg: "bg-amber-400/10" },
  { id: 6, title: "Lemoniada Magnezowa", effect: "Głęboka faza REM", when: "21:00 przed snem", ingredients: "woda, cytryna, magnez", icon: Moon, color: "text-blue-400", bg: "bg-blue-400/10" },
  { id: 7, title: "Matcha-Mate Turbo", effect: "Maksymalna energia na deadline/kryzys", when: "Kiedy potrzebujesz", ingredients: "matcha, yerba mate", timer: 180, icon: Zap, color: "text-emerald-400", bg: "bg-emerald-400/10" },
  { id: 8, title: "Eliksir z Pyłku Pszczelego", effect: "Bomba witaminowa", when: "Poranek/wieczór", ingredients: "pyłek pszczeli, woda, miód", icon: Shield, color: "text-yellow-500", bg: "bg-yellow-500/10" },
  { id: 9, title: "Kakao Adaptogenne", effect: "Redukcja stresu", when: "Popołudnie", ingredients: "surowe kakao, adaptogeny, napój roślinny", icon: Wind, color: "text-orange-400", bg: "bg-orange-400/10" },
  { id: 10, title: "Woda Chia Fresca", effect: "Przedłużone nawodnienie", when: "Cały dzień", ingredients: "nasiona chia, woda, cytryna", icon: Droplet, color: "text-blue-500", bg: "bg-blue-500/10" }
];
