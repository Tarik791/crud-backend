import { query } from "../db.js";

export const getUsers = async () => {
    const rows = await query('SELECT * FROM users');
    return rows;
};

export const createUsers = async (clientData) => {
    const { username, email, car, password, role, isactive, image } = clientData;
    const result = await query(
        `INSERT INTO users (username, email, car, password, role, isactive, image)
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [username, email, car, password, role, isactive, image]
    );

    console.log("Insert Result:", result);

    return { id: result.insertId, username, email, car, password, role, isactive, image };
};

export const updateUsers = async (clientData, clientId) => {
    if (!clientId) throw new Error("Client ID is required");

    const { username, email, car, password, role, isactive, image } = clientData;

    if (!username || !email || !car || !password|| role === undefined || isactive === undefined) {
        throw new Error("All fields are required for updating a client");
    }

    const result = await query(
        `UPDATE users SET username = ?, email = ?, car = ?, password = ?, role = ?, isactive = ?, image = ? WHERE id = ?`,
        [username, email, car, password, role, isactive, image, clientId]
    );

    return result.affectedRows > 0;
};


export const deleteUser = async (clientId) => {
    if (!clientId) throw new Error("Client ID is required");

    const result = await query(`DELETE FROM users WHERE id = ?`, [clientId]);

    console.log("Delete Result:", result);

    return result.affectedRows > 0;
};

export const searchUsers = async (searchTerm) => {
    const {rows} = await query(
        `SELECT * FROM users WHERE username LIKE ? OR email LIKE ?`,
        [`%${searchTerm}%`, `%${searchTerm}%`]
    );
    

    return rows;
}

// Kreiraj Testimonial (Korisnik se prijavljuje)
export const createTestimonialsUsersComments = async (clientData) => {
    const { email, name, picture, sub, comment } = clientData;
    
    const result = await query(
        `INSERT INTO testimonials_users_comments (email, name, picture, sub, comment)
        VALUES (?, ?, ?, ?, ?)`,
        [email, name, picture, sub, comment]
    );
    
    console.log("Insert Testimonial Result:", result);
    
    return { id: result.insertId, email, name, picture, sub, comment };
};

export const getTestimonials = async () => {
    const rows = await query('SELECT * FROM testimonials_users_comments');
    return rows;
};

// Kreiraj Testimonial (Korisnik se prijavljuje)
export const createTestimonials = async (clientData) => {
    const { email, email_verified, family_name, given_name, name, picture, sub } = clientData;
    
    const result = await query(
        `INSERT INTO testimonials (email, email_verified, family_name, given_name, name, picture, sub)
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [email, email_verified, family_name, given_name, name, picture, sub]
    );
    
    console.log("Insert Testimonial Result:", result);
    
    return { id: result.insertId, email, email_verified, family_name, given_name, name, picture, sub };
};

// Kreiraj Testimonial Comment (Korisnik ostavlja komentar)
export const createTestimonialsComment = async (testimonialId, commentData) => {
    const { comment } = commentData;
    
    const result = await query(
        `INSERT INTO testimonials_comment (testimonial_id, comment)
        VALUES (?, ?)`,
        [testimonialId, comment]
    );
    
    console.log("Insert Comment Result:", result);
    
    return { id: result.insertId, testimonial_id: testimonialId, comment };
};