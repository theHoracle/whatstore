# WhatStore Frontend MDC (Markdown Documentation Convention)

## File Upload and Storage Workflow

### Image Upload Flow
1. Images are first uploaded to Supabase storage
2. The returned URLs are then sent to our API
3. API stores the image URLs in the database
4. No FormData is used for API calls - all requests are JSON

### File Validation Rules
- Maximum file size: 5MB
- Accepted image formats: jpg, jpeg, png, webp
- File validation happens on the client side using Zod schemas

## Form Schemas

### Store Preferences
- Store logo: Required, must be a valid image file
- Store name: Minimum 3 characters
- Store URL: Minimum 3 characters, must be unique
- Store description: Minimum 20 characters
- WhatsApp contact: Required
- Store address: Minimum 5 characters

### Products
- Name: Minimum 3 characters
- Description: Minimum 20 characters
- Price: Positive number
- Stock: Positive number
- Images: At least one required, all must be valid image files
- Category: Required

### Services
- Name: Minimum 3 characters
- Description: Minimum 20 characters
- Rate: Positive number
- Image: Single image required, must be a valid image file

## API Conventions
- All requests and responses are JSON
- Image URLs are stored as strings
- File uploads are handled separately from data creation
- Timestamps use ISO 8601 format

## State Management
- Form state: React Hook Form + Zod
- App state: Zustand
- Server state: React Query (planned)

## Type Conventions
- Use discriminated unions for form types with different variants
- Separate form schema types from API response types
- Always use TypeScript strict mode