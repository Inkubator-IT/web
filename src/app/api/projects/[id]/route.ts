import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = parseInt(searchParams.get('id') || '0')

  if (!id) {
    return NextResponse.json({ error: 'Project ID is required' }, { status: 400 })
  }

  const project = await prisma.project.findUnique({
    where: { id },
    include: {
      tags: {
        include: {
          tag: true
        }
      },
      techStacks: {
        include: {
          techStack: true
        }
      }
    }
  })

  if (!project) {
    return NextResponse.json({ error: 'Project not found' }, { status: 404 })
  }

  return NextResponse.json(project)
}

export async function PUT(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = parseInt(searchParams.get('id') || '0')
  const body = await request.json()
  const { title, description, owner, url, testimonial, tagIds, techStackIds } = body

  if (!id) {
    return NextResponse.json({ error: 'Project ID is required' }, { status: 400 })
  }

  const project = await prisma.project.update({
    where: { id },
    data: {
      title,
      description,
      owner,
      url,
      testimonial,
      tags: {
        deleteMany: {},
        create: tagIds?.map((tagId: number) => ({
          tag: { connect: { id: tagId } }
        })) || []
      },
      techStacks: {
        deleteMany: {},
        create: techStackIds?.map((techStackId: number) => ({
          techStack: { connect: { id: techStackId } }
        })) || []
      }
    },
    include: {
      tags: {
        include: {
          tag: true
        }
      },
      techStacks: {
        include: {
          techStack: true
        }
      }
    }
  })

  return NextResponse.json(project)
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = parseInt(searchParams.get('id') || '0')

  if (!id) {
    return NextResponse.json({ error: 'Project ID is required' }, { status: 400 })
  }

  await prisma.project.delete({
    where: { id }
  })

  return NextResponse.json({ message: 'Project deleted successfully' })
}
