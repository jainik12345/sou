import { TextField, MenuItem, Button } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";

export const GujaratPackagesDropDownForm = () => {


    const { GujaratPath } = useParams();

    if (!GujaratPath) {
        return <h1 className="text-xl text-red-600">Invalid Gujarat Package</h1>;
    }

    const formattedTitle = GujaratPath
        .replace(/-/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());


    const [FormData, setFormData] = useState({


        Name: "",
        Email: "",
        Number: "",
        Date: "",
        Package: "",
        Message: "",

    });

    const [FormErrors, setFormErrors] = useState({});

    const validateForm = () => {
        const errors = {};

        if (!FormData.Name.trim()) errors.Name = "Name is required.";
        if (!FormData.Email.trim()) errors.Email = "Email is required.";
        if (!FormData.Number.trim()) errors.Number = "Phone number is required.";
        if (!FormData.Date) errors.Date = "Date is required.";
        if (!FormData.Package) errors.PackageData = "Please select a Package.";

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };


    const HandleOnSubmit = (event) => {

        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        console.log("Form submitted", FormData);
        HandleOnReset();
    };



    const HandleOnReset = () => {

        setFormData({

            Name: "",
            Email: "",
            Number: "",
            Date: "",
            Package: "",
            Message: "",
        });

    }


    const PackageData = [


        {

            name: "Statue of Unity Tent City - 1"

        },

        {

            name: "Villa Euphoria Resort"

        },
        {
            name: "Tent City Narmada"

        },

        {

            name: "River View Tent Resort"
        },
        {

            name: "Unity Village Resort"

        },
        {

            name: "Gujarat Tour 3N / 4D"

        },
        {

            name: "Gujarat Tour 4N / 5D"

        },
        {

            name: "Gujarat Tour 5N / 6D"

        },
        {

            name: "Gujarat Tour 6N / 7D"

        },
        {

            name: "Gujarat Tour 7N / 8D"

        },
        {

            name: "Gujarat Tour 11N / 12D"

        },

    ]

    return (

        <>

            <div className="gujarat-packages-section p-10">


                <h2 className="text-center font-semibold text-orange-color text-[2rem]">Plan Your Trip to {formattedTitle}</h2>

                <div className="form-cont max-w-screen-lg mx-auto md:p-10 p-5 white shadow-xl shadow-black/50 ">

                    <form action="#" className="grid md:grid-cols-2 grid-cols-1 gap-4 ">

                        <TextField id="filled-basic" label="Enter Your Name" variant="filled" name="Name" required autoComplete="name" error={Boolean(FormErrors.Name)}
                            helperText={FormErrors.Name}
                            sx={{
                                '& label.Mui-focused': {
                                    color: 'var(--color-orange-color)',
                                    fontSize: "1rem"
                                },
                                '& .MuiFilledInput-underline:after': {
                                    borderBottomColor: 'var(--color-orange-color)',
                                },
                                '& .MuiFilledInput-root.Mui-focused': {
                                    backgroundColor: '#fff',
                                },
                                '& label': {
                                    fontSize: '.9rem',
                                }
                            }}

                            value={FormData.Name}
                            onChange={(event) => {

                                setFormData({ ...FormData, Name: event.target.value });
                            }}
                        />


                        <TextField
                            id="filled-email-input"
                            label="Email"
                            type="email"
                            autoComplete="email"
                            required
                            variant="filled"
                            name="email"
                            error={Boolean(FormErrors.Email)}
                            helperText={FormErrors.Email}
                            sx={{
                                '& label.Mui-focused': {
                                    color: 'var(--color-orange-color)',
                                    fontSize: "1rem"
                                },
                                '& .MuiFilledInput-underline:after': {
                                    borderBottomColor: 'var(--color-orange-color)',
                                },
                                '& .MuiFilledInput-root.Mui-focused': {
                                    backgroundColor: '#fff', // optional
                                }, '& label': {
                                    fontSize: '.9rem',
                                }
                            }}
                            value={FormData.Email}
                            onChange={(event) => {

                                setFormData({ ...FormData, Email: event.target.value });
                            }}
                        />

                        <TextField
                            id="filled-number-input"
                            label="Phone Number"
                            type="number"
                            inputMode="numeric"
                            autoComplete="number"
                            required
                            variant="filled"
                            error={Boolean(FormErrors.Number)}
                            helperText={FormErrors.Number}
                            name="number"
                            sx={{
                                '& label.Mui-focused': {
                                    color: 'var(--color-orange-color)',
                                    fontSize: "1rem"
                                },
                                '& .MuiFilledInput-underline:after': {
                                    borderBottomColor: 'var(--color-orange-color)',
                                },
                                '& .MuiFilledInput-root.Mui-focused': {
                                    backgroundColor: '#fff', // optional
                                }, '& label': {
                                    fontSize: '.9rem',
                                }
                            }}

                            value={FormData.Number}
                            onChange={(event) => {

                                setFormData({ ...FormData, Number: event.target.value });
                            }}
                        />


                        <TextField
                            id="filled-date-input"
                            label="Select Date"
                            type="date"
                            name="date"
                            variant="filled"
                            error={Boolean(FormErrors.Date)}
                            helperText={FormErrors.Date}
                            InputLabelProps={{
                                shrink: true, // Keeps the label visible when a date is selected
                            }}
                            required

                            value={FormData.Date}
                            onChange={(event) => {

                                setFormData({ ...FormData, Date: event.target.value });
                            }}
                        />

                        <TextField
                            id="filled-Package-input"
                            label="Select Package"
                            required
                            select
                            autoComplete="on"
                            error={Boolean(FormErrors.Package)}
                            helperText={FormErrors.Package}
                            variant="filled"
                            className="md:md:col-span-2"
                            sx={{
                                '& label.Mui-focused': {
                                    color: 'var(--color-orange-color)',
                                    fontSize: "1rem"
                                },
                                '& .MuiFilledInput-underline:after': {
                                    borderBottomColor: 'var(--color-orange-color)',
                                },
                                '& .MuiFilledInput-root.Mui-focused': {
                                    backgroundColor: '#fff', // optional
                                }, '& label': {
                                    fontSize: '.9rem',
                                }
                            }}

                            value={FormData.Package}
                            onChange={(event) => {

                                setFormData({ ...FormData, Package: event.target.value });
                            }}
                        >
                            {PackageData.map((Item, Idx) => {

                                return (

                                    <MenuItem key={Idx} value={Item.name}>
                                        {Item.name}
                                    </MenuItem>
                                )

                            })}

                        </TextField>


                        <TextField
                            className="md:col-span-2"
                            id="filled-message-input"
                            label="Type Message"
                            type="text"
                            variant="filled"
                            multiline
                            minRows={5}
                            maxRows={7}
                            name="message"
                            sx={{
                                '& label.Mui-focused': {
                                    color: 'var(--color-orange-color)',
                                    fontSize: "1rem"
                                },
                                '& .MuiFilledInput-underline:after': {
                                    borderBottomColor: 'var(--color-orange-color)',
                                },
                                '& .MuiFilledInput-root.Mui-focused': {
                                    backgroundColor: '#fff', // optional
                                }, '& label': {
                                    fontSize: '.9rem',
                                }
                            }}
                            value={FormData.Message}
                            onChange={(event) => {

                                setFormData({ ...FormData, Message: event.target.value });
                            }}
                        />


                        <Button variant="outlined" type="submit" sx={{

                            fontWeight: 600,
                            fontFamily: "var(--font-footer-font)",
                            backgroundColor: "var(--color-orange-color)",
                            color: "white",
                            border: "none",
                            height: "50px",

                        }}


                            onClick={(event) => {



                                HandleOnSubmit(event);
                            }}



                        >Submit</Button>

                        <Button variant="outlined" type="button" sx={{

                            fontFamily: "var(--font-footer-font)",
                            fontWeight: 600,
                            backgroundColor: "var(--color-orange-color)",
                            color: "white",
                            border: "none",
                            height: "50px"

                        }}


                            onClick={(event) => {
                                HandleOnReset(event);
                            }}

                        >Reset</Button>

                    </form>

                </div>


            </div>


        </>

    )
}