import "./Home.css"
import { Link } from "react-router-dom";
function Home(){
    return(
        <main className="home">
        <section className="hero-section">
            <h1>Fix Problem. Improve Campus</h1>
            <p> Report college issues easily and trackthem until they are resolved.</p>
            <Link to="student/complaints/create" className="hero-button">Submit a Complaint</Link>
        </section>
        <section className="how-its-works">
            <h2>How it Works</h2>
            <div className="steps">
                <div className="step">
                    <h3>1. Report</h3>
                    <p>Submit Your complaint with the necessary details.</p>
                </div>
                <div className="step">
                    <h3>2. Assigned</h3>
                    <p>The complaint is assigned to appropraite staff member.</p>
                </div>
                <div className="step">
                    <h3>3. Resolved</h3>
                    <p>Track the complaint untill the issue is resolved</p>
                </div>
            </div>
        </section>
        </main>
    )
}

export default Home;
