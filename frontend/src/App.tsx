import { Routes, Route } from "react-router-dom";
import JobSheetForm from "./pages/JobSheetForm";
import JobList from "./pages/JobList";
import JobDetail from "./pages/JobDetail";
// import FinalInspectionReport from "./pages/FinalInspectionReport";
import FinalInspectionReport from "./pages/FinalInspectionReport";
import Home from "./pages/Home";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/jobs" element={<JobList />} />
      <Route path="/jobs/new" element={<JobSheetForm />} />
      <Route path="/jobs/:id" element={<JobDetail />} />
      <Route
        path="/final-inspection-reports"
        element={<FinalInspectionReport />}
      />
    </Routes>
  );
};

export default App;
