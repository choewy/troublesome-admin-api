import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

@Schema()
export class ActionLog {
  @Prop({ type: mongoose.Schema.Types.String })
  requestId: string;

  @Prop({ type: mongoose.Schema.Types.Mixed })
  user: Record<string, any>;

  @Prop({ type: mongoose.Schema.Types.String, required: true })
  message: string;

  @Prop({ type: mongoose.Schema.Types.Date, required: true })
  timestamp: Date;
}

export type ActionLogDocument = HydratedDocument<ActionLog>;
export const ActionLogSchema = SchemaFactory.createForClass(ActionLog);
