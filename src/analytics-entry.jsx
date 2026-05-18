import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import AnalyticsModalsWrapper from './AnalyticsModalsWrapper';
import './index.css';

const mountAnalyticsModals = () => {
  const rootElement = document.getElementById('analytics-modals-root');
  if (rootElement) {
    createRoot(rootElement).render(
      <StrictMode>
        <AnalyticsModalsWrapper />
      </StrictMode>
    );
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountAnalyticsModals);
} else {
  mountAnalyticsModals();
}
