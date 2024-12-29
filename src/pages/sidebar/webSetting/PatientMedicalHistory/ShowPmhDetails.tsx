import React, { useState } from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

import { useFetchPatientMedicalHistoryQuery } from '@/api/patientMedicalHistoryApi';

type EditProps = {
  Id: string;
  open: boolean;
  onClose: () => void;
};

const ShowPmhDetails: React.FC<EditProps> = ({ Id }) => {
  const [open, setOpen] = useState(false);

  const { data } = useFetchPatientMedicalHistoryQuery(Id);

  // Filter data to exclude fields with null values
  const filteredData = data?.data?.filter((item: any) => item.value !== null);


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300"
        >
          View Details
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[600px] lg:max-w-[700px] xl:max-w-[800px] w-full">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-gray-800">{
            data?.medicalHistory?.title + ' Show'

          }</DialogTitle>
        </DialogHeader>
        <div className="bg-gray-50 p-4 rounded-lg shadow-md max-h-[400px] overflow-y-auto">
          {filteredData?.length > 0 ? (
            filteredData.map((item: any, index: number) => (
              <div
                key={index}
                className="flex justify-between items-center p-3 mb-2 rounded-lg border border-gray-200 bg-white shadow-sm"
              >
                <span className="font-medium text-gray-700">{item.name}:</span>
                <span className="text-gray-600">{item.value}</span>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 font-medium">No data available.</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShowPmhDetails;
