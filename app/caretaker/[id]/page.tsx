'use client'

import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
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
  ChevronLeft,
  Stethoscope,
  Plus,
  Circle,
  Info,
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Separator } from '@/components/ui/separator'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

type TimelineEvent = {
  id: string
  date: string
  type: 'vital_sign' | 'medication' | 'note' | 'appointment'
  title: string
  description: string
  metadata?: Record<string, string | number>
}

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
    oxygenSaturation?: number
    lastUpdated: string
  }
  appointments: Array<{
    date: string
    type: string
    notes?: string
  }>
  timeline: TimelineEvent[]
}

export default function PatientDetails() {
  const params = useParams()
  const router = useRouter()
  const [patient, setPatient] = useState<PatientDetails | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        setIsLoading(true)
        setError(null)

        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500))

        // In a real application, this would be an API call like:
        // const response = await fetch(`/api/patients/${params.id}`)
        // const data = await response.json()

        // For now, we'll simulate the API response
        if (params.id === '1') {
          setPatient({
            id: '1',
            name: 'Juan Pérez',
            age: 75,
            condition: 'Hipertensión',
            status: 'stable',
            imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=200&h=200&auto=format&fit=crop',
            medicalHistory: 'Paciente con hipertensión controlada...',
            medications: [
              {
                name: 'Losartan',
                dosage: '50mg',
                frequency: 'Cada 12 horas'
              }
            ],
            vitals: {
              bloodPressure: '120/80',
              heartRate: 72,
              temperature: 36.5,
              oxygenSaturation: 95,
              lastUpdated: '2024-02-20T10:30:00'
            },
            appointments: [
              {
                date: '2024-03-15',
                type: 'Control mensual',
                notes: 'Revisión de presión arterial'
              }
            ],
            timeline: [
              {
                id: '1',
                date: '2024-02-21T15:30:00',
                type: 'vital_sign',
                title: 'Actualización de signos vitales',
                description: 'Presión arterial: 120/80, Temperatura: 36.5°C',
                metadata: {
                  bloodPressure: '120/80',
                  temperature: 36.5
                }
              },
              {
                id: '2',
                date: '2024-02-21T09:00:00',
                type: 'medication',
                title: 'Medicamento administrado',
                description: 'Losartan 50mg tomado según lo programado'
              },
              {
                id: '3',
                date: '2024-02-20T18:45:00',
                type: 'note',
                title: 'Observación del cuidador',
                description: 'Paciente reporta leve dolor de cabeza. Se sugiere monitorear presión arterial con mayor frecuencia.'
              },
              {
                id: '4',
                date: '2024-02-20T14:30:00',
                type: 'appointment',
                title: 'Cita médica programada',
                description: 'Control mensual con Dr. García confirmado para el 15/03/2024'
              },
              {
                id: '5',
                date: '2024-02-20T11:15:00',
                type: 'vital_sign',
                title: 'Control rutinario',
                description: 'Presión arterial: 118/75, Frecuencia cardíaca: 68 bpm',
                metadata: {
                  bloodPressure: '118/75',
                  heartRate: 68
                }
              },
              {
                id: '6',
                date: '2024-02-20T08:00:00',
                type: 'medication',
                title: 'Medicamento administrado',
                description: 'Losartan 50mg tomado según lo programado'
              }
            ]
          })
        } else if (params.id === '2') {
          setPatient({
            id: '2',
            name: 'María González',
            age: 82,
            condition: 'Diabetes',
            status: 'attention',
            imageUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=200&h=200&auto=format&fit=crop',
            medicalHistory: 'Paciente con diabetes tipo 2...',
            medications: [
              {
                name: 'Metformina',
                dosage: '850mg',
                frequency: 'Cada 8 horas'
              },
              {
                name: 'Insulina',
                dosage: '10 UI',
                frequency: 'Antes de cada comida'
              }
            ],
            vitals: {
              bloodPressure: '130/85',
              heartRate: 78,
              temperature: 36.7,
              oxygenSaturation: 95,
              lastUpdated: '2024-02-21T09:15:00'
            },
            appointments: [
              {
                date: '2024-03-01',
                type: 'Control diabetes',
                notes: 'Control de glucemia'
              }
            ],
            timeline: [
              {
                id: '1',
                date: '2024-02-21T15:30:00',
                type: 'vital_sign',
                title: 'Control de glucemia',
                description: 'Nivel de glucosa: 145 mg/dL, Presión arterial: 130/85',
                metadata: {
                  glucose: 145,
                  bloodPressure: '130/85'
                }
              },
              {
                id: '2',
                date: '2024-02-21T12:00:00',
                type: 'medication',
                title: 'Insulina administrada',
                description: 'Dosis de 10 UI antes del almuerzo'
              },
              {
                id: '3',
                date: '2024-02-21T09:00:00',
                type: 'medication',
                title: 'Medicamento oral',
                description: 'Metformina 850mg tomada con el desayuno'
              },
              {
                id: '4',
                date: '2024-02-20T19:30:00',
                type: 'note',
                title: 'Reporte de actividad física',
                description: 'Realizó caminata de 15 minutos después de la cena'
              },
              {
                id: '5',
                date: '2024-02-20T14:15:00',
                type: 'vital_sign',
                title: 'Control post-almuerzo',
                description: 'Nivel de glucosa: 160 mg/dL',
                metadata: {
                  glucose: 160
                }
              },
              {
                id: '6',
                date: '2024-02-20T08:30:00',
                type: 'note',
                title: 'Observación matutina',
                description: 'Paciente reporta haber dormido bien. Sin molestias significativas.'
              }
            ]
          })
        } else {
          setError('Paciente no encontrado')
        }

        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching patient data:', error)
        setError('Error al cargar los datos del paciente')
        setIsLoading(false)
      }
    }

    fetchPatientData()
  }, [params.id])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-b from-background via-background to-muted/50">
        <div className="space-y-4 text-center">
          <Stethoscope className="h-8 w-8 text-blue-500 animate-pulse mx-auto" />
          <p className="text-muted-foreground">Cargando información del paciente...</p>
        </div>
      </div>
    )
  }

  if (error || !patient) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-b from-background via-background to-muted/50">
        <div className="space-y-4 text-center">
          <User className="h-8 w-8 text-destructive mx-auto" />
          <p className="text-muted-foreground">{error || 'Paciente no encontrado'}</p>
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="mt-4"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Volver
          </Button>
        </div>
      </div>
    )
  }

  return (
    <ScrollArea className="h-screen w-full bg-gradient-to-b from-background/80 via-background/50 to-muted/30">
      <div className="container max-w-6xl mx-auto py-4 sm:py-8 px-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <Button
            variant="ghost"
            className="group hover:bg-blue-500/10"
            onClick={() => router.back()}
          >
            <ChevronLeft className="h-4 w-4 mr-2 group-hover:text-blue-500" />
            <span className="group-hover:text-blue-500">Volver</span>
          </Button>

          <Button
            className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white transition-colors"
            onClick={() => {
              console.log('Add new record')
            }}
          >
            <Plus className="h-4 w-4 mr-2" />
            Agregar Registro
          </Button>
        </div>

        <div className="space-y-4 sm:space-y-6">
          <Card className="border-0 shadow-xl glass-card hover:shadow-2xl">
            <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 sm:p-6">
              <Avatar className="h-16 w-16 border-2 border-muted-foreground/10">
                <AvatarImage src={patient.imageUrl} alt={patient.name} />
                <AvatarFallback className="bg-blue-500/10 text-blue-500">
                  <User className="h-8 w-8" />
                </AvatarFallback>
              </Avatar>
              <div className="space-y-1.5">
                <CardTitle className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                  {patient.name}
                </CardTitle>
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <span className="text-muted-foreground">{patient.age} años</span>
                  <Badge variant="secondary" className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/20">
                    {patient.condition}
                  </Badge>
                </div>
              </div>
            </CardHeader>
          </Card>

          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList className="w-full flex flex-wrap gap-2 h-auto glass-effect p-1">
              <TabsTrigger
                value="overview"
                className="flex-1 sm:flex-none data-[state=active]:bg-blue-500 data-[state=active]:text-white"
              >
                <Activity className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Resumen</span>
              </TabsTrigger>
              <TabsTrigger
                value="history"
                className="flex-1 sm:flex-none data-[state=active]:bg-blue-500 data-[state=active]:text-white"
              >
                <FileText className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Historial</span>
              </TabsTrigger>
              <TabsTrigger
                value="medications"
                className="flex-1 sm:flex-none data-[state=active]:bg-blue-500 data-[state=active]:text-white"
              >
                <Pill className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Medicamentos</span>
              </TabsTrigger>
              <TabsTrigger
                value="appointments"
                className="flex-1 sm:flex-none data-[state=active]:bg-blue-500 data-[state=active]:text-white"
              >
                <Calendar className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Citas</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4 min-h-[300px]">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Vital Signs Card */}
                <Card className="border-0 shadow-lg glass-card bg-card/50 backdrop-blur lg:col-span-3">
                  <CardHeader>
                    <CardTitle className="text-base sm:text-lg font-medium flex items-center gap-2">
                      <Activity className="h-5 w-5 text-blue-500" />
                      <strong>Signos Vitales Actuales</strong>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="p-4 rounded-lg glass-effect space-y-2">
                        <div className="flex items-center gap-2">
                          <p className="text-sm text-muted-foreground">Presión Arterial</p>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <Info className="h-4 w-4 text-muted-foreground hover:text-blue-500 transition-colors" />
                              </TooltipTrigger>
                              <TooltipContent className="max-w-xs">
                                <p>Monitorea la presión arterial para prevenir enfermedades cardiovasculares. En adultos mayores, valores ideales pueden ser menores a 140/90 mmHg, según condición médica.</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                        <p className="text-2xl font-semibold text-blue-500">{patient.vitals.bloodPressure}</p>
                      </div>

                      <div className="p-4 rounded-lg glass-effect space-y-2">
                        <div className="flex items-center gap-2">
                          <p className="text-sm text-muted-foreground">Frecuencia Cardíaca</p>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <Info className="h-4 w-4 text-muted-foreground hover:text-blue-500 transition-colors" />
                              </TooltipTrigger>
                              <TooltipContent className="max-w-xs">
                                <p>Indica la cantidad de latidos por minuto. En adultos mayores, un rango normal en reposo es de 60-80 bpm. Valores fuera de este rango pueden indicar arritmias.</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                        <p className="text-2xl font-semibold text-blue-500">{patient.vitals.heartRate} bpm</p>
                      </div>

                      <div className="p-4 rounded-lg glass-effect space-y-2">
                        <div className="flex items-center gap-2">
                          <p className="text-sm text-muted-foreground">Temperatura</p>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <Info className="h-4 w-4 text-muted-foreground hover:text-blue-500 transition-colors" />
                              </TooltipTrigger>
                              <TooltipContent className="max-w-xs">
                                <p>Mide el balance térmico del cuerpo. En adultos mayores, una temperatura normal puede estar entre 36.0-37.2 °C. Cambios leves pueden ser significativos.</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                        <p className="text-2xl font-semibold text-blue-500">{patient.vitals.temperature}°C</p>
                      </div>

                      <div className="p-4 rounded-lg glass-effect space-y-2">
                        <div className="flex items-center gap-2">
                          <p className="text-sm text-muted-foreground">Saturación O₂</p>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <Info className="h-4 w-4 text-muted-foreground hover:text-blue-500 transition-colors" />
                              </TooltipTrigger>
                              <TooltipContent className="max-w-xs">
                                <p>Refleja la eficiencia de oxigenación en sangre. En adultos mayores, un nivel saludable suele ser del 92-98%, dependiendo de la condición respiratoria.</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                        <p className="text-2xl font-semibold text-blue-500">{patient.vitals.oxygenSaturation || '95'}%</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Timeline Section */}
                <Card className="border-0 shadow-lg glass-card bg-card/50 backdrop-blur lg:col-span-3">
                  <CardHeader>
                    <CardTitle className="text-base sm:text-lg font-medium flex items-center gap-2">
                      <Activity className="h-5 w-5 text-blue-500" />
                      <strong>Línea de Tiempo</strong>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-8">
                      {patient.timeline.map((event, index) => (
                        <div key={event.id} className="relative pl-8 pb-8 last:pb-0">
                          {/* Timeline line */}
                          {index !== patient.timeline.length - 1 && (
                            <div className="absolute left-[11px] top-[24px] bottom-0 w-[2px] bg-blue-500/30" />
                          )}

                          {/* Timeline dot */}
                          <div className="absolute left-0 top-1">
                            <Circle className="h-6 w-6 fill-blue-500/20 text-blue-500" />
                          </div>

                          {/* Content */}
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-blue-500">
                                {new Date(event.date).toLocaleString()}
                              </span>
                              <Badge variant="secondary" className="bg-blue-500/10 text-blue-500">
                                {event.type === 'vital_sign' && 'Signos Vitales'}
                                {event.type === 'medication' && 'Medicamento'}
                                {event.type === 'note' && 'Nota'}
                                {event.type === 'appointment' && 'Cita'}
                              </Badge>
                            </div>
                            <h4 className="text-base font-medium">{event.title}</h4>
                            <p className="text-sm text-muted-foreground">{event.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="history" className="space-y-4 min-h-[300px]">
              <Card className="border-0 shadow-lg glass-card p-4 sm:p-6">
                <div className="prose prose-sm sm:prose max-w-none">
                  {patient.medicalHistory}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="medications" className="space-y-4 min-h-[300px]">
              <div className="grid gap-4">
                {patient.medications.map((med, index) => (
                  <Card key={index} className="border-0 shadow-lg glass-card hover:bg-white/10">
                    <CardContent className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
                          <Pill className="h-5 w-5 text-blue-500" />
                        </div>
                        <div>
                          <p className="font-medium">{med.name}</p>
                          <p className="text-sm text-muted-foreground">{med.dosage}</p>
                        </div>
                      </div>
                      <Badge variant="secondary" className="bg-blue-500/10 text-blue-500">
                        {med.frequency}
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="appointments" className="space-y-4 min-h-[300px]">
              <div className="grid gap-4">
                {patient.appointments.map((appointment, index) => (
                  <Card key={index} className="border-0 shadow-lg glass-card hover:bg-white/10">
                    <CardContent className="p-4">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
                            <Calendar className="h-5 w-5 text-blue-500" />
                          </div>
                          <div>
                            <p className="font-medium">{appointment.type}</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(appointment.date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                      {appointment.notes && (
                        <>
                          <Separator className="my-4" />
                          <p className="text-sm text-muted-foreground">{appointment.notes}</p>
                        </>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ScrollArea>
  )
}
