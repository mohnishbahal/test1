import React from 'react';
import { Badge } from '@/components/ui/badge';

interface StatusBadgeProps {
  status: 'draft' | 'active' | 'completed';
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const getVariant = (status: string) => {
    switch (status) {
      case 'draft':
        return 'secondary';
      case 'active':
        return 'success';
      case 'completed':
        return 'info';
      default:
        return 'secondary';
    }
  };

  return (
    <Badge variant={getVariant(status)}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
}