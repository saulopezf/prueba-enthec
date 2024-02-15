import mongoose, { Schema, Document } from "mongoose";

export interface PropertyModel extends Document {
    url: string;
    method: string;
    statusHttp: number;
    statusText: string;
    headers: Record<string, string>;
    province: string;
    property: Record<string, any> | null;
    sessionId: string;
    createdAt: number;
}

const PropertyModelSchema = new Schema<PropertyModel>({
    url: { type: String, required: true },
    method: { type: String, required: true },
    statusHttp: { type: Number, required: true },
    statusText: { type: String, required: true },
    headers: { type: Map, of: Schema.Types.Mixed },
    province: { type: String, required: true },
    property: { type: Map, of: Schema.Types.Mixed },
    sessionId: { type: String, required: true },
    createdAt: { type: Number, required: true },
});

export default mongoose.model<PropertyModel>("properties", PropertyModelSchema);
