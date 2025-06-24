import express from 'express';
import { PrismaClient } from '@prisma/client';
import { body, validationResult } from 'express-validator';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const router = express.Router();
const prisma = new PrismaClient();

// Ensure uploads directory exists
const uploadsDir = 'uploads/';
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'image/jpeg', 'image/jpg', 'image/png',
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  }
});

// Error handling middleware for multer
const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File too large. Maximum size is 50MB.' });
    }
    return res.status(400).json({ error: err.message });
  } else if (err) {
    return res.status(400).json({ error: err.message });
  }
  next();
};

// Validation middleware
const validateService = [
  body('name').trim().notEmpty().withMessage('Service name is required'),
  body('description').optional().trim()
];

const validateSubService = [
  body('name').trim().notEmpty().withMessage('Sub-service name is required'),
  body('description').optional().trim()
];

// Get all services with their sub-services
router.get('/', async (req, res) => {
  try {
    const services = await prisma.service.findMany({
      include: {
        subServices: true
      }
    });
    res.json(services);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch services' });
  }
});

// Create new service
router.post('/', validateService, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name } = req.body;
    const service = await prisma.service.create({
      data: {
        name
      }
    });
    res.status(201).json(service);
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'Service name already exists' });
    }
    res.status(500).json({ error: 'Failed to create service' });
  }
});

// Get service by ID
router.get('/:id', async (req, res) => {
  try {
    const service = await prisma.service.findUnique({
      where: { id: parseInt(req.params.id) },
      include: {
        subServices: true
      }
    });

    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }

    res.json(service);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch service' });
  }
});

// Update service
router.put('/:id', validateService, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, description } = req.body;
    const service = await prisma.service.update({
      where: { id: parseInt(req.params.id) },
      data: {
        name,
        description
      }
    });
    res.json(service);
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'Service name already exists' });
    }
    res.status(500).json({ error: 'Failed to update service' });
  }
});

// Delete service
router.delete('/:id', async (req, res) => {
  try {
    await prisma.service.delete({
      where: { id: parseInt(req.params.id) }
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete service' });
  }
});

// Sub-service routes
// Get all sub-services for a service
router.get('/:serviceId/sub-services', async (req, res) => {
  try {
    const subServices = await prisma.subService.findMany({
      where: {
        serviceId: parseInt(req.params.serviceId)
      }
    });
    res.json(subServices);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch sub-services' });
  }
});

// Create new sub-service
router.post('/:serviceId/sub-services', validateSubService, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, description } = req.body;
    const subService = await prisma.subService.create({
      data: {
        name,
        description,
        serviceId: parseInt(req.params.serviceId)
      }
    });
    res.status(201).json(subService);
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'Sub-service name already exists for this service' });
    }
    res.status(500).json({ error: 'Failed to create sub-service' });
  }
});

// Update sub-service
router.put('/:serviceId/sub-services/:id', validateSubService, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, description } = req.body;
    const subService = await prisma.subService.update({
      where: { id: parseInt(req.params.id) },
      data: {
        name,
        description
      }
    });
    res.json(subService);
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'Sub-service name already exists for this service' });
    }
    res.status(500).json({ error: 'Failed to update sub-service' });
  }
});

// Delete sub-service
router.delete('/:serviceId/sub-services/:id', async (req, res) => {
  try {
    await prisma.subService.delete({
      where: { id: parseInt(req.params.id) }
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete sub-service' });
  }
});

// Filing routes
// Add filing to a service
router.post('/:serviceId/filings', upload.single('file'), handleMulterError, async (req, res) => {
  try {
    const { title, description, documentsRequired } = req.body;
    const serviceId = parseInt(req.params.serviceId);
    const file = req.file;
    
    // Validate required fields
    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }
    
    console.log('File upload:', file);
    console.log('Request body:', req.body);
    
    // Check if service exists
    const service = await prisma.service.findUnique({
      where: { id: serviceId },
      include: { subServices: true }
    });
    console.log('Service found:', service);
    
    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }

    // Check if service has subservices
    if (service.subServices.length > 0) {
      return res.status(400).json({ 
        error: 'Cannot add filing directly to service with subservices' 
      });
    }

    // Parse documentsRequired safely
    let parsedDocumentsRequired = [];
    try {
      parsedDocumentsRequired = documentsRequired ? JSON.parse(documentsRequired) : [];
    } catch (parseError) {
      console.error('Error parsing documentsRequired:', parseError);
      return res.status(400).json({ error: 'Invalid documentsRequired format' });
    }

    const filing = await prisma.filing.create({
      data: {
        title,
        description: description || '',
        filePath: file ? `/uploads/${file.filename}` : null,
        documents: {
          create: parsedDocumentsRequired.map(docName => ({
            name: docName
          }))
        },
        serviceId
      }
    });

    res.status(201).json(filing);
  } catch (error) {
    console.error('Filing creation error:', error);
    
    // Handle specific Prisma errors
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'Filing with this title already exists' });
    }
    if (error.code === 'P2003') {
      return res.status(400).json({ error: 'Invalid service ID' });
    }
    
    res.status(500).json({ error: 'Failed to create filing', details: error.message });
  }
});

// Add filing to a subservice
router.post('/:serviceId/sub-services/:subServiceId/filings', upload.single('file'), handleMulterError, async (req, res) => {
  try {
    const { title, description, documentsRequired } = req.body;
    const serviceId = parseInt(req.params.serviceId);
    const subServiceId = parseInt(req.params.subServiceId);
    const file = req.file;

    // Validate required fields
    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    console.log('Subservice filing - File upload:', file);
    console.log('Subservice filing - Request body:', req.body);

    // Check if subservice exists and belongs to the service
    const subService = await prisma.subService.findFirst({
      where: {
        id: subServiceId,
        serviceId: serviceId
      }
    });

    if (!subService) {
      return res.status(404).json({ error: 'Subservice not found' });
    }

    // Parse documentsRequired safely
    let parsedDocumentsRequired = [];
    try {
      parsedDocumentsRequired = documentsRequired ? JSON.parse(documentsRequired) : [];
    } catch (parseError) {
      console.error('Error parsing documentsRequired:', parseError);
      return res.status(400).json({ error: 'Invalid documentsRequired format' });
    }

    const filing = await prisma.filing.create({
      data: {
        title,
        description: description || '',
        filePath: file ? `/uploads/${file.filename}` : null,
        documents: {
          create: parsedDocumentsRequired.map(docName => ({
            name: docName
          }))
        },
        serviceId,
        subServiceId
      }
    });

    res.status(201).json(filing);
  } catch (error) {
    console.error('Subservice filing creation error:', error);
    
    // Handle specific Prisma errors
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'Filing with this title already exists' });
    }
    if (error.code === 'P2003') {
      return res.status(400).json({ error: 'Invalid service or subservice ID' });
    }
    
    res.status(500).json({ error: 'Failed to create filing', details: error.message });
  }
});

// Get all filings for a service
router.get('/:serviceId/filings', async (req, res) => {
  try {
    const serviceId = parseInt(req.params.serviceId);
    const filings = await prisma.filing.findMany({
      where: {
        serviceId,
        subServiceId: null // Only get direct service filings
      },
      include: {
        documents: true
      }
    });
    res.json(filings);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch filings' });
  }
});

// Get all filings for a subservice
router.get('/:serviceId/sub-services/:subServiceId/filings', async (req, res) => {
  try {
    const subServiceId = parseInt(req.params.subServiceId);
    const filings = await prisma.filing.findMany({
      where: {
        subServiceId
      },
      include: {
        documents: true
      }
    });
    res.json(filings);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch filings' });
  }
});

// Get individual filing by ID for a service
router.get('/:serviceId/filings/:filingId', async (req, res) => {
  try {
    const serviceId = parseInt(req.params.serviceId);
    const filingId = parseInt(req.params.filingId);
    
    const filing = await prisma.filing.findFirst({
      where: {
        id: filingId,
        serviceId: serviceId,
        subServiceId: null // Only get direct service filings
      },
      include: {
        service: true,
        subService: true,
        documents: true
      }
    });

    if (!filing) {
      return res.status(404).json({ error: 'Filing not found' });
    }

    res.json(filing);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch filing' });
  }
});

// Get individual filing by ID for a subservice
router.get('/:serviceId/sub-services/:subServiceId/filings/:filingId', async (req, res) => {
  try {
    const serviceId = parseInt(req.params.serviceId);
    const subServiceId = parseInt(req.params.subServiceId);
    const filingId = parseInt(req.params.filingId);
    
    const filing = await prisma.filing.findFirst({
      where: {
        id: filingId,
        serviceId: serviceId,
        subServiceId: subServiceId
      },
      include: {
        service: true,
        subService: true,
        documents: true
      }
    });

    if (!filing) {
      return res.status(404).json({ error: 'Filing not found' });
    }

    res.json(filing);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch filing' });
  }
});

export default router; 