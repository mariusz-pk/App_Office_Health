# Office Health V2.0 - Dokumentacja Techniczna

## Stos Technologiczny (Tech Stack)
- **Framework:** React 19 (architektura sfokusowana na strict state z zastosowaniem hooków).
- **Język:** TypeScript (zawiera silnie typowane interfejsy zdefiniowane w `types.ts`).
- **Stylizacja:** Tailwind CSS v4 (podejście utility-first, projekt mocno osadzony w stylistyce ciemnego trybu z paletą "slate", akcentami "emerald" oraz "rose").
- **Backend / Chmura:** Firebase (Authentication do autoryzacji Google, Firestore do zabezpieczania logów statystyk i rutyny).
- **Zarządzanie stanem (Hooki):** Niestandardowe hooki łączące bazę chmurową z warstwą wizualną (m.in. `useFirebaseRoutine`, `useFirebaseCollection`).
- **Ikony i Zasoby graficzne:** Lucide React oraz zoptymalizowane pod tryb ciemny maskowalne ikony PWA (`Icon-App_Health_Office.png` w kolorystyce ciemnego granatu/slate dostosowanej do głównego motywu tła).
- **Dynamiczna generacja zasobów PWA:** Automatyczne tworzenie precyzyjnie wyskalowanych ikon (`icon-192.png`, `icon-512.png`) i zrzutów ekranu (`screenshot-wide.png`, `screenshot-narrow.png`) poprzez bibliotekę `sharp` w etapie `prebuild` gwarantuje bezbłędną walidację i możliwość pakowania PWA w PWA Builderze do publikacji w natywnych sklepach App Store i Google Play.
- **PWA (Progressive Web App):** Zaawansowana integracja Vite PWA Plugin, pozwalająca na łatwą instalację aplikacji na ekranie głównym urządzeń mobilnych oraz integrację z systemami Desktop (Windows, Android). Aplikacja osiągnęła najwyższe noty zgodności dzięki obsłudze m.in.:
  - **Manifest (Web Manifest):** Kompletna deklaracja zawierająca `name`, `short_name`, kategoryzację (`categories: ['health', 'productivity']`), definicje językowe (`lang`, `dir`), wsparcie dedykowanych maskowalnych ikon PWA (`purpose: "maskable any"`), oraz zrzutów ekranu (`screenshots` form factor: `wide` & `narrow`).
  - **App Capabilities:** Zaimplementowano wsparcie dla nowoczesnych możliwości OS: `display_override` (`window-controls-overlay`, `tabbed`), `shortcuts` (Jumplists Windows/Android), `edge_side_panel` (uruchamianie w pasku bocznym Edge), `widgets` (adaptacyjne widżety systemowe), `share_target`, `file_handlers`, `protocol_handlers` (np. `web+officehealth://`), a także `note_taking`.
  - **Service Worker:** Domyślny tryb autoUpdate w Vite PWA z wstrzykiwanym niestandardowym skryptem `sw-custom.js` zapewniającym nasłuchiwanie na zdarzenia Background Sync, Periodic Sync oraz Push Notifications (`push`, `sync`, `periodicsync`). Zarejestrowany globalnie w `main.tsx`.
- **Budowa:** Vite.

## Architektura Danych / Model Pamięci
Aplikacja przeszła wielofazową migrację. Oryginalnie zaprojektowana przy użyciu `localStorage`, system korzysta obecnie z chmury Firebase do ciągłej synchronizacji postępów dla zalogowanych autoryzacją Google użytkowników.

**Klucze Pamięci (Główne Kolekcje Firestore):**
1. `corp_dailyRoutineHistory` (Obiekt Mapujący Daty na Obiekty Danych) - Rejestry nawyków i wskaźników per wybrany dzień. Znacznik datowy jako KLUCZ o formacie `YYYY-MM-DD`.
2. `corp_vitalSupplies` (Array String) - Lista ciągów znaków (identyfikatorów) asortymentów zaznaczonych w panelu Spiżarni.
3. `corp_healthLogs` (Array of Objects) - Serializowana macierz logów z badaniami i wyliczonymi symptomami diagnostycznymi (Saturacja, Tętno Spoczynkowe).
4. `corp_hydrationLogs_v2` (Array of Objects) - Wykaz spożytych ilości płynów ustrukturyzowany względem godzin dodania.
5. `corp_hydrationTarget` (Integer) - Cel dla wyliczeń % nawodnienia dobowego (domyślnie: 2000ml).

## Wybrane Moduły i Logika Biznesowa:
- `/src/App.tsx` - "Shell" układu strony. Odpowiada za główny szkielet Mobile-App UI, Header oraz powitalny Splash Screen z animacją wygasającą (zintegrowaną ze zaktualizowanym logotypem `Icon-App_Health_Office.png`). Obsługuje stan aktywności `activeTab`. Nawigacja podzielona na moduły z precyzyjnym nazewnictwem w Toolbarze.
- `/src/components/Reports.tsx` - Moduł statystyk z zaimplementowaną logiką wykresu słupkowego dla witalności (wraz z bezpośrodnio widocznymi na osi Y nad słupkami wynikami w %, uwzględniającymi powiększony margines i wysokość kontenera zapobiegające ucinaniu się tekstu wyższych wartości). Generuje ustrukturyzowaną historycznie oś czasu ograniczoną do ostatnich 7 dni, z automatycznym pozycjonowaniem scrolla na najświeższym odczycie.
- `/src/hooks/useFirebaseRoutine.ts` i integracje - Zaawansowane hooki spinające warstwę klienta bezpośrednio z kolekcjami Firestore. Całkowicie zarządza autoryzacją i subskrypcją po migracji z LocalStorage.
- `/src/firebase.ts` - Główny plik konfiguracyjny Firebase. Wprowadzono w nim zaawansowaną obsługę wyjątków logowania (przechwytywanie błędu `auth/unauthorized-domain`), dzięki czemu w przypadku wdrożenia na zewnętrzny hosting (np. Vercel) użytkownik otrzymuje czytelną instrukcję dodania domeny w konsoli Firebase, co zapobiega pojawianiu się białego ekranu po odrzuceniu autoryzacji przez Google.
- `/src/components/CloudAlerts.tsx` - Przeprojektowany panel autoryzacji w chmurze Google, z wbudowanym renderowaniem awatara profilu użtkownika oraz notyfikacją powiadamiającą o zabezpieczaniu danych ze wsparciem interfejsu wizualnego synchronizacji.
- `/src/components/DailyRoutine.tsx` - Interaktywny kalendarz postepów wspierający dodawanie ilości zaliczonych kroków. Wbudowano tutaj zabezpieczającą blokadę przechodzenia do przodu i w tył za ramy dostępnych wpisów.
- `/src/data.ts` - Konfiguracja bazy z danymi, w tym słownika (tzw. enumeratorów) dotyczących polecanych produktów zakupu i napojów – wzorowana na dokumentacji merytorycznej zdrowia w trybie siedzącym. Zawiera metadane dla stoperów parzenia (`timer` values), zrestrukturyzowane przepisy rozdzielające właściwości adaptogenne (`adaptogen`, `adaptogenOptions`) od głównego strumienia składników oraz zsynchronizowaną z wariantem IT Health bazę produktową (rozdzielone nazewnictwo orzechów i ziół, nowe pozycje z kategorii suplementów).
- `/src/components/ControlCenter.tsx` & `/src/components/WellnessCafe.tsx` - Moduły wykorzystujące wewnętrzny system "In-App Alerts". Zastąpiono powiadomienia natywne przeglądarki nowoczesnym zarządzaniem stanu powiadomień. W module Kafejki wprowadzono transformacje danych i justowanie tekstu, z mocnym wyróżnieniem UX dla bloku "Twój adaptogen", zachowując prawidłowe łamanie linii dla list opcji. Moduł Centrum Kontroli używa precyzyjnego pozycjonowania teksu we wskaźnikach.
- `/src/components/*` - Poszczególne interfejsy wizualne oparte m.in. o renderowanie w locie natywnych bibliotek i tagów SVG wspierana przez platformę uwierzytelniania.

## Wymagania i Uruchomienie
Aplikacja ma wymuszony "Mobile-First Design" operujący na ustalonej maksymalnej szerokości ekranu na urządzeniach Desktopowych (`max-w-md`), nadając widokowi stały kształt rzutowania UX smartfona.

### Wdrożenie Lokalne (Local Development)

1. **Instalacja zależności**
   Upewnij się, że posiadasz środowisko Node, a następnie uruchom komendę:
   ```bash
   npm install
   ```

2. **Uruchomienie Serwera z Hot Reload (HMR)**
   Uruchamianie serwera w trybie lokalnym i testowym przy domyślnym porcie:
   ```bash
   npm run dev
   ```

3. **Budowanie Produkcyjne**
   Polecenie przygotuje całkowicie zamkniętą paczkę (PWA Ready) w wbudowanym folderze `dist`:
   ```bash
   npm run build
   ```

### Strategia Cacheowania i Wdrażanie (Vercel)
W tym środowisku nie ma renderowania po stronie serwera (SSR) i funkcji takich jak `getServerSideProps` czy konfiguracji `dynamic = 'force-dynamic'`. Vercel agresywnie cache'uje pliki statyczne, co może kolidować z mechanizmem Service Workera w PWA.

Dla prawidłowego działania utworzono plik `vercel.json`:
- Główne pliki wejściowe (w tym `index.html`, plik manifestu, `sw.js`) otrzymują nagłówek `Cache-Control: public, max-age=0, must-revalidate` co eliminuje występowanie błędu "X-Vercel-Cache: HIT" i serwowanie starych dokumentów PWA.
- Statyczne komponenty w podkatalogu `/assets/` korzystają ze zmienionej zoptymalizowanej polityki długoterminowego przechowywania `Cache-Control: public, max-age=31536000, immutable`, która w przypadku plików "hashingowanych" przez Vite zapewnia bezbłędną responsywność bez zapytań kontrolnych.
