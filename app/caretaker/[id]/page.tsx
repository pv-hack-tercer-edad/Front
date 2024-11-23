'use client'

import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Card,  CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import {
  User,
  FileText,
  Pill,
  Activity,
  Calendar,
  ChevronLeft
} from 'lucide-react'
import { useRouter } from 'next/navigation'

type PatientDetails = {
  id: string
  name: string
  age: number
  condition: string
  status: 'stable' | 'attention' | 'critical'
  imageUrl?: string
  medicalHistory: string
  medications: Array<{
    name: string
    dosage: string
    frequency: string
  }>
  vitals: {
    bloodPressure: string
    heartRate: number
    temperature: number
    lastUpdated: string
  }
  appointments: Array<{
    date: string
    type: string
    notes?: string
  }>
}

export default function PatientDetails() {
  const params = useParams()
  const router = useRouter()
  const [patient, setPatient] = useState<PatientDetails | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // This would typically be an API call
    const fetchPatientData = async () => {
      try {
        // Simulated API response
        const data: PatientDetails = {
          id: params.id as string,
          name: 'Juan Pérez',
          age: 75,
          condition: 'Hipertensión',
          status: 'stable',
          medicalHistory: 'Paciente con hipertensión controlada...',
          medications: [
            {
              name: 'Losartan',
              dosage: '50mg',
              frequency: 'Cada 12 horas'
            },
            // Add more medications
          ],
          vitals: {
            bloodPressure: '120/80',
            heartRate: 72,
            temperature: 36.5,
            lastUpdated: '2024-02-20T10:30:00'
          },
          appointments: [
            {
              date: '2024-03-15',
              type: 'Control mensual',
              notes: 'Revisión de presión arterial'
            },
            // Add more appointments
          ]
        }
        setPatient(data)
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching patient data:', error)
        setIsLoading(false)
      }
    }

    fetchPatientData()
  }, [params.id])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!patient) {
    return <div>Patient not found</div>
  }

  return (
    <ScrollArea className="h-screen w-full bg-gradient-to-b from-background to-muted">
      <div className="container max-w-6xl mx-auto py-8 px-4">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => router.back()}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Volver
        </Button>

        <div className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={patient.imageUrl} alt={patient.name} />
                <AvatarFallback>
                  <User className="h-8 w-8" />
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-2xl">{patient.name}</CardTitle>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-muted-foreground">{patient.age} años</span>
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    {patient.condition}
                  </Badge>
                </div>
              </div>
            </CardHeader>
          </Card>

          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">
                <Activity className="h-4 w-4 mr-2" />
                Resumen
              </TabsTrigger>
              <TabsTrigger value="history">
                <FileText className="h-4 w-4 mr-2" />
                Historial
              </TabsTrigger>
              <TabsTrigger value="medications">
                <Pill className="h-4 w-4 mr-2" />
                Medicamentos
              </TabsTrigger>
              <TabsTrigger value="appointments">
                <Calendar className="h-4 w-4 mr-2" />
                Citas
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              {/* Render vitals and recent activity */}
            </TabsContent>

            <TabsContent value="history" className="space-y-4">
              {/* Render medical history */}
            </TabsContent>

            <TabsContent value="medications" className="space-y-4">
              {/* Render medications list */}
            </TabsContent>

            <TabsContent value="appointments" className="space-y-4">
              {/* Render appointments */}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ScrollArea>
  )
}
