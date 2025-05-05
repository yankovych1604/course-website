import express from 'express';
import Certificate from '../models/certificateModel';

const router = express.Router();

function formatDate(date: Date): string {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}.${month}.${year}`;
}

function formatCertificate(cert: any) {
    const { _id, __v, ...rest } = cert;
    return {
        ...rest,
        id: _id.toString(),
        userId: cert.userId.toString(),
        courseId: cert.courseId.toString(),
        programId: cert.programId.toString(),
        issuedAt: formatDate(new Date(cert.issuedAt)),
    };
}

router.post('/', async (req, res) => {
    try {
        const { userId, courseId, programId } = req.body;

        if (!userId || !courseId || !programId) {
            res.status(400).json({ message: 'Missing required fields' });
            return
        }

        const certificate = await Certificate.create({
            userId,
            courseId,
            programId,
            issuedAt: new Date()
        });

        const response = {
            id: certificate._id.toString(),
            userId: certificate.userId,
            courseId: certificate.courseId,
            programId: certificate.programId,
            issuedAt: certificate.issuedAt
        };

        res.json(formatCertificate(certificate.toObject()));
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

router.post('/certificates-data', async (req, res) => {
    try {
        const { ids } = req.body;

        if (!Array.isArray(ids) || ids.length === 0) {
            res.status(400).json({ message: 'No certificate IDs provided' });
            return;
        }

        const certificates = await Certificate.find({ _id: { $in: ids } }).lean();

        const result = certificates.map(formatCertificate);

        res.json(result);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

export default router;
