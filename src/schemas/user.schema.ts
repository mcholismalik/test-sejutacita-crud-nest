import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema()
export class User extends Document {
  @Prop({ type: String, required: true })
  name: string

  @Prop({ type: String, required: true, unique: true })
  username: string

  @Prop({ type: String, required: true, unique: true })
  email: string

  @Prop({ type: String })
  address: string

  @Prop({ type: String, enum: ["L", "P"] })
  gender: string

  @Prop({ type: Number })
  age: number

  @Prop({ type: String, select: false })
  salt: string

  @Prop({ type: String, select: false })
  password: string

  @Prop({ type: String, required: true, enum: ["admin", "member"] })
  role: string
}

export const UserSchema = SchemaFactory.createForClass(User)

export const UserConfig = {
  modelName: 'User',
}
