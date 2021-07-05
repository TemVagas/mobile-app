import React from 'react';
import { useRoute } from '@react-navigation/native';
import PDFReader from 'rn-pdf-reader-js';

interface CurriculumProps {
  uri: string;
}

function Curriculum() {
  const { params } = useRoute();

  const curriculum = params as CurriculumProps;

  return (
    <PDFReader
      withPinchZoom={false}
      webviewStyle={{
        backgroundColor: 'transparent',
      }}
      source={{
        uri: curriculum.uri,
      }}
    />
  );
}

export default Curriculum;
