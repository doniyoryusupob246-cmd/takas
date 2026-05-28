import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const file = form.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'Dosya bulunamadı (Файл не найден)' }, { status: 400 });
    }

    const blob = await put(file.name, file, { access: 'public', addRandomSuffix: true });
    return NextResponse.json(blob);
  } catch (error) {
    console.error('Ошибка загрузки в Vercel Blob:', error);
    return NextResponse.json({ error: 'Yükleme başarısız' }, { status: 500 });
  }
}
