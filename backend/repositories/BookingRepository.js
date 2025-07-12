const { Booking } = require('../models');

class BookingRepository {
    static async findAll() {
        return Booking.findAll();
    }

    static async findById(id) {
        return Booking.findByPk(id);
    }

    static async create(data) {
        return Booking.create(data);
    }

    static async update(id, data) {
        const booking = await Booking.findByPk(id);

        Object.assign(booking, data);
        return booking.save();
    }

    static async delete(id) {
        const booking = await Booking.findByPk(id);

        await booking.destroy();
        return true;
    }
}

module.exports = BookingRepository;