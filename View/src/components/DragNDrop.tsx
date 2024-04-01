/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from 'react';
import { useState } from 'react';

interface DragNDropProps {
    onFileUpload: (file: File | null) => void;
}

const DragNDrop: FC<DragNDropProps> = ({ onFileUpload }) => {
    const [file, setFile] = useState<string | undefined>(undefined);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.classList.add('border-indigo-600');
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    // Remove visual feedback for drag leave
    e.currentTarget.classList.remove('border-indigo-600');
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    // Remove visual feedback for drag drop
    e.currentTarget.classList.remove('border-indigo-600');
    const droppedFile = e.dataTransfer.files[0];
    handleFileSelect(droppedFile);
  };

  const handleFileSelect = (selectedFile: File) => {
    // Handle file selection here, e.g., display preview
    console.log(selectedFile);
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onload = () => {
      setFile(reader.result as string);
    };
    onFileUpload(selectedFile);
  };


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileSelect(e.target.files[0]);
    }
  };

    return (
        <>
            <div className="w-[470px] relative border-2 shadow-2xl border-gray-300 border-dashed rounded-lg p-6 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600" id="dropzone"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            style={{ cursor: 'pointer' }}
            >
                <input type="file" className="cursor-pointer absolute inset-0 w-full h-full opacity-0 z-50" onChange={handleInputChange}/>
                <div className="text-center flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-20 h-20 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                    </svg>

                    <h3 className="mt-2 text-sm font-medium text-gray-900">
                        <label htmlFor="file-upload" className="relative cursor-pointer">
                            <span>Drag and drop</span>
                            <span className="text-indigo-600"> or browse </span>
                            <span>to upload</span>
                            <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                        </label>
                    </h3>
                    <p className="mt-1 text-xs text-gray-500">
                        PNG, JPG, JPEG up to 3MB
                    </p>
                </div>

                <img src={file} className="mt-4 mx-auto max-h-40" id="preview" /> 
            </div>
        </>
    )
};

export default DragNDrop;
