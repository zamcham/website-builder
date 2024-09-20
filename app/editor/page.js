'use client';
import React, { useState, useCallback } from 'react';
import { DndProvider, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Sidebar from '../components/Sidebar';
import { COMPONENT_TYPES, PaletteItem, DraggableComponent } from '../components/DraggableComponents';

const Section = ({ children, index, updateContent }) => {
  const [{ isOver }, drop] = useDrop({
    accept: ['PALETTE_ITEM', 'COMPONENT'],
    drop: (item, monitor) => {
      if (item.type !== COMPONENT_TYPES.SECTION) {
        const newChild = { type: item.type, content: item.content || 'New content' };
        children.push(newChild);
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div
      ref={drop}
      style={{
        padding: '20px',
        border: '2px solid #333',
        marginBottom: '20px',
        backgroundColor: isOver ? '#e0e0e0' : 'white',
      }}
    >
      <h3>Section</h3>
      {children.map((child, childIndex) => (
        <DraggableComponent
          key={childIndex}
          {...child}
          parentIndex={index}
          childIndex={childIndex}
          updateContent={updateContent}
        />
      ))}
    </div>
  );
};

const Editor = () => {
  const [sections, setSections] = useState([
    { type: COMPONENT_TYPES.SECTION, children: [] },
  ]);

  const addSection = useCallback(() => {
    setSections(prevSections => [...prevSections, { type: COMPONENT_TYPES.SECTION, children: [] }]);
  }, []);

  const updateContent = useCallback((sectionIndex, childIndex, newContent) => {
    setSections(prevSections => {
      const newSections = [...prevSections];
      newSections[sectionIndex].children[childIndex].content = newContent;
      return newSections;
    });
  }, []);

  const openPreviewInNewTab = () => {
    const previewWindow = window.open('', '_blank');
    const previewContent = `
      <html>
        <head>
          <title>Site Preview</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; padding: 20px; }
            img { max-width: 100%; height: auto; }
          </style>
        </head>
        <body>
          ${sections.map(section => `
            <div>
              ${section.children.map(child => {
                switch (child.type) {
                  case COMPONENT_TYPES.HEADING:
                    return `<h2>${child.content}</h2>`;
                  case COMPONENT_TYPES.PARAGRAPH:
                    return `<p>${child.content}</p>`;
                  case COMPONENT_TYPES.IMAGE:
                    return `<img src="${child.content}" alt="Preview">`;
                  default:
                    return '';
                }
              }).join('')}
            </div>
          `).join('')}
        </body>
      </html>
    `;
    previewWindow.document.open();
    previewWindow.document.write(previewContent);
    previewWindow.document.close();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
        <h1>Editor Mode</h1>
        <button onClick={openPreviewInNewTab}>Preview in New Tab</button>
      </div>
      <div style={{ display: 'flex', flex: 1 }}>
        <div style={{ width: '200px', padding: '20px', borderRight: '1px solid #ccc' }}>
          <h2>Components</h2>
          <PaletteItem type={COMPONENT_TYPES.HEADING} content="New Heading" />
          <PaletteItem type={COMPONENT_TYPES.PARAGRAPH} content="New Paragraph" />
          <PaletteItem type={COMPONENT_TYPES.IMAGE} content="https://via.placeholder.com/150" />
          <button onClick={addSection}>Add Section</button>
        </div>
        <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
          {sections.map((section, index) => (
            <Section key={index} index={index} {...section} updateContent={updateContent} />
          ))}
        </div>
      </div>
    </div>
  );
};

const EditorPage = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <Editor />
      </div>
    </DndProvider>
  );
};

export default EditorPage;