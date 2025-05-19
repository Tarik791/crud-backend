import * as userService from '../services/userServices.js'

export const getUsers = async (req, res) => {
    try {
        const clients = await userService.getUsers();
        res.status(200).json(clients);
    } catch (err) {
        console.log('Error fetching clients 1:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const getTestimonials = async (req, res) => {
    try {
        const testimonials = await userService.getTestimonials();
        res.status(200).json(testimonials);
    } catch (err) {
        console.log('Error fetching clients 1:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const createUsers = async (req, res) => {
    try {
        const clientData = req.body;
        if (req.file) {
            clientData.image = req.file.filename;
        }
        const newClient = await userService.createUsers(clientData);
        res.status(201).json(newClient);
    } catch (err) {
        console.error("Error creating client:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


export const updateUsers = async (req, res) => {
    try {
        const clientId = req.params.id;
        const clientData = req.body;

        const updated = await userService.updateUsers(clientData, clientId);

        if (!updated) {
            return res.status(404).json({ message: 'Client not found or no changes made' });
        }

        res.status(200).json({ message: 'Client updated successfully' });
    } catch (err) {
        console.error('Error updating client:', err);
        res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
};


export const deleteUser = async (req, res) => {
    try {
        const clientId = req.params.id;
        const deleteUser = await userService.deleteUser(clientId);
        if(!deleteUser){
            return res.status(404).json({message: 'Client not found' });
        }
        res.status(200).send();
    } catch (err) {
        console.log('Error fetching clients 4:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


export const searchUsers = async (req, res) => {
    try{
        const searchTerm = req.query.q;
        const clients = await userService.searchUsers(searchTerm);

        res.status(200).json(clients)
    } catch (err) {
        console.error('Error searching clients: ', err)
        res.status(500).json({message: 'Internal Server Error' })
    }
}

// Kreiraj Testimonial (Korisnik se prijavljuje)
export const createTestimonialsUsersComments = async (req, res) => {
    try {
        const clientData = req.body;
        
        const newTestimonial = await userService.createTestimonialsUsersComments(clientData);
        
        res.status(201).json(newTestimonial);
    } catch (err) {
        console.error("Error creating testimonial:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Kreiraj Testimonial (Korisnik se prijavljuje)
export const createTestimonials = async (req, res) => {
    try {
        const clientData = req.body;
        
        const newTestimonial = await userService.createTestimonials(clientData);
        
        res.status(201).json(newTestimonial);
    } catch (err) {
        console.error("Error creating testimonial:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Kreiraj Testimonial Comment (Korisnik ostavlja komentar)
export const createTestimonialsComment = async (req, res) => {
    try {
        const { testimonialId } = req.params;
        const commentData = req.body;
        
        const newComment = await userService.createTestimonialsComment(testimonialId, commentData);
        
        res.status(201).json(newComment);
    } catch (err) {
        console.error("Error creating testimonial comment:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};