'use client'

import { useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { User, Phone, FileText, Mic, Plus, X, CheckCircle, ChevronLeft, ChevronRight, Pill } from 'lucide-react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent } from '@/components/ui/tabs'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"

type Inputs = {
  fullName: string
  rut: string
  age: number
  sex: string
  phone: string
  email: string
  caregiverName: string
  medicalHistoryAudio?: File
  preexistingConditions: string[]
  otherConditions?: string
  medications: {
    name: string
    dosage: string
  }[]
  treatmentAudio?: File
  address: string
  city: string
  region: string
}

type AudioRecording = {
  isRecording: boolean
  audioUrl: string | null
  blob: Blob | null
}

export default function PatientOnboardingForm() {
  const { register, handleSubmit, formState: { errors, isValid }, setValue } = useForm<Inputs>()
  const { toast } = useToast()
  const [currentStep, setCurrentStep] = useState(0)
  const [medications, setMedications] = useState<Array<{ name: string; dosage: string }>>([])
  const [newMedication, setNewMedication] = useState({ name: '', dosage: '' })
  const [preexistingConditions, setPreexistingConditions] = useState<string[]>([])

  const [medicalHistoryAudio, setMedicalHistoryAudio] = useState<AudioRecording>({
    isRecording: false,
    audioUrl: null,
    blob: null
  })
  const [treatmentAudio, setTreatmentAudio] = useState<AudioRecording>({
    isRecording: false,
    audioUrl: null,
    blob: null
  })

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<BlobPart[]>([])

  const steps = [
    { id: "personal", label: "Información Personal", icon: User },
    { id: "contact", label: "Contacto", icon: Phone },
    { id: "medical", label: "Historial Médico", icon: FileText },
    { id: "medications", label: "Medicamentos", icon: Plus },
  ]

  const preexistingConditionsList = [
    "Hipertensión",
    "Diabetes",
    "Artritis",
    "Alzheimer",
    "Parkinson",
    "Problemas Cardíacos",
    "Problemas Respiratorios",
    "Otro"
  ]

  const onSubmit = async (data: Inputs) => {
    try {
      // Here you would typically send the data to your API
      console.log(data)
      toast({
        title: "Éxito",
        description: "El registro del paciente ha sido guardado exitosamente",
      })
    } catch (error) {
      console.error(error)
      toast({
        title: "Error",
        description: "Hubo un error al guardar el registro",
        variant: "destructive",
      })
    }
  }

  const startRecording = async (type: 'medical' | 'treatment') => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      audioChunksRef.current = []

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data)
      }

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/mp3' })
        const audioUrl = URL.createObjectURL(audioBlob)

        if (type === 'medical') {
          setMedicalHistoryAudio({
            isRecording: false,
            audioUrl,
            blob: audioBlob
          })
          setValue('medicalHistoryAudio', new File([audioBlob], 'medical-history.mp3'))
        } else {
          setTreatmentAudio({
            isRecording: false,
            audioUrl,
            blob: audioBlob
          })
          setValue('treatmentAudio', new File([audioBlob], 'treatment-notes.mp3'))
        }
      }

      mediaRecorder.start()
      if (type === 'medical') {
        setMedicalHistoryAudio(prev => ({ ...prev, isRecording: true }))
      } else {
        setTreatmentAudio(prev => ({ ...prev, isRecording: true }))
      }
    } catch (error) {
      console.error('Error accessing microphone:', error)
      toast({
        title: "Error",
        description: "No se pudo acceder al micrófono",
        variant: "destructive",
      })
    }
  }

  const stopRecording = (type: 'medical' | 'treatment') => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop()
      if (type === 'medical') {
        setMedicalHistoryAudio(prev => ({ ...prev, isRecording: false }))
      } else {
        setTreatmentAudio(prev => ({ ...prev, isRecording: false }))
      }
    }
  }

  const addMedication = () => {
    if (newMedication.name && newMedication.dosage) {
      setMedications([...medications, newMedication])
      setNewMedication({ name: '', dosage: '' })
      setValue('medications', [...medications, newMedication])
    }
  }

  const removeMedication = (index: number) => {
    const updatedMedications = medications.filter((_, i) => i !== index)
    setMedications(updatedMedications)
    setValue('medications', updatedMedications)
  }

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const renderPersonalInfo = () => (
    <TabsContent value="personal" className="space-y-6 min-h-[400px]">
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="fullName" className="text-sm font-medium">
            Nombre completo del paciente
          </Label>
          <Input
            id="fullName"
            className="transition-all focus-visible:ring-primary"
            {...register("fullName", { required: "Este campo es requerido" })}
          />
          {errors.fullName && (
            <span className="text-sm text-destructive">{errors.fullName.message}</span>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="rut">RUT</Label>
          <Input
            id="rut"
            {...register("rut", { required: "Este campo es requerido" })}
          />
          {errors.rut && (
            <span className="text-sm text-red-500">{errors.rut.message}</span>
          )}
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="age">Edad</Label>
          <Input
            id="age"
            type="number"
            {...register("age", {
              required: "Este campo es requerido",
              min: { value: 0, message: "La edad debe ser mayor a 0" }
            })}
          />
          {errors.age && (
            <span className="text-sm text-red-500">{errors.age.message}</span>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="sex">Sexo</Label>
          <Select onValueChange={value => setValue("sex", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Seleccione" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="M">Masculino</SelectItem>
              <SelectItem value="F">Femenino</SelectItem>
              <SelectItem value="O">Otro</SelectItem>
            </SelectContent>
          </Select>
          {errors.sex && (
            <span className="text-sm text-red-500">{errors.sex.message}</span>
          )}
        </div>
      </div>
    </TabsContent>
  )

  const renderContactInfo = () => (
    <TabsContent value="contact" className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="caregiverName">Nombre del familiar a cargo</Label>
        <Input
          id="caregiverName"
          {...register("caregiverName", { required: "Este campo es requerido" })}
        />
        {errors.caregiverName && (
          <span className="text-sm text-red-500">{errors.caregiverName.message}</span>
        )}
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="phone">Teléfono de contacto principal</Label>
          <Input
            id="phone"
            {...register("phone", {
              required: "Este campo es requerido",
              pattern: {
                value: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
                message: "Teléfono inválido"
              }
            })}
          />
          {errors.phone && (
            <span className="text-sm text-red-500">{errors.phone.message}</span>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Correo electrónico</Label>
          <Input
            id="email"
            type="email"
            {...register("email", {
              required: "Este campo es requerido",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Email inválido"
              }
            })}
          />
          {errors.email && (
            <span className="text-sm text-red-500">{errors.email.message}</span>
          )}
        </div>
      </div>

    </TabsContent>
  )

  const renderMedicalHistory = () => (
    <TabsContent value="medical" className="space-y-6 min-h-[400px]">
      <div className="rounded-lg border bg-card p-6 shadow-sm">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium">
              Resumen del historial médico (Audio)
            </Label>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                type="button"
                onClick={() => medicalHistoryAudio.isRecording ?
                  stopRecording('medical') : startRecording('medical')}
                variant={medicalHistoryAudio.isRecording ? "destructive" : "default"}
                className={cn(
                  "w-full sm:w-auto gap-2 transition-all",
                  medicalHistoryAudio.isRecording && "animate-pulse"
                )}
              >
                <Mic className="h-4 w-4" />
                {medicalHistoryAudio.isRecording ? "Detener Grabación" : "Grabar Diagnóstico"}
              </Button>
              {medicalHistoryAudio.audioUrl && (
                <div className="flex-1 rounded-md border bg-muted p-2">
                  <audio src={medicalHistoryAudio.audioUrl} controls className="w-full" />
                </div>
              )}
            </div>
          </div>

          <Separator className="my-6" />

          <div className="space-y-4">
            <Label className="text-sm font-medium">Condiciones médicas preexistentes</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {preexistingConditionsList.map((condition) => (
                <div
                  key={condition}
                  className="flex items-center space-x-2 rounded-lg border p-3 hover:bg-accent transition-colors"
                >
                  <Checkbox
                    id={condition}
                    checked={preexistingConditions.includes(condition)}
                    onCheckedChange={(checked: boolean) => {
                      if (checked) {
                        setPreexistingConditions([...preexistingConditions, condition])
                      } else {
                        setPreexistingConditions(
                          preexistingConditions.filter((c) => c !== condition)
                        )
                      }
                    }}
                  />
                  <Label
                    htmlFor={condition}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {condition}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </TabsContent>
  )

  const renderMedications = () => (
    <TabsContent value="medications" className="space-y-6 min-h-[400px]">
      <div className="rounded-lg border bg-card p-6 shadow-sm">
        <div className="space-y-6">
          <div className="space-y-4">
            <Label className="text-sm font-medium">Medicamentos actuales</Label>
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                placeholder="Nombre del medicamento"
                value={newMedication.name}
                onChange={(e) => setNewMedication({ ...newMedication, name: e.target.value })}
                className="flex-1"
              />
              <Input
                placeholder="Dosis y frecuencia"
                value={newMedication.dosage}
                onChange={(e) => setNewMedication({ ...newMedication, dosage: e.target.value })}
                className="flex-1"
              />
              <Button
                type="button"
                onClick={addMedication}
                className="w-full sm:w-auto gap-2"
                disabled={!newMedication.name || !newMedication.dosage}
              >
                <Plus className="h-4 w-4" />
                Agregar
              </Button>
            </div>

            <div className="space-y-2 mt-4">
              {medications.map((med, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-lg border bg-card p-3 shadow-sm"
                >
                  <div className="flex items-center gap-2">
                    <Pill className="h-4 w-4 text-primary" />
                    <span className="font-medium">{med.name}</span>
                    <span className="text-sm text-muted-foreground">-</span>
                    <span className="text-sm text-muted-foreground">{med.dosage}</span>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeMedication(index)}
                    className="hover:text-destructive"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <Separator className="my-6" />

          <div className="space-y-2">
            <Label className="text-sm font-medium">Notas adicionales sobre tratamientos (Audio)</Label>
            <div className="flex gap-2">
              <Button
                type="button"
                onClick={() => treatmentAudio.isRecording ?
                  stopRecording('treatment') : startRecording('treatment')}
                variant={treatmentAudio.isRecording ? "destructive" : "default"}
                className={cn(
                  "w-full sm:w-auto gap-2 transition-all",
                  treatmentAudio.isRecording && "animate-pulse"
                )}
              >
                <Mic className="h-4 w-4" />
                {treatmentAudio.isRecording ? "Detener Grabación" : "Grabar Notas"}
              </Button>
              {treatmentAudio.audioUrl && (
                <div className="flex-1 rounded-md border bg-muted p-2">
                  <audio src={treatmentAudio.audioUrl} controls className="w-full" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </TabsContent>
  )


  return (
    <ScrollArea className="h-screen w-full bg-gradient-to-b from-background to-muted">
      <div className="container max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <Card className="border-0 shadow-xl bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50">
            <CardHeader className="space-y-6 pb-8 text-center">
              <div className="space-y-2">
                <CardTitle className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                  Registro de Paciente
                </CardTitle>
                <CardDescription className="text-sm sm:text-base max-w-2xl mx-auto text-muted-foreground">
                  Complete la información del paciente para su registro en el sistema
                </CardDescription>
              </div>

              <Separator className="my-4" />

              <nav aria-label="Progress" className="w-full max-w-2xl mx-auto px-2">
                <ol className="flex items-center justify-between">
                  {steps.map((step, index) => (
                    <li
                      key={step.id}
                      className="relative flex-1 flex flex-col items-center"
                    >
                      <div className="flex flex-col items-center group">
                        <div
                          className={cn(
                            "relative flex items-center justify-center",
                            "w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12",
                            "rounded-full transition-all duration-200",
                            index <= currentStep
                              ? "bg-primary"
                              : "bg-muted",
                            "border-2",
                            index <= currentStep
                              ? "border-primary"
                              : "border-muted-foreground/30"
                          )}
                        >
                          <step.icon
                            className={cn(
                              "transition-all duration-200",
                              "w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5",
                              index <= currentStep
                                ? "text-primary-foreground"
                                : "text-muted-foreground/40"
                            )}
                          />
                        </div>

                        <div className="min-h-[2.5rem] flex items-start justify-center mt-2">
                          <span
                            className={cn(
                              "text-[0.65rem] sm:text-xs md:text-sm text-center font-medium px-1",
                              "transition-colors duration-200",
                              index <= currentStep
                                ? "text-primary"
                                : "text-muted-foreground"
                            )}
                          >
                            {step.label}
                          </span>
                        </div>
                      </div>

                      {index < steps.length - 1 && (
                        <div
                          className={cn(
                            "absolute top-4 sm:top-5 md:top-6 left-[50%] w-full",
                            "h-[1px] translate-x-[20%]",
                            "-translate-y-1/2"
                          )}
                          aria-hidden="true"
                        >
                          <div
                            className={cn(
                              "w-[60%] h-full transition-all duration-200",
                              index < currentStep
                                ? "bg-primary"
                                : "bg-muted-foreground/30"
                            )}
                          />
                        </div>
                      )}
                    </li>
                  ))}
                </ol>
              </nav>
            </CardHeader>

            <CardContent className="px-4 sm:px-6 lg:px-8">
              <Tabs
                value={steps[currentStep].id}
                className="w-full [&>div]:animate-in [&>div]:fade-in-50"
              >
                {renderPersonalInfo()}
                {renderContactInfo()}
                {renderMedicalHistory()}
                {renderMedications()}
              </Tabs>
            </CardContent>

            <CardFooter className="flex flex-col sm:flex-row justify-between gap-4 pt-8 pb-6 px-4 sm:px-6 lg:px-8">
              <Button
                type="button"
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className="w-full sm:w-auto min-w-[140px] gap-2"
              >
                <ChevronLeft className="h-4 w-4" />
                Anterior
              </Button>

              {currentStep === steps.length - 1 ? (
                <Button
                  type="submit"
                  disabled={!isValid}
                  className="w-full sm:w-auto min-w-[140px] gap-2 bg-gradient-to-r from-primary to-primary-foreground hover:opacity-90"
                >
                  Completar
                  <CheckCircle className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={handleNext}
                  className="w-full sm:w-auto min-w-[140px] gap-2"
                >
                  Siguiente
                  <ChevronRight className="h-4 w-4" />
                </Button>
              )}
            </CardFooter>
          </Card>
        </form>
      </div>
    </ScrollArea>
  )
}
