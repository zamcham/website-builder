import React from 'react';
import { useDrag } from 'react-dnd';

const Image = ({ content, parentIndex, childIndex }) => {
  const [, drag] = useDrag({
    type: 'COMPONENT',
    item: { type: 'image', parentIndex, childIndex },
  });

  return <img ref={drag} src={content} alt="Draggable" style={{ maxWidth: '100%' }} />;
};

export default Image;