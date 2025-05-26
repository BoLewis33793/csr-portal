import { NextRequest, NextResponse } from 'next/server';
import { updateUserPersonalInfo } from '@/lib/db';
import { personalInfoSchema } from '@/lib/userSchema';
import { ZodError } from 'zod';

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = Number((await params).id);
    const body = await req.json();

    console.log("Received body:", body);

    const parsedPersonalInfo = personalInfoSchema.parse(body);
    console.log("Parsed personal info:", parsedPersonalInfo);

    await updateUserPersonalInfo({
      userId,
      personalInfo: parsedPersonalInfo,
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