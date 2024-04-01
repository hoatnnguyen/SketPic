/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from 'react';
import { useState } from 'react';
import "./upload.scss";
import DragNDrop from './DragNDrop';
import DropDownMenu from './DropDownMenu';

const Upload: FC = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [selectConverter, setSelectConverter] = useState<string>("");
  const converterOptions = () => {
    return ["Sketch", "Anime"];
  };

  const handleFileUpload = (file: File | null) => {
    setUploadedFile(file); // Receive the file from the child component
  };
  console.log(uploadedFile);

  const converterSelection = (converter: string): void => {
    setSelectConverter(converter);
  };
  console.log(selectConverter);

  return (
    <div className="uploadContainer flex flex-col">
      <DragNDrop onFileUpload={handleFileUpload} />
      <div className="my-8">
        <DropDownMenu converterSelection={converterSelection} converterOptions={converterOptions()}/>
      </div>
      <button
        type="button"
        className="inline-block rounded bg-danger px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#dc4c64] transition duration-150 ease-in-out hover:bg-danger-600 hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:bg-danger-600 focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:outline-none focus:ring-0 active:bg-danger-700 active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(220,76,100,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)]">
        Upload
      </button>
    </div>
  );
};

export default Upload;
