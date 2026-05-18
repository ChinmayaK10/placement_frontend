import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import RoadmapModal from './modals/RoadmapModal';
import StrengthModal from './modals/StrengthModal';
import ResumeModal from './modals/ResumeModal';
import CompanyModal from './modals/CompanyModal';

export default function AnalyticsModalsWrapper() {
  const [activeModal, setActiveModal] = useState(null);

  useEffect(() => {
    const handleModalOpen = (e) => {
      const btn = e.target.closest('[data-modal]');
      if (btn) {
        e.preventDefault();
        const modalType = btn.getAttribute('data-modal');
        setActiveModal(modalType);
      }
    };

    document.addEventListener('click', handleModalOpen);
    return () => document.removeEventListener('click', handleModalOpen);
  }, []);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        setActiveModal(null);
      }
    };
    if (activeModal) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleEsc);
    } else {
      document.body.style.overflow = 'auto'; // Or whatever it was before
    }
    return () => {
      document.body.style.overflow = 'auto';
      document.removeEventListener('keydown', handleEsc);
    };
  }, [activeModal]);

  const closeModal = () => setActiveModal(null);

  return (
    <>
      <AnimatePresence>
        {activeModal === 'roadmap' && <RoadmapModal onClose={closeModal} />}
        {activeModal === 'strength' && <StrengthModal onClose={closeModal} />}
        {activeModal === 'resume' && <ResumeModal onClose={closeModal} />}
        {activeModal === 'company' && <CompanyModal onClose={closeModal} />}
      </AnimatePresence>
    </>
  );
}
