import "./styles/Work.css";
import WorkImage from "./WorkImage";

const projects = [
  {
    num: "01",
    name: "Library Management System",
    category: "Software Engineering",
    tools: "C++, File Handling, Object-Oriented Programming",
    image: "/images/project1.jpg",
    link: "/images/project1.jpg",
  },
  {
    num: "02",
    name: "Stock Fingerprinting Engine",
    category: "Software Engineering & Finance",
    tools: "C++, Data Structures, Algorithmic Analysis",
    image: "/images/project2.jpg",
    link: "/images/project2.jpg",
  },
  {
    num: "03",
    name: "Smart Campus Navigation",
    category: "Software Engineering & Graphs",
    tools: "C++, Dijkstra/A* Algorithms, Graph Theory",
    image: "/images/next.webp",
    link: "/images/next.webp",
  },
  {
    num: "04",
    name: "Interactive Reels & Campaigns",
    category: "Content Strategy & Marketing",
    tools: "Canva, Video Editing, Social Media Analytics",
    image: "/images/express.webp",
    link: "/images/express.webp",
  },
  {
    num: "05",
    name: "Fintech UI Design",
    category: "UI/UX & Graphic Design",
    tools: "Figma, Canva, Typography, Visual Design",
    image: "/images/node.webp",
    link: "/images/node.webp",
  },
  {
    num: "06",
    name: "Chatbot Widget",
    category: "Web Development & AI",
    tools: "JavaScript, HTML, CSS, AI Integration",
    image: "/images/project2.jpg",
    link: "/images/project2.jpg",
  },
];

const Work = () => {
  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          {projects.map((project, index) => (
            <div className="work-box" key={index}>
              <div className="work-info">
                <div className="work-title">
                  <h3>{project.num}</h3>
                  <div>
                    <h4>{project.name}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <h4>Tools and features</h4>
                <p>{project.tools}</p>
              </div>
              <WorkImage image={project.image} alt={project.name} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
