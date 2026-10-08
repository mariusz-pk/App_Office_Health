# App_Office_Health (Office Health v2.0) — instrukcje dla Claude Code

PWA (React 19 + TypeScript + Vite 6 + Tailwind 4) z linii „Zdrowie biurowe” marki Wszystkokolwiek.
Hosting: Vercel. Pakowanie do Google Play jako TWA. Logowanie i synchronizacja: Firebase (Auth + Firestore),
dane wrażliwe tylko lokalnie. Bliźniak aplikacji Zdrowie-IT — rozwiązania przenoś między nimi świadomie.
Szczegóły: `Office_Health- dokumentacja_techniczna.md`, `Office_Health_Opis_dzialania.md`.
Kontekst nadrzędny środowiska: `D:\Claude_Env\CLAUDE.md`.

## Komendy

```
npm run dev            # serwer deweloperski, port 3000
npm run build          # prebuild generuje ikony i zrzuty (generate-pwa-assets.js), potem vite build
npm run lint           # tsc --noEmit — testów nie ma
npm run rules:check    # zgodność firebase.json z bazą aplikacji + eslint reguł Firestore
npm run rules:deploy   # sprawdzian + publikacja reguł Firestore — tylko na wyraźną prośbę
```

Przed commitem zmian w `src/` uruchom `npm run lint`. Po każdej edycji `.ts`/`.tsx` i konfiguracji
Firebase hook `.claude/hooks/po-edycji.mjs` uruchamia `tsc` lub `rules:check` sam (wymaga `npm install`).

## Sekrety — repozytorium jest PUBLICZNE

- **Kody dostępu w postaci jawnej nigdy nie trafiają do repo.** W repo są wyłącznie hashe
  w `src/lib/accessCodes.ts`, a ten plik zmienia tylko generator:
  `node scripts/generate-codes.mjs <ile> <etykieta>`. Nie edytuj go ręcznie.
- Kody jawne leżą poza repo, w `D:\Claude_Env\produkty\zdrowie-biurowe\kody-dostepu\`.
- `.env*` (poza `.env.example`), `kody-*.csv`, `kody-dostepu/` — nie czytaj, nie edytuj,
  nie dodawaj do gita (żadnego `git add -f`).
- Pilnuje tego hook `.claude/hooks/chron-sekrety.mjs` (PreToolUse). Hook przypomina —
  nie zastępuje ostrożności.

## Rzeczy, które łatwo zepsuć

- **Pliki binarne (PNG/JPG).** Edytor Google AI Studio potrafi zapisać je jako tekst UTF-8 i nieodwracalnie
  zniszczyć (mojibake — przytrafiło się Zdrowie-IT). Nigdy nie twórz ani nie zapisuj obrazów narzędziem
  do tekstu. Chronią przed tym `.gitattributes` i CI `weryfikacja-obrazow.yml`.
  Ikony i zrzuty w `public/` są generowane i gitignorowane — źródłem jest `assets/Icon-App_Health_Office.png`.
- **Nazwana baza Firestore** (`ai-studio-8434b982-…`), nie `(default)`. `firebase.json` i `.firebaserc`
  muszą zgadzać się z `firebase-applet-config.json` — inaczej deploy reguł „uda się” na złej bazie.
  Zmiana `firestore.rules` w repo nic nie zmienia w działającej aplikacji, dopóki reguł nie wdrożysz.
- **Identyfikatory nie do zmiany po publikacji:** `manifest.id` (`/?source=pwa` w `vite.config.ts`)
  i Package ID `pl.wszystkokolwiek.officehealth`.
- **Precache Service Workera** obejmuje tylko ikony manifestu. Logo splasha musi wskazywać zasób
  z `includeAssets`, inaczej offline się nie załaduje.
- **`public/.well-known/assetlinks.json`** musi zawierać wszystkie klucze podpisujące (TWA).
- **Wymogi Google Play:** zastrzeżenie medyczne (`MedicalDisclaimer.tsx`), `public/prywatnosc.html`,
  `public/usuniecie-konta.html`. Nie usuwaj i nie ukrywaj.
- **Bramka dostępu** (`src/lib/access.ts`): `SALT` i `ITERACJE` muszą być identyczne
  z `scripts/generate-codes.mjs` — zmiana unieważnia wszystkie sprzedane kody. Sól i prefiks `OFH-`
  różnią się celowo od Zdrowie-IT — kody jednej aplikacji nie otwierają drugiej.

## Zasady pracy

- Zmiany na `main` przez pull request z zielonym checkiem `sygnatury`.
- Prostota i chirurgiczne zmiany; bez nowych zależności bez pytania
  (pełna wersja: `D:\Claude_Env\.claude\rules\kod-aplikacji.md`).
- Przy większych zmianach: najpierw plan, akceptacja, dopiero potem edycja.
