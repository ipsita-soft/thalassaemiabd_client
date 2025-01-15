import { FileText} from "lucide-react";

const MedicalReport = () => {;

    return (
        <div>
            <h5 className="text-2xl mt-2 d-flex align-items-center font-extrabold text-red-600">
                <FileText className="me-2" size={30} /> Medical Report 
            </h5>
            <p className="text-gray-500 mt-2">
                This is medical Report page 
            </p>


        </div>
    );
};

export default MedicalReport;
