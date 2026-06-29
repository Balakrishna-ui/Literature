import { NextResponse } from 'next/server';
import { writeFile, readdir, unlink, stat } from 'fs/promises';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { existsSync, mkdirSync } from 'fs';

const uploadDir = join(process.cwd(), 'public', 'uploads');

// Ensure directory exists
if (!existsSync(uploadDir)) {
  mkdirSync(uploadDir, { recursive: true });
}

export async function GET() {
  try {
    const files = await readdir(uploadDir);
    const mediaFiles = [];
    
    for (const file of files) {
      if (file.startsWith('.')) continue; // skip hidden
      const stats = await stat(join(uploadDir, file));
      mediaFiles.push({
        name: file,
        url: `/uploads/${file}`,
        size: stats.size,
        createdAt: stats.birthtime,
      });
    }
    
    // Sort newest first
    mediaFiles.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    
    return NextResponse.json({ success: true, files: mediaFiles });
  } catch (error) {
    console.error('Error reading media directory:', error);
    return NextResponse.json({ success: false, error: 'Failed to read media' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uniqueId = uuidv4();
    const originalName = file.name.replace(/\s+/g, '-');
    const filename = `${uniqueId}-${originalName}`;
    const filepath = join(uploadDir, filename);
    
    await writeFile(filepath, buffer);
    const url = `/uploads/${filename}`;
    
    return NextResponse.json({ success: true, url, name: filename });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ success: false, error: 'Upload failed' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get('filename');
    
    if (!filename || filename.includes('..') || filename.includes('/')) {
      return NextResponse.json({ success: false, error: 'Invalid filename' }, { status: 400 });
    }

    const filepath = join(uploadDir, filename);
    
    if (existsSync(filepath)) {
      await unlink(filepath);
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting file:', error);
    return NextResponse.json({ success: false, error: 'Delete failed' }, { status: 500 });
  }
}
