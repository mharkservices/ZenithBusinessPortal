import express from 'express';
import { PrismaClient } from '@prisma/client';
import multer from 'multer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { body, validationResult } from 'express-validator';

const router = express.Router();
const prisma = new PrismaClient();

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, join(__dirname, '../../uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({
  storage,
  limits: {
    fileSize: process.env.MAX_FILE_SIZE || 52428800 // 50MB default
  }
});

// Validation middleware
const validateFiling = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('serviceId').isInt().withMessage('Valid service ID is required'),
  body('subServiceId').optional().isInt().withMessage('Valid sub-service ID is required'),
  body('documents').isArray().withMessage('Documents must be an array')
];

// Get all filings
router.get('/', async (req, res) => {
  try {
    const filings = await prisma.filing.findMany({
      include: {
        service: true,
        subService: true,
        documents: true
      }
    });
    res.json(filings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch filings' });
  }
});

// Create new filing
router.post('/', upload.single('file'), validateFiling, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, serviceId, subServiceId, documents } = req.body;
    const filePath = req.file ? `/uploads/${req.file.filename}` : null;

    const filing = await prisma.filing.create({
      data: {
        title,
        description,
        filePath,
        serviceId: parseInt(serviceId),
        subServiceId: subServiceId ? parseInt(subServiceId) : null,
        documents: {
          create: documents.map(doc => ({ name: doc }))
        }
      },
      include: {
        service: true,
        subService: true,
        documents: true
      }
    });

    res.status(201).json(filing);
  } catch (error) {
    console.error('Error creating filing:', error);
    res.status(500).json({ error: 'Failed to create filing' });
  }
});

// Get filing by ID
router.get('/:id', async (req, res) => {
  try {
    const filing = await prisma.filing.findUnique({
      where: { id: parseInt(req.params.id) },
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

// Update filing
router.put('/:id', upload.single('file'), validateFiling, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, serviceId, subServiceId, documents } = req.body;
    const filePath = req.file ? `/uploads/${req.file.filename}` : undefined;

    const filing = await prisma.filing.update({
      where: { id: parseInt(req.params.id) },
      data: {
        title,
        description,
        ...(filePath && { filePath }),
        serviceId: parseInt(serviceId),
        subServiceId: subServiceId ? parseInt(subServiceId) : null,
        documents: {
          deleteMany: {},
          create: documents.map(doc => ({ name: doc }))
        }
      },
      include: {
        service: true,
        subService: true,
        documents: true
      }
    });

    res.json(filing);
  } catch (error) {
    console.error('Error updating filing:', error);
    res.status(500).json({ error: 'Failed to update filing' });
  }
});

// Delete filing
router.delete('/:id', async (req, res) => {
  try {
    await prisma.filing.delete({
      where: { id: parseInt(req.params.id) }
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete filing' });
  }
});

export default router; 