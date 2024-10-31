
// import { Field, ErrorMessage } from 'formik';
// import { useState } from 'react';

// const SearchableSelect = ({ name, options, placeholder, onChange }) => {
//   const [searchTerm, setSearchTerm] = useState('');

//   // অপশনগুলো ফিল্টার করুন সার্চ টার্মের মাধ্যমে
//   const filteredOptions = options.filter(option =>
//     option.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="form-group">
//       {/* সার্চ ইনপুট ফিল্ড */}
//       <input
//         type="text"
//         placeholder={`Search ${placeholder}`}
//         className="form-control mb-2"
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//       />
//       {/* সিলেক্ট ড্রপডাউন */}
//       <Field as="select" name={name} className="form-select ras" onChange={onChange}>
//         <option value="">{`Select ${placeholder}`}</option>
//         {filteredOptions.length > 0 ? (
//           filteredOptions.map(option => (
//             <option key={option.id} value={option.id}>
//               {option.name}
//             </option>
//           ))
//         ) : (
//           <option value="">No options found</option> // যদি কোনো অপশন না থাকে
//         )}
//       </Field>
//       <ErrorMessage name={name} component="div" className="text-danger" />
//     </div>
//   );
// };

// export default SearchableSelect;
