import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { SiteModule } from './site/site.module';
import { TypeparcModule } from './typeparc/typeparc.module';
import { ParcModule } from './parc/parc.module';
import { TypeconsommationlubModule } from './typeconsommationlub/typeconsommationlub.module';
import { TypeconsommationlubParcModule } from './typeconsommationlub-parc/typeconsommationlub-parc.module';
import { LubrifiantParcModule } from './lubrifiant-parc/lubrifiant-parc.module';
import { EnginModule } from './engin/engin.module';
import { TypepanneModule } from './typepanne/typepanne.module';
import { TypepanneParcModule } from './typepanne-parc/typepanne-parc.module';
import { PanneModule } from './panne/panne.module';
import { SaisiehrmModule } from './saisiehrm/saisiehrm.module';
import { SaisiehimModule } from './saisiehim/saisiehim.module';
import { TypelubrifiantModule } from './typelubrifiant/typelubrifiant.module';
import { LubrifiantModule } from './lubrifiant/lubrifiant.module';
import { SaisielubrifiantModule } from './saisielubrifiant/saisielubrifiant.module';
import { ObjectifModule } from './objectif/objectif.module';

@Module({
  imports: [UserModule, AuthModule, ConfigModule.forRoot({ isGlobal: true }), SiteModule, TypeparcModule, ParcModule, TypeconsommationlubModule, TypeconsommationlubParcModule, LubrifiantParcModule, EnginModule, TypepanneModule, TypepanneParcModule, PanneModule, SaisiehrmModule, SaisiehimModule, TypelubrifiantModule, LubrifiantModule, SaisielubrifiantModule, ObjectifModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
