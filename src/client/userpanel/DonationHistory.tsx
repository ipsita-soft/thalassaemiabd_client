import {HandCoins} from "lucide-react";

const DonateHistory = () => {;

    return (
        <div>
            <h5 className="text-2xl mt-2 d-flex align-items-center font-extrabold text-red-600">
                <HandCoins className="me-2" size={30} /> Donate History 
            </h5>
            <p className="text-gray-500 mt-2">
                This is donate history page 
            </p>
        </div>
    );
};

export default DonateHistory;
