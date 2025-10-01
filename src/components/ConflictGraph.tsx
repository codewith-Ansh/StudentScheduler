import { useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { GraphNode, ConflictEdge } from '@/lib/scheduler';

interface ConflictGraphProps {
  nodes: GraphNode[];
  edges: ConflictEdge[];
}

export const ConflictGraph = ({ nodes, edges }: ConflictGraphProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || nodes.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Position nodes in a circle
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) * 0.35;

    const nodePositions = nodes.map((_, i) => {
      const angle = (i / nodes.length) * 2 * Math.PI - Math.PI / 2;
      return {
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle)
      };
    });

    // Draw edges first
    edges.forEach(edge => {
      const fromIdx = nodes.findIndex(n => n.id === edge.from);
      const toIdx = nodes.findIndex(n => n.id === edge.to);
      
      if (fromIdx !== -1 && toIdx !== -1) {
        const from = nodePositions[fromIdx];
        const to = nodePositions[toIdx];
        
        // Different colors for different edge types
        if (edge.reason.includes('Shared')) {
          ctx.strokeStyle = 'hsl(0, 85%, 60%)'; // Red for conflicts
          ctx.lineWidth = 3;
        } else {
          ctx.strokeStyle = 'hsl(220, 40%, 50%)'; // Blue for relationships
          ctx.lineWidth = 1.5;
          ctx.setLineDash([5, 5]);
        }
        
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.stroke();
        ctx.setLineDash([]);
      }
    });

    // Draw nodes
    const courseColors = [
      'hsl(200, 100%, 65%)',
      'hsl(280, 85%, 70%)',
      'hsl(340, 90%, 68%)',
      'hsl(120, 70%, 65%)',
      'hsl(45, 95%, 65%)',
      'hsl(160, 75%, 60%)'
    ];
    
    const groupColor = 'hsl(150, 70%, 60%)';
    const facultyColor = 'hsl(30, 90%, 65%)';

    nodes.forEach((node, i) => {
      const pos = nodePositions[i];
      let nodeColor = courseColors[i % courseColors.length];
      let radius = 40;
      
      // Different styles for different node types
      if (node.type === 'group') {
        nodeColor = groupColor;
        radius = 35;
      } else if (node.type === 'faculty') {
        nodeColor = facultyColor;
        radius = 35;
      }
      
      // Draw circle
      ctx.fillStyle = nodeColor;
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, radius, 0, 2 * Math.PI);
      ctx.fill();
      
      // Draw border
      ctx.strokeStyle = 'hsl(240, 20%, 15%)';
      ctx.lineWidth = 3;
      ctx.stroke();
      
      // Draw label (multi-line support)
      ctx.fillStyle = 'hsl(240, 20%, 15%)';
      ctx.font = node.type === 'course' ? 'bold 13px sans-serif' : 'bold 11px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      const lines = node.label.split('\n');
      const lineHeight = 14;
      const startY = pos.y - ((lines.length - 1) * lineHeight) / 2;
      
      lines.forEach((line, idx) => {
        ctx.fillText(line, pos.x, startY + idx * lineHeight);
      });
    });

  }, [nodes, edges]);

  if (nodes.length === 0) {
    return (
      <Card className="p-10 text-center">
        <p className="text-muted-foreground">Add courses to see the conflict graph</p>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <h3 className="text-2xl font-bold mb-4">Conflict Graph Visualization</h3>
      <p className="text-muted-foreground mb-6">
        <strong>Blue nodes:</strong> Courses | <strong>Green nodes:</strong> Student Groups | <strong>Orange nodes:</strong> Faculty<br />
        <strong>Red solid edges:</strong> Conflicts (shared resources) | <strong>Blue dashed edges:</strong> Relationships
      </p>
      <div className="bg-card rounded-lg overflow-hidden">
        <canvas 
          ref={canvasRef} 
          width={600} 
          height={600}
          className="w-full h-auto max-w-full"
          style={{ maxHeight: '600px' }}
        />
      </div>
      {edges.length > 0 && (
        <div className="mt-6">
          <h4 className="font-bold mb-3">Detected Conflicts:</h4>
          <div className="space-y-2">
            {edges.map((edge, i) => (
              <div key={i} className="p-3 bg-destructive/10 rounded-lg text-sm">
                <strong>{edge.from} ↔ {edge.to}</strong>: {edge.reason}
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
};
