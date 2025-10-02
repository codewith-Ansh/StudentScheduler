import { Card } from '@/components/ui/card';
import { User, Github, Linkedin, Mail, Code, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const AboutUs = () => {
  return (
    <div className="min-h-screen pt-16">
      {/* Header */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Button variant="ghost" asChild className="mb-8">
              <Link to="/" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Link>
            </Button>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Meet Our Team
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We are a passionate team of 5 developers who combined our expertise in mathematics, 
              computer science, and software engineering to create this innovative scheduling system.
            </p>
          </div>
        </div>
      </section>

      {/* Team Members */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {/* Team Member 1 */}
              <Card className="p-8 card-hover text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mb-6 mx-auto">
                  <User className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Ansh Darji</h3>
                <p className="text-primary font-semibold mb-3">Frontend Developer</p>
                <p className="text-muted-foreground mb-4">
                  Specialized in React development and UI/UX design. Responsible for creating the interactive 
                  scheduling interface and graph visualizations. Passionate about creating intuitive user experiences.
                </p>
                <div className="flex justify-center gap-3">
                  <Github className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
                  <Linkedin className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
                  <Mail className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
                </div>
              </Card>

              {/* Team Member 2 */}
              <Card className="p-8 card-hover text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center mb-6 mx-auto">
                  <User className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Team Member 2</h3>
                <p className="text-accent font-semibold mb-3">Algorithm Developer</p>
                <p className="text-muted-foreground mb-4">
                  Expert in graph theory and discrete mathematics. Implemented the Welsh-Powell algorithm 
                  and conflict detection systems. Loves solving complex mathematical problems.
                </p>
                <div className="flex justify-center gap-3">
                  <Github className="w-5 h-5 text-muted-foreground hover:text-accent cursor-pointer transition-colors" />
                  <Linkedin className="w-5 h-5 text-muted-foreground hover:text-accent cursor-pointer transition-colors" />
                  <Mail className="w-5 h-5 text-muted-foreground hover:text-accent cursor-pointer transition-colors" />
                </div>
              </Card>

              {/* Team Member 3 */}
              <Card className="p-8 card-hover text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-primary via-accent to-primary rounded-full flex items-center justify-center mb-6 mx-auto">
                  <User className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Team Member 3</h3>
                <p className="text-primary font-semibold mb-3">Backend Developer</p>
                <p className="text-muted-foreground mb-4">
                  Focused on data structures and scheduling logic. Built the core scheduling engine 
                  and optimization algorithms. Ensures system performance and reliability.
                </p>
                <div className="flex justify-center gap-3">
                  <Github className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
                  <Linkedin className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
                  <Mail className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
                </div>
              </Card>

              {/* Team Member 4 */}
              <Card className="p-8 card-hover text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-accent via-primary to-accent rounded-full flex items-center justify-center mb-6 mx-auto">
                  <User className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Team Member 4</h3>
                <p className="text-accent font-semibold mb-3">Data Analyst</p>
                <p className="text-muted-foreground mb-4">
                  Specialized in set theory applications and mathematical modeling. Designed the 
                  conflict analysis and set operations visualization. Expert in data-driven insights.
                </p>
                <div className="flex justify-center gap-3">
                  <Github className="w-5 h-5 text-muted-foreground hover:text-accent cursor-pointer transition-colors" />
                  <Linkedin className="w-5 h-5 text-muted-foreground hover:text-accent cursor-pointer transition-colors" />
                  <Mail className="w-5 h-5 text-muted-foreground hover:text-accent cursor-pointer transition-colors" />
                </div>
              </Card>

              {/* Team Member 5 */}
              <Card className="p-8 card-hover text-center md:col-span-2 lg:col-span-1">
                <div className="w-24 h-24 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mb-6 mx-auto">
                  <User className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Team Member 5</h3>
                <p className="text-primary font-semibold mb-3">Project Manager</p>
                <p className="text-muted-foreground mb-4">
                  Coordinated the development process and ensured project quality. Responsible for 
                  testing, documentation, and user experience optimization. Keeps the team organized and motivated.
                </p>
                <div className="flex justify-center gap-3">
                  <Github className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
                  <Linkedin className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
                  <Mail className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
                </div>
              </Card>
            </div>

            {/* Team Story */}
            <Card className="p-10 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20 mb-16">
              <h3 className="text-3xl font-bold mb-8 text-center">Our Story</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xl font-bold mb-4">How We Started</h4>
                  <p className="text-muted-foreground mb-4">
                    As computer science students, we faced the challenge of creating optimal class schedules 
                    that avoided conflicts while maximizing resource utilization. This real-world problem 
                    inspired us to dive deep into graph theory and discrete mathematics.
                  </p>
                  <p className="text-muted-foreground">
                    What started as a class project evolved into a comprehensive scheduling system that 
                    demonstrates the practical applications of theoretical computer science concepts.
                  </p>
                </div>
                
                <div>
                  <h4 className="text-xl font-bold mb-4">Our Mission</h4>
                  <p className="text-muted-foreground mb-4">
                    We believe that complex mathematical concepts should be accessible and applicable to 
                    real-world problems. Our goal is to bridge the gap between theoretical knowledge and 
                    practical implementation.
                  </p>
                  <p className="text-muted-foreground">
                    Through this project, we aim to inspire other students to explore the beauty and 
                    utility of discrete mathematics, graph theory, and algorithmic problem-solving.
                  </p>
                </div>
              </div>
            </Card>

            {/* Team Collaboration */}
            <Card className="p-10 bg-gradient-to-br from-accent/5 to-primary/5 border-accent/20">
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
                    <p>• Knowledge sharing sessions on mathematical concepts</p>
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
                    <p>• Collaborative decision-making and respect</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Contact Section */}
            <div className="mt-16 text-center">
              <h3 className="text-3xl font-bold mb-8">Get In Touch</h3>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Interested in our work or have questions about the project? We'd love to hear from you! 
                Whether you're a student, educator, or fellow developer, we're always excited to discuss 
                our project and share our experiences.
              </p>
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                {['Frontend Development', 'Algorithm Design', 'Backend Systems', 'Data Analysis', 'Project Management'].map((skill) => (
                  <div key={skill} className="px-6 py-3 bg-primary/10 text-primary rounded-full font-semibold">
                    {skill}
                  </div>
                ))}
              </div>
              <Button asChild size="lg">
                <Link to="/">
                  Try Our Scheduler
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;