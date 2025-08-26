import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function GET() {
  try {
    const backendUrl = `${process.env.NEXT_PUBLIC_API_URL}/seat/change`;
    
    const response = await fetch(backendUrl, {
      headers: {
        'Accept': 'text/event-stream',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      return new NextResponse('Backend connection failed', { 
        status: response.status 
      });
    }

    const headers = new Headers();
    headers.set('Content-Type', 'text/event-stream; charset=utf-8');
    headers.set('Cache-Control', 'no-cache, no-transform');
    headers.set('Connection', 'keep-alive');
    headers.set('Transfer-Encoding', 'chunked');

    const stream = new ReadableStream({
      async start(controller) {
        const reader = response.body?.getReader();
        if (!reader) {
          controller.close();
          return;
        }

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) {
              controller.close();
              break;
            }
            controller.enqueue(value);
          }
        } catch (error) {
          console.error(error);
          controller.error(error);
        } finally {
          reader.releaseLock();
        }
      },
    });

    return new NextResponse(stream, { headers });
  } catch (error) {
    console.error(error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
