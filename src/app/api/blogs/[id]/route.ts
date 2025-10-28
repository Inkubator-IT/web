import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = parseInt(searchParams.get('id') || '0')
  const slug = searchParams.get('slug')

  if (!id && !slug) {
    return NextResponse.json({ error: 'Blog ID or slug is required' }, { status: 400 })
  }

  const blog = await prisma.blog.findUnique({
    where: id ? { id } : { slug: slug! },
    include: {
      tags: {
        include: {
          tag: true
        }
      }
    }
  })

  if (!blog) {
    return NextResponse.json({ error: 'Blog not found' }, { status: 404 })
  }

  return NextResponse.json(blog)
}

export async function PUT(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = parseInt(searchParams.get('id') || '0')
  const body = await request.json()
  const { title, author, slug, excerpt, thumbnail, content, tagIds } = body

  if (!id) {
    return NextResponse.json({ error: 'Blog ID is required' }, { status: 400 })
  }

  const blog = await prisma.blog.update({
    where: { id },
    data: {
      title,
      author,
      slug,
      excerpt,
      thumbnail,
      content,
      tags: {
        deleteMany: {},
        create: tagIds?.map((tagId: number) => ({
          tag: { connect: { id: tagId } }
        })) || []
      }
    },
    include: {
      tags: {
        include: {
          tag: true
        }
      }
    }
  })

  return NextResponse.json(blog)
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = parseInt(searchParams.get('id') || '0')

  if (!id) {
    return NextResponse.json({ error: 'Blog ID is required' }, { status: 400 })
  }

  await prisma.blog.delete({
    where: { id }
  })

  return NextResponse.json({ message: 'Blog deleted successfully' })
}
