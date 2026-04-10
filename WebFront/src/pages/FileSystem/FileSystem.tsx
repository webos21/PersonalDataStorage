import React, { useEffect } from 'react';

const FileSystem = props => {

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      window.location.href = '/pds/v1/fs/';
    }
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="container mx-auto px-4">
        <div className="flex justify-center">
          <div className="w-full md:w-1/2">
            <span className="flex items-center">
              <h1 className="text-5xl font-bold mr-4">File Man.</h1>
              <div className="pt-3">
                <h4 className="text-xl font-semibold">Working on wrapping the file system...</h4>
                <p className="text-gray-500">The page you are looking for is shown at 28080.</p>
              </div>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FileSystem;
