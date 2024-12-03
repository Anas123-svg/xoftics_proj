import React from "react";

const DownloadReport: React.FC = () => {
  return (
    <div className="mb-6 m-10">
      <button onClick={() => alert('Download Report')} className="p-4 bg-teal-800 text-white rounded-3xl">
        Download Report
      </button>
    </div>
  );
};

export default DownloadReport;
