'use server';

import { neon } from '@neondatabase/serverless';
import { User } from './definitions';

import type { z } from 'zod';
import { personalInfoSchema, addressSchema } from 'lib/userSchema';

const sql = neon(`${process.env.DATABASE_URL}`);

type PersonalInfo = z.infer<typeof personalInfoSchema>;
type AddressInfo = z.infer<typeof addressSchema>;

type UpdateUserPersonalParams = {
  userId: number;
  personalInfo: PersonalInfo;
};

type UpdateUserParams = {
  userId: number;
  addressInfo: AddressInfo;
};



export async function updateUserPersonalInfo({ userId, personalInfo }: UpdateUserPersonalParams) {
  await sql`
    UPDATE users
    SET 
      first_name = ${personalInfo.first_name},
      last_name = ${personalInfo.last_name},
      email = ${personalInfo.email},
      phone_number = ${personalInfo.phone_number},
      date_of_birth = ${personalInfo.date_of_birth},
      gender = ${personalInfo.gender}
    WHERE id = ${userId}
  `;
}

export async function updateUserAddressInfo({ userId, addressInfo }: UpdateUserParams) {
  await sql`
    UPDATE users
    SET
      street_address = ${addressInfo.street_address},
      city = ${addressInfo.city},
      state = ${addressInfo.state},
      postal_code = ${addressInfo.postal_code},
      country = ${addressInfo.country}
    WHERE id = ${userId}
  `;
}

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

export async function getVehicleById(vehicleId: string) {
  const vehicle = await sql`
    SELECT 
      v.*,
      s.plan_type AS subscription_name,
      s.status AS subscription_status,
      s.frequency AS subscription_frequency
    FROM vehicles v
    LEFT JOIN subscriptions s 
      ON v.subscription_id = s.id
    WHERE v.id = ${vehicleId}
  `;

  return vehicle[0];
}


export async function getUserVehiclesById(userId: string) {
  const vehicles = await sql`
    SELECT 
      v.*,
      s.plan_type AS subscription_name,
      s.status AS subscription_status,
      s.frequency AS subscription_frequency
    FROM vehicles v
    LEFT JOIN subscriptions s 
      ON v.subscription_id = s.id
    WHERE v.user_id = ${userId}
  `;

  return vehicles;
}

export async function getSubscriptionById(subscriptionId: string) {
  const subscription = await sql`
    SELECT 
      s.*,
      pc.card_type,
      pc.card_number,
      pc.card_expiration,
      v.id AS vehicle_id,
      v.make,
      v.model,
      v.year,
      v.color,
      v.plate_number
    FROM subscriptions s
    LEFT JOIN payment_cards pc 
      ON s.payment_card_id = pc.id
    LEFT JOIN vehicles v
      ON v.subscription_id = s.id
    WHERE s.id = ${subscriptionId}
  `;

  return subscription[0];
}

export async function getUserSubscriptionsById(userId: string) {
  const subscriptions = await sql`
    SELECT 
      s.*,
      pc.card_type,
      pc.card_number,
      pc.card_expiration,
      v.id AS vehicle_id,
      v.make,
      v.model,
      v.year,
      v.color,
      v.plate_number
    FROM subscriptions s
    LEFT JOIN payment_cards pc 
      ON s.payment_card_id = pc.id
    LEFT JOIN vehicles v
      ON v.subscription_id = s.id
    WHERE s.user_id = ${userId}
  `;

  return subscriptions;
}

export async function getUsersWithSearch(query?: string) {
  if (query) {
    return await sql`
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
      WHERE 
        u.first_name ILIKE ${'%' + query + '%'} OR
        u.last_name ILIKE ${'%' + query + '%'} OR
        u.email ILIKE ${'%' + query + '%'} OR
        (u.first_name || ' ' || u.last_name) ILIKE ${'%' + query + '%'}
    `;
  }

  return await sql`
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
}

export async function removeSubscriptionFromVehicle(vehicleId: string) {
  await sql`
    UPDATE vehicles
    SET subscription_id = NULL
    WHERE id = ${vehicleId}
  `;
}

export async function transferOneSubscriptionNoVehicle(
  currentSubscriptionId: string,
  newVehicleId: string
) {
  // Assign subscription to new vehicle
  await sql`
    UPDATE vehicles
    SET subscription_id = ${currentSubscriptionId}
    WHERE id = ${newVehicleId}
  `;
}
export async function transferOneSubscription(
  currentVehicleId: string,
  currentSubscriptionId: string,
  newVehicleId: string
) {
  // Assign subscription to new vehicle
  await sql`
    UPDATE vehicles
    SET subscription_id = NULL
    WHERE id = ${currentVehicleId}
  `;

  await sql`
    UPDATE vehicles
    SET subscription_id = ${currentSubscriptionId}
    WHERE id = ${newVehicleId}
  `;
}

export async function transferTwoSubscriptions(
  currentVehicleId: string,
  currentSubscriptionId: string,
  newVehicleId: string,
  newVehicleSubscriptionId: string
) {
  // Temporarily remove both to prevent unique constraint conflicts
  await sql`
    UPDATE vehicles
    SET subscription_id = NULL
    WHERE id IN (${currentVehicleId}, ${newVehicleId})
  `;

  // Swap the subscriptions
  await sql`
    UPDATE vehicles
    SET subscription_id = ${newVehicleSubscriptionId}
    WHERE id = ${currentVehicleId}
  `;

  await sql`
    UPDATE vehicles
    SET subscription_id = ${currentSubscriptionId}
    WHERE id = ${newVehicleId}
  `;
}

export async function transferOneVehicleNoSubscription(
  currentVehicleId: string,
  newSubscriptionId: string
) {
  // Assign subscription to new vehicle
  console.log('here');
  console.log('New Subscription Id: ', newSubscriptionId);
  console.log('Current Vehicle Id: ', currentVehicleId);
  await sql`
    UPDATE vehicles
    SET subscription_id = ${newSubscriptionId}
    WHERE id = ${currentVehicleId}
  `;
}

export async function transferOneVehicle(
  currentVehicleId: string,
  newSubscriptionVehicleId: string,
  newSubscriptionId: string
) {
  // Assign subscription to new vehicle
  await sql`
    UPDATE vehicles
    SET subscription_id = NULL
    WHERE id = ${newSubscriptionVehicleId}
  `;

  await sql`
    UPDATE vehicles
    SET subscription_id = ${newSubscriptionId}
    WHERE id = ${currentVehicleId}
  `;
}

export async function transferTwoVehicles(
  currentVehicleId: string,
  currentVehicleSubscriptionId: string,
  newSubscriptionVehicleId: string,
  newSubscriptionId: string
  
) {
  // Temporarily remove both to prevent unique constraint conflicts
  await sql`
    UPDATE vehicles
    SET subscription_id = NULL
    WHERE id IN (${currentVehicleId}, ${newSubscriptionVehicleId})
  `;

  // Swap the subscriptions
  await sql`
    UPDATE vehicles
    SET subscription_id = ${newSubscriptionId}
    WHERE id = ${currentVehicleId}
  `;

  await sql`
    UPDATE vehicles
    SET subscription_id = ${currentVehicleSubscriptionId}
    WHERE id = ${newSubscriptionVehicleId}
  `;
}