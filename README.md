# AirShow Manager

**AirShow Manager** to profesjonalny symulator zarządzania pokazami lotniczymi. Gracz prowadzi organizację od pierwszych decyzji około 10–12 miesięcy przed wydarzeniem aż do dnia pokazów.

## Aktualny kierunek — 0.2

Projekt został przebudowany na osobne warstwy odpowiedzialne za interfejs, logikę gry, zapis oraz lokalizację.

- pełny polski interfejs jako język domyślny
- fundament lokalizacji przygotowany pod kolejne języki
- osobne trasy dla kreatora kariery i modułów gry
- automatyczny zapis rozgrywki w przeglądarce
- migracja zapisu z wcześniejszej wersji
- rzeczywista data sezonu i countdown do wydarzenia
- zaproszenia uczestników zależne od czasu gry
- kontrakty uczestników obciążające budżet
- rejestr transakcji i podstawowy moduł finansowy
- dynamiczna gotowość i ryzyko budżetowe
- nowy spójny system wizualny dla landing page, kreatora i gry

## Główne moduły

Centrum dowodzenia, Operacje, Uczestnicy, Sponsorzy, Zespół, Infrastruktura, Bilety, Marketing i Finanse.

Aktywnie działają obecnie fundament sezonu, centrum dowodzenia, czas gry, uczestnicy, kontrakty oraz podstawowe finanse. Pozostałe moduły mają własne trasy i strukturę przygotowaną pod kolejne mechaniki.

## Architektura

- `src/components/Landing.tsx` — strona główna produktu
- `src/components/CareerSetup.tsx` — kreator nowej kariery
- `src/components/GamePage.tsx` — powłoka gry i aktualne moduły
- `src/lib/game.ts` — model zapisu, daty, dane i logika domenowa
- `src/lib/i18n.ts` — fundament tłumaczeń
- `src/app/page.module.css` — wspólny system wizualny aplikacji

## Stack

Next.js 16, React 19, TypeScript i Lucide React.

AirShow Manager jest niezależnym projektem rozwijanym osobno od AirShow Gallery.
