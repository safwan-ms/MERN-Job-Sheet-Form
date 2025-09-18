import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <NavLink to={"/jobs"}>Jobs</NavLink>

      <NavLink to={"/final-inspection-reports"}>
        Final Inspection Report
      </NavLink>
    </div>
  );
};
export default Home;
