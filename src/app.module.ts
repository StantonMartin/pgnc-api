import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import environmentValidation from './config/environment.validation';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from './auth/config/jwt.config';
import { PaginationModule } from './common/pagination/pagination.module';
import { DataResponseInterceptor } from './common/interceptor/data-response/data-response.interceptor';
import { AccessTokenGuard } from './auth/guard/access-token/access-token.guard';
import { RoleModule } from './role/role.module';
import { RoleGuard } from './auth/guard/role/role.guard';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { UserRoleGuard } from './auth/guard/role/user.role.guard';
import { AdminRoleGuard } from './auth/guard/role/admin.role.guard';
import { CuratorRoleGuard } from './auth/guard/role/curator.role.guard';
import { MasterRoleGuard } from './auth/guard/role/master.role.guard';
import { SpeciesModule } from './species/species.module';
import { LocationModule } from './location/location.module';
import { AssemblyModule } from './assembly/assembly.module';
import { LocusGroupModule } from './locus-group/locus-group.module';
import { LocusTypeModule } from './locus-type/locus-type.module';
import { GeneModule } from './gene/gene.module';
import { SymbolModule } from './symbol/symbol.module';
import { NameModule } from './name/name.module';
import { GeneHistoryModule } from './gene-history/gene-history.module';
import { ExternalResourceModule } from './external-resource/external-resource.module';
import { XrefModule } from './xref/xref.module';
import { NoteModule } from './note/note.module';
import { GeneSymbolModule } from './gene-symbol/gene-symbol.module';
import { GeneNameModule } from './gene-name/gene-name.module';
import { GeneLocusTypeModule } from './gene-locus-type/gene-locus-type.module';
import { GeneNoteModule } from './gene-note/gene-note.module';
import { GeneXrefModule } from './gene-xref/gene-xref.module';
import { GeneReplacementModule } from './gene-replacement/gene-replacement.module';
import { GeneLocationModule } from './gene-location/gene-location.module';
import { HealthModule } from './health/health.module';

/**
 * The main application module for the PGNC API.
 *
 * This module imports and configures various sub-modules and services required for the application.
 */
@Module({
    imports: [
        UserModule,
        AuthModule,
        ConfigModule.forRoot({
            isGlobal: true,
            load: [appConfig, databaseConfig],
            validationSchema: environmentValidation,
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                autoLoadEntities: configService.get(
                    'database.autoLoadEntities',
                ),
                // syncronize: true is not recommended for production
                synchronize: configService.get('database.synchronize'),
                port: configService.get('database.port'),
                username: configService.get('database.user'),
                password: configService.get('database.password'),
                host: configService.get('database.host'),
                database: configService.get('database.name'),
                namingStrategy: configService.get('database.namingStrategy'),
            }),
        }),
        ConfigModule.forFeature(jwtConfig),
        JwtModule.registerAsync(jwtConfig.asProvider()),
        PaginationModule,
        MailModule,
        RoleModule,
        SpeciesModule,
        LocationModule,
        AssemblyModule,
        LocusGroupModule,
        LocusTypeModule,
        GeneModule,
        HealthModule,
        SymbolModule,
        NameModule,
        GeneHistoryModule,
        ExternalResourceModule,
        XrefModule,
        NoteModule,
        GeneSymbolModule,
        GeneNameModule,
        GeneLocusTypeModule,
        GeneNoteModule,
        GeneXrefModule,
        GeneReplacementModule,
        GeneLocationModule,
    ],
    providers: [
        {
            provide: APP_GUARD,
            useClass: RoleGuard,
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: DataResponseInterceptor,
        },
        AccessTokenGuard,
        UserRoleGuard,
        AdminRoleGuard,
        MasterRoleGuard,
        CuratorRoleGuard,
    ],
    controllers: [],
})
export class AppModule {}
