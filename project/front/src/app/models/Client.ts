import { CreatedBy } from "./audit/CreatedBy";
import { ModifiedBy } from "./audit/ModifiedBy";

export interface Client {
    id?: number;
    document_type?: string;
    document_number?: string;
    name?: string;
    last_name?: string;
    phone?: string;
    neighborhood?: string;
    address?: string;
    city?: string;
    profession?: string;
    notes?: string;
    type?: string;
    created_at?: Date;
    updated_at?: Date;
    created_by?: CreatedBy;
    modified_by?: ModifiedBy;
}
