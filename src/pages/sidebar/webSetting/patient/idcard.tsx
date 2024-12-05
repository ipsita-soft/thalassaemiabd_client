import { Facebook, Mail, MapPin, Phone } from "lucide-react";

function Idcard() { 
  return (
    <>
      <div className="flex items-center mb-4">
        <h1 className="text-lg font-semibold md:text-2xl">ID Card</h1>
      </div>
      <div className="flex flex-col items-center gap-6">
        {/* Front Side of the ID Card */}
        <div className="w-[85mm] h-[54mm] border-3 border-red-600 rounded-md shadow-md relative overflow-hidden">
          {/* Top Red Corner Design */}
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              height: "15%",
              width: "60%",
              backgroundColor: "rgb(220 38 38)",
              clipPath: "polygon(0 0, 100% 0, 100% 100%, 20% 100%)",
            }}
          ></div>
          <div
            style={{
              position: "absolute",
              left: 0,
              bottom: 0,
              height: "90%",
              width: "9%",
              backgroundColor: "rgb(220 38 38)",
              clipPath: "polygon(0 0, 100% 15%, 100% 100%, 0 100%)",
            }}
          ></div>

          {/* Content */}
          <div className="relative z-10 flex flex-col h-full p-3">
            {/* Logo and Header */}
            <div className="flex items-center mb-3 ms-4 mt-3">
              <img
                src="../client/assets/images/idcardlogo.png"
                alt="Logo"
                style={{ height: "70px", width: "70px", marginTop: "-17px" }}
                className="object-contain"
              />
              <div className="ml-2">
                <h2 className="text-[14px] font-bold text-green-800">
                  Bangladesh Thalassaemia Samity Hospital
                </h2>
              </div>
            </div>

            {/* Personal Information */}
            <div className="text-center mt-2">
              <p className="text-sm font-bold text-red-600">
                Khorshed Alam Sarker
              </p>
              <p className="text-sm font-bold text-black">
                Blood Group: B+ve
              </p>
              <p className="text-sm font-bold text-black text-green-800">
                ID: BTSH-2412-00001
              </p>
              <p className="text-sm font-bold text-red-600">
                Hb E Beta Thalassaemia
              </p>
            </div>
          </div>
        </div>

        {/* Back Side of the ID Card */}
        <div className="w-[85mm] h-[54mm] border-3 border-red-600 rounded-md shadow-md relative">
          {/* Background white */}
          <div className="absolute inset-0 bg-white"></div>

          <div className="relative z-10 flex flex-col h-full p-3">
            {/* QR Code and Signature */}
            <div className="flex justify-between">
              <div className="flex justify-center items-center">
                <img
                  src="../client/assets/images/qrcode.svg"
                  alt="QR Code"
                  style={{ height: "100px", width: "100px" }}
                />
              </div>
              <div className="mt-4 ms-5 text-center">
                <img
                  src="../client/assets/images/singature.png"
                  style={{ height: "30px", width: "120px" }}
                  alt="Signature"
                />
                <p className="text-xs font-medium">Authorized Signature</p>
              </div>
            </div>

            {/* Contact Information */}
            <div className="mt-2 text-center">
              <p className="text-[12px] font-bold mb-2 leading-none">
                Bangladesh Thalassaemia Samity & Hospital
              </p>
              <p className="text-[9px] mb-1 leading-none flex justify-center items-center">
                <MapPin className="w-3 h-3 mr-1" /> Taher Bhaban, 121/1A,
                Level 3 & 5, Green Road, Dhaka-1215
              </p>
              <p className="text-[9px] mb-1 leading-none flex justify-center items-center">
                <Phone className="w-3 h-3 mr-1" /> Tel: 02-223356005 | 0185815651,
                01834560489
              </p>
              <p className="text-[9px] leading-none flex justify-center items-center">
                <Facebook className="w-3 h-3 mr-0" /> FB: fb/thalassamy
                <Mail className="w-3 h-3 ms-2 mr-1" /> Email:
                info@thalassaemiasamity.org
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Idcard;
