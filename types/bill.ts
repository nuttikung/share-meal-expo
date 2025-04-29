import { TOrder } from "./order";

type TBill = {
  id: string;
  orders: Array<TOrder>;
};

export type { TBill };
