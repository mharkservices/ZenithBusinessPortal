# API Troubleshooting Guide

## Common Issues and Solutions

### 1. Database Connection Issues
**Symptoms**: `Failed to fetch services` or Prisma connection errors
**Solutions**:
- Check your `.env` file has correct `DATABASE_URL`
- Ensure PostgreSQL is running
- Run database migrations: `npm run db:migrate`
- Generate Prisma client: `npm run db:generate`

### 2. File Upload Issues
**Symptoms**: File uploads fail or return errors
**Solutions**:
- Ensure `uploads/` directory exists (auto-created now)
- Check file size (max 50MB)
- Verify file type is allowed (JPEG, PNG, PDF, DOC, DOCX)
- Check disk space

### 3. Field Mismatch Errors
**Symptoms**: `Unknown field 'fileUrl'` or similar Prisma errors
**Solutions**:
- ✅ **FIXED**: Changed `fileUrl` to `filePath` in code
- Run `npm run db:migrate` to apply schema changes
- Run `npm run db:generate` to update Prisma client

### 4. Validation Errors
**Symptoms**: 400 Bad Request with validation errors
**Solutions**:
- Check required fields are provided
- Ensure `documentsRequired` is valid JSON array
- Verify service/subservice IDs exist

### 5. Server Not Starting
**Symptoms**: Port already in use or server won't start
**Solutions**:
- Check if port 5002 is available
- Kill existing processes: `npx kill-port 5002`
- Check for syntax errors in code

## Testing Your API

1. **Start the server**:
   ```bash
   npm run dev
   ```

2. **Run database migrations**:
   ```bash
   npm run db:migrate
   ```

3. **Test API endpoints**:
   ```bash
   node test-api.js
   ```

4. **Check server logs** for detailed error messages

## Debug Steps

1. **Check server logs** for error messages
2. **Verify database connection** with Prisma Studio: `npm run db:studio`
3. **Test individual endpoints** with Postman or curl
4. **Check file permissions** for uploads directory
5. **Verify environment variables** in `.env` file

## Common Error Codes

- **P2002**: Unique constraint violation (duplicate entry)
- **P2003**: Foreign key constraint violation (invalid ID)
- **P2025**: Record not found
- **400**: Bad request (validation errors)
- **404**: Not found
- **500**: Internal server error

## File Upload Testing

Test file upload with curl:
```bash
curl -X POST \
  http://localhost:5002/api/services/1/filings \
  -F "title=Test Filing" \
  -F "description=Test Description" \
  -F "documentsRequired=[]" \
  -F "file=@/path/to/your/file.pdf"
``` 