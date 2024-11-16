import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsEnum, IsInstance, IsNotEmpty, IsNotIn, IsNumber, IsNumberString, IsOptional, IsString } from 'class-validator';

import { ItemType, ItemUnit } from '../enums';
import { SetItemBundleDTO } from './set-item-bundle.dto';

import { ToString } from '@/constant/transformers';

export class UpdateItemDTO {
  @ApiProperty({ type: BigInt, description: '품목 PK' })
  @IsNumberString()
  @IsNotEmpty()
  @ToString()
  id: string;

  @ApiPropertyOptional({ type: BigInt, description: '판매처 PK' })
  @IsNumberString()
  @IsNotIn([null])
  @IsOptional()
  @ToString()
  partnerId: string;

  @ApiPropertyOptional({ type: BigInt, description: '매입처 PK' })
  @IsNumberString()
  @IsOptional()
  @ToString()
  purchaserId: string | null;

  @ApiPropertyOptional({ type: String, description: '품목명' })
  @IsString()
  @IsNotIn([null])
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ type: String, enum: ItemType, description: '품목 종류' })
  @IsEnum(ItemType)
  @IsNotIn([null])
  @IsOptional()
  type?: ItemType;

  @ApiPropertyOptional({ type: String, enum: ItemUnit, description: '품목 단위' })
  @IsEnum(ItemUnit)
  @IsNotIn([null])
  @IsOptional()
  unit?: ItemUnit;

  @ApiPropertyOptional({ type: Number, description: '단위 입수량' })
  @IsNumber()
  @IsNotIn([null])
  @IsNotEmpty()
  quantity?: number;

  @ApiProperty({ type: Number, description: '매입단가' })
  @IsNumber()
  @IsNotEmpty()
  purchasePrice: number;

  @ApiProperty({ type: Number, description: '판매단가' })
  @IsNumber()
  @IsNotEmpty()
  salesPrice: number;

  @ApiPropertyOptional({ type: [SetItemBundleDTO], description: '세트 구성품' })
  @IsInstance(SetItemBundleDTO, { each: true })
  @IsArray()
  @IsOptional()
  bundle?: SetItemBundleDTO[];
}
