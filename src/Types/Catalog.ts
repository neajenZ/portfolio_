
export interface ICompaundProduct {
    [ing1:string]: string,
    ing2: string,
    ing3: string,
    ing4: string,
    ing5: string,
    ing6: string,
    ing7: string,
    ing8: string,
}

export enum links {
    BURGERS = 'burgers',
    ZAKUSKI = 'zakuski',
    HOT_DOGS = 'hot_dogs',
    COMBO = 'combo',
    SHAURMA = 'shaurma',
    PIZZA = 'pizza',
    WOK = 'wok',
    DESERTS = 'deserts',
    SOUCES = 'souces'
}

export enum CategoryNames {
    BURGERS = 'Бургеры',
    ZAKUSKI = 'Закуски',
    HOT_DOGS = 'Хот-доги',
    COMBO = 'Комбо',
    SHAURMA = 'Шаурма',
    PIZZA = 'Пицца',
    WOK = 'Вок',
    DESERTS = 'Десерты',
    SOUCES = 'Соусы'
}

export interface IProduct {
    name: string,
    price: number,
    image: string,
    id: number,
    typeProduct: CategoryNames,
    weight: string,
    descProduct: string,
    kcal: number,
    compaund: ICompaundProduct
}

export interface IProductBasket extends IProduct {
    count: number,
}