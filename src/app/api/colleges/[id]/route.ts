import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const college = await prisma.college.findUnique({
      where: { id: parseInt(params.id) }
    })
    if (!college) {
      return NextResponse.json({ error: 'College not found' }, { status: 404 })
    }
    return NextResponse.json(college)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch college' }, { status: 500 })
  }
}