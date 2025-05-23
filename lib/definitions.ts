export type User = {
    id: number;
    first_name: string;
    last_name: string;
    phone_number: string;
    email: string;
    date_of_birth: string;
    gender: string;
    payment_cards: Payment_Card[];
    last_wash: string;
    street_address: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
    subscriptions: Subscription[];
    vehicles: Vehicle[];
  };

  export type Payment_Card = {
    card_type: string;
    card_number: number;
    card_expiration: string;
  }

  export type Subscription = {
    plan_type: string;
    status: string;
    frequency: string;
    start_date: string;
    renewal_date: string;
    payment_card: Payment_Card;
    amount: number;
  }

  export type Vehicle = {
    make: string;
    model: string;
    color: string;
    year: string;
    plate_number: string;
    subscription: Subscription;
  }
  