import { IsDateString, IsMongoId, IsOptional, IsBoolean, IsInt, Min, IsString } from "class-validator";

export class CreateMatchDTO {
  @IsDateString()
  date: string;

  @IsMongoId()
  player1: string;

  @IsMongoId()
  player2: string;

  @IsOptional()
  @IsBoolean()
  played?: boolean = false;

  @IsOptional()
  @IsInt()
  @Min(0)
  scorePlayer1?: number = 0;

  @IsOptional()
  @IsInt()
  @Min(0)
  scorePlayer2?: number = 0;

  @IsOptional()
  @IsMongoId()
  createdBy?: string;

  @IsOptional()
  @IsMongoId()
  modifiedBy?: string;

  @IsOptional()
  @IsString()
  note?: string;
}

export class UpdateMatchDTO {
  @IsOptional()
  @IsDateString()
  date?: string;

  @IsOptional()
  @IsMongoId()
  player1?: string;

  @IsOptional()
  @IsMongoId()
  player2?: string;

  @IsOptional()
  @IsBoolean()
  played?: boolean;

  @IsOptional()
  @IsInt()
  @Min(0)
  scorePlayer1?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  scorePlayer2?: number;

  @IsOptional()
  @IsMongoId()
  modifiedBy?: string;

  @IsOptional()
  @IsString()
  note?: string;
}
