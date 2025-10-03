import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import styles from "./StatusBadge.module.css";

interface StatusBadgeProps {
  status: "pending" | "active" | "expired" | "suspended" | "success";
  children: React.ReactNode;
}

export default function StatusBadge({ status, children }: StatusBadgeProps) {
  return (
    <Badge 
      variant="secondary"
      className={cn(styles.badge, styles[status])}
    >
      {children}
    </Badge>
  );
}