import { AdminResponse } from "./admin.type";

export interface WithdrawPartnerResponse {
    id: number,
    admin_id: number,
    note: string,
    amount: number,
    created_at: string,
    updated_at: string,
    admin: AdminResponse,
    status: 'SUCCESS' | 'CANCEL' | 'PENDING'
}

export interface IUpdateStatus {
    id: number,
    status: "SUCCESS" | "CANCEL"
}