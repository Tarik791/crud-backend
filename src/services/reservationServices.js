import { query } from "../db.js";

export const getReservations = async () => {
    const rows = await query('SELECT * FROM reservations');
    return rows;
};

export const createReservation = async (reservationData) => {
    const { person_name, person_surname, person_email, person_phone, start_date, end_date, reservation_status, reservation_type, price, paid_amount, number_of_people, location, notes } = reservationData;
    const result = await query(
        `INSERT INTO reservations (person_name, person_surname, person_email, person_phone, start_date, end_date, reservation_status, reservation_type, price, paid_amount, number_of_people, location, notes)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [person_name, person_surname, person_email, person_phone, start_date, end_date, reservation_status, reservation_type, price, paid_amount, number_of_people, location, notes]
    );

    console.log("Insert Result:", result);

    return { id: result.insertId, person_name, person_surname, person_email, person_phone, start_date, end_date, reservation_status, reservation_type, price, paid_amount, number_of_people, location, notes };
};

export const updateReservation = async (reservationData, reservationId) => {
    if (!reservationId) throw new Error("Reservation ID is required");

    const { person_name, person_surname, person_email, person_phone, start_date, end_date, reservation_status, reservation_type, price, paid_amount, number_of_people, location, notes } = reservationData;

    if (!person_name || !person_surname || !person_email || !person_phone || !start_date || !end_date || !reservation_status || !reservation_type || price === undefined || paid_amount === undefined || number_of_people === undefined || !location) {
        throw new Error("All fields are required for updating a reservation");
    }

    const result = await query(
        `UPDATE reservations SET person_name = ?, person_surname = ?, person_email = ?, person_phone = ?, start_date = ?, end_date = ?, reservation_status = ?, reservation_type = ?, price = ?, paid_amount = ?, number_of_people = ?, location = ?, notes = ? WHERE id = ?`,
        [person_name, person_surname, person_email, person_phone, start_date, end_date, reservation_status, reservation_type, price, paid_amount, number_of_people, location, notes, reservationId]
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
        `SELECT * FROM reservations WHERE id LIKE ? OR person_name LIKE ? OR person_surname LIKE ? OR person_email LIKE ? OR location LIKE ?`,
        [`%${searchTerm}%`, `%${searchTerm}%`, `%${searchTerm}%`, `%${searchTerm}%`]
    );

    return rows;
};
