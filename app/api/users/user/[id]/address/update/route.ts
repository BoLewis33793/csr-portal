import { NextRequest, NextResponse } from 'next/server';
import { updateUserAddressInfo } from '@/lib/db';
import { addressSchema } from '@/lib/userSchema';
import { ZodError } from 'zod';

export async function PATCH(req: NextRequest, context: { params: { id: string } }) {
  try {
    const { id } = await context.params;
    const userId = Number(id);

    const body = await req.json();

    console.log("Received body:", body);

    const parsedAddressInfo = addressSchema.parse(body);
    console.log("Parsed address info:", parsedAddressInfo);

    await updateUserAddressInfo({
      userId,
      addressInfo: parsedAddressInfo,
    });

    return NextResponse.json({ message: 'User updated successfully' }, { status: 200 });
  } catch (error) {
    console.error("API Error:", error);

    if (error instanceof ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.errors }, { status: 400 });
    }

    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}
