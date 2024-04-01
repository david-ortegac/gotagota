import { Route } from "@angular/router";
import { CreatedBy } from "./audit/createdBy";
import { ModifiedBy } from "./audit/modifiedBy";

export interface Client {
    id?: number;
    route?: Route;
    name?: string;
    last_name?: string;
    phone?: string;
    city?: string;
    neighborhood?: string;
    address?: string;
    profession?: string;
    notes?: string;
    type?: string;
    update_by?: ModifiedBy;
    created_by?: CreatedBy;
    

}
