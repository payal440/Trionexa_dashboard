import bcrypt from "bcryptjs";
import prisma from "../../../config/db.js";

export const createUser = async ({
  name,
  email,
  password,
  role,
  agencyId,
}) => {
  // 1. Check existing user
  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    throw new Error("User with this email already exists");
  }

  // 2. Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // 3. Create user
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role,
      agencyId,
    },

    // Password response mein nahi bhejna
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      agencyId: true,
      createdAt: true,
    },
  });

  // 4. Return created user
  return user;
};