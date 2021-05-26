import React from 'react';

import PDFReader from 'rn-pdf-reader-js';

function Curriculum() {
  return (
    <PDFReader
      withPinchZoom={false}
      webviewStyle={{
        backgroundColor: 'transparent',
      }}
      source={{
        uri: 'http://unec.edu.az/application/uploads/2014/12/pdf-sample.pdf',
      }}
    />
  );
}

export default Curriculum;
