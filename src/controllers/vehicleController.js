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
    try {
        const { model, brand, year, plate, color, owner } = req.body; // `ownerName` agora é passado no corpo da requisição

        // Buscar o residente pelo nome (ou outros critérios, como 'apartment', se necessário)
        const resident = await Resident.findOne({ name: owner });

        // Verifica se o residente foi encontrado
        if (!resident) {
            return res.status(404).json({ message: "Residente não encontrado." });
        }

        // Criar o novo veículo com o ID do residente
        const vehicle = new Vehicle({
            model,
            brand,
            year,
            plate, // Novo campo de placa
            color, // Novo campo de cor
            owner: resident.id // Usa o ObjectId do residente
        });

        // Salvar o veículo no banco de dados
        await vehicle.save();
        res.status(201).json(vehicle); // Retorna o veículo criado com sucesso
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
