'use client';
import React from 'react';
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove, SortableContext } from '@dnd-kit/sortable';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { SortTableImageCard } from './sort-table-image-card';
import { FilePlusCorner, Image as ImageIcon } from 'lucide-react';
import { rectSortingStrategy } from '@dnd-kit/sortable';
interface ImageItem {
  file: File;
  isMain: boolean;
}
export interface UploadImage {
  images: ImageItem[];
}

interface Props {
  className?: string;
  onValueChange: (value: UploadImage) => void;
  value: UploadImage;
}

export const UploadImageInput: React.FC<Props> = ({ onValueChange, value }) => {
  const images = value?.images || [];
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
  );

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const newfiles = Array.from(event.target.files);
      const hasMainAlready = images.some((img) => img.isMain);

      const newItems: ImageItem[] = newfiles.map((file, index) => ({
        file,
        isMain: !hasMainAlready && index === 0 ? true : false,
      }));
      onValueChange({ images: [...images, ...newItems] });
    }
  };

  const handleDeleteImage = (imageToDelete: ImageItem) => {
    const updateImages = images.filter((img) => img.file.name !== imageToDelete.file.name);

    if (imageToDelete.isMain && updateImages.length > 0) {
      updateImages[0].isMain = true;
    }
    onValueChange({ images: updateImages });
  };

  const handleMainSelect = (selectedImage: ImageItem) => {
    const updateImages = images.map((img) => ({
      ...img,
      isMain: img.file.name === selectedImage.file.name,
    }));
    onValueChange({ images: updateImages });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    if (active.id !== over.id) {
      const oldIndex = images.findIndex((img) => img.file.name === active.id);
      const newIndex = images.findIndex((img) => img.file.name === over.id);
      const newImages = arrayMove(images, oldIndex, newIndex);
      onValueChange({
        images: newImages,
      });
    }
  };

  return (
    <div className="space-y-4 mt-[40px]">
      <div>
        <p className="mb-2"> Fotoğraf ekle (max. 5)</p>
        <div className="flex gap-4">
          <Label
            htmlFor="uploadImage"
            className="w-[250px] h-[250px] border border-dashed border-gray-400 flex items-center justify-center cursor-pointer hover:bg-secondary/20 rounded-2xl transition">
            <FilePlusCorner />
          </Label>
          {images.length < 1 && (
            <>
              <div className="w-[250px] h-[250px] border border-dashed bg-gray-50 flex items-center justify-center rounded-2xl transition">
                <ImageIcon className="text-gray-300" />
              </div>
              <div className="w-[250px] h-[250px] border border-dashed bg-gray-50 flex items-center justify-center  rounded-2xl transition">
                <ImageIcon className="text-gray-300" />
              </div>
            </>
          )}
        </div>
        <Input
          id="uploadImage"
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          className="hidden"
        />
      </div>

      {images.length > 0 && (
        <div>
          <p className="mb-2 font-medium">Kapak seç:</p>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}>
            <SortableContext
              items={images.map((img) => img.file.name)}
              strategy={rectSortingStrategy}>
              <div className="grid grid-cols-3 gap-3">
                {images.map((img) => (
                  <SortTableImageCard
                    key={img.file.name}
                    image={img.file}
                    isCover={img.isMain}
                    onSelect={() => handleMainSelect(img)}
                    onDelete={() => handleDeleteImage(img)}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </div>
      )}
    </div>
  );
};
