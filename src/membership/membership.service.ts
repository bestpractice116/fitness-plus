/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Membership } from './membership.entity';
import { Cron } from '@nestjs/schedule';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MembershipService {
  constructor(
    @InjectRepository(Membership)
    private membershipRepository: Repository<Membership>,
  ) {}

  findAll(): Promise<Membership[]> {
    return this.membershipRepository.find();
  }

  findOne(id: number): Promise<Membership> {
    // return this.membershipRepository.findOne(id);
    return this.membershipRepository.findOneBy({ id });
  }

  create(membership: Membership): Promise<Membership> {
    return this.membershipRepository.save(membership);
  }

  async update(
    id: number,
    membership: Partial<Membership>,
  ): Promise<Membership> {
    await this.membershipRepository.update(id, membership);
    return this.membershipRepository.findOneBy({ id });
    // return this.membershipRepository.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.membershipRepository.delete(id);
  }



findUpcomingDueDates(): Promise<Membership[]> {
  const today = new Date();
  today.setDate(today.getDate() + 7); // 7 days before due date
  return this.membershipRepository.find({
    where: [
      { dueDate: today },
      { monthlyDueDate: today },
    ],
  });
}

// updateFirstMonthFlag(id: number): Promise<void> {
//   return this.membershipRepository.update(id, { isFirstMonth: false });
// }

@Cron('0 0 * * *')
async handleCron() {
  const memberships = await this.findUpcomingDueDates();
  for (const membership of memberships) {
    await this.sendReminderEmail(membership);
    if (membership.isFirstMonth) {
      // await this.updateFirstMonthFlag(membership.id);
      console.log("member is first month")
    }
  }
}

  async sendReminderEmail(membership: Membership) {
    const transporter = nodemailer.createTransport({
      service: process.env.SMTP_HOST,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS, // or use an App Password if 2-step verification is enabled
      },
    });

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: membership.email,
      subject: `Fitness+ Membership Reminder - ${membership.membershipType}`,
      text: this.generateEmailBody(membership),
    };

    await transporter.sendMail(mailOptions);
  }


  private generateEmailBody(membership: Membership): string {
    if (membership.isFirstMonth) {
      return `
        Dear ${membership.firstName},

        This is a reminder for your upcoming payment for the ${membership.membershipType} membership. 

        Total Amount Due: ${membership.totalAmount + membership.monthlyAmount}
        Due Date: ${membership.dueDate.toDateString()}

        You can view your invoice here: ${membership.invoiceLink}

        Best regards,
        Fitness+ Team
      `;
    } else {
      return `
        Dear ${membership.firstName},

        This is a reminder for your upcoming payment for the add-on services of your ${membership.membershipType} membership. 

        Monthly Amount Due: ${membership.monthlyAmount}
        Monthly Due Date: ${membership.monthlyDueDate.toDateString()}

        You can view your invoice here: ${membership.invoiceLink}

        Best regards,
        Fitness+ Team
      `;
    }
  }
}
