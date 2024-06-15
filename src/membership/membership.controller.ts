/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Put, Delete, NotFoundException, ParseIntPipe, UsePipes, ValidationPipe,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { MembershipService } from './membership.service';
import { Membership } from './membership.entity';
import { CreateMembershipDto } from './dto/create-membership.dto';
// import { UpdateMembershipDto } from './dto/update-membership.dto';

@Controller('membership')
export class MembershipController {
  constructor(private readonly membershipService: MembershipService) {}

  @Get()
  findAll(): Promise<Membership[]> {
    return this.membershipService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Membership> {
    return this.membershipService.findOne(id);
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() createMembershipDto: CreateMembershipDto): Promise<Membership> {
    try {
      return await this.membershipService.create(createMembershipDto as Membership);
    } catch (error) {
      throw new HttpException('Failed to create membership', HttpStatus.BAD_REQUEST);
    }
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() membership: Partial<Membership>): Promise<Membership> {
    return this.membershipService.update(id, membership);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
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
