

const customers = [
    {
        firstName: "first",
        lastName: "fdsfds",
        email: "fdsfdsf"
    },
    {
        firstName: "second",
        lastName: "fdsfds",
        email: "fdsfdsf"
    }
]

customers.forEach(customer => {
    $("#customer-table").append(`
        <tr>
            <td>${customer.firstName}</td>
            <td>${customer.lastName}</td>
            <td>${customer.email}</td>
        <tr>
    `)
})