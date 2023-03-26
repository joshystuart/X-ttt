# TODO

Some things that could be done to uplift this repo:

## Features

- [x] Update the computer player algorithm to be more intelligent than just random.
- [ ] Add [lerna](https://lerna.js.org/)/other monorepo tooling to help with both the client and websockets server
  codebases.

## Refactoring

- [ ] Convert xml config to json/js config (because xml is horrible, and json is native to node/js).
- [ ] Create better separation of concerns between the game logic and the UI.

## Code quality, testing and standards

- [ ] Update all dependencies to latest versions (especially jest!)
- [ ] Add github actions to run tests and linting on PRs.
- [ ] Add [react-testing-library](https://testing-library.com/docs/react-testing-library/intro/) and write tests some
  component level tests.
- [ ] Add tests for all react components.
- [ ] Add some "happy path" functional tests using something like [cypress](https://www.cypress.io/).
- [ ] Add linting and fix linting errors NOTE: eslint is already present but there's loads of errors. These should
  be fixed, and enforced in the CI pipeline.
- [ ] Add [prettier](https://prettier.io/) and fix formatting errors. These should be run automatically on commit
  and checked in CI to ensure consistency.
- [ ] Start using react hooks and the provider pattern (once the react version has been updated to at least v16.8) to
  store/access/mutate state.
- [ ] Add typescript support and work to convert to TS over time. Having semi-type safety is much easier to work
  with, even from a "documentation" perspective.