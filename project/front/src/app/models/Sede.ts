import { CreatedBy } from "./audit/CreatedBy";
import { ModifiedBy } from "./audit/ModifiedBy";

export interface Sede {
    id?: number;
    name?: string;
    created_at?: Date;
    updated_at?: Date;
    created_by?: CreatedBy;
    modified_by?: ModifiedBy;
}
