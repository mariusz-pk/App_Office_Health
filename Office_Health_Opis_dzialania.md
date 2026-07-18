# Office Health V2.0 - Opis Aplikacji

> ⚠️ Szczegółowe informacje techniczne, architektura danych oraz instrukcje uruchomienia znajdują się w pliku [Office_Health- dokumentacja_techniczna.md](Office_Health-%20dokumentacja_techniczna.md).

## Koncepcja i Cel Aplikacji
Office Health V2.0 to intuicyjna aplikacja webowa (Progressive Web App - PWA) zaprojektowana z myślą o pracownikach biurowych i korporacyjnych pracujących w trybie siedzącym. 
Celem narzędzia jest pomoc w codziennym monitorowaniu kluczowych parametrów zdrowotnych, budowaniu zdrowych nawyków, utrzymaniu odpowiedniego nawodnienia oraz wczesnym diagnozowaniu objawów przemęczenia.

Zamiast standardowego żargonu medycznego, aplikacja komunikuje się w przystępnym, "korporacyjnym" języku, przedstawiając zarządzanie własnym zdrowiem jak optymalizację projektów biznesowych ("Rutyna", "Baza", "Kafejka", "Kontrola", "Raporty").

Dostęp do aplikacji chroniony jest **kodem aktywacyjnym**, który nabywca otrzymuje wraz z linkiem. Kod podaje się jednorazowo, przy pierwszym uruchomieniu — szczegóły w sekcji *Aktywacja*.

## Funkcjonalności i Opis Modułów

Aplikacja jest podzielona na 6 oddzielnych sekcji znajdujących się w dolnym pasku nawigacyjnym:

### Ekran powitalny (Splash Screen)
Podczas uruchamiania aplikacji wyświetlany jest płynny ekran powitalny, prezentujący odświeżone logo aplikacji (z dostosowanym, ciemnym tłem), centralny tytuł aplikacji "Office Health v2.0" oraz delikatny podpis u samego dołu ekranu "by WszystkokolwiekWFormie", nadając autentyczne odczucie uruchamiania natywnego programu.

### 1. Rutyna (Codzienny check-in)
Moduł pozwalający na śledzenie i rozliczanie nawyków każdego dnia.
- Lista głównych nawyków środowiska biurowego (m.in. Poranny Izotonik, Mikro-przerwy w trakcie pracy).
- Interaktywne pola nawyków, m.in. dedykowany licznik dla celu "Dzienny limit kroków" (z predefiniowaną, domyślną wartością ukierunkowującą użytkownika na minimum 5000 kroków) obudowany w czytelny panel powiadomienia o zapisanym wyniku.
- Skala samooceny jakości snu oraz poziomu energii/skupienia suwakami (od 1 do 10).
- Skondensowany i przeliczany na bieżąco procentowy „Wskaźnik Witalności i Efektywności”.
- Możliwość wygodnego przeglądu historycznych dni (w trybie tylko do odczytu), z wbudowanym zabezpieczeniem przed wybieganiem w przyszłość lub nawigowaniem do dat systemowo pustych (przed rozpoczęciem użytkowania).

### 2. Baza zakupowa (Spiżarnia Wellness)
Lista zakupów i zasobów, które warto mieć zawsze pod ręką.
- Podział asortymentu w postaci filtrów na: „Miesięczną Bazę” (suplementy, adaptogeny i produkty z długą datą) oraz „Tygodniowe Uzupełnienie” (produkty świeże, jajka, warzywa itp.).
- Dodano dedykowaną, wyodrębnioną kategorię "ADAPTOGENY" na liście zakupowej dla łatwiejszego namierzania kluczowych wyciągów roślinnych (np. Soplówka jeżowata, Różeniec Górski).
- Baza produktów została zsynchronizowana z asortymentem z wariantu IT Health v2.0 (m m.in. rozdzielenie zbiorczych kategorii nasion/orzechów na pojedyncze pozycje, dodanie takich produktów jak Witamina D3+K2, Cynamon cejloński).
- Interaktywny pasek postępu wyświetlający procent skompletowania optymalnej diety biohackera.

### 3. Kafejka (Hydratacja i Zioła)
Osobisty barista wspierający nawodnienie organizmu.
- Szybki panel logowania wypitych płynów z wskaźnikiem dobowego celu (z możliwością ustawienia własnego progu).
- Biblioteka „10 Napojów Mocy” podzielonych funkcjonalnie według precyzyjnych pór konsumpcji (Poranek, W trakcie dnia, Wieczór, Całodobowo).
- Dokładne zasady przyrządzania naparów wspierane systemowymi stoperami odliczającymi czas parzenia oraz szczegółową listą kroków "Krok po kroku".
- Skrupulatna prezentacja przepisów: dynamiczne wyjustowanie tekstu instrukcji, czytelne listy wypunktowane przy składnikach, oraz dedykowana, wyróżniona sekcja "🔥 Twój adaptogen" z rekomendowanymi mieszankami dopasowanymi do danego napoju.

### 4. Kontrola samopoczucia (Centrum diagnostyki)
Miejsce analizowania kondycji układu nerwowego i zgłaszania objawów.
- Rejestrowanie podstawowych odczytów: rannego Tętna Spoczynkowego (RHR) i Saturacji tlenem (SpO2).
- Natychmiastowe mapowanie alertów — aplikacja poinformuje użytkownika o wysokim poziomie stresu w organizmie (czerwony alert przy zbyt wysokim tętnie) oraz przypomni o przerwie.
- Opcja symulowanego „zgłaszania objawów” (np. skurcze mięśni, mgła mózgowa) zwracająca konkretne i zdrowe alternatywy naprawcze proponowane przez algorytm.

### 5. Raporty (Trendy Witalności)
Strona agregująca zebrane z kilku tygodni dane i prezentująca postępy w formie podsumowań audytowych.
- Czytelny wykres słupkowy z danymi dot. dziennych wyników witalności (w %), generowany dynamicznie i prezentujący ostatnie 7 dni historii (zamiast pełnej), z automatycznym przewijaniem do najnowszego dnia, ulepszony o bezbłędne wyświetlanie wartości procentowej na górze nad każdym ze słupków (odpowiednie skalowanie kontenera zapobiegające ucinaniu się tekstu).
- Syntetyczny raport zbiorczy średnich dla skupienia i regeneracji.
- Pasek postępu konkretnych procesów pokazujący, których nawyków procentowo użytkownik trzyma się najlepiej.

### 6. Synchronizacja z chmurą
Moduł zarządzania logowaniem i zabezpieczaniem postępów użytkownika (Cloud Alerts).
- Logowanie za pomocą konta Google (Firebase Authentication).
- Spersonalizowany widok zalogowanego użytkownika (wyświetla awatar profilowy, imię i status autoryzacji).
- Automatyczny, limitless backup w chmurze – zabezpieczający na bieżąco postępy statystyk (Firestore).
- Ulepszona obsługa błędów autoryzacji: W przypadku problemów z autoryzacją zewnętrznych domen (np. przy wdrożeniach na platformie Vercel), aplikacja przechwytuje błąd `auth/unauthorized-domain` i wyświetla precyzyjny komunikat instruktażowy o konieczności dodania domeny w ustawieniach Firebase Authentication.

### 7. Aktywacja (Kod dostępu / Licencja produktu)
Aplikacja jest produktem płatnym — link do niej otrzymuje wyłącznie nabywca, wraz z indywidualnym kodem aktywacyjnym. Ekran aktywacji pojawia się zaraz po ekranie powitalnym i pozostaje jedyną widoczną częścią programu do czasu podania prawidłowego kodu.

- **Ekran startowy:** Utrzymany w tej samej stylistyce co reszta aplikacji (ciemne tło slate, akcent emerald, logo aplikacji). Zawiera pole na kod, przycisk *Aktywuj* oraz informację, że kod podaje się tylko raz.
- **Format kodu:** `OFH-XXXX-XXXX-XXXX`. Kod świadomie nie zawiera znaków, które łatwo pomylić przy przepisywaniu (nie występują w nim litery `I` oraz `O` ani cyfry `0` i `1`).
- **Wyrozumiałość przy wpisywaniu:** Pole samo porządkuje wpisywaną treść. Kod można podać małymi literami, ze spacjami zamiast myślników lub zupełnie bez separatorów — zapis `ofh a2b3 c4d5 e6f7` zostanie automatycznie sprowadzony do postaci `OFH-A2B3-C4D5-E6F7`. Ogranicza to liczbę nieudanych prób wynikających ze sposobu przepisania kodu.
- **Reakcja na błędny kod:** Aplikacja wyświetla czytelny komunikat z prośbą o sprawdzenie poprawności przepisania i pozostawia wpisaną treść do korekty.
- **Trwałość aktywacji:** Po pomyślnej weryfikacji fakt aktywacji zapisywany jest w pamięci przeglądarki. Aplikacja nie pyta o kod ponownie — ani przy kolejnych uruchomieniach, ani po zamknięciu i ponownym otwarciu z ekranu głównego telefonu.
- **Zakres aktywacji:** Aktywacja dotyczy konkretnej przeglądarki na danym urządzeniu. Uruchomienie aplikacji na drugim telefonie lub w trybie prywatnym wymaga ponownego podania kodu. Wyczyszczenie danych strony w przeglądarce również usuwa aktywację.
- **Prywatność kodu:** Sam kod nie jest nigdzie przechowywany — zapisywany jest wyłącznie wynik jego przetworzenia funkcją kryptograficzną. Kody nie znajdują się także w kodzie źródłowym aplikacji, mimo że repozytorium projektu jest publiczne.
- **Kody a wariant IT Health:** Kody obu aplikacji nie są wymienne. Kod `OFH-…` otwiera wyłącznie Office Health, a kod `ITH-…` wyłącznie IT Health.

### 8. Pełna zgodność z PWA (Progressive Web App) i integracja z OS
Aplikacja została wzbogacona o zaawansowane możliwości integracji z systemami operacyjnymi (szczególnie Windows i Android), osiągając niemal perfekcyjny wynik audytu (np. PWABuilder).
- Możliwość instalacji aplikacji (Standalone) bezpośrednio z poziomu przeglądarki.
- Pełen zestaw nowoczesnych funkcji PWA:
  - **Skróty (Shortcuts):** Szybki dostęp do modułu "Rutyna" z poziomu menu kontekstowego ikony aplikacji.
  - **Widgety (Widgets):** Przygotowana architektura widgetów dla systemu Windows.
  - **Obsługa plików (File Handlers):** Integracja z systemowym otwieraniem określonych rozszerzeń (np. `.txt`).
  - **Share Target & Note Taking:** Możliwość udostępniania treści bezpośrednio do aplikacji oraz wbudowane akcje tworzenia notatek systemowych.
  - **Protokół aplikacji (Protocol Handlers):** Reagowanie na unikalne adresy URL `web+officehealth://`.
  - **Idealna zgodność Assets (App Store / Play Store):** Dzięki dedykowanemu generatorowi (skrypt `generate-pwa-assets.js`), aplikacja automatycznie formatuje zrzuty ekranu i skaluje ikony do wytycznych PWA Buildera w locie (wymagane precyzyjne rozdzielczości 192x192, 512x512, 1920x1080, 1080x1920), w 100% zamykając ścieżkę do konwersji i publikacji aplikacji na telefony.
  - **Window Controls Overlay & Tabbed:** Nowoczesne wsparcie dla natywnych belek tytułowych (ukrywanie pasków przeglądarki) i interfejsów opartych na zakładkach.
  - **Service Worker:** Własna logika Service Workera działająca w tle, przygotowana do przechwytywania powiadomień Push oraz zdarzeń Sync i PeriodicSync.

### 9. Optymalizacja Cache i Wdrażanie (Vercel)
W środowisku chmurowym, w którym brak jest Server-Side Rendering (SSR), wdrożono bezkonfliktowe zasady cache'owania plików chroniące przed nieświeżymi danymi (tzw. "stale cache"). Konfiguracja zawarta w pliku `vercel.json` upewnia się, że Vercel oraz Service Worker poprawnie odświeżają kluczowe pliki wejściowe (HTML, Manifest, Service Worker) przy każdym wejściu z zasadą `max-age=0, must-revalidate`. Natomiast statyczne komponenty takie jak skrypty JavaScript i arkusze stylów (CSS) korzystają z niezwykle efektywnej polityki wielomiesięcznego przechowywania w cache użytkownika (`immutable`), przyspieszając diametralnie responsywność aplikacji.
