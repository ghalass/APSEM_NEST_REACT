npm i -g @nestjs/cli

nest new project_name

nest g res user --no-spec

npm install prisma --save-dev
npx prisma init
npm install @prisma/client

supprimer le fichier prisma.config.ts
npx prisma generate
npx prisma migrate dev --name init

nest g mo auth
nest g co auth --no-spec
nest g s auth

npm i bcrypt
npm i --save-dev @types/bcrypt

npm install --save @nestjs/jwt

npm install @nestjs/config

npm install --save @nestjs/passport passport passport-jwt

npm install --save-dev @types/passport @types/passport-jwt

npm i chalk
npm i --save class-validator class-transformer

npm install @faker-js/faker
==> crée clearData.ts et seed.ts dans src/prisma folder
npx prisma generate
==> dans scripts du package.json
"seed": "ts-node src/prisma/seed.ts",
"seed:clear": "ts-node src/prisma/clearData.ts"

npm run seed
npm run clear:data

===> pour créer les ressources des models
ajoute "generate:resources": "node src/scripts/generate-resources.js"
crée scripts/generate-resources.js
npm run generate:resources
