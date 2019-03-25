# Trader-api

[![Build Status](https://travis-ci.org/Graudusk/trader-api.svg?branch=master)](https://travis-ci.org/Graudusk/trader-api)
[![CircleCI](https://circleci.com/gh/Graudusk/trader-api.svg?style=svg)](https://circleci.com/gh/Graudusk/trader-api)

[![Maintainability](https://api.codeclimate.com/v1/badges/8356a05ca4937c367474/maintainability)](https://codeclimate.com/github/Graudusk/trader-api/maintainability)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/97954d92f4bd443d9eac17f357bd1c37)](https://www.codacy.com/app/Graudusk/ramverk2-me?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=Graudusk/ramverk2-me&amp;utm_campaign=Badge_Grade)

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

###Server

Som server-ramverk valde jag Express. Jag har jobbat i den väldigt mycket förut, är bekväm med den och den fungerar utmärkt. Det är också den mest använda server-ramverket till Nodejs och har flest nedladdningar. 

Express är lätt att få igång och att sätta upp ett API samt routes går fort och lite mer komplicerade aspekter som inloggning, sessionshantering och autentisering fixas lätt med Express.

###Websockets

Jag använde mig av vanliga websocket-API:t för att hämta priserna i realtid. Min Express-server räknar ut och sparar nya priser när den är igång och när en användare ansluter till websocketservern skickas priserna ut i intervaller.

Jag tittade på andra bibliotek som sköter websockets som socket.io men jag kände inte att jag behövde krångla till det ytterligare. Funktionaliteten är minimal och behöver inte något mer än chat-appens websocket-server/klient.

## Frontend

Jag valde att gå över från Vue.js i tidigare kursmoment till React inför projektet. Dels för att jag inte gillade Vue och dels för att jag var sugen på att testa något annat och se hur det känns. Jag gillade React skarpt och hade lätt att förstå sättet som man jobbar med det.
