import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const services = await prisma.service.findMany({
    orderBy: { name: 'asc' }
  })

  return NextResponse.json(services)
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { name, description } = body

  const service = await prisma.service.create({
    data: {
      name,
      description
    }
  })

  return NextResponse.json(service)
}
