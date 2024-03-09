'use client';
import { useCSVReader } from 'react-papaparse';
import { getObjectsFromArray } from './utils/get-objects-from-array';

type CSVResults = {
  data: string[][];
  errors: string[];
  meta: {
    delimiter: string;
    linebreak: string;
    aborted: boolean;
    fields: string[];
    truncated: boolean;
    cursor: number;
  }
}

export default function Home() {
  const { CSVReader } = useCSVReader();

  return (
    <main>
      <div
        style={{
          margin: "auto",
        }}
      >
        <CSVReader
          onUploadAccepted={(data:CSVResults) => console.log(getObjectsFromArray(data.data))}
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
    </main>
  );
}
