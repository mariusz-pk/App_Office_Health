# Office Health Console v2.0 - Dokumentacja Techniczna

## Stos Technologiczny (Tech Stack)
- **Framework:** React 19 (architektura sfokusowana na strict state z zastosowaniem hooków).
- **Język:** TypeScript (zawiera silnie typowane interfejsy zdefiniowane w `types.ts`).
- **Stylizacja:** Tailwind CSS v4 (podejście utility-first, projekt mocno osadzony w stylistyce ciemnego trybu z paletą "slate", akcentami "emerald" oraz "rose").
- **Zarządzanie stanem Local-First:** Niestandardowy hook `useLocalStorage` sprzężony z mechanizmem ciągłej synchronizacji poprzez Event Listanery na globalnym obiekcie Window.
- **Ikony:** Lucide React.
- **PWA:** Vite PWA Plugin, pozwalający na łatwą instalację aplikacji na ekranie głównym urządzeń mobilnych wspierający "standalone mode".
- **Budowa:** Vite.

## Architektura Danych / Model Pamięci
Aplikacja została zaprojektowana w architekturze symulującej bazę danych przy wykorzystaniu przeglądarkowego zasobu Local Storage. Stan jest reaktywny i odporny na opuszczanie kart – każda aktualizacja jest dynamicznie odzwierciedlana dzięki Eventom systemowym (`storage` oraz niestandardowemu `local-storage`).

**Klucze Pamięci (Storage Keys zadeklarowane w obiekcie window.localStorage):**
1. `corp_dailyRoutineHistory` (Obiekt Mapujący Daty na Obiekty Danych) - Rejestry nawyków i wskaźników per wybrany dzień. Znacznik datowy jako KLUCZ o formacie `YYYY-MM-DD`.
2. `corp_vitalSupplies` (Array String) - Lista ciągów znaków (identyfikatorów) asortymentów zaznaczonych w panelu Spiżarni.
3. `corp_healthLogs` (Array of Objects) - Serializowana macierz logów z badaniami i wyliczonymi symptomami diagnostycznymi (Saturacja, Tętno Spoczynkowe).
4. `corp_hydrationLogs_v2` (Array of Objects) - Wykaz spożytych ilości płynów ustrukturyzowany względem godzin dodania.
5. `corp_hydrationTarget` (Integer) - Cel dla wyliczeń % nawodnienia dobowego (domyślnie: 2000ml).

## Wybrane Moduły i Logika Binnesowa:
- `/src/App.tsx` - "Shell" układu strony. Odpowiada za szumny szkielet Mobile-App UI, Header i główny system routingu dolnego paska nawigacji (PWA Footer Tab Bar). Posiada stan aktywności `activeTab`.
- `/src/hooks/useLocalStorage.ts` - Implementacja logiki przechowywania i persystencji. Odpowiedzialne za dispatch globalnych zdarzeń celem powiadamiania innych instancji widoku o naruszeniu stanu (daje efekt spójności w raporcie).
- `/src/data.ts` - Konfiguracja bazy z danymi, w tym słownika (tzw. enumeratorów) dotyczących polecanych produktów zakupu i napojów – wzorowana na dokumentacji merytorycznej zdrowia w trybie siedzącym. Zawiera metadane dla stoperów parzenia (`timer` values).
- `/src/components/*` - Poszczególne interfejsy modułów: wskaźniki wizualizowane za pomocą odpowiednio manipulowanych elementach natywnych SVG (np. `strokeDashoffset`), integracja formularzy HTML do symulacji analizy medycznej oraz iteracja elementów tablic.

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
