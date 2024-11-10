import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Eye, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectContent, SelectItem } from '@/components/ui/select';
import { useApp } from '@/context/AppContext';
import { Stage } from './Stage';

type JourneyState = 'current' | 'draft' | 'future';

export default function JourneyBuilder() {
  const navigate = useNavigate();
  const { addJourney } = useApp();
  const [showPreview, setShowPreview] = useState(false);
  const [journeyState, setJourneyState] = useState<JourneyState>('draft');
  const [stages, setStages] = useState([
    {
      id: '1',
      name: 'Awareness',
      touchpoints: [
        {
          id: '1',
          name: 'Initial Contact',
          description: 'First interaction with the product',
          emotion: 'neutral'
        }
      ]
    }
  ]);

  const handleSave = () => {
    const journey = {
      id: crypto.randomUUID(),
      name: 'New Journey',
      description: 'Journey description',
      coverImage: null,
      personaIds: [],
      state: journeyState,
      status: 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      stages: stages.map((stage, index) => ({
        id: stage.id,
        name: stage.name,
        order: index,
        touchpoints: stage.touchpoints
      }))
    };

    addJourney(journey);
    navigate('/journeys');
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/journeys')}
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to Journeys
          </Button>
          <div className="flex items-center gap-2 ml-auto">
            <Select value={journeyState} onValueChange={(value: JourneyState) => setJourneyState(value)}>
              <SelectTrigger className="w-[180px]">
                {journeyState === 'current' ? 'Current State' : 
                 journeyState === 'future' ? 'Future State' : 'Draft'}
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="current">Current State</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="future">Future State</SelectItem>
              </SelectContent>
            </Select>
            <Button 
              variant="secondary" 
              size="sm"
              onClick={() => setShowPreview(!showPreview)}
            >
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
            <Button 
              size="sm"
              onClick={handleSave}
            >
              <Save className="w-4 h-4 mr-2" />
              Save Journey
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-6">
        <div className="space-y-8">
          {stages.map((stage) => (
            <Stage
              key={stage.id}
              stage={stage}
              onUpdate={(updates) => {
                setStages(stages.map(s => 
                  s.id === stage.id ? { ...s, ...updates } : s
                ));
              }}
            />
          ))}
        </div>
      </main>
    </div>
  );
}