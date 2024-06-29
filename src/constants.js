
export const countryJSON = [
    {
        name: 'India',
        state: ['Uttar Pradesh', 'Delhi', 'Madhya Pradesh', 'Maharashtra', 'Goa']
    },
    {
        name: 'Pakistan',
        state: ['Punjab', 'Lahore', 'Islamabad', 'Multan']
    },
    {
        name: 'Nepal',
        state: ['Kathmandu']
    },
]

export const ValidationRegex = {
    type: /^.+$/,
    fname: /^[A-Za-z]{5,}$/,
    lname: /^[A-Za-z]{5,}$/,
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    address: /^.+$/,
    country: /^.+$/,
    state: /^.+$/,
    city: /^.+$/,
    pincode: /^\d{6}$/,
    isd: /^.+$/,
    mobile: /^\d{10}$/,
    fax: /^\d{6}$/,
    phone: /^\d{6}$/,
    password: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    confirmPassword: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
}