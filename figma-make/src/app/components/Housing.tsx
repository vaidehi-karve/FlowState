import React from "react";
import { Link } from "react-router";
import { Home, MapPin, Users, Calendar, CheckCircle2, XCircle } from "lucide-react";

export function Housing() {
  const halls = [
    {
      name: "North Hall",
      type: "Traditional",
      capacity: "Double",
      amenities: ["Dining Hall", "Laundry", "Study Lounge"],
      cost: "$4,200/semester",
      available: true
    },
    {
      name: "Lakeside Apartments",
      type: "Apartment Style",
      capacity: "4-person suite",
      amenities: ["Kitchen", "Living Room", "Private Bath"],
      cost: "$5,800/semester",
      available: true
    },
    {
      name: "University Towers",
      type: "Suite Style",
      capacity: "2-person suite",
      amenities: ["Shared Bath", "AC", "Ethernet"],
      cost: "$4,950/semester",
      available: false
    },
    {
      name: "West Campus Residence",
      type: "Traditional",
      capacity: "Triple",
      amenities: ["Dining Hall", "Gym", "Computer Lab"],
      cost: "$3,800/semester",
      available: true
    },
  ];

  return (
    <div>
      <div className="mb-6">
        <nav className="text-sm text-muted-foreground mb-4">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">Student Housing</span>
        </nav>
        <h1>Student Housing Portal</h1>
        <p className="text-muted-foreground mt-2">Apply for on-campus housing and manage your housing contract</p>
      </div>

      <div className="bg-[#E8F4FC] border-l-4 border-[#2774AE] rounded p-4 mb-6">
        <p className="text-sm">
          <strong>Housing Application Period:</strong> Applications for Fall 2027 are now open.
          Priority deadline: February 1, 2027. Room assignments will be sent by May 15, 2027.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-card rounded shadow-sm p-6 border border-border">
          <div className="flex items-center gap-3 mb-2">
            <Home className="w-5 h-5 text-[#2774AE]" />
            <h3>Application Status</h3>
          </div>
          <p className="text-2xl">Not Started</p>
        </div>

        <div className="bg-card rounded shadow-sm p-6 border border-border">
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="w-5 h-5 text-[#005587]" />
            <h3>Priority Deadline</h3>
          </div>
          <p className="text-2xl">Feb 1</p>
        </div>

        <div className="bg-card rounded shadow-sm p-6 border border-border">
          <div className="flex items-center gap-3 mb-2">
            <MapPin className="w-5 h-5 text-[#FFD100]" />
            <h3>Available Halls</h3>
          </div>
          <p className="text-2xl">12</p>
        </div>

        <div className="bg-card rounded shadow-sm p-6 border border-border">
          <div className="flex items-center gap-3 mb-2">
            <Users className="w-5 h-5 text-[#8BB8E8]" />
            <h3>Roommate Match</h3>
          </div>
          <p className="text-2xl">Available</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        <div className="lg:col-span-2">
          <div className="bg-card rounded shadow-sm p-8 border border-border mb-6">
            <h2 className="mb-4">Available Residence Halls</h2>
            <div className="space-y-4">
              {halls.map((hall, index) => (
                <div key={index} className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="mb-1">{hall.name}</h3>
                      <p className="text-sm text-muted-foreground">{hall.type} • {hall.capacity}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm mb-1">{hall.cost}</p>
                      {hall.available ? (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                          <CheckCircle2 className="w-3 h-3" />
                          Available
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs">
                          <XCircle className="w-3 h-3" />
                          Full
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {hall.amenities.map((amenity, i) => (
                      <span key={i} className="px-2 py-1 bg-muted text-muted-foreground rounded text-xs">
                        {amenity}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 text-sm">
                      View Details
                    </button>
                    <button className="px-4 py-2 border border-border rounded-md hover:bg-muted text-sm">
                      Virtual Tour
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card rounded shadow-sm p-8 border border-border">
            <h2 className="mb-4">Housing Preferences</h2>
            <p className="text-sm text-muted-foreground mb-4">Select your top 3 housing preferences to increase your chances of getting your preferred assignment.</p>
            <div className="space-y-3">
              <div>
                <label className="block text-sm mb-2">First Choice</label>
                <select className="w-full px-3 py-2 border border-border rounded-md bg-input-background">
                  <option>Select residence hall...</option>
                  <option>North Hall - Double</option>
                  <option>Lakeside Apartments - 4-person suite</option>
                  <option>West Campus Residence - Triple</option>
                </select>
              </div>
              <div>
                <label className="block text-sm mb-2">Second Choice</label>
                <select className="w-full px-3 py-2 border border-border rounded-md bg-input-background">
                  <option>Select residence hall...</option>
                  <option>North Hall - Double</option>
                  <option>Lakeside Apartments - 4-person suite</option>
                  <option>West Campus Residence - Triple</option>
                </select>
              </div>
              <div>
                <label className="block text-sm mb-2">Third Choice</label>
                <select className="w-full px-3 py-2 border border-border rounded-md bg-input-background">
                  <option>Select residence hall...</option>
                  <option>North Hall - Double</option>
                  <option>Lakeside Apartments - 4-person suite</option>
                  <option>West Campus Residence - Triple</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-card rounded shadow-sm p-8 border border-border">
            <h2 className="mb-4">Application Steps</h2>
            <div className="space-y-3">
              <label className="flex items-center gap-3">
                <input type="checkbox" className="w-4 h-4" />
                <span className="text-sm">Complete housing application</span>
              </label>
              <label className="flex items-center gap-3">
                <input type="checkbox" className="w-4 h-4" />
                <span className="text-sm">Pay housing deposit ($200)</span>
              </label>
              <label className="flex items-center gap-3">
                <input type="checkbox" className="w-4 h-4" />
                <span className="text-sm">Select hall preferences</span>
              </label>
              <label className="flex items-center gap-3">
                <input type="checkbox" className="w-4 h-4" />
                <span className="text-sm">Complete roommate profile</span>
              </label>
              <label className="flex items-center gap-3">
                <input type="checkbox" className="w-4 h-4" />
                <span className="text-sm">Submit meal plan selection</span>
              </label>
            </div>
            <button className="w-full mt-4 bg-primary text-primary-foreground px-6 py-3 rounded-md hover:bg-primary/90">
              Start Application
            </button>
          </div>

          <div className="bg-card rounded shadow-sm p-8 border border-border">
            <h2 className="mb-4">Roommate Finder</h2>
            <p className="text-sm text-muted-foreground mb-4">Find a compatible roommate based on lifestyle preferences and interests.</p>
            <button className="w-full bg-card border border-border px-6 py-2 rounded-md hover:bg-muted">
              Browse Profiles
            </button>
          </div>

          <div className="bg-card rounded shadow-sm p-8 border border-border">
            <h2 className="mb-4">Meal Plans</h2>
            <div className="space-y-3 text-sm">
              <div className="pb-3 border-b border-border">
                <p className="mb-1">Unlimited Plan</p>
                <p className="text-xs text-muted-foreground">$2,400/semester</p>
              </div>
              <div className="pb-3 border-b border-border">
                <p className="mb-1">15 Meals/Week</p>
                <p className="text-xs text-muted-foreground">$2,100/semester</p>
              </div>
              <div>
                <p className="mb-1">10 Meals/Week</p>
                <p className="text-xs text-muted-foreground">$1,800/semester</p>
              </div>
            </div>
            <a href="#" className="block mt-3 text-sm text-primary hover:underline">View all meal plan options</a>
          </div>

          <div className="bg-[#FFF8DC] border-l-4 border-[#FFD100] rounded p-6">
            <h3 className="mb-2 text-sm">Important Dates</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Priority Deadline:</span>
                <span>Feb 1, 2027</span>
              </div>
              <div className="flex justify-between">
                <span>Regular Deadline:</span>
                <span>May 1, 2027</span>
              </div>
              <div className="flex justify-between">
                <span>Assignment Notification:</span>
                <span>May 15, 2027</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
