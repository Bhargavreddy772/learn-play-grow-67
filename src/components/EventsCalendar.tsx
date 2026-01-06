import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { Calendar as CalendarIcon, BookOpen, PartyPopper, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

type EventType = 'holiday' | 'exam' | 'event' | 'deadline';

interface CalendarEvent {
  id: string;
  date: Date;
  title: string;
  type: EventType;
  description?: string;
}

const initialEvents: CalendarEvent[] = [
  { id: '1', date: new Date(2025, 11, 25), title: 'Christmas Holiday', type: 'holiday', description: 'School closed' },
  { id: '2', date: new Date(2025, 11, 26), title: 'Boxing Day', type: 'holiday', description: 'School closed' },
  { id: '3', date: new Date(2025, 11, 20), title: 'Math Final Exam', type: 'exam', description: 'Chapters 1-10' },
  { id: '4', date: new Date(2025, 11, 22), title: 'Science Quiz', type: 'exam', description: 'Unit 5 test' },
  { id: '5', date: new Date(2025, 11, 18), title: 'Project Deadline', type: 'deadline', description: 'Submit art project' },
  { id: '6', date: new Date(2025, 11, 19), title: 'School Concert', type: 'event', description: 'Annual music show' },
  { id: '7', date: new Date(2026, 0, 1), title: 'New Year Holiday', type: 'holiday', description: 'Happy New Year!' },
  { id: '8', date: new Date(2026, 0, 6), title: 'School Reopens', type: 'event', description: 'Back to school' },
];

const eventTypeConfig: Record<EventType, { color: string; icon: React.ReactNode; bgColor: string }> = {
  holiday: { 
    color: 'bg-student-green text-white', 
    icon: <PartyPopper className="w-3 h-3" />,
    bgColor: 'bg-student-green/20'
  },
  exam: { 
    color: 'bg-student-orange text-white', 
    icon: <BookOpen className="w-3 h-3" />,
    bgColor: 'bg-student-orange/20'
  },
  event: { 
    color: 'bg-student-blue text-white', 
    icon: <CalendarIcon className="w-3 h-3" />,
    bgColor: 'bg-student-blue/20'
  },
  deadline: { 
    color: 'bg-student-pink text-white', 
    icon: <AlertTriangle className="w-3 h-3" />,
    bgColor: 'bg-student-pink/20'
  },
};

interface EventsCalendarProps {
  className?: string;
  compact?: boolean;
}

export const EventsCalendar: React.FC<EventsCalendarProps> = ({ className, compact = false }) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [eventsState, setEventsState] = useState<CalendarEvent[]>(initialEvents);

  const getEventsForDate = (date: Date) => {
    return events.filter(
      (event) =>
        event.date.getDate() === date.getDate() &&
        event.date.getMonth() === date.getMonth() &&
        event.date.getFullYear() === date.getFullYear()
    );
  };

  const selectedEvents = selectedDate ? getEventsForDate(selectedDate) : [];

  React.useEffect(() => {
    (async () => {
      try {
        const remote = await (await import('@/lib/api')).default.getEvents();
        if (remote && Array.isArray(remote)) {
          setEventsState(remote.map((r: any) => ({ ...r, date: new Date(r.date) })));
        }
      } catch (err) {
        // keep initial events
      }
    })();
  }, []);

  const eventDates = eventsState.map((e) => e.date);

  const modifiers = {
    event: eventDates,
  };

  const modifiersStyles = {
    event: {
      backgroundColor: 'hsl(var(--student-purple) / 0.2)',
      borderRadius: '50%',
    },
  };

  return (
    <div className={cn('bg-card rounded-2xl border border-border shadow-lg overflow-hidden', className)}>
      <div className="p-4 bg-gradient-to-r from-student-blue to-student-purple">
        <h3 className="font-display text-lg font-bold text-white flex items-center gap-2">
          <CalendarIcon className="w-5 h-5" />
          School Calendar
        </h3>
      </div>

      <div className="p-4">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          modifiers={modifiers}
          modifiersStyles={modifiersStyles}
          className="rounded-lg pointer-events-auto"
        />

        {/* Legend */}
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border">
          {Object.entries(eventTypeConfig).map(([type, config]) => (
            <div key={type} className="flex items-center gap-1 text-xs">
              <div className={cn('w-3 h-3 rounded-full', config.color)} />
              <span className="capitalize text-muted-foreground">{type}</span>
            </div>
          ))}
        </div>

        {/* Selected date events */}
        {selectedDate && (
          <div className="mt-4 pt-4 border-t border-border">
            <h4 className="font-display font-semibold text-sm text-foreground mb-3">
              {selectedDate.toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'short', 
                day: 'numeric' 
              })}
            </h4>
            {selectedEvents.length > 0 ? (
              <div className="space-y-2">
                {selectedEvents.map((event) => (
                  <div
                    key={event.id}
                    className={cn(
                      'p-3 rounded-xl transition-all hover:scale-[1.02]',
                      eventTypeConfig[event.type].bgColor
                    )}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Badge className={cn('text-xs', eventTypeConfig[event.type].color)}>
                        {eventTypeConfig[event.type].icon}
                        <span className="ml-1 capitalize">{event.type}</span>
                      </Badge>
                    </div>
                    <p className="font-display font-semibold text-sm">{event.title}</p>
                    {event.description && (
                      <p className="text-xs text-muted-foreground mt-1">{event.description}</p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-4">
                No events on this day 📅
              </p>
            )}
          </div>
        )}

        {/* Upcoming events */}
        {!compact && (
          <div className="mt-4 pt-4 border-t border-border">
            <h4 className="font-display font-semibold text-sm text-foreground mb-3">
              Upcoming Events
            </h4>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {eventsState
                .filter((e) => e.date >= new Date())
                .sort((a, b) => a.date.getTime() - b.date.getTime())
                .slice(0, 5)
                .map((event) => (
                  <div
                    key={event.id}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                    onClick={() => setSelectedDate(event.date)}
                  >
                    <div className={cn('p-1.5 rounded-lg', eventTypeConfig[event.type].color)}>
                      {eventTypeConfig[event.type].icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{event.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {event.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
