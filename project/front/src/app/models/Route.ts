import { CreatedBy } from "./audit/CreatedBy";
import { ModifiedBy } from "./audit/ModifiedBy";

export interface Route {
    id?: number;
    sede_id?: number;
    number?: string;
    created_at?: Date;
    updated_at?: Date;
    created_by?: CreatedBy;
    modified_by?: ModifiedBy;
}
