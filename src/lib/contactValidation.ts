import { z } from 'zod';

export const contactSchema = z.object({
  category: z.string().min(1, 'Sila pilih kategori'), //yes
  name: z.string().min(2, 'Nama mesti lebih daripada 2 aksara'), //yes
  ic: z
    .string()
    .regex(/^\d{6}-\d{2}-\d{4}$/, 'IC mesti dalam format 000000-00-0000'), //yes
  address: z.string().min(5, 'Alamat tidak sah'),
  phoneCode: z.string().min(2),
  phone: z.string().regex(/^[0-9]{7,10}$/, 'Nombor telefon tidak sah'),
  email: z.string().email('Alamat emel tidak sah'), //yes
  suggestion: z.string().min(5, 'Sila masukkan sekurang-kurangnya 5 aksara'),
  file: z
    .any()
    .optional()
    .refine(
      file => {
        if (!file) return true;
        return file instanceof File && file.size <= 25 * 1024 * 1024;
      },
      { message: 'Fail mestilah kurang daripada 25MB' }
    )
    .refine(
      file => {
        if (!file) return true;
        return ['application/pdf', 'image/jpeg', 'image/png'].includes(
          file.type
        );
      },
      { message: 'Jenis fail tidak dibenarkan (hanya PDF/JPG/PNG)' }
    ),
});

export type ContactFormData = z.infer<typeof contactSchema>;
