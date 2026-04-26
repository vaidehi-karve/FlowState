import React from "react";
import { Link } from "react-router";
import { Search, GraduationCap, BookOpen, DollarSign, Home as HomeIcon, User, Calendar } from "lucide-react";

export function Home() {
  const tiles = [
    {
      title: "Admissions",
      description: "Apply to State University, check application status, and review requirements",
      icon: GraduationCap,
      path: "/admissions",
      color: "bg-[#2774AE]"
    },
    {
      title: "Register for Classes",
      description: "Browse course catalog, register for classes, view schedule",
      icon: BookOpen,
      path: "/courses",
      color: "bg-[#003B5C]"
    },
    {
      title: "Financial Aid",
      description: "FAFSA information, scholarships, grants, and financial aid status",
      icon: DollarSign,
      path: "/financial-aid",
      color: "bg-[#FFD100]"
    },
    {
      title: "Housing",
      description: "Apply for on-campus housing, view residence halls, manage housing contract",
      icon: HomeIcon,
      path: "/housing",
      color: "bg-[#005587]"
    },
    {
      title: "Student Profile",
      description: "Update personal information, view academic records, manage account settings",
      icon: User,
      path: "#",
      color: "bg-[#8BB8E8]"
    },
    {
      title: "Academic Calendar",
      description: "Important dates, registration deadlines, holidays, and campus events",
      icon: Calendar,
      path: "#",
      color: "bg-[#2774AE]"
    }
  ];

  return (
    <div>
      <div className="bg-card rounded shadow-sm p-8 mb-10 border border-border" data-section-id="home_search">
        <h2 className="mb-6 text-foreground">What do you need help with?</h2>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search for services, forms, or information..."
            data-track="home_search_input"
            className="w-full pl-12 pr-4 py-3.5 border-2 border-border rounded bg-input-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          />
        </div>
        <div className="flex flex-wrap gap-2 mt-5">
          <button data-track="home_chip_transcripts" className="px-4 py-1.5 text-sm bg-muted text-foreground rounded-full hover:bg-primary hover:text-primary-foreground transition-colors">Transcripts</button>
          <button data-track="home_chip_registration" className="px-4 py-1.5 text-sm bg-muted text-foreground rounded-full hover:bg-primary hover:text-primary-foreground transition-colors">Registration</button>
          <button data-track="home_chip_tuition" className="px-4 py-1.5 text-sm bg-muted text-foreground rounded-full hover:bg-primary hover:text-primary-foreground transition-colors">Tuition Payment</button>
          <button data-track="home_chip_financial_aid" className="px-4 py-1.5 text-sm bg-muted text-foreground rounded-full hover:bg-primary hover:text-primary-foreground transition-colors">Financial Aid</button>
          <button data-track="home_chip_housing" className="px-4 py-1.5 text-sm bg-muted text-foreground rounded-full hover:bg-primary hover:text-primary-foreground transition-colors">Housing</button>
        </div>
      </div>

      <div className="mb-8" data-section-id="home_services_header">
        <h2 className="mb-6 text-foreground">Student Services</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10" data-section-id="home_tiles">
        {tiles.map((tile) => {
          const Icon = tile.icon;
          const content = (
            <div className="bg-card rounded shadow-sm hover:shadow-md transition-all p-8 h-full border border-border group cursor-pointer" data-track={`home_tile_${tile.title.toLowerCase().replace(/\\s+/g, "_")}`}>
              <div className={`${tile.color} w-16 h-16 rounded flex items-center justify-center mb-5 group-hover:scale-105 transition-transform`}>
                <Icon className={`w-9 h-9 ${tile.color === 'bg-[#FFD100]' ? 'text-secondary' : 'text-white'}`} />
              </div>
              <h3 className="mb-3 text-foreground">{tile.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{tile.description}</p>
            </div>
          );

          return tile.path !== "#" ? (
            <Link key={tile.title} to={tile.path} data-track={`home_tile_link_${tile.title.toLowerCase().replace(/\\s+/g, "_")}`}>
              {content}
            </Link>
          ) : (
            <div key={tile.title}>
              {content}
            </div>
          );
        })}
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6" data-section-id="home_bottom">
        <div className="bg-card rounded shadow-sm p-8 border border-border" data-section-id="home_announcements">
          <h3 className="mb-5 text-foreground pb-3 border-b-2 border-accent">Announcements</h3>
          <div className="space-y-4">
            <div className="pb-4 border-b border-border">
              <p className="text-sm mb-1.5">Spring 2026 Registration Opens</p>
              <p className="text-xs text-muted-foreground">Registration begins November 1st for continuing students</p>
            </div>
            <div className="pb-4 border-b border-border">
              <p className="text-sm mb-1.5">Financial Aid Verification Deadline</p>
              <p className="text-xs text-muted-foreground">Submit required documents by October 15th</p>
            </div>
            <div>
              <p className="text-sm mb-1.5">Campus Housing Applications</p>
              <p className="text-xs text-muted-foreground">Housing applications for Fall 2027 now available</p>
            </div>
          </div>
        </div>

        <div className="bg-card rounded shadow-sm p-8 border border-border" data-section-id="home_important_links">
          <h3 className="mb-5 text-foreground pb-3 border-b-2 border-accent">Important Links</h3>
          <div className="space-y-2.5">
            <a href="#" data-track="home_link_student_email" className="block text-sm text-primary hover:text-secondary transition-colors">Student Email</a>
            <a href="#" data-track="home_link_lms" className="block text-sm text-primary hover:text-secondary transition-colors">Learning Management System</a>
            <a href="#" data-track="home_link_library" className="block text-sm text-primary hover:text-secondary transition-colors">Library Resources</a>
            <a href="#" data-track="home_link_safety" className="block text-sm text-primary hover:text-secondary transition-colors">Campus Safety</a>
            <a href="#" data-track="home_link_career" className="block text-sm text-primary hover:text-secondary transition-colors">Career Services</a>
            <a href="#" data-track="home_link_health" className="block text-sm text-primary hover:text-secondary transition-colors">Student Health Portal</a>
            <a href="#" data-track="home_link_it" className="block text-sm text-primary hover:text-secondary transition-colors">IT Support</a>
          </div>
        </div>
      </div>
    </div>
  );
}
