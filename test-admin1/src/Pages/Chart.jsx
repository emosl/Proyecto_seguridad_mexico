
import React from 'react';

const GraficaNivelPrioridad = () => {
  return (
    <div>
      <iframe 
        width="640" 
        height="480" 
        src="https://charts.mongodb.com/charts-project-0-dfuas/embed/charts?id=65284964-8f8d-4d84-82cf-e88d1d27e6a2&maxDataAge=3600&theme=light&autoRefresh=true" 
        style={{background: '#FFFFFF', border: 'none', borderRadius: '2px', boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)'}}

        title="Your Chart Title">
      </iframe>
    </div>
  );
};



const GraficaClasificacion = () => {
  return (
    <div>
      <iframe 
        width="640" 
        height="480" 
        src="https://charts.mongodb.com/charts-project-0-dfuas/embed/charts?id=65284acb-0681-4c5b-8ad0-fd0e9429eeee&maxDataAge=3600&theme=light&autoRefresh=true"
        style={{background: '#FFFFFF', border: 'none', borderRadius: '2px', boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)'}}

        title="Your Chart Title">
      </iframe>
    </div>
  );
};




const GraficaTerminados = () => {
  return (
    <div>
      <iframe 
        width="640" 
        height="480" 
        src="https://charts.mongodb.com/charts-project-0-dfuas/embed/charts?id=65284f7f-fd9b-4d90-8367-2eac0141b9ae&maxDataAge=3600&theme=light&autoRefresh=true"
        style={{background: '#FFFFFF', border: 'none', borderRadius: '2px', boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)'}}

        title="Your Chart Title">
      </iframe>
    </div>
  );
};




const GraficaIntermediarios = () => {
  return (
    <div>
      <iframe 
        width="640" 
        height="480" 
        src="https://charts.mongodb.com/charts-project-0-dfuas/embed/charts?id=65286771-f8cc-4cca-8a9a-70b4d70db6dc&maxDataAge=3600&theme=light&autoRefresh=true"
        style={{background: '#FFFFFF', border: 'none', borderRadius: '2px', boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)'}}

        title="Your Chart Title">
      </iframe>
    </div>
  );
};



const GraficaPromedioDias = () => {
  return (
    <div>
      <iframe 
        width="640" 
        height="480" 
        src="https://charts.mongodb.com/charts-project-0-dfuas/embed/charts?id=652867ee-f8cc-4191-82f7-70b4d70e06d5&maxDataAge=3600&theme=light&autoRefresh=true"
        style={{background: '#FFFFFF', border: 'none', borderRadius: '2px', boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)'}}

        title="Your Chart Title">
      </iframe>
    </div>
  );
};


export { 
  GraficaNivelPrioridad, 
  GraficaClasificacion, 
  GraficaTerminados, 
  GraficaIntermediarios, 
  GraficaPromedioDias 
};