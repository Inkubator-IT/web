import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = parseInt(searchParams.get('id') || '0')

  if (!id) {
    return NextResponse.json({ error: 'ClientInfo ID is required' }, { status: 400 })
  }

  const clientInfo = await prisma.clientInfo.findUnique({
    where: { id }
  })

  if (!clientInfo) {
    return NextResponse.json({ error: 'ClientInfo not found' }, { status: 404 })
  }

  return NextResponse.json(clientInfo)
}

export async function PUT(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = parseInt(searchParams.get('id') || '0')
  const body = await request.json()
  const {
    namaLengkap,
    email,
    noWhatsapp,
    instansi,
    civitasItb,
    jenisProyek,
    tujuanPembuatanProyek,
    deskripsiProyek,
    ekspetasiBiaya,
    deadlineProyek,
    sudahMemilikiDesain,
    pertanyaanProyek,
    dimanaMengetahuiIit,
    ratingWebsite,
    masukanWebsite,
    kodePromo
  } = body

  if (!id) {
    return NextResponse.json({ error: 'ClientInfo ID is required' }, { status: 400 })
  }

  const clientInfo = await prisma.clientInfo.update({
    where: { id },
    data: {
      namaLengkap,
      email,
      noWhatsapp,
      instansi,
      civitasItb,
      jenisProyek,
      tujuanPembuatanProyek,
      deskripsiProyek,
      ekspetasiBiaya,
      deadlineProyek,
      sudahMemilikiDesain,
      pertanyaanProyek,
      dimanaMengetahuiIit,
      ratingWebsite,
      masukanWebsite,
      kodePromo
    }
  })

  return NextResponse.json(clientInfo)
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = parseInt(searchParams.get('id') || '0')

  if (!id) {
    return NextResponse.json({ error: 'ClientInfo ID is required' }, { status: 400 })
  }

  await prisma.clientInfo.delete({
    where: { id }
  })

  return NextResponse.json({ message: 'ClientInfo deleted successfully' })
}
