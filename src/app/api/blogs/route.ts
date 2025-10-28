import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const blogs = await prisma.blog.findMany({
    include: {
      tags: {
        include: {
          tag: true
        }
      }
    },
    orderBy: { createdAt: 'desc' }
  })

  return NextResponse.json(blogs)
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { title, author, slug, excerpt, thumbnail, content, tagIds } = body

  const blog = await prisma.blog.create({
    data: {
      title,
      author,
      slug,
      excerpt,
      thumbnail,
      content,
      tags: {
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
