export class User{
    constructor(
        public id: number,
        public name: string,
        public surname: string,
        public email: string,
        public password: string,
        public roles: string,
        public active: boolean,
        public createdAt: string,
        public updatedAt: string
    ){}
}