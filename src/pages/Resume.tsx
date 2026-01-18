import React from 'react';
import ResumeView from '@/components/ResumeView';
import { useNavigate } from 'react-router-dom';
import SEO from '@/components/SEO';

const Resume = () => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate('/');
  };

  return (
    <>
      <SEO
        title="Resume - Professional Resume & CV"
        description="View my professional resume and curriculum vitae. Software Engineer and Cloud Specialist with experience in SRE, DevOps, cloud infrastructure, and full-stack development."
        keywords="Resume, CV, Curriculum Vitae, Professional Resume, Software Engineer Resume, Cloud Specialist Resume"
        url="/resume"
      />
      <ResumeView onClose={handleClose} />
    </>
  );
};

export default Resume;

