/* eslint-disable prettier/prettier */
import { IsString, IsEmail, IsEnum, IsDate, IsNumber, IsOptional, IsBoolean, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

enum MembershipType {
  AnnualBasic = 'Annual Basic',
  AnnualPremium = 'Annual Premium',
  MonthlyBasic = 'Monthly Basic',
  MonthlyPremium = 'Monthly Premium',
}

export class CreateMembershipDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  @IsEnum(MembershipType)
  membershipType: MembershipType;

  @IsDate()
  @Type(() => Date)
  startDate: Date;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  dueDate?: Date;

  @IsNumber()
  totalAmount: number;

  @IsNumber()
  monthlyAmount: number;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsBoolean()
  isFirstMonth: boolean;
}
