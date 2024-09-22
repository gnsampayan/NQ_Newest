import { z } from "zod";

export const itemCreateSchema = z.object({
    id: z.number().int().positive().optional(),
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(1, 'Description is required').optional(),
    price: z.number().positive('Price is required'),
    quantity: z.number().int().nonnegative('Quantity cannot be negative'),
    tags: z.array(z.string()).optional(),
    image: z.string().min(1, 'Image is required'),
    saleBool: z.boolean().optional(),
    saleRate: z.number().min(0.01).max(0.99).optional(),
    saleTimed: z.boolean().optional(),
    saleEnd: z.date().optional(),
});

export const itemUpdateSchema = itemCreateSchema.extend({
    id: z.number().int().positive().optional(),
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(1, 'Description is required').optional(),
    price: z.number().positive('Price is required'),
    quantity: z.number().int().nonnegative('Quantity cannot be negative'),
    tags: z.array(z.string()).optional(),
    image: z.string().min(1, 'Image is required'),
    saleBool: z.boolean().optional(),
    saleRate: z.number().min(0.01).max(0.99).optional(),
    saleTimed: z.boolean().optional(),
    saleEnd: z.date().optional(),
});

export const itemResponseSchema = z.object({
    id: z.number().int().positive(),
    title: z.string(),
    description: z.string().optional(),
    price: z.string(),
    quantity: z.number().int().nonnegative(),
    tags: z.array(z.string()).optional(),
    image: z.string(),
    saleBool: z.number().refine(val => val === 0 || val === 1),
    saleRate: z.string().nullable().optional(),
    saleTimed: z.number().refine(val => val === 0 || val === 1),
    saleEnd: z.string().nullable().optional(),
});

// Schema for minimal response when creating a new item
export const itemCreateResponseSchema = z.object({
    id: z.number().int().positive(),
    message: z.string(),
});

export const itemUpdateResponseSchema = z.object({
    message: z.string(),
});

export type ItemResponseType = z.infer<typeof itemResponseSchema>;
export type ItemCreateResponseType = z.infer<typeof itemCreateResponseSchema>;
export type ItemUpdateResponseType = z.infer<typeof itemUpdateResponseSchema>;
