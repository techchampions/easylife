import { ErrorMessage, useField } from "formik";
import { Info, Plus, X } from "lucide-react";
import React, { useCallback, useRef } from "react";

interface MultiImageInputProps {
  name: string;
  label?: string;
  infoText?: string;
  className?: string;
  acceptedFileTypes?: string[];
  maxFileSize?: number; // in bytes
  maxFiles?: number;
}

const MultiImageInput: React.FC<MultiImageInputProps> = ({
  name,
  label,
  infoText,
  className = "",
  acceptedFileTypes = ["image/jpeg", "image/png", "image/gif", "image/bmp"],
  maxFileSize = 5 * 1024 * 1024, // 5MB
  maxFiles = 6,
}) => {
  const [field, meta, helpers] = useField<File[]>(name);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const hasError = meta.touched && meta.error;

  const images = field.value || [];

  const validateFile = useCallback(
    (file: File): string | null => {
      if (!acceptedFileTypes.includes(file.type)) {
        return "Unsupported file format";
      }
      if (file.size > maxFileSize) {
        return `File size too large (max ${maxFileSize / 1024 / 1024}MB)`;
      }
      return null;
    },
    [acceptedFileTypes, maxFileSize]
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    if (images.length + files.length > maxFiles) {
      helpers.setError(`Maximum ${maxFiles} images allowed`);
      return;
    }

    const validFiles: File[] = [];
    const errors: string[] = [];

    files.forEach((file) => {
      const error = validateFile(file);
      if (error) {
        errors.push(`${file.name}: ${error}`);
      } else {
        validFiles.push(file);
      }
    });

    if (errors.length > 0) {
      helpers.setError(errors.join(", "));
      return;
    }

    helpers.setValue([...images, ...validFiles]);

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRemove = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    helpers.setValue(newImages);
  };

  const handleReorder = (fromIndex: number, toIndex: number) => {
    const newImages = [...images];
    const [removed] = newImages.splice(fromIndex, 1);
    newImages.splice(toIndex, 0, removed);
    helpers.setValue(newImages);
  };

  const getImageUrl = (image: File | string): string => {
    if (image instanceof File) {
      return URL.createObjectURL(image);
    }
    return image;
  };

  return (
    <div
      className={`w-full p-2 rounded-xl border border-dashed border-gray-200 ${className}`}
    >
      {label && <div className="font-medium mb-1">{label}</div>}

      {infoText && (
        <div className="text-xs text-gray-500 mb-2 flex items-start">
          <span className="flex-1">{infoText}</span>
        </div>
      )}

      <div className="grid grid-cols-3 gap-2">
        {/* Existing images */}
        {images.map((image, index) => (
          <div
            key={index}
            className="relative border border-gray-200 rounded-2xl overflow-hidden bg-gray-100 h-30"
          >
            <img
              src={getImageUrl(image)}
              alt={`Uploaded preview ${index + 1}`}
              className="w-full h-full object-cover"
            />

            {/* Reorder buttons */}
            <div className="absolute bottom-2 left-2 flex gap-1">
              {index > 0 && (
                <button
                  type="button"
                  className="bg-black/50 text-white p-1 rounded-full hover:bg-black/70 transition"
                  onClick={() => handleReorder(index, index - 1)}
                >
                  ↑
                </button>
              )}
              {index < images.length - 1 && (
                <button
                  type="button"
                  className="bg-black/50 text-white p-1 rounded-full hover:bg-black/70 transition"
                  onClick={() => handleReorder(index, index + 1)}
                >
                  ↓
                </button>
              )}
            </div>

            {/* Remove button */}
            <button
              type="button"
              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition"
              onClick={() => handleRemove(index)}
            >
              <X size={16} />
            </button>
          </div>
        ))}

        {/* Add new image button */}
        {images.length < maxFiles && (
          <div
            className="relative rounded-2xl overflow-hidden bg-gray-50 w-30 h-30 hover:bg-gray-100 transition cursor-pointer"
            // style={{
            //   width: typeof width === "number" ? `${width}px` : width,
            //   height: typeof height === "number" ? `${height}px` : height,
            //   aspectRatio,
            // }}
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <div className="text-center p-4 flex flex-col items-center gap-2">
                <Plus />
                <div className="text-sm">Add Image</div>
                <div className="text-xs text-gray-400">
                  {images.length}/{maxFiles}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Hidden file input */}
      <input
        type="file"
        name={name}
        accept={acceptedFileTypes.join(",")}
        className="hidden"
        onChange={handleFileChange}
        ref={fileInputRef}
        multiple
      />

      {hasError && (
        <div className="flex items-center gap-1 mt-1">
          <Info className="w-4 h-4 text-red-500" />
          <ErrorMessage
            name={name}
            component="p"
            className="text-red-500 text-xs text-left"
          />
        </div>
      )}
    </div>
  );
};

export default MultiImageInput;
