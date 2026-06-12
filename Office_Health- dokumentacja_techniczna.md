# Office Health vs 2.0 - Dokumentacja Techniczna

## Stos Technologiczny (Tech Stack)
- **Framework:** React 19 (architektura sfokusowana na strict state z zastosowaniem hooków).
- **Język:** TypeScript (zawiera silnie typowane interfejsy zdefiniowane w `types.ts`).
- **Stylizacja:** Tailwind CSS v4 (podejście utility-first, projekt mocno osadzony w stylistyce ciemnego trybu z paletą "slate", akcentami "emerald" oraz "rose").
- **Backend / Chmura:** Firebase (Authentication do autoryzacji Google, Firestore do zabezpieczania logów statystyk i rutyny).
- **Zarządzanie stanem (Hooki):** Niestandardowe hooki łączące bazę chmurową z warstwą wizualną (m.in. `useFirebaseRoutine`, `useFirebaseCollection`).
- **Ikony:** Lucide React.
- **PWA:** Vite PWA Plugin, pozwalający na łatwą instalację aplikacji na ekranie głównym urządzeń mobilnych wspierający "standalone mode".
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
- `/src/App.tsx` - "Shell" układu strony. Odpowiada za główny szkielet Mobile-App UI, Header (z uwzględnieniem niestandardowej ikony gniazdka `SocketIcon` w SVG) i system routingu dolnego paska nawigacji (PWA Footer Tab Bar). Posiada stan aktywności `activeTab`. Nawigacja podzielona na moduły: Rutyna, Baza, Kafejka, Kontrola, Raporty.
- `/src/components/Reports.tsx` - Moduł odpowiedzialny za statystyki z zaimplementowaną logiką wykresu słupkowego dla witalności (wartości % do osi Y), dynamicznie czerpiący dane począwszy od pierwszego dnia rejestrów analizy.
- `/src/hooks/useFirebaseRoutine.ts` i integracje - Zaawansowane hooki spinające warstwę klienta bezpośrednio z kolekcjami Firestore. Całkowicie zarządza autoryzacją i subskrypcją po migracji z LocalStorage.
- `/src/components/CloudAlerts.tsx` - Przeprojektowany panel autoryzacji w chmurze Google, z wbudowanym renderowaniem awatara profilu użtkownika oraz notyfikacją powiadamiającą o zabezpieczaniu danych ze wsparciem interfejsu wizualnego synchronizacji.
- `/src/components/DailyRoutine.tsx` - Cechujący się wsparciem dla interaktywnych elementów wejścia (np. wpisywanie w dzienniku zaliczonych ilości kroków w połączeniu z przyciskiem do wymuszania natychmiastowego statusu "Zapisano").
- `/src/data.ts` - Konfiguracja bazy z danymi, w tym słownika (tzw. enumeratorów) dotyczących polecanych produktów zakupu i napojów – wzorowana na dokumentacji merytorycznej zdrowia w trybie siedzącym. Zawiera metadane dla stoperów parzenia (`timer` values).
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
