"use server";

import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { z } from "zod";

// ═══════════════════════════════════════════════════════════════════════════
// MOCK DATA (Vaqtinchalik - Backend qo'shilganda o'zgaradi)
// ═══════════════════════════════════════════════════════════════════════════

const MOCK_OTP = "123456";

/**
 * In-memory user storage (Development only)
 * Production'da bu database bo'ladi
 */
const mockUsers = new Map<
  string,
  {
    id: string;
    phone: string;
    firstName: string;
    lastName: string;
  }
>();

// ═══════════════════════════════════════════════════════════════════════════
// VALIDATION SCHEMAS
// ═══════════════════════════════════════════════════════════════════════════

const phoneSchema = z
  .string()
  .regex(/^\+998\d{9}$/, "Invalid phone number format");

const otpSchema = z.string().length(6, "OTP must be exactly 6 digits");

const nameSchema = z
  .string()
  .min(2, "Name must be at least 2 characters")
  .max(50, "Name must not exceed 50 characters")
  .regex(
    /^[a-zA-Z\u0400-\u04FF\s'-]+$/,
    "Name must contain only letters, spaces, hyphens, and apostrophes",
  );

// ═══════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════

type ActionResult<T = void> =
  | { success: true; data?: T }
  | { success: false; error: string };

// ═══════════════════════════════════════════════════════════════════════════
// ACTIONS
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Send OTP to phone number
 *
 * @param phone - Phone number in format +998XXXXXXXXX
 * @returns ActionResult
 *
 * TODO: Backend integration
 * - Replace mock with real SMS service (Twilio, AWS SNS, Eskiz.uz)
 * - Add rate limiting (max 3 OTP per 10 minutes)
 * - Add phone number verification
 */
export async function sendOTP(
  phone: string,
): Promise<ActionResult<{ otpSent: boolean }>> {
  try {
    // Validation
    const result = phoneSchema.safeParse(phone);
    if (!result.success) {
      return { success: false, error: "invalidPhone" };
    }

    // TODO: Real SMS service integration
    // Example with Twilio:
    // const otp = generateOTP();
    // await twilioClient.messages.create({
    //   to: phone,
    //   from: process.env.TWILIO_PHONE_NUMBER,
    //   body: `Your Sahif verification code: ${otp}`
    // });
    //
    // await saveOTPToDatabase(phone, otp, expiresIn: 5 minutes);

    // Mock: Log OTP to console (Development only)
    console.log(`[MOCK AUTH] OTP for ${phone}: ${MOCK_OTP}`);

    return { success: true, data: { otpSent: true } };
  } catch (error) {
    console.error("[sendOTP] Error:", error);
    return { success: false, error: "serverError" };
  }
}

/**
 * Verify OTP and login user
 *
 * @param phone - Phone number
 * @param code - 6-digit OTP code
 * @returns ActionResult with needsRegistration flag
 *
 * TODO: Backend integration
 * - Verify OTP from database
 * - Check OTP expiration
 * - Implement rate limiting (max 5 attempts)
 * - Delete OTP after successful verification
 */
export async function verifyOTP(
  phone: string,
  code: string,
): Promise<ActionResult<{ needsRegistration: boolean }>> {
  try {
    // Validation
    const phoneResult = phoneSchema.safeParse(phone);
    const otpResult = otpSchema.safeParse(code);

    if (!phoneResult.success) {
      return { success: false, error: "invalidPhone" };
    }

    if (!otpResult.success) {
      return { success: false, error: "invalidOTP" };
    }

    // TODO: Real OTP verification
    // const storedOTP = await getOTPFromDatabase(phone);
    // if (!storedOTP || storedOTP.isExpired()) {
    //   return { success: false, error: 'expiredOTP' };
    // }
    // if (storedOTP.code !== code) {
    //   await incrementFailedAttempts(phone);
    //   return { success: false, error: 'invalidCode' };
    // }
    // await deleteOTP(phone);

    // Mock validation
    if (code !== MOCK_OTP) {
      return { success: false, error: "invalidCode" };
    }

    // Check if user exists
    const existingUser = mockUsers.get(phone);

    if (existingUser) {
      // Login existing user
      const session = await getSession();
      session.user = existingUser;
      session.isAuthenticated = true;
      await session.save();

      return { success: true, data: { needsRegistration: false } };
    }

    // New user - needs registration
    return { success: true, data: { needsRegistration: true } };
  } catch (error) {
    console.error("[verifyOTP] Error:", error);
    return { success: false, error: "serverError" };
  }
}

/**
 * Register new user
 *
 * @param phone - Phone number
 * @param firstName - User's first name
 * @param lastName - User's last name
 * @returns ActionResult
 *
 * TODO: Backend integration
 * - Save user to database
 * - Generate unique user ID (UUID)
 * - Hash sensitive data if needed
 * - Send welcome email/SMS
 */
export async function register(
  phone: string,
  firstName: string,
  lastName: string,
): Promise<ActionResult> {
  try {
    // Validation
    const phoneResult = phoneSchema.safeParse(phone);
    const firstNameResult = nameSchema.safeParse(firstName);
    const lastNameResult = nameSchema.safeParse(lastName);

    if (!phoneResult.success) {
      return { success: false, error: "invalidPhone" };
    }

    if (!firstNameResult.success) {
      return { success: false, error: "invalidFirstName" };
    }

    if (!lastNameResult.success) {
      return { success: false, error: "invalidLastName" };
    }

    // TODO: Real user creation
    // const user = await createUserInDatabase({
    //   phone,
    //   firstName,
    //   lastName,
    //   createdAt: new Date(),
    // });

    // Mock user creation
    const user = {
      id: crypto.randomUUID(), // ✅ Secure random ID
      phone,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
    };

    mockUsers.set(phone, user);

    // Create session
    const session = await getSession();
    session.user = user;
    session.isAuthenticated = true;
    await session.save();

    return { success: true };
  } catch (error) {
    console.error("[register] Error:", error);
    return { success: false, error: "serverError" };
  }
}

/**
 * Logout current user
 * Destroys session and redirects to home page
 *
 * NOTE: This does NOT delete user data from database
 * User can login again with the same phone number
 */
export async function logout() {
  try {
    const session = await getSession();
    session.destroy();
  } catch (error) {
    console.error("[logout] Error:", error);
  }

  redirect("/");
}

/**
 * Delete user account permanently
 * Removes user data from database and destroys session
 *
 * WARNING: This action is irreversible!
 * User will need to register again with the same phone number
 *
 * TODO: Backend integration
 * - Delete user from database
 * - Delete user's orders, reviews, etc.
 * - Send confirmation email/SMS
 * - GDPR compliance: Delete all personal data
 */
export async function deleteAccount(): Promise<ActionResult> {
  try {
    const session = await getSession();

    if (!session.isAuthenticated || !session.user) {
      return { success: false, error: "notAuthenticated" };
    }

    const phone = session.user.phone;

    // TODO: Real database deletion
    // await deleteUserFromDatabase(session.user.id);
    // await deleteUserOrders(session.user.id);
    // await deleteUserReviews(session.user.id);
    // await sendAccountDeletionConfirmation(phone);

    // Mock: Delete from in-memory storage
    mockUsers.delete(phone);

    // Destroy session
    session.destroy();

    return { success: true };
  } catch (error) {
    console.error("[deleteAccount] Error:", error);
    return { success: false, error: "serverError" };
  }
}
