export interface Journey {
  id: string;
  name: string;
  description: string;
  coverImage?: string;
  personaIds: string[];
  state?: 'draft' | 'current' | 'future';
  status: 'draft' | 'active' | 'completed';
  createdAt: string;
  updatedAt: string;
  stages: Stage[];
}

export interface Stage {
  id: string;
  name: string;
  order: number;
  touchpoints: Touchpoint[];
  position?: { left: number; top: number };
}

export interface Touchpoint {
  id: string;
  name: string;
  description: string;
  emotion: 'positive' | 'neutral' | 'negative';
  customerAction?: string;
  customerJob?: string;
  image?: string;
  insights?: {
    needs: string[];
    painPoints: string[];
    opportunities: string[];
  };
  metrics?: {
    satisfaction: number;
    effort: number;
    completion: number;
  };
  feedback?: Array<{
    id: string;
    content: string;
    sentiment: 'positive' | 'neutral' | 'negative';
    date: string;
  }>;
}

export type JourneyState = 'draft' | 'current' | 'future';