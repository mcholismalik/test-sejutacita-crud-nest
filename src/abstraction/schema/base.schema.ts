import { Schema, Prop } from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema()
export class Base extends Document {
  @Prop({ type: Date, default: Date.now })
  created_at: string

  @Prop({ type: String })
  created_by: string

  @Prop({ type: Date, default: Date.now })
  modified_at: string

  @Prop({ type: String })
  modified_by: string
}