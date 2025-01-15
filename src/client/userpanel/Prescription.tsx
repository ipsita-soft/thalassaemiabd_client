import { FileCheck} from "lucide-react";

const Prescription = () => {;

    return (
        <div>
            <h5 className="text-2xl mt-2 d-flex align-items-center font-extrabold text-red-600">
                <FileCheck className="me-2" size={30} /> Prescription 
            </h5>
            <p className="text-gray-500 mt-2">
                This is Prescription page 
            </p>


        </div>
    );
};

export default Prescription;
