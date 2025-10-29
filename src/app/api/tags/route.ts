import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const tags = await prisma.tag.findMany({
    orderBy: { name: 'asc' }
  })

  return NextResponse.json(tags)
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { name, description } = body

  const tag = await prisma.tag.create({
    data: {
      name,
      description
    }
  })

  return NextResponse.json(tag)
}
