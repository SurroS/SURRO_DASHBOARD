import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon?: LucideIcon;
  subtitle?: string;
  className?: string;
}

export default function MetricCard({
  title,
  value,
  icon: Icon,
  subtitle,
  className,
}: MetricCardProps) {
  return (
    <Card className={`${className || ""}`}>
      <CardContent className="p-6">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            {Icon && (
              <div className="p-2 bg-primary/10 rounded-lg">
                <Icon className="h-6 w-6 text-primary" />
              </div>
            )}
            <div>
              <p className="text-sm text-muted-foreground">{title}</p>
              <p className="text-2xl font-bold">{value}</p>
              {subtitle && <p className="text-xs text-green-600">{subtitle}</p>}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
