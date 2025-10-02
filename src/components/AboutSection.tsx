import { Card } from '@/components/ui/card';
import { BookOpen, Target, Zap, Users, User, Github, Linkedin, Mail, Code } from 'lucide-react';

export const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              About This Project
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A sophisticated scheduling system that combines theoretical computer science with practical applications
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <Card className="p-8 card-hover">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Project Purpose</h3>
              <p className="text-muted-foreground leading-relaxed">
                This project demonstrates the real-world application of graph theory and discrete mathematics 
                in solving complex scheduling problems. It addresses the challenge of creating conflict-free 
                timetables for educational institutions, considering constraints like faculty availability, 
                room allocation, and student groups.
              </p>
            </Card>

            <Card className="p-8 card-hover">
              <div className="w-16 h-16 bg-gradient-to-br from-accent to-primary rounded-2xl flex items-center justify-center mb-6">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Educational Value</h3>
              <p className="text-muted-foreground leading-relaxed">
                Students can visualize abstract mathematical concepts like graph coloring, chromatic numbers, 
                and set theory operations. The step-by-step algorithm visualization helps bridge the gap between 
                theoretical knowledge and practical implementation, making discrete mathematics more accessible 
                and engaging.
              </p>
            </Card>

            <Card className="p-8 card-hover">
              <div className="w-16 h-16 bg-gradient-to-br from-primary via-accent to-primary rounded-2xl flex items-center justify-center mb-6">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Technical Implementation</h3>
              <p className="text-muted-foreground leading-relaxed">
                Built with modern web technologies (React, TypeScript, Tailwind CSS), the system implements 
                the Welsh-Powell graph coloring algorithm. It handles multiple scheduling types, each with 
                unique constraints, and generates optimal schedules in real-time with detailed conflict 
                analysis and resolution strategies.
              </p>
            </Card>

            <Card className="p-8 card-hover">
              <div className="w-16 h-16 bg-gradient-to-br from-accent via-primary to-accent rounded-2xl flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Real-World Applications</h3>
              <p className="text-muted-foreground leading-relaxed">
                Beyond academics, this scheduling system applies to exam timetabling, sports facility 
                management, cultural event planning, and resource allocation. The principles demonstrated 
                here are used in industries like logistics, project management, and operations research to 
                optimize resource utilization and minimize conflicts.
              </p>
            </Card>
          </div>

          {/* Features List */}
          <Card className="p-10 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
            <h3 className="text-3xl font-bold mb-8 text-center">Key Features</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex gap-4">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <div>
                  <h4 className="font-bold mb-1">Multiple Schedule Types</h4>
                  <p className="text-sm text-muted-foreground">Academic courses, exams, sports, and cultural events with custom constraints</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                <div>
                  <h4 className="font-bold mb-1">Conflict Detection</h4>
                  <p className="text-sm text-muted-foreground">Automatic identification of resource and faculty conflicts</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <div>
                  <h4 className="font-bold mb-1">Visual Graph Representation</h4>
                  <p className="text-sm text-muted-foreground">Interactive conflict graphs showing course relationships</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                <div>
                  <h4 className="font-bold mb-1">Algorithm Animation</h4>
                  <p className="text-sm text-muted-foreground">Step-by-step visualization of the scheduling process</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <div>
                  <h4 className="font-bold mb-1">Export Functionality</h4>
                  <p className="text-sm text-muted-foreground">Download schedules as CSV files for further use</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                <div>
                  <h4 className="font-bold mb-1">Demo Datasets</h4>
                  <p className="text-sm text-muted-foreground">Pre-loaded examples for immediate testing</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Meet Our Team */}
          <div className="mt-20">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Meet Our Team
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                The passionate developers behind this innovative scheduling system
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {/* Team Member 1 */}
              <Card className="p-8 card-hover text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mb-6 mx-auto">
                  <User className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Team Member 1</h3>
                <p className="text-primary font-semibold mb-3">Frontend Developer</p>
                <p className="text-muted-foreground text-sm mb-4">
                  Specialized in React development and UI/UX design. Responsible for creating the interactive 
                  scheduling interface and graph visualizations.
                </p>
                <div className="flex justify-center gap-3">
                  <Github className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer" />
                  <Linkedin className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer" />
                  <Mail className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer" />
                </div>
              </Card>

              {/* Team Member 2 */}
              <Card className="p-8 card-hover text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center mb-6 mx-auto">
                  <User className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Team Member 2</h3>
                <p className="text-accent font-semibold mb-3">Algorithm Developer</p>
                <p className="text-muted-foreground text-sm mb-4">
                  Expert in graph theory and discrete mathematics. Implemented the Welsh-Powell algorithm 
                  and conflict detection systems.
                </p>
                <div className="flex justify-center gap-3">
                  <Github className="w-5 h-5 text-muted-foreground hover:text-accent cursor-pointer" />
                  <Linkedin className="w-5 h-5 text-muted-foreground hover:text-accent cursor-pointer" />
                  <Mail className="w-5 h-5 text-muted-foreground hover:text-accent cursor-pointer" />
                </div>
              </Card>

              {/* Team Member 3 */}
              <Card className="p-8 card-hover text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-primary via-accent to-primary rounded-full flex items-center justify-center mb-6 mx-auto">
                  <User className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Team Member 3</h3>
                <p className="text-primary font-semibold mb-3">Backend Developer</p>
                <p className="text-muted-foreground text-sm mb-4">
                  Focused on data structures and scheduling logic. Built the core scheduling engine 
                  and optimization algorithms.
                </p>
                <div className="flex justify-center gap-3">
                  <Github className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer" />
                  <Linkedin className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer" />
                  <Mail className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer" />
                </div>
              </Card>

              {/* Team Member 4 */}
              <Card className="p-8 card-hover text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-accent via-primary to-accent rounded-full flex items-center justify-center mb-6 mx-auto">
                  <User className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Team Member 4</h3>
                <p className="text-accent font-semibold mb-3">Data Analyst</p>
                <p className="text-muted-foreground text-sm mb-4">
                  Specialized in set theory applications and mathematical modeling. Designed the 
                  conflict analysis and set operations visualization.
                </p>
                <div className="flex justify-center gap-3">
                  <Github className="w-5 h-5 text-muted-foreground hover:text-accent cursor-pointer" />
                  <Linkedin className="w-5 h-5 text-muted-foreground hover:text-accent cursor-pointer" />
                  <Mail className="w-5 h-5 text-muted-foreground hover:text-accent cursor-pointer" />
                </div>
              </Card>

              {/* Team Member 5 */}
              <Card className="p-8 card-hover text-center md:col-span-2 lg:col-span-1">
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mb-6 mx-auto">
                  <User className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Team Member 5</h3>
                <p className="text-primary font-semibold mb-3">Project Manager</p>
                <p className="text-muted-foreground text-sm mb-4">
                  Coordinated the development process and ensured project quality. Responsible for 
                  testing, documentation, and user experience optimization.
                </p>
                <div className="flex justify-center gap-3">
                  <Github className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer" />
                  <Linkedin className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer" />
                  <Mail className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer" />
                </div>
              </Card>
            </div>

            {/* Team Collaboration */}
            <Card className="p-10 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20 mb-16">
              <h3 className="text-3xl font-bold mb-8 text-center">Our Collaboration</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Code className="w-6 h-6 text-primary" />
                    Development Process
                  </h4>
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <p>• Agile development methodology with weekly sprints</p>
                    <p>• Collaborative code reviews and pair programming sessions</p>
                    <p>• Continuous integration and testing practices</p>
                    <p>• Regular team meetings and progress tracking</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <User className="w-6 h-6 text-accent" />
                    Team Values
                  </h4>
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <p>• Innovation in mathematical problem-solving</p>
                    <p>• Clean, maintainable, and scalable code</p>
                    <p>• User-centered design and accessibility</p>
                    <p>• Knowledge sharing and continuous learning</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Technology Stack */}
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold mb-8">Technology Stack</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {['React', 'TypeScript', 'Tailwind CSS', 'Graph Theory', 'Welsh-Powell Algorithm', 'Set Theory'].map((tech) => (
                <div key={tech} className="px-6 py-3 bg-primary/10 text-primary rounded-full font-semibold">
                  {tech}
                </div>
              ))}
            </div>
          </div>

          {/* Contact Section */}
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold mb-8">Get In Touch</h3>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Interested in our work or have questions about the project? We'd love to hear from you!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {['Frontend Development', 'Algorithm Design', 'Backend Systems', 'Data Analysis', 'Project Management'].map((skill) => (
                <div key={skill} className="px-6 py-3 bg-primary/10 text-primary rounded-full font-semibold">
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
