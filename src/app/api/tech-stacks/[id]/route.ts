import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = parseInt(searchParams.get('id') || '0')

  if (!id) {
    return NextResponse.json({ error: 'TechStack ID is required' }, { status: 400 })
  }

  const techStack = await prisma.techStack.findUnique({
    where: { id }
  })

  if (!techStack) {
    return NextResponse.json({ error: 'TechStack not found' }, { status: 404 })
  }

  return NextResponse.json(techStack)
}

export async function PUT(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = parseInt(searchParams.get('id') || '0')
  const body = await request.json()
  const { name, description } = body

  if (!id) {
    return NextResponse.json({ error: 'TechStack ID is required' }, { status: 400 })
  }

  const techStack = await prisma.techStack.update({
    where: { id },
    data: {
      name,
      description
    }
  })

  return NextResponse.json(techStack)
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = parseInt(searchParams.get('id') || '0')

  if (!id) {
    return NextResponse.json({ error: 'TechStack ID is required' }, { status: 400 })
  }

  await prisma.techStack.delete({
    where: { id }
  })

  return NextResponse.json({ message: 'TechStack deleted successfully' })
}
