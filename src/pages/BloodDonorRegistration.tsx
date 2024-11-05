
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { fetchPublicCities, fetchPublicCities2, fetchPublicCountries } from '@/redux/slices/publicSlice';
import { fetchBloodGroup, fetchGenders, fetchMaritalStatus } from '@/redux/slices/commonSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { useEffect } from 'react';
import { bloodDonorRegister } from '@/redux/slices/bloodDonorRegSlice';
import { setUser } from '@/redux/slices/authSlice';

import Swal from 'sweetalert2';
import SelectField from '@/components/common/SelectField';


const BloodDonorRegistration = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { bloodGroups, genders, maritalStatus, isLoading: commonDataLoading } = useSelector((state: RootState) => state.commonData);
  const { bloodDonorRegistrationData } = useSelector((state: RootState) => state.bloodDonorReg);

  useEffect(() => {
    dispatch(fetchPublicCountries({ per_page: 250 }));
    dispatch(fetchMaritalStatus({}));
    dispatch(fetchGenders({}));
    dispatch(fetchBloodGroup({}));
  }, [dispatch]);


  const handlePresentCountryChange = async (event: any, setFieldValue: any) => {
    event.preventDefault();  // Prevent any default scrolling behavior

    const selectedCountryId = event.target.value;
    setFieldValue("present_address.country_id", selectedCountryId);

    if (selectedCountryId) {
      try {
        await dispatch(fetchPublicCities({ country_id: selectedCountryId, per_page: 1000 }));
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    }
  };

  const handlePermanentCountryChange = async (event: any, setFieldValue: any) => {
    const selectedCountryId = event.target.value;
    setFieldValue("permanent_address.country_id", selectedCountryId);
    if (selectedCountryId) {
      await dispatch(fetchPublicCities2({ country_id: selectedCountryId, per_page: 1000 }));
    }
  };




  const {
    countries,
    cities,
    cities2,
    isLoading: iscountriesLoading,
    isError: iscountriesError,
    error: countriesError,
  } = useSelector((state: RootState) => state.public);

  if (iscountriesLoading) return <p>Loading...</p>;
  if (iscountriesError) return <p>Error: {countriesError}</p>;

  // Process yearList and whoWeArePage data
  const countriesLists = Array.isArray(countries?.data) ? countries.data : [];
  const citiesLists = Array.isArray(cities) ? cities : [];
  const citiesLists2 = Array.isArray(cities2) ? cities2 : [];

  const cityOptions = citiesLists.map((city: any) => ({
    value: city?.id,
    label: city?.name,
  }));

  const cityOptions2 = citiesLists2.map((city: any) => ({
    value: city?.id,
    label: city?.name,
  }));


  const validationSchema = Yup.object().shape({
    name: Yup.string().required('The name field is required.'),
    phone: Yup.string()
      .required('The phone field is required.')
      .matches(
        /^[0-9]{11}$/,
        'Phone number must be exactly 11 digits.'
      ),

    email: Yup.string().email('Invalid email format').required('The email field is required.'),
    password: Yup.string().min(6, 'Password must be at least 6 characters long').required('The password field is required.'),
    password_confirmation: Yup.string()
      .oneOf([Yup.ref('password'), ''], 'Passwords must match')
      .required('The password confirmation field is required.'),
    gender_id: Yup.string().required('The gender field is required.'),
    date_of_birth: Yup.date().required('The date of birth is required.'),
    age: Yup.number().required('The age field is required.'),
    marital_status_id: Yup.string().required('The marital status field is required.'),
    occupation: Yup.string().required('The occupation field is required.'),
    father_or_mother_husband: Yup.string().required('The father/mother/husband name is required.'),
    blood_group_id: Yup.string().required('The blood group field is required.'),
    present_address: Yup.object().shape({
      country_id: Yup.string().required('The country field in the present address is required.'),
      city_id: Yup.string().required('The city field in the present address is required.'),
      post_code: Yup.string().required('The postal code field in the present address is required.'),
      address: Yup.string().required('The present address field is required.'),
    }),
    permanent_address: Yup.object().shape({
      country_id: Yup.string().required('The country field in the permanent address is required.'),
      city_id: Yup.string().required('The city field in the permanent address is required.'),
      post_code: Yup.string().required('The postal code field in the permanent address is required.'),
      address: Yup.string().required('The permanent address field is required.'),
    }),
    // previousBloodDonationDate: Yup.date().required('The previous blood donation date is required.'),
  });

  return (
    <section className="mt-5 blood-donor-registration section">
      <div className="container">
        <div className="row mt-14">
          <div className="col-lg-12 col-md-12 col-12">
            <div className="form-head">
              <h4 className="title">Blood Donor Registration</h4>
              <Formik
                initialValues={{
                  name: '',
                  phone: '',
                  email: '',
                  password: '',
                  password_confirmation: '',
                  gender_id: '',
                  date_of_birth: '',
                  age: '',
                  marital_status_id: '',
                  occupation: '',
                  father_or_mother_husband: '',
                  previousBloodDonationDate: '',
                  blood_group_id: '',
                  present_address: {
                    country_id: '',
                    city_id: '',
                    post_code: '',
                    address: '',
                  },
                  permanent_address: {
                    country_id: '',
                    city_id: '',
                    post_code: '',
                    address: '',
                  },
                }}
                validationSchema={validationSchema}
                onSubmit={async (values: any, { setErrors }) => {
                  console.log('Form data:', values);
                  try {
                    await dispatch(bloodDonorRegister(values)).unwrap();
                    Swal.fire({
                      title: 'Success!',
                      text: 'Blood Donor registered successfully! Please Login',
                      icon: 'success',
                      confirmButtonText: 'OK',
                      customClass: {
                        confirmButton: 'custom-confirm-button', // Apply the custom class
                      },
                    });
                    navigate('/login');
                  } catch (error: any) {
                    const formikErrors = Object.entries(error).reduce((acc: any, [key, value]) => {
                      const keys = key.split('.');
                      const lastKey = keys.pop();
                      if (lastKey) {
                        let nestedObj = acc;
                        keys.forEach((k) => {
                          if (!nestedObj[k]) nestedObj[k] = {};
                          nestedObj = nestedObj[k];
                        });
                        nestedObj[lastKey] = value;
                      }
                      return acc;
                    }, {});
                    console.log('Transformed errors:', formikErrors);
                    setErrors(formikErrors);
                    console.log(error);
                  }
                }}


              >
                {({ setFieldValue }) => (

                  <Form>
                    <div className="row">
                      <div className="col-md-6 col-lg-6">
                        <div className="patient-form">
                          <div className="form-group">
                            <Field name="name" type="text" placeholder="Name" className="form-control" />
                            <ErrorMessage name="name" component="div" className="text-danger" />

                          </div>

                          <div className='row'>

                            <div className="col-md-6">
                              <div className="form-group">
                                <Field name="phone" type="text" placeholder="Phone" className="form-control" />
                                <ErrorMessage name="phone" component="div" className="text-danger" />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <Field name="email" type="email" placeholder="Email" className="form-control" />
                                <ErrorMessage name="email" component="div" className="text-danger" />
                              </div>

                            </div>

                          </div>


                          <div className="form-group">
                            <Field name="password" type="password" placeholder="Password" className="form-control" />
                            <ErrorMessage name="password" component="div" className="text-danger" />
                          </div>
                          <div className="form-group">
                            <Field name="password_confirmation" type="password" placeholder="Confirm Password" className="form-control" />
                            <ErrorMessage name="password_confirmation" component="div" className="text-danger" />
                          </div>

                          {/* Gender Selection */}
                          <div className="gender">
                            <h5 className='form-check-inline mb-2'>Gender &nbsp;</h5> <br />

                            {genders.map((gender: any) => (
                              <div className="form-check form-check-inline">
                                <label className="form-check-label">{gender.name}</label>
                                <Field type="radio" name="gender_id" value={gender.id.toString()} className="form-check-input" />

                              </div>
                            ))}


                            <ErrorMessage name="gender_id" component="div" className="text-danger" />
                          </div>

                          {/* Birthday and Age */}


                          <div className="form-group">
                            <h5 className="my-2">Birthday</h5>
                            <Field
                              type="date"
                              id="date_of_birth"
                              name="date_of_birth"
                              className="form-control"
                              onChange={(e: any) => {
                                const birthDate = new Date(e.target.value);
                                const today = new Date();
                                let age = today.getFullYear() - birthDate.getFullYear();
                                const m = today.getMonth() - birthDate.getMonth();

                                if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                                  age--;
                                }

                                setFieldValue("date_of_birth", e.target.value);
                                setFieldValue("age", age);  // Automatically set age based on date of birth
                              }}
                            />
                            <ErrorMessage name="date_of_birth" component="div" className="text-danger" />

                          </div>








                          <div className='row'>
                            <div className="col-md-6">

                              <div className="form-group">
                                <Field
                                  name="age"
                                  type="number"
                                  placeholder="Age"
                                  className="form-control"
                                  readOnly
                                />
                                <ErrorMessage name="age" component="div" className="text-danger" />
                              </div>

                            </div>
                            <div className="col-md-6">
                              {/* Blood Group */}

                              <div className="form-group">
                                <Field as="select" name="blood_group_id" className="form-select ras">
                                  <option value="">Select Blood Group</option>
                                  {!commonDataLoading && bloodGroups.map((group: any) => (<option value={group?.id}>{group?.name}</option>))}
                                </Field>
                                <ErrorMessage name="blood_group_id" component="div" className="text-danger" />
                              </div>
                            </div>


                          </div>

                          <div className="form-group">
                            <label htmlFor="previousBloodDonationDate"><h5 className="birth">Previous Blood Donation Date:</h5></label>
                            <Field type="date" id="previousBloodDonationDate" name="previousBloodDonationDate" className="form-control" />
                            <ErrorMessage name="previousBloodDonationDate" component="div" className="text-danger" />
                          </div>
                        </div>
                      </div>

                      {/* Right Column */}
                      <div className="col-md-6 col-lg-6">
                        <div className="patient-form">
                          <div className="form-group">
                            <Field name="occupation" type="text" placeholder="Occupation" className="form-control" />
                            <ErrorMessage name="occupation" component="div" className="text-danger" />
                          </div>

                          {/* Marital Status */}
                          <div className="marital-status">
                            <h5 className='mb-2'>Marital Status</h5>
                            {!commonDataLoading && maritalStatus?.map((marital: any) => (
                              <div className="form-check form-check-inline" key={marital.id}>
                                <Field
                                  type="radio"
                                  name="marital_status_id"
                                  value={marital.id.toString()}
                                  className="form-check-input"
                                />
                                <label className="form-check-label">{marital.name}</label>
                              </div>
                            ))}
                            <ErrorMessage name="marital_status_id" component="div" className="text-danger" />
                          </div>

                          {/* Family Information */}
                          <div className="form-group">
                            <Field name="father_or_mother_husband" type="text" placeholder="Father/Mother/Husband Name" className="form-control" />
                            <ErrorMessage name="father_or_mother_husband" component="div" className="text-danger" />
                          </div>

                          {/* Present Address */}
                          <div className="row">
                            <div className="col-md-12">
                              <div className="present_address">
                                <h5>Present Address</h5>
                              </div>
                            </div>

                            <div className="col-md-6">
                              <div className="form-group">
                                <Field
                                  as="select"
                                  name="present_address.country_id"
                                  className="form-select ras"
                                  onChange={(event: any) => handlePresentCountryChange(event, setFieldValue)}
                                >
                                  <option value="">Select Country</option>
                                  {countriesLists.map((country) => (
                                    <option key={country.id} value={country.id}>{country.name}</option>
                                  ))}
                                </Field>
                                <ErrorMessage name="present_address.country_id" component="div" className="text-danger" />
                              </div>
                            </div>

                            <div className="col-md-6">
                              <div className="form-group">
                                {/* <Field name="present_address.city_id"
                                  as="select" placeholder="City"
                                  className="form-select ras">
                                  <option value="">Select City</option>
                                  {citiesLists.map((city: any) => (
                                    <option key={city.id} value={city.id}>
                                      {city.name}
                                    </option>
                                  ))}
                                </Field> */}

                                <Field
                                  name="present_address.city_id"
                                  component={SelectField}
                                  options={cityOptions}
                                  placeholder="Select City"
                                />
                                <ErrorMessage name="present_address.city_id" component="div" className="text-danger" />
                              </div>
                            </div>

                            <div className="col-md-6">
                              <div className="form-group">
                                <Field name="present_address.post_code" type="text" placeholder="Post Code" className="form-control" />
                                <ErrorMessage name="present_address.post_code" component="div" className="text-danger" />
                              </div>
                            </div>

                            <div className="col-md-6">
                              <div className="form-group">
                                <Field name="present_address.address" type="text" placeholder="Address" className="form-control" />
                                <ErrorMessage name="present_address.address" component="div" className="text-danger" />
                              </div>
                            </div>
                          </div>

                          {/* Permanent Address */}
                          <div className="row">
                            <div className="col-md-12">
                              <div className="permanent_address">
                                <h5 className='mb-2'>Permanent Address</h5>
                              </div>
                            </div>

                            <div className="col-md-6">
                              <div className="form-group">


                                <Field
                                  as="select"
                                  name="permanent_address.country_id"
                                  className="form-select ras"
                                  onChange={(event: any) => handlePermanentCountryChange(event, setFieldValue)}
                                >
                                  <option value="">Select Country</option>
                                  {countriesLists.map((country) => (
                                    <option key={country.id} value={country.id}>{country.name}</option>
                                  ))}
                                </Field>
                                <ErrorMessage name="permanent_address.country_id" component="div" className="text-danger" />
                              </div>
                            </div>

                            <div className="col-md-6">
                              <div className="form-group">
                                {/* <Field name="permanent_address.city_id" as="select"
                                  placeholder="City" className="form-select ras">
                                  <option value="">Select City</option>
                                  {citiesLists2.map((city: any) => (
                                    <option key={city.id} value={city.id}>
                                      {city.name}
                                    </option>
                                  ))}
                                </Field> */}


                                <Field
                                  name="permanent_address.city_id"
                                  component={SelectField}
                                  options={cityOptions2}
                                  placeholder="Select City"
                                />
                                <ErrorMessage name="permanent_address.city_id" component="div" className="text-danger" />
                              </div>
                            </div>

                            <div className="col-md-6">
                              <div className="form-group">
                                <Field name="permanent_address.post_code" type="text" placeholder="Post Code" className="form-control" />
                                <ErrorMessage name="permanent_address.post_code" component="div" className="text-danger" />
                              </div>
                            </div>

                            <div className="col-md-6">
                              <div className="form-group">
                                <Field name="permanent_address.address" type="text" placeholder="Address" className="form-control" />
                                <ErrorMessage name="permanent_address.address" component="div" className="text-danger" />
                              </div>
                            </div>
                          </div>



                        </div>
                      </div>
                    </div>

                    <div className="col-md-12 d-flex flex-column align-items-center">
                      <div className="form_bottom text-center">
                        <div className="check-and-pass mb-5 mt-3">
                          <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="exampleCheck1" required />
                            <label className="form-check-label" >Agree to our
                              <a href="#">Terms and Conditions</a>
                            </label>
                          </div>
                        </div>

                        <div className="patient-button">
                          <div className="button mb-2 mt-5">
                            <button type="submit" className="btn btn-primary">Registration</button>
                          </div>
                          <p className="outer-link">Already have an account? <Link to="/login">Login Now</Link></p>
                        </div>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BloodDonorRegistration;