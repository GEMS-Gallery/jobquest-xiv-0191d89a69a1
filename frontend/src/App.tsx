import React, { useState, useEffect } from 'react';
import { backend } from 'declarations/backend';
import { Container, Typography, Grid, Card, CardContent, CardMedia, Chip, CircularProgress, Box } from '@mui/material';

interface Job {
  id: string;
  name: string;
  role: string;
  image: string | null;
}

interface JobDetail extends Job {
  strengths: string[];
  weaknesses: string[] | null;
}

const App: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<JobDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const result = await backend.getJobs();
        setJobs(result);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching jobs:', error);
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleJobClick = async (jobId: string) => {
    setLoading(true);
    try {
      const result = await backend.getJobDetails(jobId);
      if (result) {
        setSelectedJob(result);
      }
    } catch (error) {
      console.error('Error fetching job details:', error);
    }
    setLoading(false);
  };

  const roleColors = {
    Tank: '#3273dc',
    Healer: '#23d160',
    DPS: '#ff3860',
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg">
      <Typography variant="h2" component="h1" gutterBottom>
        FFXIV Jobs
      </Typography>
      <Grid container spacing={3}>
        {jobs.map((job) => (
          <Grid item xs={12} sm={6} md={4} key={job.id}>
            <Card onClick={() => handleJobClick(job.id)}>
              <CardMedia
                component="img"
                height="140"
                image={job.image || 'default-job-image.png'}
                alt={job.name}
              />
              <CardContent>
                <Typography variant="h5" component="div">
                  {job.name}
                </Typography>
                <Chip
                  label={job.role}
                  style={{ backgroundColor: roleColors[job.role as keyof typeof roleColors], color: 'white' }}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      {selectedJob && (
        <Box mt={4}>
          <Typography variant="h4" component="h2" gutterBottom>
            {selectedJob.name} Details
          </Typography>
          <Typography variant="h6">Strengths:</Typography>
          <ul>
            {selectedJob.strengths.map((strength, index) => (
              <li key={index}>{strength}</li>
            ))}
          </ul>
          {selectedJob.weaknesses && (
            <>
              <Typography variant="h6">Weaknesses:</Typography>
              <ul>
                {selectedJob.weaknesses.map((weakness, index) => (
                  <li key={index}>{weakness}</li>
                ))}
              </ul>
            </>
          )}
        </Box>
      )}
    </Container>
  );
};

export default App;
