import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const clientInfos = await prisma.clientInfo.findMany({
    orderBy: { createdAt: 'desc' }
  })

  return NextResponse.json(clientInfos)
}

export async function POST(request: NextRequest) {
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

  const clientInfo = await prisma.clientInfo.create({
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
