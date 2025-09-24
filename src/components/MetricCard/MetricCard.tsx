import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import styles from "./MetricCard.module.css";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon?: LucideIcon;
  subtitle?: string;
  className?: string;
}

export default function MetricCard({ title, value, icon: Icon, subtitle, className }: MetricCardProps) {
  return (
    <Card className={`${styles.card} ${className || ''}`}>
      <CardContent className={styles.content}>
        <div className={styles.container}>
          <div className={styles.leftSection}>
            {Icon && (
              <div className={styles.iconWrapper}>
                <Icon className={styles.icon} />
              </div>
            )}
            <div className={styles.textSection}>
              <p className={styles.title}>{title}</p>
              <p className={styles.value}>{value}</p>
              {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}