# YATs

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.18.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Cloud functions

Create and Deploy Cloud Function using script that is defined in functions/package.json:
```
  cd functions
  npm run deploy
```

Deploy only specific function:
```
  firebase deploy --only functions:adminGroupsAddUid
```

## Test cloud function locally



## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


## Data Models

```
tests ->> questions  (1:n)
      ->> answers    (1:n)
 
p.s.  questions <-> answers (1:1)

groups ->> students  (1:n)
       ->> tests     (1:n)
```

## Admin

- Create teacher account

## Teacher

- Create the test and its questions
- Create students group
- Add students (emails) into the group
- Assign (add) the test to the group

## Student

- Sing up/login by email into the system
- Select uncompleted test from tests list
- Work on test...
- See tests results


