// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { env } from './.env'

export const environment = {
  production: false,
  version: env.npm_package_version + '-dev',
  defaultLanguage: 'en-US',
  supportedLanguages: [
    'en-US',
    'lt-LT'
  ],
  databasePrefix: 'tests-',
  firebaseConfig: {
    apiKey: 'AIzaSyB_30SOIvf4tQx2V2ycqu_OY7_vvyge59E',
    authDomain: 'yet-another-tests.firebaseapp.com',
    databaseURL: 'https://yet-another-tests.firebaseio.com',
    projectId: 'yet-another-tests',
    storageBucket: 'yet-another-tests.appspot.com',
    messagingSenderId: '667627259862',
    appId: '1:667627259862:web:506581458c08f2e52b4677',
    measurementId: 'G-ZYB0Q765TM'
  }
}

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error'  // Included with Angular CLI.
