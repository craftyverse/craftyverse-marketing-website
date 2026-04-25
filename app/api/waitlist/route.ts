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

const normalizePrivateKey = (privateKey: string) => {
  const trimmed = privateKey.trim();
  const unquoted =
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
      ? trimmed.slice(1, -1)
      : trimmed;

  const normalized = unquoted.replace(/\\n/g, '\n').replace(/\r\n/g, '\n');

  // Guardrail: surface a targeted error if the key cannot be decoded as PEM.
  if (
    !normalized.includes('-----BEGIN PRIVATE KEY-----') ||
    !normalized.includes('-----END PRIVATE KEY-----')
  ) {
    throw new Error(
      'Invalid GOOGLE_PRIVATE_KEY format. Ensure it is a full PEM key with BEGIN/END lines and newline separators.',
    );
  }

  return normalized;
};

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
