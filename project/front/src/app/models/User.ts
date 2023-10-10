export interface User {
    status?: string;
    data?: Data;
    token?: string;
}

export interface Data {
    id: number;
    name: string;
    email: string;
}
