import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Mon", patients: 40 },
  { name: "Tue", patients: 30 },
  { name: "Wed", patients: 60 },
  { name: "Thu", patients: 45 },
  { name: "Fri", patients: 70 },
];

export default function AnalyticsPage() {
  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold">System Analytics</h1>
      <Card className="p-6">
        <CardHeader>
          <CardTitle>Patient Inflow (Weekly)</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="patients" fill="#2563eb" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
