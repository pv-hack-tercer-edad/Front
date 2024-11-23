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
        return 'bg-green-500/10 text-green-500 hover:bg-green-500/20'
      case 'attention':
        return 'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20'
      case 'critical':
        return 'bg-red-500/10 text-red-500 hover:bg-red-500/20'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <ScrollArea className="h-screen w-full bg-gradient-to-b from-background to-muted">
      <div className="container max-w-6xl mx-auto py-8 px-4">
        <div className="space-y-8">
          <div className="flex flex-col space-y-4">
            <h1 className="text-3xl font-bold text-primary">Mis Pacientes</h1>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar pacientes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredPatients.map((patient) => (
              <Card
                key={patient.id}
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => router.push(`/caretaker/${patient.id}`)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={patient.imageUrl} alt={patient.name} />
                      <AvatarFallback>
                        <User className="h-6 w-6" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <CardTitle className="text-lg">{patient.name}</CardTitle>
                      <CardDescription>{patient.age} años</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Badge
                    variant="secondary"
                    className={cn("w-fit", getStatusColor(patient.status))}
                  >
                    {patient.condition}
                  </Badge>

                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>Última visita:</span>
                    </div>
                    <span>{formatDate(patient.lastCheckup)}</span>

                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>Próxima visita:</span>
                    </div>
                    <span>{formatDate(patient.nextCheckup)}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </ScrollArea>
  )
}
