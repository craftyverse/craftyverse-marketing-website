import { google } from 'googleapis';
import { NextResponse } from 'next/server';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const allowedUserTypes = new Set([
  'student',
  'teacher',
  'parent',
  'school-admin',
]);

type WaitlistPayload = {
  firstName: string;
  lastName: string;
  email: string;
  userType: string;
};

const getEnvVar = (key: string) => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing ${key}`);
  }
  return value;
};

const normalizePrivateKey = (privateKey: string) =>
  privateKey.includes('\\n') ? privateKey.replace(/\\n/g, '\n') : privateKey;

const parsePayload = (body: unknown): WaitlistPayload | null => {
  if (!body || typeof body !== 'object') {
    return null;
  }

  const payload = body as Partial<WaitlistPayload>;

  const firstName = payload.firstName?.trim() ?? '';
  const lastName = payload.lastName?.trim() ?? '';
  const email = payload.email?.trim().toLowerCase() ?? '';
  const userType = payload.userType?.trim() ?? '';

  const isValid =
    firstName.length > 0 &&
    lastName.length > 0 &&
    emailPattern.test(email) &&
    allowedUserTypes.has(userType);

  if (!isValid) {
    return null;
  }

  return { firstName, lastName, email, userType };
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as unknown;
    const payload = parsePayload(body);

    if (!payload) {
      return NextResponse.json(
        { error: 'Invalid request payload.' },
        { status: 400 },
      );
    }

    const clientEmail = getEnvVar('GOOGLE_CLIENT_EMAIL');
    const privateKey = normalizePrivateKey(getEnvVar('GOOGLE_PRIVATE_KEY'));
    const sheetId = getEnvVar('GOOGLE_SHEET_ID');

    const auth = new google.auth.JWT({
      email: clientEmail,
      key: privateKey,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: 'Sheet1!A:F',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [
          [
            new Date().toISOString(),
            payload.firstName,
            payload.lastName,
            payload.email,
            payload.userType,
            'marketing-website',
          ],
        ],
      },
    });

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error('Failed to append waitlist row', error);
    return NextResponse.json(
      { error: 'Failed to save waitlist submission.' },
      { status: 500 },
    );
  }
}
