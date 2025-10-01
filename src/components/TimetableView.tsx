import { Card } from '@/components/ui/card';
import { Timetable, DAY_NAMES } from '@/lib/scheduler';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TimetableViewProps {
  division: string;
  timetable: Timetable;
}

const SUBJECT_COLORS = [
  'hsl(200, 100%, 95%)',
  'hsl(280, 85%, 95%)',
  'hsl(340, 90%, 95%)',
  'hsl(120, 70%, 95%)',
  'hsl(45, 95%, 95%)',
  'hsl(160, 75%, 95%)'
];

export const TimetableView = ({ division, timetable }: TimetableViewProps) => {
  const subjects = Array.from(new Set(
    timetable.flat().filter(slot => slot.subject).map(slot => slot.subject)
  ));

  const getSubjectColor = (subject: string) => {
    const index = subjects.indexOf(subject);
    return SUBJECT_COLORS[index % SUBJECT_COLORS.length];
  };

  const exportToCSV = () => {
    let csv = `${division} Timetable\n`;
    csv += 'Day,' + Array.from({ length: 6 }, (_, i) => `H${i + 1}`).join(',') + '\n';
    
    timetable.forEach((day, i) => {
      const row = [DAY_NAMES[i]];
      day.forEach(slot => {
        const label = slot.subject 
          ? `${slot.subject}${slot.isLab ? '(Lab)' : ''} - ${slot.faculty}`
          : 'FREE';
        row.push(label);
      });
      csv += row.join(',') + '\n';
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${division}_timetable.csv`;
    a.click();
  };

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold">{division}</h3>
        <Button variant="outline" size="sm" onClick={exportToCSV}>
          <Download className="w-4 h-4 mr-2" />
          Export CSV
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-muted">
              <th className="border border-border p-3 text-left font-bold">Day</th>
              {Array.from({ length: 6 }, (_, i) => (
                <th key={i} className="border border-border p-3 text-center font-bold">
                  H{i + 1}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {timetable.map((day, dayIdx) => (
              <tr key={dayIdx} className="hover:bg-muted/50 transition-colors">
                <td className="border border-border p-3 font-bold bg-muted/30">
                  {DAY_NAMES[dayIdx]}
                </td>
                {day.map((slot, hourIdx) => (
                  <td
                    key={hourIdx}
                    className="border border-border p-3 text-center text-sm"
                    style={{
                      backgroundColor: slot.subject ? getSubjectColor(slot.subject) : 'transparent'
                    }}
                  >
                    {slot.subject ? (
                      <div>
                        <div className="font-bold text-foreground">
                          {slot.subject}
                          {slot.isLab && <span className="text-xs ml-1">(Lab)</span>}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {slot.faculty}
                        </div>
                      </div>
                    ) : (
                      <span className="text-muted-foreground text-xs">FREE</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Legend */}
      <div className="mt-6">
        <h4 className="font-bold mb-3 text-sm">Legend:</h4>
        <div className="flex flex-wrap gap-3">
          {subjects.map((subject, i) => (
            <div key={i} className="flex items-center gap-2">
              <div 
                className="w-6 h-6 rounded border border-border"
                style={{ backgroundColor: getSubjectColor(subject) }}
              />
              <span className="text-sm">{subject}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};
