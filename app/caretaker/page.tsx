'use client'

import { useState } from 'react'
import { Users, Search, Filter, Plus, Calendar, Clock, MoreVertical } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'

// Types for our patient data
type Patient = {
  id: string
  name: string
  age: number
  condition: string
  status: 'stable' | 'attention' | 'critical'
  lastChecked: string
  nextCheckup: string
  avatar?: string
}

export default function CaretakerDashboard() {
  // Mock data - replace with actual API call
  const [patients] = useState<Patient[]>([
    {
      id: '1',
      name: 'María González',
      age: 75,
      condition: 'Hipertensión',
      status: 'stable',
      lastChecked: '2h atrás',
      nextCheckup: 'Hoy, 15:00',
    },
    {
      id: '2',
      name: 'Juan Pérez',
      age: 82,
      condition: 'Diabetes Tipo 2',
      status: 'attention',
      lastChecked: '5h atrás',
      nextCheckup: 'Mañana, 10:00',
    },
    {
      id: '3',
      name: 'Ana Silva',
      age: 68,
      condition: 'Artritis',
      status: 'critical',
      lastChecked: '1h atrás',
      nextCheckup: 'Hoy, 18:00',
    },
  ])

  const getStatusColor = (status: Patient['status']) => {
    switch (status) {
      case 'stable':
        return 'bg-green-500/10 text-green-500 hover:bg-green-500/20'
      case 'attention':
        return 'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20'
      case 'critical':
        return 'bg-red-500/10 text-red-500 hover:bg-red-500/20'
    }
  }

  const getStatusText = (status: Patient['status']) => {
    switch (status) {
      case 'stable':
        return 'Estable'
      case 'attention':
        return 'Atención'
      case 'critical':
        return 'Crítico'
    }
  }

  return (
    <ScrollArea className="h-screen w-full bg-gradient-to-b from-background to-muted">
      <div className="container max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <Card className="border-0 shadow-xl bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50">
          <CardHeader className="space-y-6 pb-8">
            <div className="space-y-2">
              <CardTitle className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent flex items-center gap-3">
                <Users className="h-8 w-8 sm:h-10 sm:w-10" />
                Mis Pacientes
              </CardTitle>
              <CardDescription className="text-sm sm:text-base text-muted-foreground">
                Gestione y monitoree el estado de sus pacientes asignados
              </CardDescription>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar pacientes..."
                  className="pl-9 w-full"
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="gap-2">
                  <Filter className="h-4 w-4" />
                  Filtrar
                </Button>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Nuevo Paciente
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              {patients.map((patient) => (
                <div
                  key={patient.id}
                  className="group relative rounded-lg border p-4 hover:bg-accent transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex gap-4">
                      <Avatar className="h-12 w-12 sm:h-14 sm:w-14">
                        <AvatarImage src={patient.avatar} />
                        <AvatarFallback>
                          {patient.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <h3 className="font-semibold leading-none">{patient.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {patient.age} años - {patient.condition}
                        </p>
                        <Badge
                          variant="secondary"
                          className={cn(
                            "mt-2",
                            getStatusColor(patient.status)
                          )}
                        >
                          {getStatusText(patient.status)}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-end sm:items-center gap-4">
                      <div className="hidden sm:flex flex-col items-end gap-1">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          Última revisión: {patient.lastChecked}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          Próxima visita: {patient.nextCheckup}
                        </div>
                      </div>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Ver perfil</DropdownMenuItem>
                          <DropdownMenuItem>Actualizar estado</DropdownMenuItem>
                          <DropdownMenuItem>Historial médico</DropdownMenuItem>
                          <DropdownMenuItem>Programar visita</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>

                  <div className="sm:hidden mt-4 space-y-1">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      Última revisión: {patient.lastChecked}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      Próxima visita: {patient.nextCheckup}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </ScrollArea>
  )
}
