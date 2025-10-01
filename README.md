# Intelligent Timetable Scheduler

A sophisticated web application that generates conflict-free timetables using **Graph Coloring** algorithms and **Discrete Mathematics** principles. Built with React, TypeScript, and Tailwind CSS.

## 🎯 Features

### Multiple Scheduling Types
- **Academic Courses**: Full semester timetables with theory and lab sessions
- **Examinations**: Exam scheduling with no conflicts
- **Sports Events**: Practice sessions and tournaments
- **Cultural Events**: Event planning and venue allocation

### Graph Theory Implementation
- **Conflict Detection**: Automatically identifies resource and faculty conflicts
- **Graph Coloring**: Uses Welsh-Powell algorithm for optimal slot assignment
- **Visual Representation**: Interactive conflict graphs showing course relationships
- **Set Theory**: Demonstrates intersection of faculty and student sets

### Visualization & Animation
- **Conflict Graph View**: Interactive, colorful visualization of course conflicts
- **Timetable Grid View**: Standard calendar-style schedule display
- **Algorithm Steps**: Step-by-step animation showing how the algorithm works
- **Real-time Generation**: Instant schedule creation with detailed reasoning

### User-Friendly Interface
- **Input Forms**: Easy course/event addition with validation
- **Demo Datasets**: Pre-loaded examples for each schedule type
- **CSV Export**: Download schedules for external use
- **Responsive Design**: Works seamlessly on desktop and mobile

## 📚 Educational Content

### Theory Section
Learn about:
- **Graph Theory**: Vertices, edges, and graph coloring
- **Chromatic Number**: Minimum colors needed to color a graph
- **Set Theory**: How intersections determine conflicts
- **Welsh-Powell Algorithm**: Step-by-step explanation

### About Section
- Project purpose and real-world applications
- Technical implementation details
- Educational value for students
- Use cases beyond academics

## 🚀 How to Run

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

Visit `http://localhost:8080` to see the application.

## 💡 How It Works

### Graph Coloring Approach

1. **Model as Graph**
   - Courses/Events = Vertices (Nodes)
   - Conflicts = Edges
   - Time Slots = Colors

2. **Detect Conflicts**
   - Shared faculty between courses
   - Student group overlaps
   - Resource constraints (labs, venues)

3. **Apply Welsh-Powell Algorithm**
   - Sort by degree (conflict count)
   - Assign first available color (time slot)
   - Ensure adjacent nodes have different colors

4. **Generate Schedule**
   - Labs placed first (need 2 consecutive hours)
   - Theory hours assigned by priority
   - Verify no conflicts exist

### Set Theory Foundation

```
If Faculty(Course A) ∩ Faculty(Course B) ≠ ∅
Then: Course A and Course B conflict
Result: Must be scheduled at different times
```

## 📊 Demo Data Included

The application comes with pre-loaded demo datasets:

**Academic Courses:**
- Discrete Mathematics (4h theory + 2h lab)
- Data Structures (3h theory + 2h lab)
- Database Systems (3h theory + 4h lab)
- Computer Networks (2h theory + 2h lab)
- Software Engineering (4h theory)

**Other Schedule Types:**
- Exam schedules
- Sports practice sessions
- Cultural events

## 🎨 Technical Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: shadcn/ui
- **Algorithm**: Welsh-Powell graph coloring
- **State Management**: React hooks
- **Build Tool**: Vite

## 🔬 Algorithm Complexity

- **Time Complexity**: O(n²) where n = number of courses
- **Space Complexity**: O(n × d × h) where d = days, h = hours per day
- **Graph Construction**: O(n²) for conflict detection
- **Coloring**: O(n × c) where c = chromatic number

## 📝 Key Constraints Handled

- Faculty availability conflicts
- Lab sessions requiring 2 consecutive hours
- Priority-based scheduling
- Multiple divisions/sections
- Different lab types (combined/per-batch)
- Resource allocation (rooms, equipment)

## 🎓 Educational Use Cases

Perfect for:
- Discrete Mathematics courses
- Graph Theory demonstrations
- Algorithm visualization
- Operations Research projects
- Computer Science education
- Real-world problem-solving

## 🌐 Real-World Applications

Beyond academics, this system applies to:
- Hospital shift scheduling
- Meeting room allocation
- Sports facility management
- Conference planning
- Project resource management
- Manufacturing scheduling

## 📄 License

This project is open source and available for educational purposes.

## 🤝 Contributing

Contributions are welcome! This project serves as an educational tool to demonstrate discrete mathematics concepts.

---

**Built with ❤️ using Graph Theory and Discrete Mathematics**

Transform complex scheduling problems into beautiful, conflict-free timetables!
