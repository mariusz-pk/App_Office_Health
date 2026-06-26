import { Activity, Droplet, Moon, Sun, Hexagon, Zap, Shield, Wind, Wheat, ShieldPlus, Pill, FlaskConical, Coffee, Leaf, Sprout, Sparkles, Bean, Flower2, Brain, Egg, TestTube, Target, Grape, Citrus, Fish, Carrot, Milk, Beaker, Flame, ThermometerSun, CupSoda, Waves, Cherry, Nut, Vegan } from 'lucide-react';

export const HABITS_LIST = [
  "Poranny Izotonik",
  "Kawa po 90 minutach",
  "Mikro-przerwa (Ruch co 60 min)",
  "Wieczorny Magnez",
  "Dzienny limit kroków"
];

export const SHOPPING_BASE = [
  { name: "Kasza jaglana i gryczana niepalona", category: "Sypkie i Nasiona", icon: Wheat },
  { name: "Komosa ryżowa (quinoa)", category: "Sypkie i Nasiona", icon: Wheat },
  { name: "Nasiona: Siemię lniane i Chia", category: "Sypkie i Nasiona", icon: Sprout },
  { name: "Pestki dyni i Słonecznik", category: "Sypkie i Nasiona", icon: Sprout },
  { name: "Orzechy włoskie, Migdały, Brazylijskie", category: "Sypkie i Nasiona", icon: Bean },
  { name: "Surowe Kakao / Kakao ceremonialne", category: "Sypkie i Nasiona", icon: Bean },
  
  { name: "Oliwa z oliwek extra virgin", category: "Płyny i Dodatki", icon: Droplet },
  { name: "Olej lniany (tłoczony na zimno)", category: "Płyny i Dodatki", icon: Droplet },
  { name: "Olej kokosowy", category: "Płyny i Dodatki", icon: Droplet },
  { name: "Ocet jabłkowy mętny (BIO)", category: "Płyny i Dodatki", icon: FlaskConical },

  { name: "Zioła: Szałwia, Melisa", category: "Zioła", icon: Flower2 },
  { name: "Szyszki chmielu", category: "Zioła", icon: Flower2 },
  { name: "Krwawnik pospolity", category: "Zioła", icon: Flower2 },

  { name: "Sól kłodawska (niejodowana)", category: "Przyprawy i Dodatki", icon: Sparkles },
  { name: "Przyprawy: Kurkuma, Cynamon, Kardamon", category: "Przyprawy i Dodatki", icon: Sparkles },
  { name: "Pieprz cayenne / czarny pieprz", category: "Przyprawy i Dodatki", icon: Sparkles },
  { name: "Suszony imbir", category: "Przyprawy i Dodatki", icon: Flame },

  { name: "Pyłek pszczeli (wsparcie odporności)", category: "Produkty Pszczele", icon: Sparkles },
  { name: "Miód spadziowy lub lipowy (wsparcie odporności)", category: "Produkty Pszczele", icon: Droplet },

  { name: "Witamina D3 + K2 MK7", category: "Suplementy", icon: ShieldPlus },
  { name: "Magnez (jabłczan lub diglicynian)", category: "Suplementy", icon: Pill },
  { name: "Omega-3 (suplement)", category: "Suplementy", icon: Pill },
  { name: "Kreatyna (wsparcie funkcji poznawczych)", category: "Suplementy", icon: Brain },
  { name: "Adaptogeny (np. Ashwagandha)", category: "Suplementy", icon: TestTube },
  { name: "Kurkumina z piperyną", category: "Suplementy", icon: ShieldPlus },

  { name: "Zielona Matcha (stabilne skupienie)", category: "Napoje", icon: Leaf },
  { name: "Kawa w ziarnach jakościowa (szybka energia)", category: "Napoje", icon: Coffee },
  
  { name: "Rokitnik (wsparcie odporności)", category: "Owoce i Warzywa", icon: Grape }
];

export const SHOPPING_WEEKLY = [
  { name: "Warzywa: Brokuły, Kalafior, Kapusta", category: "Owoce i Warzywa", icon: Carrot },
  { name: "Korzeniowe: Buraki, Marchew, Seler, Pietruszka", category: "Owoce i Warzywa", icon: Carrot },
  { name: "Zielone: Szpinak, Jarmuż, Rukola", category: "Owoce i Warzywa", icon: Leaf },
  { name: "Czosnek i Cebula", category: "Owoce i Warzywa", icon: Flame },
  { name: "Świeży imbir", category: "Owoce i Warzywa", icon: Zap },
  { name: "Świeża kurkuma", category: "Owoce i Warzywa", icon: Sparkles },
  { name: "Dzika borówka (może być mrożona)", category: "Owoce i Warzywa", icon: Cherry },
  { name: "Cytryny", category: "Owoce i Warzywa", icon: Citrus },
  { name: "Awokado", category: "Owoce i Warzywa", icon: Vegan },

  { name: "Domowe kiszonki / Zakwas z buraka", category: "Przetwory", icon: TestTube },

  { name: "Jajka (klasa 0 lub 1 - fundament białkowy)", category: "Nabiał i Jaja", icon: Egg },
  { name: "Mleko A2 / Mleko roślinne bez dodatków", category: "Nabiał i Jaja", icon: Milk },
  
  { name: "Dzikie ryby (śledź / dziki łosoś - Omega-3)", category: "Mięso i Ryby", icon: Fish }
];

export const DRINKS_CATALOG = [
  // CATEGORY 1: PORANEK (Aktywacja i Skupienie)
  { id: 1, title: "Poranny Izotonik", effect: "Nawodnienie na start", when: "07:00 po wstaniu", ingredients: "300ml ciepłej wody, sól kłodawska, ocet jabłkowy, 🔥 TWÓJ ADAPTOGEN: Pół łyżeczki Różeńca Górskiego (Rhodiola) dla zwiększenia odporności na stres już od pierwszych minut poranka.", instructions: "Do szklanki wlej 300ml ciepłej wody, dodaj szczyptę soli kłodawskiej i łyżkę octu jabłkowego. Dokładnie wymieszaj i pij na czczo.", icon: Waves, category: "PORANEK" },
  { id: 2, title: "Zielona Matcha Latte", effect: "Skupienie 3-4 h", when: "09:00 start pracy", ingredients: "matcha, woda max 80°C, mleko roślinne (mleko A2 Bio), 🔥 TWÓJ ADAPTOGEN (wybierz 1 lub połącz): * Opcja A (Skupienie i usuwanie mgły mózgowej): 1 płaska łyżeczka Soplówki jeżowatej (Lion's Mane). Opcja B (Stresujący deadline): Pół łyżeczki Różeńca Górskiego (Rhodiola).", instructions: "Wsyp łyżeczkę matchy do miseczki. Dolej niewielką ilość wody (max 80°C) i dynamicznie wymieszaj miotełką (chasen) lub spieniaczem. Podgrzej mleko, opcjonalnie spień je, i zalej przygotowaną matchę.", timer: 120, icon: Leaf, color: "text-emerald-500", bg: "bg-emerald-500/10", category: "PORANEK" },
  { id: 11, title: "Rytuał Kawowy \"High Performance\"", effect: "Maksymalne skupienie i stabilna energia", when: "10:00", ingredients: "Dobra kawa z ekspresu lub drippera (np. V60), Opcjonalnie: odrobina masła klarowanego lub oleju kokosowego dla stabilnej energii, Szczypta kardamonu (łagodzi kwasowość żołądka), 🔥 TWÓJ ADAPTOGEN (Możesz połączyć oba!): Pół łyżeczki Soplówki jeżowatej (Lion's Mane), Pół łyżeczki Cordycepsu (jeśli po pracy planujesz aktywność fizyczną lub spacer NEAT).", instructions: "Zaparz filiżankę gorącej czarnej kawy i przelej ją do blendera lub wysokiego naczynia. Dodaj łyżeczkę masła klarowanego (lub oleju kokosowego), szczyptę kardamonu oraz pół łyżeczki wybranego adaptogenu (Soplówka jeżowata lub Cordyceps). Całość dokładnie zmiksuj blenderem lub ręcznym spieniaczem do uzyskania gładkiej emulsji z jasną pianką i wypij minimum 90-120 minut po przebudzeniu (nigdy na czczo).", icon: Coffee, color: "text-amber-800", bg: "bg-amber-800/10", category: "PORANEK" },
  
  // CATEGORY 2: W TRAKCIE DNIA (Energia i Trawienie)
  { id: 3, title: "Złoty Eliksir Imbirowy", effect: "Przeciwzapalny", when: "11:00/14:00", ingredients: "świeży imbir, cytryna, ciepła woda, miód", instructions: "Świeży imbir pokrój w plasterki. Zalej wrzątkiem i odstaw na 5-10 minut. Kiedy napar przestygnie do temperatury ok. 40°C, dodaj sok z cytryny i miód. Wymieszaj.", timer: 300, icon: Flame, color: "text-amber-500", bg: "bg-amber-500/10", category: "W TRAKCIE DNIA" },
  { id: 4, title: "Szot z Zakwasu Buraka", effect: "Wsparcie mikrobiomu", when: "Do obiadu", ingredients: "100ml zakwasu z buraka", instructions: "Nalej 100ml dobrej jakości zakwasu z buraka. Wypij na surowo – zakwasu nie należy podgrzewać, aby nie utracić jego właściwości probiotycznych.", icon: FlaskConical, color: "text-rose-500", bg: "bg-rose-500/10", category: "W TRAKCIE DNIA" },
  { id: 5, title: "Matcha-Mate Turbo", effect: "Maksymalna energia na deadline/kryzys", when: "Kiedy potrzebujesz", ingredients: "matcha, yerba mate, Ciepła woda (ok. 75-80 C)", instructions: "Przygotuj mocny napar z yerba mate (zalej susz wodą ok. 75-80°C). W osobnym naczyniu rozrób matchę z odrobiną wody i wlej do mate. Możesz pić przez bombillę.", timer: 180, icon: Zap, color: "text-emerald-400", bg: "bg-emerald-400/10", category: "W TRAKCIE DNIA" },
  { id: 6, title: "Kakao Adaptogenne", effect: "Redukcja stresu", when: "Popołudnie", ingredients: "surowe kakao, adaptogeny, napój roślinny (mleko A2 Bio), 🔥 TWÓJ ADAPTOGEN (Synergia relaksu - połącz je): Pół łyżeczki Macy (nadaje obłędny lekko karmelowy smak i stabilizuje nastrój), Pół łyżeczki grzybów Reishi (dla opanowania stresu z całego dnia pracy).", instructions: "W rondelku lekko podgrzej napój roślinny. Dodaj płaską łyżkę surowego kakao i porcję adaptogenów (np. Ashwagandha). Rozmieszaj dokładnie spieniaczem.", icon: CupSoda, color: "text-orange-400", bg: "bg-orange-400/10", category: "W TRAKCIE DNIA" },
  
  // CATEGORY 3: WIECZÓR (Wyciszenie i Sen)
  { id: 7, title: "Złote Mleko Kardamonowe", effect: "Sen i relaks", when: "20:00", ingredients: "mleko roślinne (mleko A2 Bio), kurkuma, cynamon, kardamon, olej kokosowy, 🔥 TWÓJ ADAPTOGEN: * 1 płaska łyżeczka Ashwagandhy. To potężny reduktor kortyzolu, który w połączeniu z ciepłym mlekiem i kurkumą działa jak biologiczny wyłącznik stresu", instructions: "W rondelku połącz mleko z kurkumą, cynamonem, kardamonem i opcjonalnie odrobiną oleju kokosowego. Podgrzewaj na małym ogniu przez ok. 5 minut, mieszając i nie doprowadzając do wrzenia.", timer: 300, icon: Beaker, color: "text-amber-400", bg: "bg-amber-400/10", category: "WIECZÓR" },
  { id: 8, title: "Lemoniada Magnezowa", effect: "Głęboka faza REM", when: "21:00 przed snem", ingredients: "woda, cytryna, magnez", instructions: "Rozpuść swoją porcję magnezu (np. w proszku) w niewielkiej ilości ciepłej wody. Dolej resztę chłodnej wody do pełnej szklanki. Wyciśnij sok z cytryny i wymieszaj.", icon: Moon, color: "text-blue-400", bg: "bg-blue-400/10", category: "WIECZÓR" },
  
  // CATEGORY 4: DOWOLNA PORA (Wsparcie Całodobowe)
  { id: 9, title: "Eliksir z Pyłku Pszczelego", effect: "Bomba witaminowa", when: "Poranek/wieczór", ingredients: "pyłek pszczeli, woda, miód", instructions: "Wieczorem wsyp łyżkę pyłku pszczelego do pół szklanki letniej wody. Rano, po przebudzeniu, dolej odrobinę miodu, zamieszaj i od razu wypij. Moczenie zwiększa przyswajalność pyłku.", icon: Shield, color: "text-yellow-500", bg: "bg-yellow-500/10", category: "DOWOLNA PORA" },
  { id: 10, title: "Woda Chia Fresca", effect: "Przedłużone nawodnienie", when: "Cały dzień", ingredients: "nasiona chia, woda, cytryna", instructions: "Do przefiltrowanej wody wrzuć 1-2 łyżki nasion chia. Wymieszaj intensywnie i odstaw na 10-15 minut. Kiedy powstanie żel, dodaj sok ze świeżej cytryny. Możesz wrzucić kostki lodu.", icon: Droplet, color: "text-blue-500", bg: "bg-blue-500/10", category: "DOWOLNA PORA" }
];
