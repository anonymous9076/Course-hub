import { useRef, useState, useEffect } from "react";
import { ErrorMessage, useFormikContext } from "formik";

export default function FileUpload({ name = 'file', placeholder = "Upload files", multiple = false, accept = "image/*,video/*" }) {
  const fileInputRef = useRef(null);
  const { setFieldValue, values } = useFormikContext();
  const [previews, setPreviews] = useState([]);

  // Reset previews if Formik value is cleared
  useEffect(() => {
    if (!values[name]) {
      setPreviews([]);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }, [values[name], name]);

  const handleDivClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    console.log('files present', files)
    if (files.length > 0) {
      if (multiple) {
        setFieldValue(name, files);
        const newPreviews = files.map(file => ({
          url: URL.createObjectURL(file),
          type: file.type
        }));
        setPreviews(newPreviews);
      } else {
        const file = files[0];
        setFieldValue(name, file);
        setPreviews([{
          url: URL.createObjectURL(file),
          type: file.type
        }]);
      }
    }
  };

  return (
    <div className="col-span-4">


      <div
        onClick={handleDivClick}
        className={`relative col-span-4 min-h-[192px] rounded-2xl border-2 border-dashed flex items-center justify-center border-gray-200 bg-white cursor-pointer overflow-hidden hover:border-blue-400 hover:bg-blue-50/30 transition-all group`}
      >
        {/* Multi-image preview */}
        {previews.length > 0 && (
          <div className="absolute inset-0 w-full h-full p-2 grid grid-cols-3 gap-2 bg-white/90 overflow-y-auto">
            {previews.map((preview, index) => (
              <div key={index} className="relative aspect-video rounded-lg overflow-hidden border border-gray-100 shadow-sm">
                {preview.type.startsWith("image/") ? (
                  <img
                    src={preview.url}
                    alt={`Preview ${index}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <video
                    src={preview.url}
                    className="w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                  />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Overlay text - only show if no previews OR show as a small badge if previews exist */}
        <div className={`relative z-10 ${previews.length > 0 ? 'bg-black/60 backdrop-blur-md scale-90' : 'bg-[#5AB2FF] shadow-lg shadow-blue-200'} px-6 py-3 rounded-full text-white text-sm font-bold flex items-center gap-2 group-hover:scale-105 transition-transform`}>
          {previews.length > 0 ? `Change ${multiple ? 'Files' : 'File'}` : placeholder}
        </div>

        <input
          type="file"
          name={name}
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
          accept={accept}
          multiple={multiple}
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
