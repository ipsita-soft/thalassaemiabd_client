import { CalendarCheck} from "lucide-react";

const Appointment = () => {;

    return (
        <div>
            <h5 className="text-2xl mt-2 d-flex align-items-center font-extrabold text-red-600">
                <CalendarCheck className="me-2" size={30} /> Appointment 
            </h5>
            <p className="text-gray-500 mt-2">
                This is appointment page 
            </p>
        </div>
    );
};

export default Appointment;
