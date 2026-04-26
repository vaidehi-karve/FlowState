# About the Project

**FlowState** is a behavioral beta-testing platform that helps product teams move from assumption-driven decisions to engagement-based decisions.

Instead of relying only on high-level analytics, FlowState simulates real user sessions in a controlled environment and captures detailed interaction data such as clicks, navigation paths, hover behavior, scrolling, and time spent across different sections.

This data is aggregated into a centralized dashboard that highlights key UX metrics like task completion rate, friction score, top-clicked features, and common user flows. With a single click, product managers can run AI-powered analysis to generate prioritized UX recommendations grounded in actual user behavior.

Our goal is simple: help teams identify friction points faster and make targeted interface improvements before users experience frustration.

Learn about our project [here](https://devpost.com/software/flowstate-2wlq5j).

---

# Inspiration

We were inspired by how difficult it is for product managers and designers to truly understand user behavior during the early stages of product development.

While tools like Google Analytics provide large amounts of data, they often lack the context needed to explain *why* users behave a certain way. Teams frequently rely on assumptions or intuition when making UI decisions, especially during beta testing when structured feedback is limited.

This led us to ask:

**What if we could simulate real user tasks, capture behavior in detail, and directly translate that into actionable design recommendations?**

That question became the foundation of FlowState.

---

# What We Learned

Building FlowState taught us how to turn raw behavioral data into insights that product teams can actually use.

We learned which signals most accurately indicate user friction—such as hesitation, repeated actions, inefficient navigation paths, and extended session times. We also learned the importance of balancing data collection with simplicity: tracking too much creates noise, while tracking too little misses critical patterns.

Most importantly, integrating AI-driven recommendations showed us how analytics can evolve from passive reporting into active decision support for better product design.

---

# How We Built It

We built FlowState as a full-stack behavioral analytics platform using **React** for the frontend, **Express + SQLite** for the backend, and **Google Gemini** for AI-powered UX analysis.

At the core is a custom feature-tracking system that captures real user interactions like clicks, hovers, scrolls, and navigation paths inside a realistic university portal demo. This interaction data is sent asynchronously to the backend, stored in SQLite, and submitted to a centralized analytics dashboard where product managers can review user behavior, task progress, and friction patterns across sessions.

On top of this, we built a friction scoring algorithm that detects signals of user struggle—such as repeated clicks, long idle time, backtracking, and slow task completion—and converts them into a simple **0–10 friction score**.

For PMs, session data is aggregated into insights like common navigation flows, top-clicked features, and task completion behavior. This structured data is then passed to Gemini, which generates prioritized UX recommendations categorized by severity, helping teams move from raw analytics to immediate design improvements.

The platform supports both **Tester Mode** and **PM Mode**, allowing teams to observe behavior live and turn those insights into smarter product decisions.

---

# Challenges

One of the biggest challenges was identifying which behavioral signals best represent user friction without introducing noise or overcomplicating the system. We had to carefully narrow our focus to meaningful metrics like clicks, hovers, scrolls, navigation flows, and time-to-action.

Another challenge was transforming raw interaction data into insights that are clear and actionable, rather than overwhelming product teams with more analytics.

We also had to design a demo environment that realistically simulates user behavior while remaining controlled and consistent for testing.

Finally, we considered the long-term implications of tracking user behavior at scale, particularly around privacy, transparency, and responsible data collection.

---

# What’s Next

Looking ahead, we plan to extend FlowState by enabling dynamic UI adaptation—where interfaces can automatically adjust in real time based on user behavior rather than only providing recommendations.

We also want to introduce more advanced A/B testing capabilities to compare UI variations and measure their impact on engagement and task completion.

Additional future improvements include:

- algorithmic optimization of navigation flows  
- personalized recommendations based on user personas  
- integration with real production environments  
- privacy-first tracking systems  
- scalable infrastructure for larger product teams  

Our long-term vision is to make FlowState a deployable solution that helps teams design smoother, smarter, and more user-centered digital experiences.

### Prereqs
- Node.js (you have Node 22 already)
- A Google Gemini API key

### Setup

Create your server env file:

```bash
cp server/.env.example server/.env
```

Edit `server/.env` and set `GEMINI_API_KEY`.

Install deps:

```bash
cd server && npm i
cd ../figma-make && npm i
```

### Run (two terminals)

Backend:

```bash
cd server
npm run dev
```

Frontend:

```bash
cd figma-make
npm run dev
```

Open the Vite URL. The right-side panel shows live events, aggregates, friction score, and (when you click **Run AI Analysis**) real Gemini-generated UX recommendations based on the session’s tracked events.

