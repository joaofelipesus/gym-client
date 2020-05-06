# gym_client

This app was develop to serve as a better way to manage my workouts on the gym, and as a case of study to Vue.js lib. This applications serve as a client that consumes the API https://treinohype-api.herokuapp.com/

This project mainly uses Vue.js as SPA engine, and Bulma to make the layout friendly.

The issues will be used whenever i found a problem or miss a feature, and when is everithing ok this app will be open to users create its own training routines for free.
## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Run your end-to-end tests
There is a bash **e2e.sh** that is used to run end to end test, you should use it instead of yarn e2e, because it runs some rails tasks that populate the API with the data used on each case scenario.
