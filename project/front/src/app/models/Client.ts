import { Route } from "./Route";
import { CreatedBy } from "./audit/CreatedBy";
import { ModifiedBy } from "./audit/ModifiedBy";

export interface Client {
    id?: number;
    document_type?: number;
    document_number?: number;
    route?: Route;
    name?: string;
    last_name?: string;
    email?: string;
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
