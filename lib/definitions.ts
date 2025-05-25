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
    subscription_count: number;
    vehicle_count: number;
    purchase_count: number;
  };

  export type Payment_Card = {
    id: number;
    user_id: number;
    card_type: string;
    card_number: string;
    card_expiration: string;
  };

  export type Subscription = {
    id: number;
    user_id: number;
    plan_type: string;
    status: string;
    frequency: string;
    start_date: string;
    renewal_date: string;
    amount: number;
    payment_card_id: number;
    card_type: string;
    card_number: string;
    card_expiration: string;
    vehicle_id: number;
    make: string;
    model: string;
    color: string;
    year: number;
    plate_number: string;
  }

  export type Vehicle = {
    id: number;
    user_id: number;
    make: string;
    model: string;
    color: string;
    year: number;
    plate_number: string;
    subscription_id: number;
    subscription_name: string;
    subscription_status: string;
    subscription_frequency: string;
  }

  export type Purchase = {
    id: number;
    user_id: number;
    name: string;
    status: 'Completed' | 'Failed' | 'Pending'; // optionally narrow to known values
    date: string; // ISO string (or Date, depending on how it's returned from DB)
    payment_card_id: number | null;
    amount: number;
    type: 'Subscription' | 'Wash' | 'Coupon' | string; // allow fallback string type if dynamic
  };
  