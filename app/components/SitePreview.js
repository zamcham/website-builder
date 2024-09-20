import React from 'react';
import { COMPONENT_TYPES } from './DraggableComponents';

const PreviewComponent = ({ type, content }) => {
  switch (type) {
    case COMPONENT_TYPES.HEADING:
      return <h2>{content}</h2>;
    case COMPONENT_TYPES.PARAGRAPH:
      return <p>{content}</p>;
    case COMPONENT_TYPES.IMAGE:
      return <img src={content} alt="Preview" style={{ maxWidth: '100%' }} />;
    default:
      return null;
  }
};

const PreviewSection = ({ children }) => {
  return (
    <div style={{ marginBottom: '20px' }}>
      {children.map((child, index) => (
        <PreviewComponent key={index} {...child} />
      ))}
    </div>
  );
};

const SitePreview = ({ sections }) => {
  return (
    <div style={{ padding: '20px' }}>
      {sections.map((section, index) => (
        <PreviewSection key={index} {...section} />
      ))}
    </div>
  );
};

export default SitePreview;