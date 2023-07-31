import React, { useState } from 'react';
import Resizer from 'react-image-file-resizer';

export default function App() {
  const [compressedImage, setCompressedImage] = useState(null);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];

    // Set the quality for the compressed image
    const quality = 75;

    // Compress the image using react-image-file-resizer
    await Resizer.imageFileResizer(
      file,
      file.width, // Set the width to the original width of the image
      file.height, // Set the height to the original height of the image
      'JPEG',
      quality,
      0,
      (uri) => {
        setCompressedImage(uri);
      },
      'base64'
    );
  };

  const handleDownloadClick = () => {
    if (compressedImage) {
      // Create a temporary anchor element to trigger file download
      const downloadLink = document.createElement('a');
      downloadLink.href = compressedImage;
      downloadLink.download = 'compressed_image.jpg';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  return (
    <div>
      {/* Input for image upload */}
      <input type="file" accept="image/*" onChange={handleImageChange} />

      {/* Display the original image (optional) */}
      {compressedImage && <img src={compressedImage} alt="Compressed" />}

      {/* Download button */}
      {compressedImage && (
        <button onClick={handleDownloadClick}>Download Compressed Image</button>
      )}
    </div>
  );
};