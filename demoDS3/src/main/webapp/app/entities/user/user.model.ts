export interface IUser {
  id: number;
  login?: string;
  code: number;
  name: string;
  mark: number;
  class: string;
}

export class User implements IUser {
  constructor(public id: number, public login: string) {}
  class!: string;
  code!: number;
  mark!: number;
  name!: string;
}

export function getUserIdentifier(user: IUser): number {
  return user.id;
}
