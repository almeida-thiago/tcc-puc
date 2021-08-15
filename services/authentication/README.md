## Authentication service - v1.0.0

Authorize and manage access with JWT.

- *Database: MySQL*

** Action scripts **
> `$ yarn run deploy` - Deploy service (success only if pass in tests)
> `$ yarn run start` - Start service in production mode
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

#### Documentantion
> `/docs` - Endpoint openapi docs (doc_openapi.json)

### Environment variables
> `.env.development` - Development
> `.env.production` - Production
> `.env.stage` - Stage (for tests)

|Variable             |Default                      |Description           |
|:-------------------:|:---------------------------:|----------------------|
|**NODE_ENV**         |production/stage/developoment|Start mode            |
|**PORT**             |9000                         |Service port          |
|**DB_NAME**          |                             |Database name         |
|**DB_HOST**          |                             |Database hostname     |
|**DB_PORT**          |3306                         |Database hostname     |
|**DB_USER**          |                             |Database username     |
|**DB_PASSWORD**      |                             |Database password     |
|**SECRET**           |                             |Token secret          |
|**RECAPTCHA_KEY**    |                             |recaptcha secret key  |
|**THIRD_SERVICE_URL**|                             |Third part service url|

##### Requirements
- `Node JS LTS` : <https://nodejs.org/> 
- `Typescript` : <https://typescriptlang.org/> 
- `Maria DB` : <https://mariadb.org/> 
- `Yarn` : <https://yarnpkg.com/> 
- `Nodemon` : <https://nodemon.io/> 