# Office Health V2.0 - Dokumentacja Techniczna

## Stos Technologiczny (Tech Stack)
- **Framework:** React 19 (architektura sfokusowana na strict state z zastosowaniem hooków).
- **Język:** TypeScript (zawiera silnie typowane interfejsy zdefiniowane w `types.ts`).
- **Stylizacja:** Tailwind CSS v4 (podejście utility-first, projekt mocno osadzony w stylistyce ciemnego trybu z paletą "slate", akcentami "emerald" oraz "rose").
- **Backend / Chmura:** Firebase (Authentication do autoryzacji Google, Firestore do zabezpieczania logów statystyk i rutyny).
- **Zarządzanie stanem (Hooki):** Niestandardowe hooki łączące bazę chmurową z warstwą wizualną (m.in. `useFirebaseRoutine`, `useFirebaseCollection`).
- **Ikony i Zasoby graficzne:** Lucide React oraz zoptymalizowane pod tryb ciemny maskowalne ikony PWA (`app-icon.png` w kolorystyce ciemnego granatu/slate dostosowanej do głównego motywu tła).
- **PWA:** Vite PWA Plugin, pozwalający na łatwą instalację aplikacji na ekranie głównym urządzeń mobilnych wspierający "standalone mode" (w tym generujący prawidłową, wymuszoną docelową nazwę "Office Health v2.0" dla przypiętych skrótów `short_name` oraz definicje wymuszające poprawne renderowanie maskowalnych ikon instalacyjnych `purpose: "maskable any"`).
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
- `/src/App.tsx` - "Shell" układu strony. Odpowiada za główny szkielet Mobile-App UI, Header oraz powitalny Splash Screen z animacją wygasającą (zintegrowaną ze zaktualizowanym logotypem `app-icon.png`). Obsługuje stan aktywności `activeTab`. Nawigacja podzielona na moduły z precyzyjnym nazewnictwem w Toolbarze.
- `/src/components/Reports.tsx` - Moduł statystyk z zaimplementowaną logiką wykresu słupkowego dla witalności (wraz z bezpośrodnio widocznymi na osi Y nad słupkami wynikami w %, uwzględniającymi powiększony margines i wysokość kontenera zapobiegające ucinaniu się tekstu wyższych wartości). Generuje ustrukturyzowaną historycznie oś czasu ograniczoną do ostatnich 7 dni, z automatycznym pozycjonowaniem scrolla na najświeższym odczycie.
- `/src/hooks/useFirebaseRoutine.ts` i integracje - Zaawansowane hooki spinające warstwę klienta bezpośrednio z kolekcjami Firestore. Całkowicie zarządza autoryzacją i subskrypcją po migracji z LocalStorage.
- `/src/components/CloudAlerts.tsx` - Przeprojektowany panel autoryzacji w chmurze Google, z wbudowanym renderowaniem awatara profilu użtkownika oraz notyfikacją powiadamiającą o zabezpieczaniu danych ze wsparciem interfejsu wizualnego synchronizacji.
- `/src/components/DailyRoutine.tsx` - Interaktywny kalendarz postepów wspierający dodawanie ilości zaliczonych kroków. Wbudowano tutaj zabezpieczającą blokadę przechodzenia do przodu i w tył za ramy dostępnych wpisów.
- `/src/data.ts` - Konfiguracja bazy z danymi, w tym słownika (tzw. enumeratorów) dotyczących polecanych produktów zakupu i napojów – wzorowana na dokumentacji merytorycznej zdrowia w trybie siedzącym. Zawiera metadane dla stoperów parzenia (`timer` values), zrestrukturyzowane przepisy rozdzielające właściwości adaptogenne (`adaptogen`, `adaptogenOptions`) od głównego strumienia składników oraz dedykowaną kategorię "Adaptogeny" na liście zakupowej.
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
