# Office Health vs 2.0 - Opis Aplikacji

> ⚠️ Szczegółowe informacje techniczne, architektura danych oraz instrukcje uruchomienia znajdują się w pliku [Office_Health- dokumentacja_techniczna.md](Office_Health-%20dokumentacja_techniczna.md).

## Koncepcja i Cel Aplikacji
Office Health vs 2.0 to intuicyjna aplikacja webowa (Progressive Web App - PWA) zaprojektowana z myślą o pracownikach biurowych i korporacyjnych pracujących w trybie siedzącym. 
Celem narzędzia jest pomoc w codziennym monitorowaniu kluczowych parametrów zdrowotnych, budowaniu zdrowych nawyków, utrzymaniu odpowiedniego nawodnienia oraz wczesnym diagnozowaniu objawów przemęczenia.

Zamiast standardowego żargonu medycznego, aplikacja komunikuje się w przystępnym, "korporacyjnym" języku, przedstawiając zarządzanie własnym zdrowiem jak optymalizację projektów biznesowych ("Rutyna", "Baza", "Kafejka", "Kontrola", "Raporty").

## Funkcjonalności i Opis Modułów

Aplikacja jest podzielona na 5 oddzielnych sekcji znajdujących się w dolnym pasku nawigacyjnym:

### 1. Rutyna (Codzienny check-in)
Moduł pozwalający na śledzenie i rozliczanie nawyków każdego dnia.
- Lista 5 głównych nawyków (m.in. Poranny Izotonik, Mikro-przerwy w trakcie pracy).
- Interaktywne pola nawyków, m.in. możliwość wprowadzania i zapisywania dokładnej liczby wykonanych kroków (z czytelnym panelem powiadomienia o zapisanym wyniku).
- Skala samooceny jakości snu oraz poziomu energii/skupienia suwakami (od 1 do 10).
- Skondensowany i przeliczany na bieżąco procentowy „Wskaźnik Witalności i Efektywności”.
- Możliwość wygodnego przeglądu historycznych dni (w trybie tylko do odczytu).

### 2. Baza (Spiżarnia Wellness)
Lista zakupów i zasobów, które warto mieć zawsze pod ręką.
- Podział asortymentu w postaci filtrów na: „Miesięczną Bazę” (suplementy i produkty z długą datą) oraz „Tygodniowe Uzupełnienie” (produkty świeże, jajka, warzywa itp.).
- Interaktywny pasek postępu wyświetlający procent skompletowania optymalnej diety biohackera.

### 3. Kafejka (Hydratacja i Zioła)
Osobisty barista wspierający nawodnienie organizmu.
- Szybki panel logowania wypitych płynów z wskaźnikiem dobowego celu (z możliwością ustawienia własnego progu).
- Biblioteka „10 Napojów Mocy” podzielonych funkcjonalnie według precyzyjnych pór konsumpcji (Poranek, W trakcie dnia, Wieczór, Całodobowo).
- Dokładne zasady przyrządzania naparów wspierane systemowymi stoperami odliczającymi czas parzenia.

### 4. Kontrola (Centrum diagnostyki)
Miejsce analizowania kondycji układu nerwowego i zgłaszania objawów.
- Rejestrowanie podstawowych odczytów: rannego Tętna Spoczynkowego (RHR) i Saturacji tlenem (SpO2).
- Natychmiastowe mapowanie alertów — aplikacja poinformuje użytkownika o wysokim poziomie stresu w organizmie (czerwony alert przy zbyt wysokim tętnie) oraz przypomni o przerwie.
- Opcja symulowanego „zgłaszania objawów” (np. skurcze mięśni, mgła mózgowa) zwracająca konkretne i zdrowe alternatywy naprawcze proponowane przez algorytm.

### 5. Raporty (Trendy Witalności)
Strona agregująca zebrane z kilku tygodni dane i prezentująca postępy w formie podsumowań audytowych.
- Czytelny wykres słupkowy z danymi dot. dziennych wyników witalności (w %), generowany dynamicznie począwszy od pierwszego dnia zarejestrowania danych.
- Syntetyczny raport zbiorczy 30-dniowych średnich dla skupienia i regeneracji.
- Pasek postępu konkretnych procesów pokazujący, których nawyków procentowo użytkownik trzyma się najlepiej.

### 6. Synchronizacja z chmurą
Moduł zarządzania logowaniem i zabezpieczaniem postępów użytkownika (Cloud Alerts).
- Logowanie za pomocą konta Google (Firebase Authentication).
- Spersonalizowany widok zalogowanego użytkownika (wyświetla awatar profilowy, imię i status autoryzacji).
- Automatyczny, limitless backup w chmurze – zabezpieczający na bieżąco postępy statystyk (Firestore).
