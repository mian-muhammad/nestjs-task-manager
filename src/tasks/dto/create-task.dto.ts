import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsBoolean()
  @IsOptional()
  readonly completed: boolean;
}
