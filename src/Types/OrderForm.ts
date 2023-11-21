import {IProductBasket} from "./Catalog";

export interface PeopleForm {
    name: string,
    number: number,
    floor: string | number,
    intercom: string | number,
    street: string | number,
    typeDelivery: string
}

export interface IRequestProduct extends Partial<IProductBasket>{}


export interface TypeProductsRequest extends Omit<IProductBasket, 'image'> {}

export interface OrderRequestForm {
    infoPeople: PeopleForm,
    productList: IRequestProduct[],
    allPrice: number
}