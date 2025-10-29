import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = parseInt(searchParams.get('id') || '0')

  if (!id) {
    return NextResponse.json({ error: 'Tag ID is required' }, { status: 400 })
  }

  const tag = await prisma.tag.findUnique({
    where: { id }
  })

  if (!tag) {
    return NextResponse.json({ error: 'Tag not found' }, { status: 404 })
  }

  return NextResponse.json(tag)
}

export async function PUT(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = parseInt(searchParams.get('id') || '0')
  const body = await request.json()
  const { name, description } = body

  if (!id) {
    return NextResponse.json({ error: 'Tag ID is required' }, { status: 400 })
  }

  const tag = await prisma.tag.update({
    where: { id },
    data: {
      name,
      description
    }
  })

  return NextResponse.json(tag)
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = parseInt(searchParams.get('id') || '0')

  if (!id) {
    return NextResponse.json({ error: 'Tag ID is required' }, { status: 400 })
  }

  await prisma.tag.delete({
    where: { id }
  })

  return NextResponse.json({ message: 'Tag deleted successfully' })
}
