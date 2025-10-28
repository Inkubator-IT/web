import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const techStacks = await prisma.techStack.findMany({
    orderBy: { name: 'asc' }
  })

  return NextResponse.json(techStacks)
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { name, description } = body

  const techStack = await prisma.techStack.create({
    data: {
      name,
      description
    }
  })

  return NextResponse.json(techStack)
}
