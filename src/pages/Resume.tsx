import React from 'react';
import ResumeView from '@/components/ResumeView';
import { useNavigate } from 'react-router-dom';

const Resume = () => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate('/');
  };

  return <ResumeView onClose={handleClose} />;
};

export default Resume;

