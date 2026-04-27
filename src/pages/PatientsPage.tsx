import { usePatientStore } from "@/store/usePatientStore";
import { Switch } from "../components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Badge } from "../components/ui/badge";
import { Button } from "@/components/ui/button";

const MOCK_PATIENTS = [
  {
    id: "1",
    name: "John Doe",
    age: 45,
    status: "Stable",
    diagnosis: "Hypertension",
  },
  {
    id: "2",
    name: "Jane Smith",
    age: 30,
    status: "Critical",
    diagnosis: "Pneumonia",
  },
];

export default function PatientsPage() {
  const { viewMode, toggleView } = usePatientStore();
  const sendNotification = async () => {
    const permission = await Notification.requestPermission();

    if (permission === "granted" && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({
        type: "SHOW_NOTIFICATION",
        title: "Emergency Alert",
        body: "Patient John Doe requires immediate assistance in ICU.",
      });
    }
  };
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Patients</h1>
        <Button onClick={sendNotification} variant="destructive">
          Test Emergency Alert
        </Button>
      </div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Patient Directory</h1>
        <div className="flex items-center space-x-2 bg-white p-2 rounded-lg border">
          <span className="text-sm font-medium">List</span>
          <Switch checked={viewMode === "grid"} onCheckedChange={toggleView} />
          <span className="text-sm font-medium">Grid</span>
        </div>
      </div>

      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MOCK_PATIENTS.map((p) => (
            <Card key={p.id}>
              <CardHeader>
                <CardTitle>{p.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Age: {p.age}</p>
                <p className="mb-2">Diagnosis: {p.diagnosis}</p>
                <Badge
                  variant={p.status === "Critical" ? "destructive" : "default"}
                >
                  {p.status}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>Diagnosis</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {MOCK_PATIENTS.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="font-medium">{p.name}</TableCell>
                  <TableCell>{p.age}</TableCell>
                  <TableCell>{p.diagnosis}</TableCell>
                  <TableCell>
                    <Badge>{p.status}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
