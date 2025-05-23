'use server';

import { neon } from '@neondatabase/serverless';

const sql = neon(`${process.env.DATABASE_URL}`);

export async function getUsers() {
  const users = await sql`SELECT * FROM users`;
  return users; // already an array of user objects
}

export async function getUserById(id: number) {
  const result = await sql`SELECT * FROM users WHERE id = ${id}`;
  return result[0]; // Return the first (and only) user found
}