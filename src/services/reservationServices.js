import { query } from "../db.js";
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: 'smtp.hostinger.com',
    port: 465,
    secure: true,
    auth: {
        user: 'info@thi-qqa.com',
        pass: 'IrhadRadaca1!'
    }
});

export const sendReservationEmail = async (reservationData) => {
    const { person_name, person_surname, start_date, end_date, price, number_of_people, car } = reservationData;

    const mailOptions = {
        from: 'info@thi-qqa.com',
        to: 'info@thi-qqa.com, radacairhad99@gmail.com', // Više adresa
        subject: 'Potvrda Rezervacije',
        text: `Poštovani,
    
        Nova rezervacija je uspješno kreirana. Detalji su u nastavku:
        Ime: ${person_name}
        Prezime: ${person_surname}
        Datum početka: ${start_date}
        Datum završetka: ${end_date}
        Broj ljudi: ${number_of_people}
        Ukupna cena: ${price}
        Auto: ${car}
    
        Hvala na izboru naših usluga.
    
        Srdačno,
        Tim Thiiqqa
        `,
        html: `
        <html>
            <head>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        color: #333;
                        margin: 0;
                        padding: 20px;
                        background-color: #f4f4f9;
                    }
                    .email-container {
                        background-color: #ffffff;
                        border-radius: 8px;
                        padding: 20px;
                        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                        max-width: 600px;
                        margin: 0 auto;
                    }
                    h1 {
                        color: #4CAF50;
                        text-align: center;
                    }
                    p {
                        font-size: 16px;
                        line-height: 1.5;
                        margin-bottom: 10px;
                    }
                    ul {
                        list-style: none;
                        padding: 0;
                    }
                    li {
                        margin: 5px 0;
                        font-size: 16px;
                    }
                    .footer {
                        text-align: center;
                        font-size: 14px;
                        color: #777;
                        margin-top: 20px;
                    }
                    .highlight {
                        font-weight: bold;
                        color: #333;
                    }
                </style>
            </head>
            <body>
                <div class="email-container">
                    <h1>Potvrda Rezervacije</h1>
                    <p>Poštovani, </p>
                    <p>Nova rezervacija je uspešno kreirana. Detalji su u nastavku:</p>
                    <ul>
                        <li><span class="highlight">Datum početka:</span> ${start_date}</li>
                        <li><span class="highlight">Datum završetka:</span> ${end_date}</li>
                        <li><span class="highlight">Ime:</span> ${person_name}</li>
                        <li><span class="highlight">Prezime:</span> ${person_surname}</li>
                        <li><span class="highlight">Broj ljudi:</span> ${number_of_people}</li>
                        <li><span class="highlight">Ukupna cena:</span> ${price}</li>
                    </ul>
                    <p>Hvala na izboru naših usluga.</p>
                    <p class="footer">Srdačno,<br>Tim Thiiqqa</p>
                </div>
            </body>
        </html>
        `
    };
    

    try {
        await transporter.sendMail(mailOptions);
        console.log('E-mail je uspešno poslat');
    } catch (error) {
        console.error('Greška prilikom slanja e-maila:', error);
        throw new Error('Greška prilikom slanja e-maila');
    }
};


export const getReservations = async () => {
    const rows = await query('SELECT * FROM reservations');
    return rows;
};



export const createReservation = async (reservationData) => {
    try {
        const { person_name, person_surname, person_phone, start_date, end_date, reservation_status, reservation_type, price, number_of_people, notes, car } = reservationData;

        const clean = (val) => val === undefined ? null : val;

        const result = await query(
            `INSERT INTO reservations (person_name, person_surname, person_phone, start_date, end_date, reservation_status, reservation_type, price, number_of_people, notes, car)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                clean(person_name),
                clean(person_surname),
                clean(person_phone),
                clean(start_date),
                clean(end_date),
                clean(reservation_status),
                clean(reservation_type),
                clean(price),
                clean(number_of_people),
                clean(notes),
                clean(car)
            ]
        );


        console.log("Insert Result:", result);

        return { id: result.insertId, person_name, person_surname, person_phone, start_date, end_date, reservation_status, reservation_type, price, number_of_people, notes, car};
    } catch (error) {
        console.error("Greška u INSERT-u rezervacije:", error.message);
        throw new Error("Greška prilikom kreiranja rezervacije");
    }
};


export const updateReservation = async (reservationData, reservationId) => {
    if (!reservationId) throw new Error("Reservation ID is required");

    const { person_name, person_surname, person_phone, start_date, end_date, reservation_status, reservation_type, price, number_of_people, notes, car } = reservationData;

    if (!person_name || !person_surname  || !person_phone || !start_date || !end_date || !reservation_status || !reservation_type || price === undefined || number_of_people === undefined) {
        throw new Error("All fields are required for updating a reservation");
    }

    const result = await query(
        `UPDATE reservations SET person_name = ?, person_surname = ?, person_phone = ?, start_date = ?, end_date = ?, reservation_status = ?, reservation_type = ?, price = ?, number_of_people = ?, notes = ?, car = ? WHERE id = ?`,
        [person_name, person_surname, person_phone, start_date, end_date, reservation_status, reservation_type, price, number_of_people, notes, car, reservationId]
    );

    return result.affectedRows > 0;
};

export const deleteReservation = async (reservationId) => {
    if (!reservationId) throw new Error("Reservation ID is required");

    const result = await query(`DELETE FROM reservations WHERE id = ?`, [reservationId]);

    console.log("Delete Result:", result);

    return result.affectedRows > 0;
};

export const searchReservations = async (searchTerm) => {
    const { rows } = await query(
        `SELECT * FROM reservations WHERE id LIKE ? OR person_name LIKE ? OR person_surname LIKE ?`,
        [`%${searchTerm}%`, `%${searchTerm}%`, `%${searchTerm}%`, `%${searchTerm}%`]
    );

    return rows;
};
