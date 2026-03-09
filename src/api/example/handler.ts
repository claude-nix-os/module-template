import { NextRequest, NextResponse } from 'next/server';

/**
 * Example API Route Handler for ClaudeOS modules.
 *
 * To register this handler, add it to your module definition:
 *
 *   apiRoutes: [{
 *     path: '/api/modules/TEMPLATE_NAME/example',
 *     handler: 'api/example/handler',
 *     methods: ['GET', 'POST'],
 *   }]
 *
 * The handler follows Next.js App Router route handler conventions.
 */

interface ExampleItem {
  id: string;
  name: string;
  createdAt: string;
}

// In-memory store for demonstration - replace with actual data source
const items: ExampleItem[] = [];

/**
 * GET /api/modules/TEMPLATE_NAME/example
 * Returns all items.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get('limit') ?? '50', 10);
  const offset = parseInt(searchParams.get('offset') ?? '0', 10);

  const paged = items.slice(offset, offset + limit);

  return NextResponse.json({
    items: paged,
    total: items.length,
    limit,
    offset,
  });
}

/**
 * POST /api/modules/TEMPLATE_NAME/example
 * Creates a new item.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.name || typeof body.name !== 'string') {
      return NextResponse.json(
        { error: 'Missing required field: name' },
        { status: 400 }
      );
    }

    const item: ExampleItem = {
      id: crypto.randomUUID(),
      name: body.name,
      createdAt: new Date().toISOString(),
    };

    items.push(item);

    return NextResponse.json(item, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    );
  }
}
