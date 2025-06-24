import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  fullName: text("full_name").notNull(),
  phone: text("phone"),
  role: text("role").default("user").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

// Inquiries table for contact form submissions
export const inquiries = pgTable("inquiries", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  service: text("service").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  status: text("status").default("new").notNull()
});

// Services table
export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  icon: text("icon").notNull(),
  features: text("features").array().notNull(),
  active: boolean("active").default(true).notNull()
});

// Filings table
export const filings = pgTable("filings", {
  id: serial("id").primaryKey(),
  service: text("service").notNull(),
  subService: text("sub_service"),
  title: text("title").notNull(),
  description: text("description").notNull(),
  filePath: text("file_path"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});

// Documents Required table
export const documentsRequired = pgTable("documents_required", {
  id: serial("id").primaryKey(),
  filingId: integer("filing_id").references(() => filings.id).notNull(),
  documentName: text("document_name").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

// Resources table for articles and guides
export const resources = pgTable("resources", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  content: text("content").notNull(),
  category: text("category").notNull(),
  imagePath: text("image_path"),
  publishedAt: timestamp("published_at").defaultNow().notNull(),
  featured: boolean("featured").default(false).notNull()
});

// Testimonials table
export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  content: text("content").notNull(),
  name: text("name").notNull(),
  position: text("position").notNull(),
  company: text("company"),
  active: boolean("active").default(true).notNull()
});

// Subscribers table for newsletter subscriptions
export const subscribers = pgTable("subscribers", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  subscribedAt: timestamp("subscribed_at").defaultNow().notNull(),
  active: boolean("active").default(true).notNull()
});

// Validation schemas using Zod
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertInquirySchema = createInsertSchema(inquiries).omit({
  id: true,
  createdAt: true,
  status: true,
});

export const insertServiceSchema = createInsertSchema(services).omit({
  id: true,
});

export const insertFilingSchema = createInsertSchema(filings).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});

export const insertDocumentRequiredSchema = createInsertSchema(documentsRequired).omit({
  id: true,
  createdAt: true
});

export const insertResourceSchema = createInsertSchema(resources).omit({
  id: true,
  publishedAt: true,
});

export const insertTestimonialSchema = createInsertSchema(testimonials).omit({
  id: true,
});

export const insertSubscriberSchema = createInsertSchema(subscribers).omit({
  id: true,
  subscribedAt: true,
  active: true,
});

/**
 * @typedef {Object} User
 * @property {number} id
 * @property {string} username
 * @property {string} email
 * @property {string} fullName
 * @property {string} [phone]
 * @property {string} role
 * @property {Date} createdAt
 */

/**
 * @typedef {Object} Filing
 * @property {number} id
 * @property {string} service
 * @property {string} [subService]
 * @property {string} title
 * @property {string} description
 * @property {string} [filePath]
 * @property {Date} createdAt
 * @property {Date} updatedAt
 */

/**
 * @typedef {Object} DocumentRequired
 * @property {number} id
 * @property {number} filingId
 * @property {string} documentName
 * @property {Date} createdAt
 */

// Export validation schemas for runtime type checking
export const schemas = {
  user: insertUserSchema,
  inquiry: insertInquirySchema,
  service: insertServiceSchema,
  filing: insertFilingSchema,
  documentRequired: insertDocumentRequiredSchema,
  resource: insertResourceSchema,
  testimonial: insertTestimonialSchema,
  subscriber: insertSubscriberSchema
};
