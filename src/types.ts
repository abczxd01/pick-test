export type FormValues = {
  phone: string;
  firstName: string;
  lastName: string;
  mail: string;
  flatsCount: string;
};

export type SendFormResponse = {
  id: number;
  user: {
    firstName: string;
    lastName: string;
    mail: string;
    phone: string;
  };
  order: {
    flatsCount: string;
    time: string;
  };
  created_at: string;
  published_at: string;
  updated_at: string;
};
