'use server';

import { neon } from '@neondatabase/serverless';
const sql = neon(`${process.env.DATABASE_URL}`);

export async function getUsers() {
  const users = await sql`
    SELECT 
      u.*,
      (
        SELECT COUNT(*) 
        FROM vehicles v 
        WHERE v.user_id = u.id
      ) AS vehicle_count,
      (
        SELECT COUNT(*) 
        FROM subscriptions s 
        WHERE s.user_id = u.id
      ) AS subscription_count,
      (
        SELECT COUNT(*) 
        FROM purchases p 
        WHERE p.user_id = u.id
      ) AS purchase_count
    FROM users u
  `;

  return users;
}



export async function getUserById(id: string) {
  const result = await sql`SELECT * FROM users WHERE id = ${id}`;
  return result[0]; // Return the first (and only) user found
}

export async function getUserCardById(id: string) {
  const result = await sql`
    SELECT * FROM payment_cards WHERE id = ${id}
  `;
  return result;
}

export async function getUserCardsById(userId: string) {
  const result = await sql`
    SELECT * FROM payment_cards WHERE user_id = ${userId}
  `;
  return result;
}

export async function getUserPaymentHistoryById(userId: string) {
  const result = await sql`
    SELECT * FROM purchases
    WHERE user_id = ${userId}
  `;
  return result;
}

export async function getVehicleById(id: string) {
  const result = await sql`SELECT * FROM vehicles WHERE id = ${id}`;
  return result[0]; // Return the first (and only) user found
}

export async function getUserVehiclesById(userId: string) {
  const vehicles = await sql`
    SELECT 
      v.*,
      s.plan_type AS subscription_name,
      s.status AS subscription_status
    FROM vehicles v
    LEFT JOIN subscriptions s 
      ON v.subscription_id = s.id
    WHERE v.user_id = ${userId}
  `;

  return vehicles;
}

export async function getUserSubscriptionsById(userId: string) {
  const subscriptions = await sql`
    SELECT 
      s.*,
      pc.card_type,
      pc.card_number
    FROM subscriptions s
    LEFT JOIN payment_cards pc 
      ON s.payment_card_id = pc.id
    WHERE s.user_id = ${userId}
  `;

  return subscriptions;
}
