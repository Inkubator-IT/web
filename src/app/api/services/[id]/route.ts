import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = parseInt(searchParams.get('id') || '0')

  if (!id) {
    return NextResponse.json({ error: 'Service ID is required' }, { status: 400 })
  }

  const service = await prisma.service.findUnique({
    where: { id }
  })

  if (!service) {
    return NextResponse.json({ error: 'Service not found' }, { status: 404 })
  }

  return NextResponse.json(service)
}

export async function PUT(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = parseInt(searchParams.get('id') || '0')
  const body = await request.json()
  const { name, description } = body

  if (!id) {
    return NextResponse.json({ error: 'Service ID is required' }, { status: 400 })
  }

  const service = await prisma.service.update({
    where: { id },
    data: {
      name,
      description
    }
  })

  return NextResponse.json(service)
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = parseInt(searchParams.get('id') || '0')

  if (!id) {
    return NextResponse.json({ error: 'Service ID is required' }, { status: 400 })
  }

  await prisma.service.delete({
    where: { id }
  })

  return NextResponse.json({ message: 'Service deleted successfully' })
}
