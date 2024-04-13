/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from 'react';
import { useState } from 'react';
import { MutatingDots } from 'react-loader-spinner';

import "./upload.scss";
import DragNDrop from './DragNDrop';
import DropDownMenu from './DropDownMenu';
import axiosInstance from '../axiosInstance';

const Upload: FC = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [selectConverter, setSelectConverter] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!uploadedFile || !selectConverter) {
        return;
      }

      setLoading(true)
      setImageUrl("")
      const formData = new FormData();
      formData.append('file', uploadedFile);
      formData.append('converter', selectConverter);
      console.log('uploaded file: ', uploadedFile);
      console.log('converter: ', selectConverter);
      console.log('formData: ', formData.get('file'));

      const response = await axiosInstance.post('/upload/', formData, {
        responseType: 'blob'
      });

      // Convert the received blob into a data URL
      const imageUrl = URL.createObjectURL(response.data);
      setImageUrl(imageUrl);
      setLoading(false);
    } catch (err) {
      console.error('Error: ', err);
    }
  }

  return (
    <div className="uploadContainer flex flex-col">
      <DragNDrop onFileUpload={handleFileUpload} />
      <div className="my-8">
        <DropDownMenu converterSelection={converterSelection} converterOptions={converterOptions()}/>
      </div>
      <button
        type="button"
        className="inline-block rounded bg-danger px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#dc4c64] transition duration-150 ease-in-out hover:bg-danger-600 hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:bg-danger-600 focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:outline-none focus:ring-0 active:bg-danger-700 active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(220,76,100,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)]"
        onClick={handleSubmit}
        >
        Upload
      </button>
      {loading && (
        <MutatingDots
          visible={true}
          height="100"
          width="100"
          color="#4fa94d"
          secondaryColor="#4fa94d"
          radius="12.5"
          ariaLabel="mutating-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      )}
      {
        imageUrl && (
          <div className="mt-8 processedImageContainer">
            <h3>Processed Image:</h3>
            <img id="uploadedImage" src={imageUrl} className="processedImage" alt="Uploaded" onError={(e) => console.error("Error loading image:", e)}/>
          </div>
        )
      }
    </div>
  );
};

export default Upload;
