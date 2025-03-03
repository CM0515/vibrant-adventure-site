import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
interface GalleryImage {
  id: number;
  src: string;
  alt: string;
}
interface PhotoGalleryProps {
  images: GalleryImage[];
}
const PhotoGallery = ({
  images
}: PhotoGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const openLightbox = (image: GalleryImage) => {
    setSelectedImage(image);
  };
  const closeLightbox = () => {
    setSelectedImage(null);
  };
  const nextImage = () => {
    if (!selectedImage) return;
    const currentIndex = images.findIndex(img => img.id === selectedImage.id);
    const nextIndex = (currentIndex + 1) % images.length;
    setSelectedImage(images[nextIndex]);
  };
  const prevImage = () => {
    if (!selectedImage) return;
    const currentIndex = images.findIndex(img => img.id === selectedImage.id);
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    setSelectedImage(images[prevIndex]);
  };
  return <div className="w-full">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map(image => <motion.div key={image.id} initial={{
        opacity: 0,
        scale: 0.95
      }} whileInView={{
        opacity: 1,
        scale: 1
      }} transition={{
        duration: 0.3,
        delay: 0.1 * (image.id % 5)
      }} whileHover={{
        y: -5
      }} className="aspect-square overflow-hidden rounded-xl cursor-pointer" onClick={() => openLightbox(image)}>
            
          </motion.div>)}
      </div>

      {/* Lightbox */}
      {selectedImage && <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
          <div className="relative w-full max-w-4xl max-h-screen p-4">
            <button onClick={closeLightbox} className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 hover:bg-black/70 transition-colors z-50">
              <X size={24} />
            </button>
            <div className="flex items-center justify-center h-full">
              <button onClick={prevImage} className="absolute left-4 text-white bg-black/50 rounded-full p-2 hover:bg-black/70 transition-colors">
                <ChevronLeft size={24} />
              </button>
              <img src={selectedImage.src} alt={selectedImage.alt} className="max-h-[80vh] max-w-full object-contain" />
              <button onClick={nextImage} className="absolute right-4 text-white bg-black/50 rounded-full p-2 hover:bg-black/70 transition-colors">
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </div>}
    </div>;
};
export default PhotoGallery;