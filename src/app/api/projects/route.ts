import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const projects = await prisma.project.findMany({
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

  return NextResponse.json(projects)
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { title, description, owner, url, testimonial, tagIds, techStackIds } = body

  const project = await prisma.project.create({
    data: {
      title,
      description,
      owner,
      url,
      testimonial,
      tags: {
        create: tagIds?.map((tagId: number) => ({
          tag: { connect: { id: tagId } }
        })) || []
      },
      techStacks: {
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
