import { Card } from '@/components/ui/card';
import { Circle, Users, BookOpen, GraduationCap } from 'lucide-react';
import { GraphNode, ConflictEdge } from '@/lib/scheduler';

interface SetTheoryAnalysisProps {
  nodes: GraphNode[];
  edges: ConflictEdge[];
}

export const SetTheoryAnalysis = ({ nodes, edges }: SetTheoryAnalysisProps) => {
  if (!nodes || nodes.length === 0) {
    return (
      <Card className="p-8">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">Set Theory Analysis</h3>
          <p className="text-muted-foreground">Generate a schedule to see the set theory analysis.</p>
        </div>
      </Card>
    );
  }

  // Extract sets from the graph nodes
  const courseNodes = nodes.filter(node => node.type === 'course');
  const groupNodes = nodes.filter(node => node.type === 'group');
  const facultyNodes = nodes.filter(node => node.type === 'faculty');
  
  const allCourses = courseNodes.map(node => node.label);
  const allGroups = groupNodes.map(node => node.label);
  const allFaculty = facultyNodes.map(node => node.label);

  return (
    <Card className="p-8 bg-gradient-to-br from-accent/5 to-primary/5 border-accent/20">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-accent to-primary rounded-2xl flex items-center justify-center">
          <Circle className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-3xl font-bold">Set Theory Analysis</h3>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {/* Set Representations */}
        <div>
          <h4 className="text-xl font-bold mb-4 text-primary flex items-center gap-2">
            <Users className="w-5 h-5" />
            Set Representations
          </h4>
          <div className="space-y-4 text-sm">
            <div className="bg-card p-4 rounded-lg border">
              <p className="font-semibold mb-2 flex items-center gap-2">
                <GraduationCap className="w-4 h-4" />
                Groups/Divisions (G):
              </p>
              <p className="text-muted-foreground font-mono">
                G = {'{'}{ allGroups.length > 0 ? allGroups.join(', ') : 'No groups specified' }{'}'}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Total: {allGroups.length} groups
              </p>
            </div>
            
            <div className="bg-card p-4 rounded-lg border">
              <p className="font-semibold mb-2 flex items-center gap-2">
                <Users className="w-4 h-4" />
                Faculty/Instructors (F):
              </p>
              <p className="text-muted-foreground font-mono">
                F = {'{'}{ allFaculty.length > 0 ? allFaculty.join(', ') : 'No faculty specified' }{'}'}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Total: {allFaculty.length} faculty members
              </p>
            </div>
            
            <div className="bg-card p-4 rounded-lg border">
              <p className="font-semibold mb-2 flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Courses (C):
              </p>
              <p className="text-muted-foreground font-mono">
                C = {'{'}{ allCourses.length > 0 ? allCourses.join(', ') : 'No courses specified' }{'}'}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Total: {allCourses.length} courses
              </p>
            </div>
          </div>
        </div>
        
        {/* Set Operations & Conflicts */}
        <div>
          <h4 className="text-xl font-bold mb-4 text-accent">Conflict Analysis</h4>
          <div className="space-y-4 text-sm">
            {edges.length > 0 ? (
              edges.map((edge, index) => (
                <div key={index} className="bg-card p-4 rounded-lg border">
                  <p className="font-semibold mb-2 text-red-600">
                    Conflict: {edge.from} ∩ {edge.to}
                  </p>
                  <p className="text-muted-foreground mb-1">
                    <strong>Set Intersection:</strong> {edge.reason}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    ∴ These courses cannot be scheduled simultaneously
                  </p>
                </div>
              ))
            ) : (
              <div className="bg-card p-4 rounded-lg border">
                <p className="font-semibold mb-2 text-green-600">No Conflicts Found</p>
                <p className="text-muted-foreground">
                  All course sets are disjoint: F₁ ∩ F₂ = ∅ and G₁ ∩ G₂ = ∅
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  All courses can potentially share time slots
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mathematical Formula */}
      <div className="bg-card p-6 rounded-lg border">
        <h4 className="text-lg font-bold mb-4">Conflict Detection Formula</h4>
        <div className="bg-muted p-4 rounded font-mono text-sm mb-4">
          Conflict(Course₁, Course₂) = (F₁ ∩ F₂ ≠ ∅) ∨ (G₁ ∩ G₂ ≠ ∅)
        </div>
        <p className="text-muted-foreground text-sm">
          Where F = Faculty sets, G = Group sets. If any intersection is non-empty, 
          the courses conflict and require different time slots in the schedule.
        </p>
      </div>

      {/* Summary Statistics */}
      <div className="mt-8 grid grid-cols-3 gap-6 text-center">
        <div className="bg-primary/10 p-4 rounded-lg">
          <div className="text-2xl font-bold text-primary">{allCourses.length}</div>
          <div className="text-sm text-muted-foreground">Total Courses</div>
        </div>
        <div className="bg-accent/10 p-4 rounded-lg">
          <div className="text-2xl font-bold text-accent">{edges.length}</div>
          <div className="text-sm text-muted-foreground">Conflicts Found</div>
        </div>
        <div className="bg-primary/10 p-4 rounded-lg">
          <div className="text-2xl font-bold text-primary">{Math.max(2, edges.length + 1)}</div>
          <div className="text-sm text-muted-foreground">Min Time Slots</div>
        </div>
      </div>
    </Card>
  );
};