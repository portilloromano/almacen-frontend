export class Product{
    constructor(
        public id: number,
        public categoryId: number,
        public providerId: number,
        public name: string,
        public description: string,
        public quantity: number,
        public createdAt: string,
        public updatedAt: string
    ){}
}