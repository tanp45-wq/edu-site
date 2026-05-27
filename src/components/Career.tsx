import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Integrated M.Tech Student</h4>
                <h5>Vellore Institute of Technology (VIT)</h5>
              </div>
              <h3>2024 - 2029</h3>
            </div>
            <p>
              Pursuing an Integrated M.Tech in Software Engineering. Building strong foundations in data structures, algorithmic analysis, web technologies, and database systems, while blending technology with user-centric design.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Design Head</h4>
                <h5>Yuva Marathi Club, VIT</h5>
              </div>
              <h3>2025 - PRESENT</h3>
            </div>
            <p>
              Leading visual branding, flyer designs, and creative direction for club events. Coordinating with teams to create aesthetic digital assets, promotional posters, and branding guidelines for large-scale events.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Content Strategist & Lead Designer</h4>
                <h5>Social Media Campaigns</h5>
              </div>
              <h3>2026 - PRESENT</h3>
            </div>
            <p>
              Spearheaded an interactive Reels strategy, optimizing short-form videos for audience engagement. Successfully converted digital impressions into increased physical student turnouts at club and campus cultural events.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
