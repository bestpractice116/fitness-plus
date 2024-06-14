/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Membership } from './membership.entity';
import { MembershipService } from './membership.service';
import { MembershipController } from './membership.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Membership])],
  controllers: [MembershipController],
  providers: [MembershipService]
})
export class MembershipModule {}
