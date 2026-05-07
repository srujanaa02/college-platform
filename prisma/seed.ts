import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const colleges = [
    { name: "IIT Bombay", location: "Mumbai", state: "Maharashtra", fees: 250000, rating: 4.8, courses: ["B.Tech", "M.Tech", "MBA", "PhD"], placement: 95, description: "Premier engineering institute known for research and innovation.", established: 1958 },
    { name: "IIT Delhi", location: "New Delhi", state: "Delhi", fees: 240000, rating: 4.7, courses: ["B.Tech", "M.Tech", "MBA"], placement: 93, description: "Top-ranked IIT with excellent industry connections.", established: 1961 },
    { name: "NIT Trichy", location: "Tiruchirappalli", state: "Tamil Nadu", fees: 150000, rating: 4.3, courses: ["B.Tech", "M.Tech"], placement: 88, description: "One of the best NITs with strong placement record.", established: 1964 },
    { name: "BITS Pilani", location: "Pilani", state: "Rajasthan", fees: 500000, rating: 4.5, courses: ["B.Tech", "M.Sc", "MBA"], placement: 90, description: "Autonomous institute with excellent infrastructure.", established: 1964 },
    { name: "VIT Vellore", location: "Vellore", state: "Tamil Nadu", fees: 350000, rating: 4.0, courses: ["B.Tech", "M.Tech", "MBA"], placement: 82, description: "Private university with strong industry tie-ups.", established: 1984 },
    { name: "IIT Madras", location: "Chennai", state: "Tamil Nadu", fees: 230000, rating: 4.9, courses: ["B.Tech", "M.Tech", "PhD"], placement: 96, description: "Consistently ranked #1 in engineering in India.", established: 1959 },
    { name: "IIIT Hyderabad", location: "Hyderabad", state: "Telangana", fees: 300000, rating: 4.4, courses: ["B.Tech", "M.Tech", "PhD"], placement: 91, description: "Specializes in IT and research-focused programs.", established: 1998 },
    { name: "Manipal Institute of Technology", location: "Manipal", state: "Karnataka", fees: 420000, rating: 3.9, courses: ["B.Tech", "M.Tech", "MBA"], placement: 78, description: "Large private university with diverse programs.", established: 1957 },
    { name: "SRM Institute", location: "Chennai", state: "Tamil Nadu", fees: 380000, rating: 3.7, courses: ["B.Tech", "M.Tech", "MBA", "BCA"], placement: 75, description: "Popular private university with wide course offerings.", established: 1985 },
    { name: "IIT Kharagpur", location: "Kharagpur", state: "West Bengal", fees: 220000, rating: 4.6, courses: ["B.Tech", "M.Tech", "MBA", "PhD"], placement: 92, description: "Oldest IIT with vast campus and research facilities.", established: 1951 },
    { name: "Delhi Technological University", location: "New Delhi", state: "Delhi", fees: 180000, rating: 4.1, courses: ["B.Tech", "M.Tech", "MBA"], placement: 84, description: "State university with strong Delhi industry network.", established: 1941 },
    { name: "PSG College of Technology", location: "Coimbatore", state: "Tamil Nadu", fees: 120000, rating: 4.0, courses: ["B.Tech", "M.Tech", "MBA"], placement: 80, description: "Reputed private college in South India.", established: 1951 },
    { name: "NIT Warangal", location: "Warangal", state: "Telangana", fees: 140000, rating: 4.2, courses: ["B.Tech", "M.Tech"], placement: 86, description: "Premier NIT with excellent faculty and facilities.", established: 1959 },
    { name: "Amrita Vishwa Vidyapeetham", location: "Coimbatore", state: "Tamil Nadu", fees: 330000, rating: 3.8, courses: ["B.Tech", "M.Tech", "MBA", "BCA"], placement: 77, description: "Deemed university with multiple campuses.", established: 1994 },
    { name: "Jadavpur University", location: "Kolkata", state: "West Bengal", fees: 50000, rating: 4.3, courses: ["B.Tech", "M.Tech", "PhD"], placement: 85, description: "Government university with very affordable fees.", established: 1955 },
  ]

  for (const college of colleges) {
    await prisma.college.create({ data: college })
  }

  console.log('✅ Database seeded with 15 colleges')
}

main().catch(console.error).finally(() => prisma.$disconnect())