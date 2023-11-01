import { CreatedBy } from "./audit/createdBy";
import { ModifiedBy } from "./audit/modifiedBy";

export interface Sede {
    id?: number;
    name?: string;
    created_at?: Date;
    updated_at?: Date;
    created_by?: CreatedBy;
    modified_by?: ModifiedBy;
}
