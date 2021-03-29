export type ProductResponse = {
    content: Product[];
    totalPages: number;

}

export type CategoryResponse = {
    content: Category[];
    totalPages: number;

}

export type UserResponse = {
    content: User[];
    totalPages: number;
}

export type Product = {
    id: number;
    name: string;
    description: string;
    price: number;
    imgUrl: string;
    date: string;
    categories: Category[];
}

export type Category = {
    id: number;
    name: string;
}

export type User = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    roles: Role[];
}

export type Role = {
    id: number;
    authority: string;
}

