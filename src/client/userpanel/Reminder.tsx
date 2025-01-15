import {Clock} from "lucide-react";

const Reminder = () => {;

    return (
        <div>
            <h5 className="text-2xl mt-2 d-flex align-items-center font-extrabold text-red-600">
                <Clock className="me-2" size={30} /> Reminder 
            </h5>
            <p className="text-gray-500 mt-2">
                This is Reminder page 
            </p>


        </div>
    );
};

export default Reminder;
