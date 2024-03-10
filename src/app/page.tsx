'use client';
import { useCSVReader } from 'react-papaparse';
import { getObjectsFromArray } from './utils/get-objects-from-array';
import { useCsvStore } from './store/useCsvStore';

export default function Home() {
  const { CSVReader } = useCSVReader();

  const {
    isLoading,
    handleCsvDataChange,
    handleSaveData,
   } = useCsvStore(({isLoading,handleCsvDataChange, handleSaveData})=>({isLoading,handleCsvDataChange, handleSaveData}));

  return (
    <main>
      <div
        style={{
          margin: "auto",
        }}
      >
        <CSVReader
          onUploadAccepted={handleCsvDataChange}
          config= {{
            encoding: "utf-8",
          }}
        >
          {({
        getRootProps,
        acceptedFile,
        ProgressBar,
        getRemoveFileProps,
      }: any) => (
        <>
          <div >
            <button type='button' {...getRootProps()} >
              Browse file
            </button>
            <div >
              {acceptedFile && acceptedFile.name}
            </div>
            <button {...getRemoveFileProps()}>
              Remove
            </button>
          </div>
          <ProgressBar />
        </>
      )}
        </CSVReader>
      </div>
      <button
        onClick={handleSaveData}
      >guardanding</button>
    </main>
  );
}
