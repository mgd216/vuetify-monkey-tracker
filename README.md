# Monkey Tracker

The purpose of this project is to provide an example of [VueJS](https://vuejs.org/), [Vuetify](https://vuetifyjs.com/en/getting-started/quick-start), and [Firebase](https://console.firebase.google.com/).

## Project setup

```bash
# Create Firebase Account
https://console.firebase.google.com/

# Create New Firebase project and click on the Web Setup option to get the API Keys
# Turn on Email/Password authentication and create an account with an e-mail and password
# (Currently there is no 'signup' page)

# Create Google Maps API
https://developers.google.com/maps/documentation/javascript/get-api-key

# Create a file on root called .env.local and add the Firebase and Google Maps API:
VUE_APP_FIREBASE_API_KEY=[YOUR FIREBASE API KEY]
VUE_APP_FIREBASE_AUTH_DOMAIN=[YOUR FIREBASE AUTH DOMAIN]
VUE_APP_FIREBASE_DATABASE_URL=[YOUR FIREBASE DATABASE URL]
VUE_APP_FIREBASE_PROJECT_ID=[YOUR FIREBASE PROJECT ID]
VUE_APP_FIREBASE_STORAGE_BUCKET=[YOUR FIREBASE STORAGE BUCKET]
VUE_APP_FIREBASE_MESSAGING=[YOUR FIREBASE MESSAGING ID]
VUE_APP_GOOGLE_MAPS_API=[YOUR GOOGLE MAPS API KEY]

# Install Google Cloud Utils
https://cloud.google.com/sdk/

# Enable CORs on your Firebase Storage by running this command at root of the project folder
gsutil cors set cors.json gs://[YOUR FIREBASE PROJECT ID]

# Intall Firebase Tools
npm install -g firebase-tools

# Install project dependencies
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
firebase deploy
```
