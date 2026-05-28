// import React from 'react';
// import { UploadImage, UploadImageInput } from './upload-image-input';

// interface Props {
//   className?: string;
// }

// export const UploadImageCard: React.FC<Props> = ({ className }) => {
//   const [images, setImages] = React.useState<File[]>([]);
//   const [cover, setCover] = React.useState<File | null>(null);
//   const handleImageData = (value: UploadImage) => {
//     const imgs = value.images.map((item) => item.file);
//     const coverImage = value.images.find((item) => item.isMain)?.file || null;
//     setImages(imgs);
//     setCover(coverImage);
//   };
//   return (
//     <div className={className}>
//       <div>
//         <UploadImageInput onSubmit={handleImageData} />
//       </div>
//     </div>
//   );
// };
