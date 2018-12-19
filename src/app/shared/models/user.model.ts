export class User {
  constructor(
    public firstName: string,
    public lastName: string,
    public email: string,
    public password: string,
    public type: string = 'user',
    public id?: number,
  ) {}
}
