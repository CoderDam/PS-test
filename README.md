# La bibliothèque d'Henri Potier
Un test technique de Damien GARNÈS

---

Cette application **React Typscript** a été créée en utilisant `create-react-app` (avec le _template_ `typescript`). Elle utilise `npm`.

Avant toute chose, il faut installer toutes les dépendances en executant la commande `npm i`

Ensuite, pour faire tourner l'application, 2 possibilités :
- `npm start` : lance une version de développement de l'application qui est alors consultable sur `localhost:3000`
- `npm run build` : crée une version de production de l'application. Elle est alors consultable en ouvrant le fichier `index.html` à la racine du dossier `build`

Il est également possible de :
- jouer les tests : `npm test`
- consulter le _code coverage_ : `npm test -- --coverage`

---

Liste des principales _libraries_ utilisées :
- [Material-ui](https://mui.com/) : _lib_ de design et de style, utilisant à son tour sur [emotion.js](https://emotion.sh/)
- [axios](https://axios-http.com/) : pour effectuer les requêtes à l'API
- [React Query](https://react-query.tanstack.com/) : LA _lib_ pour gérer les ressources issues de l'API
- [Jest](https://jestjs.io/) & [@testing-library](https://testing-library.com/) : pour les tests

---

L'application a été développée sous Chrome & Firefox, l'utilisation d'autres navigateurs pourrait présenter des bugs.
