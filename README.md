# Inlämningsuppgift 4: Lagring av data på klientsidan


# Task Management System

# Beskrivning: 
Denna applikation används för att lägga till och sortera uppgifter med kategorier och prioritet.

# Starta applikationen:
First, npm install next.js
and then run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# Data Lagring:
Data lagras på klienten med hjälp av indexedDB. Det gör att databasen är strukturerad och effektiv genom att den är integrerad i webbläsaren och kan hantera stora datamängder. För att komplettera lagringen använder vi cookies för att spara den senast valda filtreringen eller sorteringen av uppgifterna. Detta ger en förbättrad användarupplevelse genom att behålla preferebser och inställningar.



# Utmaningar: 

Första gången vi använder indexedDB så det var lite svårt att få det att köra som det ska. 