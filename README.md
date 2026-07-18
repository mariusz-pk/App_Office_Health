# Office Health v2.0

Aplikacja PWA wspierająca zdrowie i efektywność osób pracujących biurowo, w trybie siedzącym.
Sześć modułów: **Rutyna · Baza · Kafejka · Kontrola · Raporty · Synchronizacja**.

**Demo:** https://office-health-v20.vercel.app

## Stos

React 19 · TypeScript · Tailwind CSS v4 · Vite 6 · Firebase (Auth + Firestore) · vite-plugin-pwa

## Uruchomienie lokalne

Wymagany Node.js 18+ (zalecane 20+).

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build produkcyjny do ./dist
npm run lint     # tsc --noEmit
```

Konfiguracja Firebase znajduje się w `firebase-applet-config.json` w repozytorium,
więc do uruchomienia nie trzeba tworzyć pliku `.env`.

## Dostęp do aplikacji

Wejście chroni kod aktywacyjny w formacie `OFH-XXXX-XXXX-XXXX`, podawany jednorazowo
przy pierwszym uruchomieniu. Generowanie kolejnej partii:

```bash
node scripts/generate-codes.mjs 200 partia-02
```

Do repozytorium trafiają **wyłącznie hashe** (`src/lib/accessCodes.ts`). Kody jawne zapisywane
są poza repozytorium — repo jest publiczne. Szczegóły w dokumentacji technicznej.

## Dokumentacja

- [Opis działania aplikacji](Office_Health_Opis_dzialania.md) — funkcje i moduły od strony użytkownika
- [Dokumentacja techniczna](Office_Health-%20dokumentacja_techniczna.md) — architektura, PWA, bramka dostępu, wdrożenie
- [Specyfikacja bezpieczeństwa](security_spec.md) — reguły Firestore i model danych
