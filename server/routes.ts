import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertInquirySchema, insertSubscriberSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes
  const apiRouter = app.route('/api');

  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertInquirySchema.parse(req.body);
      const inquiry = await storage.createInquiry(validatedData);
      res.status(201).json({ 
        message: "Inquiry submitted successfully", 
        inquiry 
      });
    } catch (error) {
      res.status(400).json({ 
        message: "Invalid inquiry data", 
        error: (error as Error).message 
      });
    }
  });

  // Newsletter subscription
  app.post("/api/subscribe", async (req, res) => {
    try {
      const validatedData = insertSubscriberSchema.parse(req.body);
      const subscriber = await storage.createSubscriber(validatedData);
      res.status(201).json({ 
        message: "Subscription successful", 
        subscriber 
      });
    } catch (error) {
      res.status(400).json({ 
        message: "Invalid subscription data", 
        error: (error as Error).message 
      });
    }
  });

  // Get all services
  app.get("/api/services", async (_req, res) => {
    try {
      const services = await storage.getServices();
      res.status(200).json(services);
    } catch (error) {
      res.status(500).json({ 
        message: "Failed to fetch services", 
        error: (error as Error).message 
      });
    }
  });

  // Get service by slug
  app.get("/api/services/:slug", async (req, res) => {
    try {
      const service = await storage.getServiceBySlug(req.params.slug);
      if (!service) {
        return res.status(404).json({ message: "Service not found" });
      }
      res.status(200).json(service);
    } catch (error) {
      res.status(500).json({ 
        message: "Failed to fetch service", 
        error: (error as Error).message 
      });
    }
  });

  // Get all resources/articles
  app.get("/api/resources", async (_req, res) => {
    try {
      const resources = await storage.getResources();
      res.status(200).json(resources);
    } catch (error) {
      res.status(500).json({ 
        message: "Failed to fetch resources", 
        error: (error as Error).message 
      });
    }
  });

  // Get resource by slug
  app.get("/api/resources/:slug", async (req, res) => {
    try {
      const resource = await storage.getResourceBySlug(req.params.slug);
      if (!resource) {
        return res.status(404).json({ message: "Resource not found" });
      }
      res.status(200).json(resource);
    } catch (error) {
      res.status(500).json({ 
        message: "Failed to fetch resource", 
        error: (error as Error).message 
      });
    }
  });

  // Get featured testimonials
  app.get("/api/testimonials", async (_req, res) => {
    try {
      const testimonials = await storage.getTestimonials();
      res.status(200).json(testimonials);
    } catch (error) {
      res.status(500).json({ 
        message: "Failed to fetch testimonials", 
        error: (error as Error).message 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
