import { z } from "zod";

export const createClientSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, "Client name must be at least 2 characters")
        .max(100, "Client name cannot exceed 100 characters"),

    company: z
        .string()
        .trim()
        .max(150, "Company name cannot exceed 150 characters")
        .optional(),

    email: z
        .string()
        .email("Invalid email address")
        .optional(),

    phone: z
        .string()
        .trim()
        .min(10, "Phone number must be at least 10 characters")
        .max(15, "Phone number cannot exceed 15 characters")
        .optional(),

    notes: z
        .string()
        .trim()
        .max(1000, "Notes cannot exceed 1000 characters")
        .optional(),
});


export const updateClientSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, "Client name must be at least 2 characters")
        .max(100, "Client name cannot exceed 100 characters")
        .optional(),

    company: z
        .string()
        .trim()
        .max(150, "Company name cannot exceed 150 characters")
        .optional(),

    email: z
        .string()
        .email("Invalid email address")
        .optional(),

    phone: z
        .string()
        .trim()
        .min(10, "Phone number must be at least 10 characters")
        .max(15, "Phone number cannot exceed 15 characters")
        .optional(),

    notes: z
        .string()
        .trim()
        .max(1000, "Notes cannot exceed 1000 characters")
        .optional(),
});