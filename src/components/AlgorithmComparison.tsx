import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
interface AlgorithmResult {
  div1: any;
  div2: any;
  steps: any[];
  algorithmName: string;
  executionTime: number;
  slotsUsed: number;
  conflictsResolved: number;
}
import { Clock, Zap, Target, Award, TrendingUp } from 'lucide-react';

interface AlgorithmComparisonProps {
  algorithms: {
    welshPowell: AlgorithmResult;
    greedy: AlgorithmResult;
    dsatur: AlgorithmResult;
    backtracking: AlgorithmResult;
  };
  comparison: {
    fastest: string;
    mostEfficient: string;
    leastSlots: string;
    recommended: string;
  };
}

/**
 * ALGORITHM COMPARISON COMPONENT
 * 
 * Displays comprehensive comparison of all four graph coloring algorithms:
 * - Performance metrics (execution time, slots used)
 * - Visual comparison charts
 * - Recommendations based on analysis
 * 
 * This component helps users understand the trade-offs between different
 * algorithms and choose the best one for their specific needs.
 */
export const AlgorithmComparison = ({ algorithms, comparison }: AlgorithmComparisonProps) => {
  const algorithmData = [
    { key: 'welshPowell', data: algorithms.welshPowell, color: 'bg-blue-500' },
    { key: 'greedy', data: algorithms.greedy, color: 'bg-green-500' },
    { key: 'dsatur', data: algorithms.dsatur, color: 'bg-purple-500' },
    { key: 'backtracking', data: algorithms.backtracking, color: 'bg-orange-500' }
  ];

  const maxTime = Math.max(...algorithmData.map(a => a.data.executionTime));
  const maxSlots = Math.max(...algorithmData.map(a => a.data.slotsUsed));

  return (
    <div className="space-y-8">
      <Card className="p-8">
        <h3 className="text-3xl font-bold mb-6 text-center">Algorithm Performance Comparison</h3>
        
        {/* Performance Metrics */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {algorithmData.map(({ key, data, color }) => (
            <Card key={key} className="p-6 relative overflow-hidden">
              <div className={`absolute top-0 left-0 w-full h-1 ${color}`} />
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-lg">{data.algorithmName}</h4>
                  {comparison.recommended === data.algorithmName && (
                    <Badge variant="default" className="bg-gold text-black">
                      <Award className="w-3 h-3 mr-1" />
                      Recommended
                    </Badge>
                  )}
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">
                      {data.executionTime.toFixed(2)}ms
                    </span>
                    {comparison.fastest === data.algorithmName && (
                      <Badge variant="secondary" className="text-xs">Fastest</Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">
                      {data.slotsUsed} slots used
                    </span>
                    {comparison.leastSlots === data.algorithmName && (
                      <Badge variant="secondary" className="text-xs">Most Compact</Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">
                      {data.steps.length} steps
                    </span>
                    {comparison.mostEfficient === data.algorithmName && (
                      <Badge variant="secondary" className="text-xs">Most Efficient</Badge>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Visual Comparison Charts */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Execution Time Chart */}
          <div>
            <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Execution Time Comparison
            </h4>
            <div className="space-y-3">
              {algorithmData.map(({ key, data, color }) => (
                <div key={key} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>{data.algorithmName}</span>
                    <span>{data.executionTime.toFixed(2)}ms</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${color} transition-all duration-500`}
                      style={{ width: `${maxTime > 0 ? (data.executionTime / maxTime) * 100 : 0}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Slots Used Chart */}
          <div>
            <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Target className="w-5 h-5" />
              Time Slots Utilization
            </h4>
            <div className="space-y-3">
              {algorithmData.map(({ key, data, color }) => (
                <div key={key} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>{data.algorithmName}</span>
                    <span>{data.slotsUsed} slots</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${color} transition-all duration-500`}
                      style={{ width: `${maxSlots > 0 ? (data.slotsUsed / maxSlots) * 100 : 0}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Algorithm Characteristics */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-4 bg-blue-50 border-blue-200">
            <h5 className="font-bold text-blue-800 mb-2">Welsh-Powell</h5>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Degree-based sorting</li>
              <li>• Balanced approach</li>
              <li>• Good for general use</li>
              <li>• Predictable results</li>
            </ul>
          </Card>

          <Card className="p-4 bg-green-50 border-green-200">
            <h5 className="font-bold text-green-800 mb-2">Greedy</h5>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• First-fit strategy</li>
              <li>• Fastest execution</li>
              <li>• Simple implementation</li>
              <li>• May leave gaps</li>
            </ul>
          </Card>

          <Card className="p-4 bg-purple-50 border-purple-200">
            <h5 className="font-bold text-purple-800 mb-2">DSATUR</h5>
            <ul className="text-sm text-purple-700 space-y-1">
              <li>• Dynamic selection</li>
              <li>• Adapts to structure</li>
              <li>• Best quality/speed</li>
              <li>• Intelligent ordering</li>
            </ul>
          </Card>

          <Card className="p-4 bg-orange-50 border-orange-200">
            <h5 className="font-bold text-orange-800 mb-2">Backtracking</h5>
            <ul className="text-sm text-orange-700 space-y-1">
              <li>• Exhaustive search</li>
              <li>• Optimal solution</li>
              <li>• Complete algorithm</li>
              <li>• Computationally heavy</li>
            </ul>
          </Card>
        </div>

        {/* Recommendations */}
        <Card className="p-6 mt-8 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
          <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary" />
            Algorithm Recommendations
          </h4>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h5 className="font-semibold mb-2">Best for Speed:</h5>
              <p className="text-sm text-muted-foreground mb-1">
                <strong>{comparison.fastest}</strong> - Fastest execution time
              </p>
              <p className="text-xs text-muted-foreground">
                Choose when you need quick results and can accept approximate solutions.
              </p>
            </div>
            
            <div>
              <h5 className="font-semibold mb-2">Best for Efficiency:</h5>
              <p className="text-sm text-muted-foreground mb-1">
                <strong>{comparison.mostEfficient}</strong> - Best balance of speed and quality
              </p>
              <p className="text-xs text-muted-foreground">
                Optimal choice for most real-world scheduling scenarios.
              </p>
            </div>
            
            <div>
              <h5 className="font-semibold mb-2">Most Compact:</h5>
              <p className="text-sm text-muted-foreground mb-1">
                <strong>{comparison.leastSlots}</strong> - Uses fewest time slots
              </p>
              <p className="text-xs text-muted-foreground">
                Best when minimizing schedule duration is critical.
              </p>
            </div>
            
            <div>
              <h5 className="font-semibold mb-2">Overall Recommended:</h5>
              <p className="text-sm text-muted-foreground mb-1">
                <strong>{comparison.recommended}</strong> - Best for your dataset
              </p>
              <p className="text-xs text-muted-foreground">
                Automatically selected based on problem size and complexity.
              </p>
            </div>
          </div>
        </Card>
      </Card>
    </div>
  );
};