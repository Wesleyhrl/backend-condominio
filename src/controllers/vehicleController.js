const Vehicle = require('../models/Vehicle');
const Resident = require('../models/Resident');

// Listar todos os veículos
exports.getAllVehicles = async (req, res) => {
    try {
        const vehicles = await Vehicle.find().populate('owner', 'name apartment phone email'); // Popula dados do morador
        res.status(200).json(vehicles);
    } catch (error) {
        res.status(500).json({ message: "Erro ao listar veículos.", error });
    }
}

// Criar um novo veículo
exports.createVehicle = async (req, res) => {
    const { model, brand, year, owner } = req.body;

    try {
        // Verificar se o id do residente existe
        const resident = await Resident.findOne({ id: owner });  // Verificando pelo id numérico
        if (!resident) {
            return res.status(404).json({ message: "Residente não encontrado." });
        }

        // Criar o veículo
        const vehicle = new Vehicle({
            model,
            brand,
            year,
            owner
        });

        await vehicle.save();
        res.status(201).json(vehicle);
    } catch (error) {
        res.status(400).json({ message: "Erro ao criar veículo.", error });
    }
};


// Atualizar um veículo
exports.updateVehicle = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedVehicle = await Vehicle.findOneAndUpdate({ vehicleId: parseInt(id) }, req.body, { new: true });
        res.status(200).json(updatedVehicle);
    } catch (error) {
        res.status(400).json({ message: "Erro ao atualizar veículo.", error });
    }
};

// Excluir um veículo
exports.deleteVehicle = async (req, res) => {
    try {
        const { id } = req.params;
        await Vehicle.findOneAndDelete({ vehicleId: parseInt(id) });
        res.status(200).json({ message: "Veículo excluído com sucesso." });
    } catch (error) {
        res.status(500).json({ message: "Erro ao excluir veículo.", error });
    }
};
//Buscar veículos de um residente especifico
exports.getVehiclesByResident = async (req, res) => {
    try {
        const { residentId } = req.params; // ID do residente passado na URL
        const vehicles = await Vehicle.find({ owner: residentId }); // Busca veículos pelo campo `owner`
        res.status(200).json(vehicles);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar veículos do residente.", error });
    }
};
