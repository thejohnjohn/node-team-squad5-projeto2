interface IProduct {
  id: string;
  user_id: string;
  name: string;
  description: string;
  value: number;
  code: string;
  quantity: number;
  category: string;
  created_at: Date;
  updated_at: Date;
}

export { IProduct };
