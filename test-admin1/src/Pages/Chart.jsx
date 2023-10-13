import React from 'react';
import "./Dashboard.css"

const DashboardEjecutivo = () => {
  return (
    <div>
      <iframe className='colab'
        src="https://charts.mongodb.com/charts-project-0-dfuas/embed/dashboards?id=6528323b-5356-4526-8c1d-a97e56ce969b&theme=light&autoRefresh=true&maxDataAge=3600&showTitleAndDesc=false&scalingWidth=scale&scalingHeight=scale"
        style={{
          background: '#F1F5F4',
          border: 'none',
          borderRadius: '2px',
          boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)',
          width: '100vw',
          height: '100vh'
        }}
        title="Your Chart Title">
      </iframe>
    </div>
  );
};


export { 
  DashboardEjecutivo
};