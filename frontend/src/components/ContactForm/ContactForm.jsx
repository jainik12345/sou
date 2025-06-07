import { TextField, MenuItem, Button, Snackbar } from "@mui/material";
import { useState } from "react";

export const ContactForm = () => {

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

    const validateForm = () => {
        const errors = {};

        if (!FormData.Name.trim()) errors.Name = "Name is required.";
        if (!FormData.Email.trim()) errors.Email = "Email is required.";
        if (!FormData.Number.trim()) errors.Number = "Phone number is required.";
        if (!FormData.City.trim()) errors.City = "City is required.";
        if (FormData.NumberOfPerson === "" || FormData.NumberOfPerson === 0) errors.NumberOfPerson = "Select number of persons.";
        if (FormData.NumberOfNights === "") errors.NumberOfNights = "Select number of nights.";
        if (FormData.NumberOfChild === "") errors.NumberOfChild = "Select number of children.";
        if (!FormData.Date) errors.Date = "Date is required.";
        if (!FormData.Resort) errors.Resort = "Please select a resort.";

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
            City: "",
            NumberOfPerson: "",
            NumberOfNights: "",
            NumberOfChild: "",
            Date: "",
            Resort: "",
            Message: "",
        });

    }


    const NumberOfPerson = [

        {
            value: 0,
        },

        {
            value: 1,
        },
        {
            value: 2,
        },
        {
            value: 3,
        },
        {
            value: 4,
        },
        {
            value: 5,
        },

    ]


    const resortData = [


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
                    id="filled-city-input"
                    label="City Name"
                    required
                    type="text"
                    autoComplete="on"
                    variant="filled"
                    error={Boolean(FormErrors.City)}
                    helperText={FormErrors.City}
                    name="city-name"
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

                    value={FormData.City}
                    onChange={(event) => {

                        setFormData({ ...FormData, City: event.target.value });
                    }}
                />

                <TextField
                    id="filled-person-input"
                    label="No. Of Person"
                    required
                    select
                    type="number"
                    autoComplete="on"
                    error={Boolean(FormErrors.NumberOfPerson)}
                    helperText={FormErrors.NumberOfPerson}
                    variant="filled"
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

                    value={FormData.NumberOfPerson}
                    onChange={(event) => {

                        setFormData({ ...FormData, NumberOfPerson: event.target.value });
                    }}
                >
                    {NumberOfPerson.map((Item, Idx) => {

                        return (

                            <MenuItem key={Idx} value={Item.value}>
                                {Item.value}
                            </MenuItem>
                        )

                    })}

                </TextField>


                <TextField
                    id="filled-nights-input"
                    label="No. Of Nights"
                    required
                    select
                    type="number"
                    error={Boolean(FormErrors.NumberOfNights)}
                    helperText={FormErrors.NumberOfNights}
                    autoComplete="on"
                    variant="filled"
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

                    value={FormData.NumberOfNights}
                    onChange={(event) => {

                        setFormData({ ...FormData, NumberOfNights: event.target.value });
                    }}
                >
                    {NumberOfPerson.map((Item, Idx) => {

                        return (

                            <MenuItem key={Idx} value={Item.value}>
                                {Item.value}
                            </MenuItem>
                        )

                    })}



                </TextField>


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
                    id="filled-child-input"
                    label="No. Of Child (0 - 6)"
                    required
                    select
                    type="number"
                    autoComplete="on"
                    error={Boolean(FormErrors.NumberOfChild)}
                    helperText={FormErrors.NumberOfChild}
                    variant="filled"
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

                    value={FormData.NumberOfChild}
                    onChange={(event) => {

                        setFormData({ ...FormData, NumberOfChild: event.target.value });
                    }}
                >
                    {NumberOfPerson.map((Item, Idx) => {

                        return (

                            <MenuItem key={Idx} value={Item.value}>
                                {Item.value}
                            </MenuItem>
                        )

                    })}

                </TextField>

                <TextField
                    id="filled-resort-input"
                    label="Select Resort"
                    required
                    select
                    autoComplete="on"
                    error={Boolean(FormErrors.Resort)}
                    helperText={FormErrors.Resort}
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

                    value={FormData.Resort}
                    onChange={(event) => {

                        setFormData({ ...FormData, Resort: event.target.value });
                    }}
                >
                    {resortData.map((Item, Idx) => {

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


    );
}


