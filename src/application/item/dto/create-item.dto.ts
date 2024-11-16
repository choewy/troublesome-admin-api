import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsEnum, IsInstance, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString } from 'class-validator';

import { ItemType, ItemUnit } from '../enums';
import { CreateItemBundleDTO } from './create-item-bundle.dto';

import { ToNull, ToString } from '@/constant/transformers';

export class CreateItemDTO {
  @ApiProperty({ type: BigInt, description: '판매처 PK' })
  @IsNumberString()
  @IsNotEmpty()
  @ToString()
  partnerId: string;

  @ApiPropertyOptional({ type: BigInt, description: '매입처 PK' })
  @IsNumberString()
  @IsOptional()
  @ToNull()
  @ToString()
  purchaserId: string | null;

  @ApiProperty({ type: String, description: '품목명' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: String, enum: ItemType, description: '품목 종류' })
  @IsEnum(ItemType)
  @IsNotEmpty()
  type: ItemType;

  @ApiProperty({ type: String, enum: ItemUnit, description: '품목 단위' })
  @IsEnum(ItemUnit)
  @IsNotEmpty()
  unit: ItemUnit;

  @ApiProperty({ type: Number, description: '단위 입수량' })
  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @ApiProperty({ type: Number, description: '매입단가' })
  @IsNumber()
  @IsNotEmpty()
  purchasePrice: number;

  @ApiProperty({ type: Number, description: '판매단가' })
  @IsNumber()
  @IsNotEmpty()
  salesPrice: number;

  @ApiPropertyOptional({ type: [CreateItemBundleDTO], description: '세트 구성품' })
  @IsInstance(CreateItemBundleDTO, { each: true })
  @IsArray()
  @IsOptional()
  bundle?: CreateItemBundleDTO[];
}
