import { NextResponse } from 'next/server';


export async function GET(
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
  
    const githubResponse = await fetch(`https://api.github.com/users/${encodeURIComponent(id)}`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Gwangju-talent-festival-Client',
      },
    });

    if (!githubResponse.ok) {
      if (githubResponse.status === 404) {
        return NextResponse.json(
          { error: 'not found' },
          { status: 404 }
        );
      }
      
      return NextResponse.json(
        { error: 'failed to fetch' },
        { status: githubResponse.status }
      );
    }

    const githubData = await githubResponse.json();
    
    return NextResponse.json(githubData);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'internal server error' },
      { status: 500 }
    );
  }
}
