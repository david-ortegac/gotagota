import { Sede } from "./Sede";
import { CreatedBy } from "./audit/CreatedBy";
import { ModifiedBy } from "./audit/ModifiedBy";

export interface Route {
    id?: number;
    sede?: Sede;
    name?: string;
    created_at?: Date;
    updated_at?: Date;
    created_by?: CreatedBy;
    modified_by?: ModifiedBy;
}
