export class Movement{
    constructor(
        public id: number,
        public userId: number,
        public productId: number,
        public type: string,
        public description: string,
        public quantity: number,
        public createdAt: string
    ){}
}