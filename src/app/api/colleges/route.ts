import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search') || ''
    const state = searchParams.get('state') || ''
    const maxFees = searchParams.get('maxFees')
    const course = searchParams.get('course') || ''
    const page = parseInt(searchParams.get('page') || '1')
    const limit = 6

    const where: any = {}

    if (search) {
      where.name = { contains: search, mode: 'insensitive' }
    }
    if (state) {
      where.state = { equals: state, mode: 'insensitive' }
    }
    if (maxFees) {
      where.fees = { lte: parseInt(maxFees) }
    }
    if (course) {
      where.courses = { has: course }
    }

    const total = await prisma.college.count({ where })
    const colleges = await prisma.college.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { rating: 'desc' }
    })

    return NextResponse.json({ colleges, total, pages: Math.ceil(total / limit) })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch colleges' }, { status: 500 })
  }
}