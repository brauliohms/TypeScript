# TYPESCRIPT

## Configure TypeScript

- make any dir: `mkdir MyDir`

- enter is dir created: `cd Mydir`

- create `package.json`: `npm init -y`

- install package TYPESCRIPT: `npm i -D typescript`

- install dependency to auto refresh NodeJS: `npm i -D ts-node-dev`

- make a typescript config file: `npx tsc --init`

- edit `tsconfig.json` and uncomment `outDir` and change to `"outDir": "./dist"`

- add in `package.json` 2 `scripts`: `"build": "tsc",` `"dev": "ts-node-dev --respawn --quiet src/index.ts",`

## Configure Tests

- install JEST and dependency jest to typescript: `npm i -D jest ts-jest`

- make a file `jest.config.js` to configure Jest: `> jest.config.js`

`jest.config.js`

```js
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
};
```

> In Codium install extension `Jest Runner`

- install types dependencys: `npm i -D @types/jest @types/node`

- edit `package.json` in `test`and change to `jest`: `"test": "jest"`
