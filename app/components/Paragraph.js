import React, { useState } from 'react';
import { useDrag } from 'react-dnd';

const Paragraph = ({ content, parentIndex, childIndex, updateContent }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);

  const [, drag] = useDrag({
    type: 'COMPONENT',
    item: { type: 'paragraph', parentIndex, childIndex },
  });

  const handleDoubleClick = () => setIsEditing(true);

  const handleBlur = () => {
    setIsEditing(false);
    updateContent(parentIndex, childIndex, editedContent);
  };

  const handleChange = (e) => setEditedContent(e.target.value);

  if (isEditing) {
    return (
      <textarea
        value={editedContent}
        onChange={handleChange}
        onBlur={handleBlur}
        autoFocus
        style={{ width: '100%', padding: '5px' }}
      />
    );
  }

  return <p ref={drag} onDoubleClick={handleDoubleClick}>{editedContent}</p>;
};

export default Paragraph;