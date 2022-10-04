export interface IDS {
  id: number;
  code: number;
  name: string;
  marks: number;
  classes: string;
}

export type NewDS = Omit<IDS, 'id'> & { id: null };
