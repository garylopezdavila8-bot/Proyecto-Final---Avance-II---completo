import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedService } from './seed.service';
import { User } from '../entities/user.entity'; // Ruta corregida hacia tu entidad

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), // Le da acceso al repositorio de TypeORM
  ],
  providers: [SeedService],
  exports: [SeedService], // Lo exportamos para que auth.module lo pueda usar
})
export class SeedModule {}