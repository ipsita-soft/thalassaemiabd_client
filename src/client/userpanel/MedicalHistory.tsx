import { History } from "lucide-react";

const MedicalHistory = () => {;

    return (
        <div>
            <h5 className="text-2xl mt-2 d-flex align-items-center font-extrabold text-red-600">
                <History className="me-2" size={30} /> Medical History 
            </h5>
            <p className="text-gray-500 mt-2">
                This is medical History page 
            </p>


        </div>
    );
};

export default MedicalHistory;
