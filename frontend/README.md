## Kodit Application - v1.0.0

Kodit Tecnologia admin application.

** Action scripts **
> `$ yarn run deploy` - Deploy service (success only if pass in tests)
> `$ yarn run stage` - Start service in stage mode
> `$ yarn run dev` - Start service in development mode
> `$ yarn run test` - Run tests
> `$ yarn run build` - Build production bundle in out directory 
> `$ yarn run clean` - Removes production bundle in out directory
> `$ yarn run init` - Start git flow
> `$ yarn run feature:start` - Start git flow feature
> `$ yarn run feature:finish` - Finish git flow feature
> `$ yarn run release:start` - Start git flow release
> `$ yarn run release:finish` - Finish git flow release
> `$ yarn run hotfix:start` - Start git flow hotfix
> `$ yarn run hotfix:finish` - Finish git flow hotfix
> `$ yarn run bugfix:start` - Start git flow bugfix
> `$ yarn run bugfix:finish` - Finish git flow bugfix
> `$ yarn run support:start` - Start git flow support
> `$ yarn run support:finish` - Finish git flow support
> `$ yarn run commit` - Make a git commit

### Environment variables
> `.env.development` - Development
> `.env.production` - Production
> `.env.stage` - Stage (for tests)

|Variable                     |Default                      |Description                  |
|:---------------------------:|:---------------------------:|-----------------------------|
|**REACT_APP_ENV**            |production/stage/developoment|Start mode                   |
|**REACT_APP_KEY**            |                             |Application name key         |
|**REACT_APP_TOKEN_KEY**      |                             |Application token key        |
|**REACT_APP_API_URL**        |                             |Application api url          |
|**REACT_APP_RECAPTCHA_KEY**  |                             |Google ReCaptcha key         |
|**REACT_APP_GOOGLE_LOGIN_ID**|                             |Google login application id  |

##### Requirements
- `Node JS LTS` : <https://nodejs.org/> 
- `React` : <https://reactjs.org/> 
- `Typescript` : <https://typescriptlang.org/> 
- `Yarn` : <https://yarnpkg.com/> 
