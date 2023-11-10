import axios from 'axios';
import { NextResponse } from 'next/server';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const POST = async (request: Request) => {
  if (!process.env.WEBHOOK) {
    return NextResponse.json({ message: 'No WEBHOOK' });
  }

  const formData = await request.formData();
  const file: any = formData.get('file');

  if (!file) {
    return NextResponse.json({ message: 'No file' });
  }

  // .jpg, .jpeg, .png, .webp, and .gif
  if (
    file.type !== 'image/png' &&
    file.type !== 'image/jpeg' &&
    file.type !== 'image/jpg' &&
    file.type !== 'image/webp' &&
    file.type !== 'image/gif'
  ) {
    return NextResponse.json({
      message: 'Invalid file type. Discord only allow PNG, JPEG, JPG, WebP, GIF',
    });
  }

  // 25MB
  if (file.size > 25 * 1024 * 1024) {
    return NextResponse.json({
      message: 'Invalid file size. Discord only allow smaller than 25MB',
    });
  }

  await delay(2000);

  const r: any = await axios({
    method: 'post',
    url: process.env.WEBHOOK,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: formData,
  });

  return NextResponse.json({ message: 'success', url: r.data.attachments[0].url, name: file.name });
};
