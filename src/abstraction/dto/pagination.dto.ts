import { ApiPropertyOptional } from '@nestjs/swagger'
import { Type } from 'class-transformer'

export class PaginationDto {
  @ApiPropertyOptional({ type: Number })
  @Type(() => Number)
  page?: number

  @ApiPropertyOptional({ type: Number })
  @Type(() => Number)
  pageSize?: number

  @ApiPropertyOptional({ type: String })
  sort?: string

  @ApiPropertyOptional({ type: String })
  sortBy?: string
}

