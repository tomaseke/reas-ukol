# reas-ukol

Repo obsahuje frontend část napsanou v Reactu a backend část napsanou v Expressu. První package.json v root složce jsou dependencies pro backend. Druhý package.json ve frontend složce jsou dependencies pro frontend.

Backend server se startuje na PORTU 3001, frontend klasicky na PORTU 3000. Frontend package.json má proxy nastavenou na 3001, kde poslouchá /lead.

MongoDB jsem si založil na Mlabu, přičemž string na připojení k databázi je v .env.

Spuštění frontendu: npm start

Spuštění backendu: npm test
