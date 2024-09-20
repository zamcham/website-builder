import React, { useState } from 'react';
import { useDrag } from 'react-dnd';

const Heading = ({ content, parentIndex, childIndex, updateContent }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);

  const [, drag] = useDrag({
    type: 'COMPONENT',
    item: { type: 'heading', parentIndex, childIndex },
  });

  const handleDoubleClick = () => setIsEditing(true);

  const handleBlur = () => {
    setIsEditing(false);
    updateContent(parentIndex, childIndex, editedContent);
  };

  const handleChange = (e) => setEditedContent(e.target.value);

  if (isEditing) {
    return (
      <input
        type="text"
        value={editedContent}
        onChange={handleChange}
        onBlur={handleBlur}
        autoFocus
        style={{ width: '100%', padding: '5px', fontSize: '1.5em', fontWeight: 'bold' }}
      />
    );
  }

  return <h2 ref={drag} onDoubleClick={handleDoubleClick}>{editedContent}</h2>;
};

export default Heading;