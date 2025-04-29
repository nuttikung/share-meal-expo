import { TMember } from "./member";

type TOrder = {
  id: string;
  name: string;
  price: number;
  members: Array<TMember>;
};

export type { TOrder };
