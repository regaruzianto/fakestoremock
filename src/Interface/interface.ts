
export interface LoginData {
    email : string,
    password :string,
}

export interface RegisterData {
    name: string,
    email :string,
    password :string,
    avatar :string,
}

export interface CategoryData {
    id : number,
    name : string,
    image : string,
} 

export interface ProductsData {
    id : number,
    title : string,
    price : number,
    category : string,
    description : string,
    image : string, 

}
export interface CartItem extends ProductsData {
    quantity: number;
}

export interface UserProfileToken {
    id: number,
    email: string,
    password: string,
    name: string,
    role: string,
    avatar: string,
}
