import React from "react";
import { Link } from "react-router";
import { Search, Filter, Calendar, Clock, Users, BookOpen } from "lucide-react";

export function CourseRegistration() {
  const courses = [
    { code: "MATH 101", name: "Calculus I", credits: 4, seats: "23/120", time: "MWF 9:00-9:50 AM", instructor: "Dr. Johnson", status: "Open" },
    { code: "ENGL 102", name: "English Composition II", credits: 3, seats: "5/30", time: "TTh 11:00-12:15 PM", instructor: "Prof. Martinez", status: "Almost Full" },
    { code: "CHEM 201", name: "Organic Chemistry", credits: 4, seats: "0/45", time: "MWF 1:00-1:50 PM", instructor: "Dr. Chen", status: "Waitlist" },
    { code: "HIST 150", name: "World History", credits: 3, seats: "67/80", time: "TTh 2:00-3:15 PM", instructor: "Prof. Williams", status: "Open" },
    { code: "CS 225", name: "Data Structures", credits: 4, seats: "12/90", time: "MWF 10:00-10:50 AM", instructor: "Dr. Patel", status: "Open" },
  ];

  return (
    <div>
      <div className="mb-6">
        <nav className="text-sm text-muted-foreground mb-4">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">Course Registration</span>
        </nav>
        <h1>Course Registration</h1>
        <p className="text-muted-foreground mt-2">Browse and register for Spring 2026 courses</p>
      </div>

      <div className="bg-[#FFF8DC] border-l-4 border-[#FFD100] rounded p-4 mb-6">
        <p className="text-sm">
          <strong>Registration Window:</strong> Your registration opens on November 5, 2026 at 8:00 AM.
          You may register for up to 18 credit hours.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-card rounded shadow-sm p-6 border border-border">
          <div className="flex items-center gap-3 mb-2">
            <BookOpen className="w-5 h-5 text-[#2774AE]" />
            <h3>Current Credits</h3>
          </div>
          <p className="text-2xl">12</p>
        </div>

        <div className="bg-card rounded shadow-sm p-6 border border-border">
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="w-5 h-5 text-[#005587]" />
            <h3>Registered Courses</h3>
          </div>
          <p className="text-2xl">4</p>
        </div>

        <div className="bg-card rounded shadow-sm p-6 border border-border">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="w-5 h-5 text-[#FFD100]" />
            <h3>Waitlisted</h3>
          </div>
          <p className="text-2xl">1</p>
        </div>

        <div className="bg-card rounded shadow-sm p-6 border border-border">
          <div className="flex items-center gap-3 mb-2">
            <Users className="w-5 h-5 text-[#8BB8E8]" />
            <h3>Max Credits</h3>
          </div>
          <p className="text-2xl">18</p>
        </div>
      </div>

      <div className="bg-card rounded shadow-sm p-8 border border-border mb-6">
        <h2 className="mb-4">Search Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm mb-2">Term</label>
            <select className="w-full px-3 py-2 border border-border rounded-md bg-input-background">
              <option>Spring 2026</option>
              <option>Fall 2026</option>
              <option>Summer 2026</option>
            </select>
          </div>
          <div>
            <label className="block text-sm mb-2">Subject</label>
            <select className="w-full px-3 py-2 border border-border rounded-md bg-input-background">
              <option>All Subjects</option>
              <option>Computer Science</option>
              <option>Mathematics</option>
              <option>English</option>
              <option>History</option>
              <option>Chemistry</option>
            </select>
          </div>
          <div>
            <label className="block text-sm mb-2">Course Number</label>
            <input
              type="text"
              placeholder="e.g., 101"
              className="w-full px-3 py-2 border border-border rounded-md bg-input-background"
            />
          </div>
          <div className="flex items-end">
            <button
              data-track="courses_search"
              className="w-full bg-primary text-primary-foreground px-6 py-2 rounded-md hover:bg-primary/90 flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4" />
              Search
            </button>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2">
          <button data-track="courses_more_filters" className="px-3 py-1 text-sm border border-border rounded-md hover:bg-muted flex items-center gap-2">
            <Filter className="w-4 h-4" />
            More Filters
          </button>
          <button data-track="courses_filter_open" className="px-3 py-1 text-sm bg-muted text-muted-foreground rounded hover:bg-muted/80">Open Sections Only</button>
          <button data-track="courses_filter_online" className="px-3 py-1 text-sm bg-muted text-muted-foreground rounded hover:bg-muted/80">Online Courses</button>
          <button data-track="courses_filter_evening" className="px-3 py-1 text-sm bg-muted text-muted-foreground rounded hover:bg-muted/80">Evening Classes</button>
        </div>
      </div>

      <div className="bg-card rounded shadow-sm border border-border overflow-hidden">
        <div className="p-6 border-b border-border">
          <h2>Available Courses</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-6 py-3 text-left text-sm">Course Code</th>
                <th className="px-6 py-3 text-left text-sm">Course Name</th>
                <th className="px-6 py-3 text-left text-sm">Credits</th>
                <th className="px-6 py-3 text-left text-sm">Seats Available</th>
                <th className="px-6 py-3 text-left text-sm">Schedule</th>
                <th className="px-6 py-3 text-left text-sm">Instructor</th>
                <th className="px-6 py-3 text-left text-sm">Status</th>
                <th className="px-6 py-3 text-left text-sm">Action</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course, index) => (
                <tr key={index} className="border-b border-border hover:bg-muted/30">
                  <td className="px-6 py-4 text-sm">{course.code}</td>
                  <td className="px-6 py-4 text-sm">{course.name}</td>
                  <td className="px-6 py-4 text-sm">{course.credits}</td>
                  <td className="px-6 py-4 text-sm">{course.seats}</td>
                  <td className="px-6 py-4 text-sm">{course.time}</td>
                  <td className="px-6 py-4 text-sm">{course.instructor}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      course.status === "Open" ? "bg-green-100 text-green-700" :
                      course.status === "Almost Full" ? "bg-orange-100 text-orange-700" :
                      "bg-red-100 text-red-700"
                    }`}>
                      {course.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <button
                      data-track={`courses_action_${course.status === "Waitlist" ? "waitlist" : "register"}_${course.code.replace(/\\s+/g, "_").toLowerCase()}`}
                      className={`px-4 py-1 rounded text-sm ${
                        course.status === "Waitlist"
                          ? "bg-muted text-muted-foreground hover:bg-muted/80"
                          : "bg-primary text-primary-foreground hover:bg-primary/90"
                      }`}
                    >
                      {course.status === "Waitlist" ? "Join Waitlist" : "Register"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6 bg-card rounded shadow-sm p-8 border border-border">
        <h2 className="mb-4">Registration Help</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <h3 className="mb-2">Need Advising?</h3>
            <p className="text-muted-foreground mb-2">Schedule an appointment with your academic advisor</p>
            <a href="#" className="text-primary hover:underline">Book Appointment</a>
          </div>
          <div>
            <h3 className="mb-2">Registration Issues?</h3>
            <p className="text-muted-foreground mb-2">Contact the registrar's office for help</p>
            <a href="#" className="text-primary hover:underline">Contact Registrar</a>
          </div>
          <div>
            <h3 className="mb-2">Course Prerequisites</h3>
            <p className="text-muted-foreground mb-2">Review degree requirements and prerequisites</p>
            <a href="#" className="text-primary hover:underline">View Requirements</a>
          </div>
        </div>
      </div>
    </div>
  );
}
