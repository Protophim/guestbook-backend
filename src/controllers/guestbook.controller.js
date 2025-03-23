import GuestbookEntry from '../models/guestbookEntry.model.js';

export const getEntries = async (req, res) => {
  try {
    const entries = await GuestbookEntry.find().sort({ createdAt: -1 });
    res.json(entries);
  } catch (error) {
    res.status(500).json({ error: 'Fehler beim Abrufen der Einträge.' });
  }
};

export const createEntry = async (req, res) => {
  try {
    const { name, message } = req.body;
    const entry = new GuestbookEntry({ name, message });
    await entry.save();
    res.status(201).json(entry);
  } catch (error) {
    res.status(400).json({ error: 'Fehler beim Speichern des Eintrags.' });
  }
};

export const updateEntry = async (req, res) => {
  const { id } = req.params;
  const { name, message } = req.body;

  try {
    const entry = await GuestbookEntry.findById(id);
    if (!entry) return res.status(404).json({ error: 'Eintrag nicht gefunden' });

    const now = new Date();
    const created = new Date(entry.date || entry.createdAt);
    const diffMinutes = (now - created) / (1000 * 60);

    if (diffMinutes > 60) {
      return res.status(403).json({ error: 'Bearbeitung nur innerhalb von 60 Minuten erlaubt' });
    }

    entry.name = name;
    entry.message = message;
    await entry.save();

    res.json(entry);
  } catch (err) {
    res.status(500).json({ error: 'Fehler beim Aktualisieren des Eintrags' });
  }
};

export const deleteEntry = async (req, res) => {
  const { id } = req.params;
  const adminKey = req.headers['x-admin-key'];

  if (adminKey !== process.env.ADMIN_KEY) {
    return res.status(403).json({ error: 'Nicht autorisiert' });
  }

  try {
    const deleted = await GuestbookEntry.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: 'Eintrag nicht gefunden' });
    res.json({ message: 'Eintrag gelöscht' });
  } catch (err) {
    res.status(500).json({ error: 'Fehler beim Löschen des Eintrags' });
  }
};
