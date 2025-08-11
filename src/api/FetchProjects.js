const Test = () => {
  const [projects, setProjects] = useState(null);
  const { user } = useAuth(); // Assuming user object is provided by your auth context
  const userEmail = user?.email; // Get the email from the user object

  useEffect(() => {
    // Only fetch if userEmail is available
    if (!userEmail) {
      console.warn("User email is not available yet.");
      return;
    }

    const fetchProjects = async () => {
      try {
        const response = await fetch(
          `https://spplindia.org/api/projects.php?email=${encodeURIComponent(userEmail)}`
        );
        const data = await response.json();
        if (data.projects) {
          setProjects(data.projects);
          console.log("Projects:", data.projects);
        } else {
          console.error("Error:", data.error);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchProjects();
  }, [userEmail]); // Dependency ensures the effect runs when userEmail is defined

  return (
    <div>
      <h2>User's Projects</h2>
      <h2>{userEmail}</h2>
      <pre>{JSON.stringify(projects, null, 2)}</pre>
    </div>
  );
};

export default Test;

