import { useState, useEffect } from "react";

const API_URL = "http://localhost:5000";

export function useJobs() {
  const [state, setState] = useState({
    candidate: null,
    jobs: [],
    candidateSkills: [],
    skillOpportunities: [],
    loading: true,
    error: "",
  });

  const [selectedJob, setSelectedJob] = useState(null);
  const [skillGap, setSkillGap] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [detailsError, setDetailsError] = useState("");

  // Load initial data
  useEffect(() => {
    async function fetchData() {
      try {
        setState(prev => ({ ...prev, loading: true, error: "" }));

        const [candidateRes, skillsRes, opportunitiesRes] = await Promise.all([
          fetch(`${API_URL}/api/candidates/candidate1`),
          fetch(`${API_URL}/api/candidates/candidate1/skills`),
          fetch(`${API_URL}/api/skills/opportunities/candidate1`),
        ]);

        if (!candidateRes.ok) throw new Error("Failed to load recommendations");
        
        const candidateData = await candidateRes.json();
        if (!candidateData.success) throw new Error(candidateData.message || "Failed to load candidate data");

        const skillsData = await skillsRes.json();
        if (!skillsData.success) throw new Error(skillsData.message || "Failed to load skills data");

        const opportunitiesData = await opportunitiesRes.json();
        if (!opportunitiesData.success) throw new Error(opportunitiesData.message || "Failed to load opportunities data");

        setState({
          candidate: candidateData.candidate,
          jobs: candidateData.recommendations || [],
          candidateSkills: skillsData.skills || [],
          skillOpportunities: opportunitiesData.skills || [],
          loading: false,
          error: "",
        });
      } catch (err) {
        console.error("Error fetching data:", err);
        setState(prev => ({
          ...prev,
          loading: false,
          error: err.message || "Unable to load your job recommendations.",
        }));
      }
    }

    fetchData();
  }, []);

  // Load skill gap for a job
  async function loadSkillGap(job) {
    try {
      setDetailsLoading(true);
      setDetailsError("");
      setSelectedJob(job);
      setSkillGap(null);

      const response = await fetch(`${API_URL}/api/skill-gap/candidate1/${job.jobId}`);
      
      if (!response.ok) {
        throw new Error(`Failed to load skill gap data (${response.status})`);
      }
      
      const data = await response.json();

      if (!data.success) throw new Error(data.message || "Failed to load skill gap");
      setSkillGap(data);
    } catch (err) {
      console.error("Error loading skill gap:", err);
      setDetailsError(err.message);
      setSkillGap({ missingSkills: [] });
    } finally {
      setDetailsLoading(false);
    }
  }

  function goBack() {
    setSelectedJob(null);
    setSkillGap(null);
    setDetailsError("");
  }

  return {
    ...state,
    selectedJob,
    skillGap,
    detailsLoading,
    detailsError,
    loadSkillGap,
    goBack,
  };
}