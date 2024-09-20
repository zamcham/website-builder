import React from 'react';
import { useDrag } from 'react-dnd';
import Heading from './Heading';
import Paragraph from './Paragraph';
import Image from './Image';

export const COMPONENT_TYPES = {
  SECTION: 'section',
  HEADING: 'heading',
  PARAGRAPH: 'paragraph',
  IMAGE: 'image',
};

export const PaletteItem = ({ type, content }) => {
  const [, drag] = useDrag({
    type: 'PALETTE_ITEM',
    item: { type, content },
  });

  return (
    <div ref={drag} style={{ padding: '10px', border: '1px solid #ccc', marginBottom: '10px', cursor: 'move' }}>
      {type}
    </div>
  );
};

export const DraggableComponent = (props) => {
  switch (props.type) {
    case COMPONENT_TYPES.HEADING:
      return <Heading {...props} />;
    case COMPONENT_TYPES.PARAGRAPH:
      return <Paragraph {...props} />;
    case COMPONENT_TYPES.IMAGE:
      return <Image {...props} />;
    default:
      return null;
  }
};