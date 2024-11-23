import { Tabs, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { Menu } from "lucide-react";
import Image from "next/image";
import { Button } from "../components/button/Button";
import { Card } from "../components/card/Card";
import { CardContent } from "../components/card/CardContent";

export default function PatientHistory() {
  return (
    <div className="flex justify-center bg-gray-50">
      {/* <header className="border-b bg-white">
        <div className="container flex h-14 items-center px-4">
          <Button variant="ghost" size="icon" className="mr-3">
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold">
            Historial de cuidados de Persona
          </h1>
        </div>
      </header> */}

      <main className="container">
        <div className="space-y-4 pt-4">
          <PatientCard title="Azitromicina - 2cdas" timestamp="Hoy 9am" />
          <PatientCard
            timestamp="Ayer 3pm"
            imageSrc="/placeholder.svg"
            imageAlt="Foto del paciente"
            description="Paciente se ve contento/1!"
          />
          <Card>
            <CardContent className="pt-5">
              <div className="flex h-20 items-center justify-center rounded-lg border-2 border-dashed">
                <span className="text-xl text-muted-foreground">
                  Sin más registros
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 border-t bg-white">
        <Tabs defaultValue="historial" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="historial" className="w-full">
              Historial
            </TabsTrigger>
            <TabsTrigger value="observacion" className="w-full">
              Observación
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </footer>
    </div>
  );
}

function PatientCard({
  title,
  timestamp,
  imageSrc,
  imageAlt,
  description,
}: {
  title?: string;
  timestamp: string;
  imageSrc?: string;
  imageAlt?: string;
  description?: string;
}) {
  return (
    <Card>
      <CardContent className="space-y-3 pt-5">
        <div className="flex items-center justify-between">
          {title && <span className="font-medium">{title}</span>}
          <span className="text-sm text-muted-foreground float-right">
            {timestamp}
          </span>
        </div>
        {imageSrc && imageAlt && (
          <div className="overflow-hidden rounded-lg border">
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={200}
              height={200}
              className="object-cover"
            />
          </div>
        )}
        {description && <p className="text-sm">{description}</p>}
      </CardContent>
    </Card>
  );
}
