import { TextField, MenuItem, Button } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import BE_URL from "../../config";


export const ContactForm = () => {

  //useState definations 
  const [FormData, setFormData] = useState({
    Name: "",
    Email: "",
    Number: "",
    City: "",
    NumberOfPerson: "",
    NumberOfNights: "",
    NumberOfChild: "",
    Date: "",
    Resort: "",
    Message: "",
  });

  const [FormErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [SouPackagesNames, setSouPackagesNames] = useState(null);
  const [GujaratPackagesNames, setGujaratPackagesNames] = useState(null);
  const [SelectResort, setSelectResort] = useState([]);
  const [FetchError, setFetchError] = useState(null);
  //fetching api data here 

  useEffect(() => {

    const FetchContactFormData = async () => {

      try {

        //fetching the data of sou packages names 

        const FetchSouNames = await axios.get(`${BE_URL}/souPackageName`);

        //fetching the data of gujarat packages names

        const FetchGujaratNames = await axios.get(`${BE_URL}/gujaratPackage`);

        // checking if status code is correct if correct then adding the data in useState

        if (FetchSouNames.status === 200) {

          setSouPackagesNames(FetchSouNames.data.data && FetchSouNames.data.data.map((pkg) => {

            return (

              pkg.sou_package_name

            )

          }));

          //else shows error on page

        } else {

          setFetchError("Failed to load Sou Form Data.");
          console.warn("Unexpected response status:", FetchSouNames.status);
        }


        // checking if status code is correct if correct then adding the data in useState

        if (FetchGujaratNames.status === 200) {

          setGujaratPackagesNames(

            FetchGujaratNames.data.data && FetchGujaratNames.data.data.map((pkg) => {

              return (

                `Gujarat Tous ${pkg.Nights}N / ${pkg.Days}D`

              )

            })

          )

        } else {
          setFetchError("Failed to load Gujarat Form Data.");
          console.warn("Unexpected response status:", FetchSouNames.status);
        }


      } catch (error) {

        console.error("Unable To Fetch Data Of Contact Page  Info :- ", error);
        setFetchError("An error occurred while loading contact page Sou Info.");
      }

    }

    FetchContactFormData();

  }, []);

  useEffect(() => {
    if (SouPackagesNames && GujaratPackagesNames) {
      setSelectResort([...SouPackagesNames, ...GujaratPackagesNames]);
    }
  }, [SouPackagesNames, GujaratPackagesNames]);

  //checking the form's field validations 

  const validateForm = () => {
    const errors = {};
    if (!FormData.Name.trim()) errors.Name = "Name is required.";
    if (!FormData.Email.trim()) errors.Email = "Email is required.";
    if (!FormData.Number.trim()) errors.Number = "Phone number is required.";
    if (!FormData.City.trim()) errors.City = "City is required.";
    if (FormData.NumberOfPerson === "" || FormData.NumberOfPerson === 0)
      errors.NumberOfPerson = "Select number of persons.";
    if (FormData.NumberOfNights === "")
      errors.NumberOfNights = "Select number of nights.";
    if (FormData.NumberOfChild === "")
      errors.NumberOfChild = "Select number of children.";
    if (!FormData.Date) errors.Date = "Date is required.";
    if (!FormData.Resort) errors.Resort = "Please select a resort.";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  //handling submit button for form

  const HandleOnSubmit = async (event) => {
    event.preventDefault();
    setSuccessMsg("");
    setErrorMsg("");
    if (!validateForm()) return;
    setLoading(true);
    try {
      await axios.post(`${BE_URL}/contactForm`, FormData);
      setSuccessMsg("Your inquiry has been submitted successfully!");
      HandleOnReset();
    } catch (error) {
      setErrorMsg(
        error?.response?.data?.message ||
        "Something went wrong. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  //handling reset button for form

  const HandleOnReset = () => {
    setFormData({
      Name: "",
      Email: "",
      Number: "",
      City: "",
      NumberOfPerson: "",
      NumberOfNights: "",
      NumberOfChild: "",
      Date: "",
      Resort: "",
      Message: "",
    });
    setFormErrors({});
    setSuccessMsg("");
    setErrorMsg("");
  };



  const NumberOfPerson = [
    { value: 0 },
    { value: 1 },
    { value: 2 },
    { value: 3 },
    { value: 4 },
    { value: 5 },
    { value: 6 },
    { value: 7 },
    { value: 8 },
    { value: 9 },
    { value: 10 },


  ];

  return (
    <div className="md:max-w-screen-lg max-w-screen-md lg:mx-auto mx-5  p-8 rounded-2xl bg-white/70 backdrop-blur-lg  shadow-2xl">
      <h2 className="text-2xl md:text-3xl font-bold text-orange-500 mb-8 text-center tracking-tight">
        Contact Us / Booking Inquiry
      </h2>
      {successMsg && (
        <div className="mb-4 text-green-600 font-semibold">{successMsg}</div>
      )}
      {errorMsg && (
        <div className="mb-4 text-red-600 font-semibold">{errorMsg}</div>
      )}
      <form
        className="grid md:grid-cols-2 grid-cols-1 gap-5"
        autoComplete="off"
        onSubmit={HandleOnSubmit}
      >
        <TextField
          label="Enter Your Name"
          variant="outlined"
          name="Name"
          required
          fullWidth
          error={Boolean(FormErrors.Name)}
          helperText={FormErrors.Name}
          value={FormData.Name}
          onChange={(e) => setFormData({ ...FormData, Name: e.target.value })}
        />
        <TextField
          label="Email"
          type="email"
          required
          variant="outlined"
          name="Email"
          fullWidth
          error={Boolean(FormErrors.Email)}
          helperText={FormErrors.Email}
          value={FormData.Email}
          onChange={(e) => setFormData({ ...FormData, Email: e.target.value })}
        />
        <TextField
          label="Phone Number"
          type="tel"
          required
          variant="outlined"
          name="Number"
          fullWidth
          error={Boolean(FormErrors.Number)}
          helperText={FormErrors.Number}
          value={FormData.Number}
          onChange={(e) => setFormData({ ...FormData, Number: e.target.value })}
        />
        <TextField
          label="City Name"
          required
          type="text"
          variant="outlined"
          name="City"
          fullWidth
          error={Boolean(FormErrors.City)}
          helperText={FormErrors.City}
          value={FormData.City}
          onChange={(e) => setFormData({ ...FormData, City: e.target.value })}
        />
        <TextField
          label="No. Of Person"
          required
          select
          fullWidth
          error={Boolean(FormErrors.NumberOfPerson)}
          helperText={FormErrors.NumberOfPerson}
          variant="outlined"
          value={FormData.NumberOfPerson}
          onChange={(e) =>
            setFormData({ ...FormData, NumberOfPerson: e.target.value })
          }
        >
          {NumberOfPerson.map((Item, Idx) => (
            <MenuItem key={Idx} value={Item.value}>
              {Item.value}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="No. Of Nights"
          required
          select
          fullWidth
          error={Boolean(FormErrors.NumberOfNights)}
          helperText={FormErrors.NumberOfNights}
          variant="outlined"
          value={FormData.NumberOfNights}
          onChange={(e) =>
            setFormData({ ...FormData, NumberOfNights: e.target.value })
          }
        >
          {NumberOfPerson.map((Item, Idx) => (
            <MenuItem key={Idx} value={Item.value}>
              {Item.value}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Select Date"
          type="date"
          name="Date"
          variant="outlined"
          fullWidth
          error={Boolean(FormErrors.Date)}
          helperText={FormErrors.Date}
          InputLabelProps={{ shrink: true }}
          required
          value={FormData.Date}
          onChange={(e) => setFormData({ ...FormData, Date: e.target.value })}
        />
        <TextField
          label="No. Of Child (0 - 6)"
          required
          select
          fullWidth
          error={Boolean(FormErrors.NumberOfChild)}
          helperText={FormErrors.NumberOfChild}
          variant="outlined"
          value={FormData.NumberOfChild}
          onChange={(e) =>
            setFormData({ ...FormData, NumberOfChild: e.target.value })
          }
        >
          {NumberOfPerson.map((Item, Idx) => (
            <MenuItem key={Idx} value={Item.value}>
              {Item.value}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Select Resort"
          required
          select
          fullWidth
          error={Boolean(FormErrors.Resort)}
          helperText={FormErrors.Resort}
          variant="outlined"
          value={FormData.Resort}
          onChange={(e) => setFormData({ ...FormData, Resort: e.target.value })}
          className="md:col-span-2"
        >
          {SelectResort?.map((Item, Idx) => (
            <MenuItem key={Idx} value={Item}>
              {Item}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Type Message"
          type="text"
          variant="outlined"
          multiline
          minRows={5}
          maxRows={7}
          name="Message"
          fullWidth
          className="md:col-span-2"
          value={FormData.Message}
          onChange={(e) =>
            setFormData({ ...FormData, Message: e.target.value })
          }
        />
        <div className="flex gap-4 mt-2 md:col-span-2 justify-end">
          <Button
            variant="contained"
            color="warning"
            type="submit"
            sx={{
              fontWeight: 700,
              px: 4,
              py: 1.5,
              borderRadius: "8px",
              boxShadow: "0 2px 8px 0 #ffedd5",
              textTransform: "none",
            }}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </Button>
          <Button
            variant="outlined"
            color="warning"
            type="button"
            sx={{
              fontWeight: 700,
              px: 4,
              py: 1.5,
              borderRadius: "8px",
              textTransform: "none",
            }}
            disabled={loading}
            onClick={HandleOnReset}
          >
            Reset
          </Button>
        </div>
      </form>
    </div>
  );
};
