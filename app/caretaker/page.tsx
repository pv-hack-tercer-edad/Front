'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Search, User, Clock, Calendar } from 'lucide-react'
import { cn } from '@/lib/utils'

type Patient = {
  id: string
  name: string
  age: number
  condition: string
  lastCheckup: string
  nextCheckup: string
  status: 'stable' | 'attention' | 'critical'
  imageUrl?: string
}

export default function CaretakerDashboard() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')

  // This would typically come from an API
  const patients: Patient[] = [
    {
      id: '1',
      name: 'Juan Pérez',
      age: 75,
      condition: 'Hipertensión',
      lastCheckup: '2024-02-15',
      nextCheckup: '2024-03-15',
      status: 'stable'
    },
    {
      id: '2',
      name: 'María González',
      age: 82,
      condition: 'Diabetes',
      lastCheckup: '2024-02-10',
      nextCheckup: '2024-03-01',
      status: 'attention'
    },
    // Add more patients as needed
  ]

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getStatusColor = (status: Patient['status']) => {
    switch (status) {
      case 'stable':
        return 'bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 border-emerald-500/20'
      case 'attention':
        return 'bg-amber-500/10 text-amber-500 hover:bg-amber-500/20 border-amber-500/20'
      case 'critical':
        return 'bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 border-rose-500/20'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const handlePatientClick = (patientId: string) => {
    router.push(`/caretaker/${patientId}`)
  }

  return (
    <ScrollArea className="h-screen w-full bg-gradient-to-b from-background/80 via-background/50 to-muted/30">
      <div className="container max-w-6xl mx-auto py-8 px-4">
        <div className="space-y-8">
          <div className="flex flex-col space-y-4">
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent tracking-tight">
              Mis Pacientes
            </h1>
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar pacientes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/50 backdrop-blur-sm border-muted-foreground/20 focus-visible:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredPatients.map((patient) => (
              <Card
                key={patient.id}
                onClick={() => handlePatientClick(patient.id)}
                className="border-0 shadow-lg glass-card bg-card/50 backdrop-blur cursor-pointer"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-14 w-14 border-2 border-muted-foreground/10 group-hover:border-blue-500/50 transition-colors">
                      <AvatarImage src={patient.imageUrl} alt={patient.name} />
                      <AvatarFallback className="bg-blue-500/10 text-blue-500">
                        <User className="h-6 w-6" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <CardTitle className="text-lg font-semibold tracking-tight group-hover:text-blue-500 transition-colors">
                        {patient.name}
                      </CardTitle>
                      <CardDescription className="text-sm text-muted-foreground">
                        {patient.age} años
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Badge
                    variant="secondary"
                    className={cn(
                      "w-fit transition-colors font-medium tracking-tight",
                      getStatusColor(patient.status)
                    )}
                  >
                    {patient.condition}
                  </Badge>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="h-4 w-4 text-blue-500" />
                        <span className="tracking-tight">Última visita</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-4 w-4 text-blue-500" />
                        <span className="tracking-tight">Próxima visita</span>
                      </div>
                    </div>
                    <div className="space-y-3 text-right font-medium tracking-tight">
                      <span className="block text-foreground">
                        {formatDate(patient.lastCheckup)}
                      </span>
                      <span className="block text-foreground">
                        {formatDate(patient.nextCheckup)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredPatients.length === 0 && (
            <Card className="border-0 shadow-lg glass-card bg-card/50 backdrop-blur">
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <div className="rounded-full bg-blue-500/10 p-4 mb-4">
                  <User className="h-8 w-8 text-blue-500" />
                </div>
                <h3 className="text-lg font-semibold">No se encontraron pacientes</h3>
                <p className="text-muted-foreground mt-1">
                  Intente con otros términos de búsqueda
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </ScrollArea>
  )
}
