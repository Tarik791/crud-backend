import { query } from "../db.js";

// Get all cars
export const getCars = async () => {
    const rows = await query('SELECT * FROM cars');
    return rows;
};

// Create a new car
export const createCar = async (carData) => {
    const { brand, model, type, year, color, price_per_day, available, image, created_at } = carData;

    const result = await query(
        `INSERT INTO cars (brand, model, type, year, color, price_per_day, available, image, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [brand, model, type, year, color, price_per_day, available, image, created_at]
    );

    console.log("Insert Result:", result);

    return { 
        id: result.insertId, 
        brand, 
        model,
        type, 
        year, 
        color, 
        price_per_day, 
        available, 
        image,
        created_at 
    };
};

// Update existing car
export const updateCar = async (carData, carId) => {
    if (!carId) throw new Error("Car ID is required");

    const { brand, model, type, year, color, price_per_day, available, image } = carData;

    if (!brand || !model || !type || !year || !color || price_per_day === undefined || available === undefined) {
        throw new Error("All fields are required for updating a car");
    }

    const result = await query(
        `UPDATE cars 
         SET brand = ?, model = ?, type = ?, year = ?, color = ?, price_per_day = ?, available = ?, image = ?
         WHERE id = ?`,
        [brand, model, type, year, color, price_per_day, available, image, carId]
    );

    console.log("Update Result:", result);

    return result.affectedRows > 0;
};

// Delete car
export const deleteCar = async (carId) => {
    if (!carId) throw new Error("Car ID is required");

    const result = await query(`DELETE FROM cars WHERE id = ?`, [carId]);

    console.log("Delete Result:", result);

    return result.affectedRows > 0;
};

// Search cars by brand or model
export const searchCars = async (searchTerm) => {
    const rows = await query(
        `SELECT * FROM cars WHERE brand LIKE ? OR model LIKE ?`,
        [`%${searchTerm}%`, `%${searchTerm}%`]
    );

    return rows;
};
