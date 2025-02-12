import { selectAllEntriesModel } from '../../models/entries/selectAllEntriesModel.js';
import { selectPhotosByEntryIdModel } from '../../models/photos/selectPhotosByEntryIdModel.js';
import { selectCompanionsByEntryIdModel } from '../../models/usersEntriesCompanions/selectCompanionsByEntryIdModel.js';
import { generateErrorUtils } from '../../utils/helpersUtils.js';

export const getAllEntriesService = async () => {
	// Tareas:
	// 1. Obtener todas las entradas de la base de datos.Lo va a hacer el modelo. Si no hay entradas, devolver un error
	// 2. Devolver las entradas

	const entries = await selectAllEntriesModel();

	for (const entry of entries) {
		const photos = await selectPhotosByEntryIdModel(entry.id);
		entry.photos = photos;
		const companions = await selectCompanionsByEntryIdModel(entry.id);
		entry.companions = companions;
	}

	if (!entries.length) {
		throw generateErrorUtils(
			404,
			'NO_ENTRIES_FOUND',
			'No se han encontrado entradas'
		);
	}

	return entries;
};
