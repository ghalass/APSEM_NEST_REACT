npm i -g @nestjs/cli

nest new project_name

nest g res user --no-spec

npm install prisma --save-dev
npx prisma init
npm install @prisma/client

supprimer le fichier prisma.config.ts
npx prisma migrate dev --name init
npx prisma generate

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
