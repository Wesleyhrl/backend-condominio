const Resident = require('../models/Resident');

// Listar todos os residentes
exports.getAllResidents = async (req, res) => {
  try {
    const residents = await Resident.find();
    res.status(200).json(residents);
  } catch (error) {
    res.status(500).json({ message: "Erro ao listar residentes.", error });
  }
};

// Criar um novo residente
exports.createResident = async (req, res) => {
  try {
    const resident = new Resident(req.body);
    await resident.save();
    res.status(201).json(resident);
  } catch (error) {
    res.status(400).json({ message: "Erro ao criar residente.", error });
  }
};

// Atualizar um residente
exports.updateResident = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedResident = await Resident.findOneAndUpdate({ id: parseInt(id) }, req.body, { new: true });
    res.status(200).json(updatedResident);
  } catch (error) {
    res.status(400).json({ message: "Erro ao atualizar residente.", error });
  }
};

// Excluir um residente
exports.deleteResident = async (req, res) => {
  try {
    const { id } = req.params;
    await Resident.findOneAndDelete({ id: parseInt(id) });
    res.status(200).json({ message: "Residente excluído com sucesso." });
  } catch (error) {
    res.status(500).json({ message: "Erro ao excluir residente.", error });
  }
};

// Buscar um residente por ID
exports.getResidentById = async (req, res) => {
  const { id } = req.params;

  try {
    const resident = await Resident.findOne({ id: id });

    if (!resident) {
      return res.status(404).json({ message: "Residente não encontrado." });
    }

    res.status(200).json(resident);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar residente.", error });
  }
};
