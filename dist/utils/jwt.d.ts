import { Types } from 'mongoose';
interface UserPayload {
    id: Types.ObjectId;
}
export declare const generateJWT: (payload: UserPayload) => string;
export {};
