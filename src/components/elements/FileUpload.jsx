import { useRef, useState } from "react";
import { ErrorMessage, useFormikContext } from "formik";

export default function FileUpload({ name='file', formik, placeholder = "Upload file" }) {
  const fileInputRef = useRef(null);
  const { setFieldValue } = useFormikContext();
  const [previewUrl, setPreviewUrl] = useState(null);
  const [fileType, setFileType] = useState(null);

  const handleDivClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log('filepresent', file)
    if (file) {
      setFieldValue(name, file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setFileType(file.type);
    }
  };

  return (
    <div className="col-span-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-900">
        File
      </label>

      <div
        onClick={handleDivClick}
        className="relative col-span-4 h-48 rounded-lg border flex items-center justify-center border-gray-300 bg-white cursor-pointer overflow-hidden hover:bg-gray-50"
      >
        {/* Image preview */}
        {previewUrl && fileType.startsWith("image/") && (
          <img
            src={previewUrl}
            alt="Preview"
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        {/* Video preview */}
        {previewUrl && fileType.startsWith("video/") && (
          <video
            src={previewUrl}
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            loop
            muted
          />
        )}

        {/* Overlay text */}
        <div className="relative z-10 bg-primary shadow-2lg shadow-white px-4 py-2 rounded-lg text-white text-sm">
          {placeholder}
        </div>

        <input
          type="file"
          name={name}
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
          accept="image/*,video/*"
        />
      </div>

      <ErrorMessage
        name={name}
        component="div"
        className="text-red-500 text-sm mt-1"
      />
    </div>
  );
}
