export interface Post {
    id: number,
    title?: string;
    userId?: number;
}

export interface Comment {
    id: number,
    name: string,
    email: string,
    body: string
}

export interface User {
    id: number,
    name: string,
    username: string,
    email: string
}