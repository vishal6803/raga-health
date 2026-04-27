import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
  const stats = [
    { title: "Total Patients", value: "1,250", color: "text-blue-600" },
    { title: "Today's Admittance", value: "12", color: "text-green-600" },
    { title: "Critical Cases", value: "5", color: "text-red-600" },
    { title: "Doctors on Duty", value: "18", color: "text-orange-600" },
  ];

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold tracking-tight">Hospital Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Card key={s.title}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {s.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      {/* You could add a 'Recent Activity' table here later */}
    </div>
  );
}
