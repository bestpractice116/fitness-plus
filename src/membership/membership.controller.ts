/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Put, Delete, NotFoundException } from '@nestjs/common';
import { MembershipService } from './membership.service';
import { Membership } from './membership.entity';

@Controller('membership')
export class MembershipController {
  constructor(private readonly membershipService: MembershipService) {}

  @Get()
  findAll(): Promise<Membership[]> {
    return this.membershipService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Membership> {
    return this.membershipService.findOne(id);
  }

  @Post()
  create(@Body() membership: Membership): Promise<Membership> {
    return this.membershipService.create(membership);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() membership: Partial<Membership>): Promise<Membership> {
    return this.membershipService.update(id, membership);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.membershipService.remove(id);
  }
  

  @Post(':id/send-reminder')
  async sendReminder(@Param('id') id: string) {
    const membership = await this.membershipService.findOne(+id);
    if (!membership) {
      throw new NotFoundException(`Membership with ID ${id} not found`);
    }
    await this.membershipService.sendReminderEmail(membership);
    return { message: 'Reminder email sent successfully.' };
  }
  
}
