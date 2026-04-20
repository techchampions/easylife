import { ErrorMessage, useField } from "formik";
import { Crop, ImageOff, ImageUp, Info, X } from "lucide-react";
import React, { useCallback, useRef, useState } from "react";
import type { Area, Point } from "react-easy-crop";
import Cropper from "react-easy-crop";
import { useToast } from "../../zustand/toast.state";

interface ImageInputAndCropProps {
  name: string;
  label?: string;
  infoText?: string;
  className?: string;
  acceptedFileTypes?: string[];
  maxFileSize?: number; // in bytes
  aspectRatio?: number; // Changed to number (e.g. 9/16 → 0.5625)
  width?: number | string;
  height?: number | string;
  cropShape?: "rect" | "round";
}

const ImageInputAndCrop: React.FC<ImageInputAndCropProps> = ({
  name,
  label,
  infoText,
  className = "",
  acceptedFileTypes = ["image/jpeg", "image/png", "image/gif", "image/bmp"],
  maxFileSize = 10 * 1024 * 1024, // 5MB
  aspectRatio = 4 / 5,
  width = 225,
  height = 250,
  cropShape = "rect",
}) => {
  const [field, meta, helpers] = useField(name);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const toast = useToast();
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [showCropper, setShowCropper] = useState(false);

  const hasError = meta.touched && meta.error;

  const validateFile = useCallback(
    (file: File) => {
      if (!acceptedFileTypes.includes(file.type)) {
        toast.showToast("Unsupported file format", "error");
        return "Unsupported file format";
      }
      if (file.size > maxFileSize) {
        toast.showToast(
          `File size too large (max ${maxFileSize / 1024 / 1024}MB)`,
          "error"
        );
        return `File size too large (max ${maxFileSize / 1024 / 1024}MB)`;
      }
      return null;
    },
    [acceptedFileTypes, maxFileSize, toast]
  );

  // Create cropped image as File
  const createCroppedImage = useCallback(async (): Promise<File | null> => {
    if (!imageSrc || !croppedAreaPixels) return null;

    const image = new Image();
    image.src = imageSrc;

    return new Promise((resolve) => {
      image.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d")!;

        canvas.width = croppedAreaPixels.width;
        canvas.height = croppedAreaPixels.height;

        ctx.drawImage(
          image,
          croppedAreaPixels.x,
          croppedAreaPixels.y,
          croppedAreaPixels.width,
          croppedAreaPixels.height,
          0,
          0,
          croppedAreaPixels.width,
          croppedAreaPixels.height
        );

        canvas.toBlob(
          (blob) => {
            if (!blob) return resolve(null);

            const file = new File([blob], "cropped-image.jpg", {
              type: "image/jpeg",
              lastModified: Date.now(),
            });
            resolve(file);
          },
          "image/jpeg",
          0.9
        );
      };
    });
  }, [imageSrc, croppedAreaPixels]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const error = validateFile(file);
    if (error) {
      helpers.setError(error);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(reader.result as string);
      setShowCropper(true);
      setCrop({ x: 0, y: 0 });
      setZoom(1);
    };
    reader.readAsDataURL(file);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleCropComplete = useCallback((_: any, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleSaveCrop = async () => {
    const croppedFile = await createCroppedImage();
    if (croppedFile) {
      helpers.setValue(croppedFile);
      setShowCropper(false);
      setImageSrc(null);
    }
  };

  const handleCancelCrop = () => {
    setShowCropper(false);
    setImageSrc(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    helpers.setValue(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className={`w-full ${className}`}>
      {label && <div className="font-medium mb-1">{label}</div>}
      {infoText && (
        <div className="text-xs text-gray-500 mb-2 flex items-start gap-1">
          <Info className="w-4 h-4 mt-0.5" />
          <span>{infoText}</span>
        </div>
      )}

      {/* Preview Area */}
      <div
        className={`relative border rounded-2xl overflow-hidden bg-gray-100 ${
          hasError ? "border-red-500" : "border-gray-200"
        }`}
        style={{
          width: typeof width === "number" ? `${width}px` : width,
          height: typeof height === "number" ? `${height}px` : height,
        }}
      >
        <label className="cursor-pointer w-full h-full block">
          <input
            type="file"
            accept={acceptedFileTypes.join(",")}
            className="hidden"
            onChange={handleFileChange}
            ref={fileInputRef}
          />

          {field.value ? (
            <>
              <img
                src={
                  field.value instanceof File
                    ? URL.createObjectURL(field.value)
                    : field.value
                }
                alt="Uploaded preview"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 transition"
                onClick={handleRemove}
              >
                <X size={16} />
              </button>
            </>
          ) : hasError ? (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <div className="text-center p-4 flex flex-col items-center gap-2">
                <ImageOff size={32} />
                <div className="text-sm font-medium">Upload Image</div>
                <div className="text-xs">Click to browse</div>
              </div>
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <div className="text-center p-4 flex flex-col items-center gap-2">
                <ImageUp size={32} />
                <div className="text-sm font-medium">Upload Image</div>
                <div className="text-xs">Click to browse</div>
              </div>
            </div>
          )}
        </label>

        {hasError && (
          <div className="absolute top-2 left-2">
            <Info className="w-5 h-5 text-red-500" />
          </div>
        )}
      </div>

      <ErrorMessage
        name={name}
        component="p"
        className="text-red-500 text-xs mt-1"
      />

      {/* Cropper Modal */}
      {showCropper && imageSrc && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden">
            <div className="p-4 border-b flex items-center justify-between">
              <h3 className="font-semibold flex items-center gap-2">
                <Crop size={20} /> Crop Image
              </h3>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleCancelCrop}
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveCrop}
                  className="px-4 py-2 text-sm font-medium bg-black text-white rounded-lg hover:bg-gray-800"
                >
                  Save Crop
                </button>
              </div>
            </div>

            <div className="relative h-100 bg-black">
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={aspectRatio}
                cropShape={cropShape}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={handleCropComplete}
                objectFit="contain"
              />
            </div>

            <div className="p-4 text-xs text-gray-500 text-center">
              Drag to move • Scroll / pinch to zoom
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageInputAndCrop;
