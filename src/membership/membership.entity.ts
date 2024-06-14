/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Membership {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  membershipType: string;

  @Column()
  startDate: Date;

  @Column({ nullable: true })
  dueDate: Date;

  @Column()
  monthlyDueDate: Date;

  @Column()
  totalAmount: number;

  @Column()
  monthlyAmount: number;

  @Column()
  email: string;

  @Column({ default: true })
  isFirstMonth: boolean;

  @Column({ nullable: true })
  invoiceLink: string;
}
