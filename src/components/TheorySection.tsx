import { Card } from '@/components/ui/card';
import { Network, Palette, Users } from 'lucide-react';

export const TheorySection = () => {
  return (
    <section id="theory" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              The Mathematics Behind It
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Understanding graph coloring, chromatic numbers, and set theory in scheduling
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="p-8 card-hover">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mb-6">
                <Network className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Graph Theory</h3>
              <p className="text-muted-foreground mb-4">
                We model scheduling as a graph where:
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span><strong>Vertices (Nodes)</strong> = Courses/Events</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span><strong>Edges</strong> = Conflicts (shared faculty/resources)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span><strong>Graph Coloring</strong> = Time slot assignment</span>
                </li>
              </ul>
            </Card>

            <Card className="p-8 card-hover">
              <div className="w-16 h-16 bg-gradient-to-br from-accent to-primary rounded-2xl flex items-center justify-center mb-6">
                <Palette className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Chromatic Number</h3>
              <p className="text-muted-foreground mb-4">
                The minimum colors needed to color a graph:
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold">•</span>
                  <span><strong>χ(G)</strong> = Chromatic number</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold">•</span>
                  <span>Each color = One time slot</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold">•</span>
                  <span>Adjacent nodes must have different colors</span>
                </li>
              </ul>
            </Card>

            <Card className="p-8 card-hover">
              <div className="w-16 h-16 bg-gradient-to-br from-primary via-accent to-primary rounded-2xl flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Set Theory</h3>
              <p className="text-muted-foreground mb-4">
                Conflicts determined by set intersections:
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span><strong>S₁ ∩ S₂</strong> = Faculty/student overlap</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>If intersection ≠ ∅, courses conflict</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>Disjoint sets can share time slots</span>
                </li>
              </ul>
            </Card>
          </div>

          {/* Algorithm explanation */}
          <Card className="p-10 bg-card">
            <h3 className="text-3xl font-bold mb-6 text-center">Welsh-Powell Algorithm</h3>
            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold flex-shrink-0">
                  1
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2">Sort by Degree</h4>
                  <p className="text-muted-foreground">
                    Order vertices by the number of conflicts (edges). Higher degree = more constraints.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold flex-shrink-0">
                  2
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2">Assign First Available Color</h4>
                  <p className="text-muted-foreground">
                    For each vertex, assign the smallest color (time slot) that doesn't conflict with neighbors.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold flex-shrink-0">
                  3
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2">Greedy Selection</h4>
                  <p className="text-muted-foreground">
                    Continue until all vertices are colored. This guarantees a valid schedule.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold flex-shrink-0">
                  4
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2">Optimization</h4>
                  <p className="text-muted-foreground">
                    Additional constraints (labs need 2 hours, priority ordering) are applied for real-world viability.
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Example */}
          <div className="mt-16 text-center">
            <Card className="p-10 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
              <h3 className="text-2xl font-bold mb-6">Real-World Example</h3>
              <div className="max-w-3xl mx-auto text-left space-y-4">
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Problem:</strong> Schedule 5 courses where DM and DS share Prof. Smith, and DB and NW share Prof. Wilson.
                </p>
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Graph:</strong> Nodes {'{DM, DS, DB, NW, SE}'} with edges {'{DM-DS, DB-NW}'} representing conflicts.
                </p>
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Solution:</strong> χ(G) = 2 colors minimum. DM gets slot 1 (Monday H1), DS gets slot 2 (Monday H2), and so on.
                </p>
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Result:</strong> Zero conflicts, optimal time usage!
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
