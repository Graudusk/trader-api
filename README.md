# Trader-api

[![Build Status](https://travis-ci.org/Graudusk/trader-api.svg?branch=master)](https://travis-ci.org/Graudusk/trader-api)
[![CircleCI](https://circleci.com/gh/Graudusk/trader-api.svg?style=svg)](https://circleci.com/gh/Graudusk/trader-api)

[![Maintainability](https://api.codeclimate.com/v1/badges/8356a05ca4937c367474/maintainability)](https://codeclimate.com/github/Graudusk/trader-api/maintainability)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/bb4fe0b7651f4b8da30d04b5f0d6a84f)](https://www.codacy.com/app/Graudusk/trader-api?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=Graudusk/trader-api&amp;utm_campaign=Badge_Grade)

[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/Graudusk/trader-api/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/Graudusk/trader-api/?branch=master)
[![Code Coverage](https://scrutinizer-ci.com/g/Graudusk/trader-api/badges/coverage.png?b=master)](https://scrutinizer-ci.com/g/Graudusk/trader-api/?branch=master)

# Front end
[Trader](https://github.com/Graudusk/trader/)

# Installation
```
npm install
npm start
```

# Val av tekniker
## Backend

### Server

Som server-ramverk valde jag [Express](https://expressjs.com/). Jag har jobbat i den väldigt mycket förut, är bekväm med den och den fungerar utmärkt. Det är också den mest använda server-ramverket till Nodejs och har flest stjärnmärkningar på github jämfört med andra ramverk.

Express är lätt att få igång och att sätta upp ett API tillsammans med routes går fort. Lite mer komplicerade aspekter som inloggning, sessionshantering och autentisering är inte svårt att implementera inom ramverket.

### Websockets

Jag använde mig av vanliga [websocket-API:t](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket) för att hämta priserna i realtid. Min Express-server räknar ut och sparar nya priser när den är igång och när en användare ansluter till websocketservern skickas priserna ut i intervaller.

Jag tittade på andra bibliotek som sköter websockets som socket.io men jag kände inte att jag behövde krångla till det ytterligare. Funktionaliteten är minimal och behöver inte något mer än chatt-appens websocket-server/klient.

## Frontend

Jag valde att gå över från [Vue.js](https://vuejs.org/) i tidigare kursmoment till [React](https://reactjs.org/) inför projektet. Dels för att jag ogillade Vue och även för att jag var sugen på att testa något annat och se hur det känns. React gillade jag skarpt och hade lätt att förstå sättet som man jobbar med det.

För att visa upp priserna som hämtas i realtid använder jag mig av reactmodulen [react-chartjs-2](https://github.com/jerairrest/react-chartjs-2). Den jobbar bra tillsammans med websocket och har bra stöd för att uppdatera datan i realtid.

För att få ett snyggt och tydligt utseende på webbappen använde jag mig av React-komponenten [Material ui](https://material-ui.com/) som är ett element- och stilAPI som implementearar Googles stilguide [Material Design](https://material.io/). Det gör att sidans kvalitet av utseende lyfter enormt mycket samt att sidan blir responsiv då Material-ui är designat Mobile first. Komponenterna som följer med material-ui är lätta att använda sig av och känns som om de vore en del av React.

## Testning

För att köra dina egna tester på ditt egna klonade lokala repositorie, kör följande kommandot:

```
npm test
```

För att se kodtäckningen gå till projektmappens url och navigera till /coverage/index.html. Till exempel, om ditt projekt ligger i mappen `C:/Users/user/git/`, gå till adressen `file://C:/Users/user/git/trader-api/coverage/index.html` i webbläsaren.

Jag gör integrationstester med hjälp av [Chai](https://www.chaijs.com/) för att testa min backend-kod. Anledningen till att jag gör integrationstester och inte enhetstester för att testa min kod är för att koden är skriven i enhetliga funktioner som kallas på av routes:en. Därför kräver funktionerna en speciell miljö och vissa objekt som skapas av servern vid körning. Dessa går att mocka upp för att skapa samma miljö som skarpa användningsmiljön eller miljön för integrationstesterna, men då är funktionerna inte längre självständiga och enhetstest-sammanhanget har ingen relevans.

För att visa upp kodtäckning genererar jag kodtäckningsfiler med [istanbul](https://istanbul.js.org/). Jag har i skrivande stund 82% kodtäckning.

Något som inte täcks av mina kodtester är realtidsgenereringen av priser samt websockets som skickar ut priserna.

Det var väldigt krångligt att koppla upp sig till websocket-servern i testmiljön och gav inga bra resultat. Istället valde jag att lägga tid på testningen av API:et.

Vissa felmeddelanden är omständiga att skapa i mina routes. Till exempel i mina anrop till databasen kollar jag efter ifall anslutningen till databasen inte fungerar eller om databasfrågan falerar på något sätt. För att skapa det i en testmiljö tror jag att det krävs att jag kopplar från databasen mellan varje test.

Utöver Websockets och databasanropens felmeddelanden är jag väldigt nöjd med resultatet som mina testverktyg ger. Chai är ett jättebra verktyg för att testa routes och kodtäckningen hade jag inga problem med att få det att fungera.

## CI-kedja

Min CI-kedja består av byggverktygen [Circleci](https://circleci.com/gh/Graudusk/trader-api) och [Travis-ci](https://travis-ci.org/Graudusk/trader-api), kodkvalitetsgenomgång med [Codeclimate](https://codeclimate.com/github/Graudusk/trader-api), [Codacy](https://app.codacy.com/project/Graudusk/trader-api/dashboard) och [Scrutinizer](https://scrutinizer-ci.com/g/Graudusk/trader-api/). För kodtäckning använder jag Scrutinizer.

Det är samma verktyg jag använt tidigare i kursen. Jag tycker att de är tillförlitliga och lätta att använda. Codeclimate och scrutinizer tycker jag är extra bra på att få en att ordna upp i koden och göra den bättre. Det ger en väldigt bra insikter i hur ens sätt att programmera kan vara bristfällig i vissa aspekter. Får man ett stort antal återkommande fel av samma sort kan det vara värt att ta till sig vad verktygen säger om ens kod.
