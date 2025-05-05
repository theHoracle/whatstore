import { NextRequest, NextResponse } from 'next/server';

import { auth } from '@clerk/nextjs/server';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://3.87.225.158:8080/api/v1';

async function makeRequestWithRetry(request: NextRequest, method: string) {
  try {
    const { getToken } = await auth()
    const token = await getToken();

    const path = request.nextUrl.pathname.replace('/api/', '');
    const searchParams = request.nextUrl.search; // Get the search params
    const fullUrl = `${API_BASE_URL}/${path}${searchParams}`;
    console.log('API path:', path, 'Search params:', searchParams, "\nToken:", token);
    console.log('Full URL being sent to backend:', fullUrl);
    const body = method === 'POST' ? await request.json() : undefined;

    const response = await fetch(fullUrl, {
      method,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : undefined,
      // Add timeout
      signal: AbortSignal.timeout(10000), // 10 second timeout
    });

    console.log('Backend response status:', response.status);
    
    // Handle 404 responses explicitly
    if (response.status === 404) {
      return NextResponse.json(
        { error: 'Resource not found' },
        { status: 404 }
      );
    }

    // Try to parse JSON response, but handle cases where it's not JSON
    let responseData;
    try {
      responseData = await response.clone().json();
      console.log('Backend response data:', responseData);
    } catch (parseError) {
      console.error('Failed to parse JSON response:', parseError);
      const textResponse = await response.clone().text();
      console.log('Raw response:', textResponse);
      return NextResponse.json(
        { error: 'Invalid response format' },
        { status: response.status }
      );
    }

    if (response.status === 401) {
      // Token expired, get a new token and retry once
      const newToken = await getToken();
      const retryResponse = await fetch(fullUrl, {
        method,
        headers: {
          'Authorization': `Bearer ${newToken}`,
          'Content-Type': 'application/json',
        },
        body: body ? JSON.stringify(body) : undefined,
      });

      return retryResponse;
    }

    return response;
  } catch (error) {
    console.error('API request failed:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  return makeRequestWithRetry(request, 'GET');
}

export async function POST(request: NextRequest) {
  return makeRequestWithRetry(request, 'POST');
}

export async function PUT(request: NextRequest) {
  return makeRequestWithRetry(request, 'PUT');
}
export async function DELETE(request: NextRequest) {  
  return makeRequestWithRetry(request, 'DELETE');
}
export async function PATCH(request: NextRequest) {
  return makeRequestWithRetry(request, 'PATCH');
}