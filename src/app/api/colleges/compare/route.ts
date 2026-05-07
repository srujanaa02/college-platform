import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const ids = searchParams.get('ids')?.split(',').map(Number)

    if (!ids || ids.length < 2) {
      return NextResponse.json({ error: 'Provide at least 2 college IDs' }, { status: 400 })
    }

    const colleges = await prisma.college.findMany({
      where: { id: { in: ids } }
    })

    return NextResponse.json(colleges)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to compare colleges' }, { status: 500 })
  }
}