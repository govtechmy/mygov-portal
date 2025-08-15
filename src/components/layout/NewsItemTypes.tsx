import { JataNegaraIcon } from '@govtechmy/myds-react/icon';

export type NewsCategory =
  | 'Kesihatan'
  | 'Kelahiran'
  | 'Pendidikan'
  | 'Pekerjaan'
  | 'Keluarga'
  | 'Kediaman'
  | 'Pengangkutan'
  | 'Bantuan'
  | 'Perjalanan'
  | 'Persaraan'
  | 'Kematian'
  | 'Umum'
  | 'Hebahan';

export type NewsItem = {
  category: NewsCategory;
  title: string;
  description: string;
  date: string;
  readTime: string;
  svg?: React.ReactNode;
};

export const newsData: NewsItem[] = [
  // Kesihatan
  {
    category: 'Kesihatan',
    title: 'Bahaya tersembunyi minuman diet',
    description:
      'Minuman diet sering dianggap sihat, tetapi adakah ia benar-benar selamat?',
    date: '11 Feb 2024',
    readTime: '5 min',
    svg: <JataNegaraIcon className="size-18" />,
  },
  {
    category: 'Kesihatan',
    title: 'Kempen Kesedaran Penyakit Jantung',
    description:
      'Ketahui cara menjaga kesihatan jantung anda melalui gaya hidup sihat.',
    date: '12 Feb 2024',
    readTime: '4 min',
  },

  // Kelahiran
  {
    category: 'Kelahiran',
    title: 'Prosedur Pendaftaran Kelahiran Secara Online',
    description:
      'Kini anda boleh mendaftar kelahiran anak secara atas talian dengan mudah.',
    date: '13 Feb 2024',
    readTime: '3 min',
  },
  {
    category: 'Kelahiran',
    title: 'Bantuan Kewangan untuk Ibu Bersalin',
    description:
      'Maklumat tentang bantuan kewangan kerajaan untuk ibu selepas bersalin.',
    date: '14 Feb 2024',
    readTime: '5 min',
    svg: <JataNegaraIcon className="size-18" />,
  },

  // Pendidikan
  {
    category: 'Pendidikan',
    title: 'Permohonan Biasiswa 2024 Dibuka',
    description: 'Peluang biasiswa untuk pelajar cemerlang kini tersedia.',
    date: '11 Feb 2024',
    readTime: '5 min',
  },
  {
    category: 'Pendidikan',
    title: 'Pelancaran Program Sekolah Digital',
    description:
      'Program untuk meningkatkan literasi digital dalam kalangan pelajar sekolah.',
    date: '12 Feb 2024',
    readTime: '4 min',
  },

  // Pekerjaan
  {
    category: 'Pekerjaan',
    title: 'Portal Kerjaya Nasional Dilancarkan',
    description: 'Platform untuk mencari peluang kerja di seluruh negara.',
    date: '11 Feb 2024',
    readTime: '4 min',
    svg: <JataNegaraIcon className="size-18" />,
  },
  {
    category: 'Pekerjaan',
    title: 'Latihan Kemahiran Digital Percuma',
    description:
      'Tingkatkan kemahiran anda dengan kursus digital tanpa bayaran.',
    date: '15 Feb 2024',
    readTime: '5 min',
    svg: <JataNegaraIcon className="size-18" />,
  },

  // Keluarga
  {
    category: 'Keluarga',
    title: 'Tips Mengurus Keluarga Bahagia',
    description: 'Rahsia mengekalkan keharmonian dalam keluarga moden.',
    date: '16 Feb 2024',
    readTime: '4 min',
  },
  {
    category: 'Keluarga',
    title: 'Program Bantuan Keluarga Malaysia',
    description:
      'Bantuan kewangan dan sokongan untuk keluarga berpendapatan rendah.',
    date: '11 Feb 2024',
    readTime: '5 min',
  },

  // Kediaman
  {
    category: 'Kediaman',
    title: 'Permohonan Rumah Mampu Milik 2024',
    description:
      'Maklumat terkini tentang permohonan rumah mampu milik kerajaan.',
    date: '12 Feb 2024',
    readTime: '4 min',
  },
  {
    category: 'Kediaman',
    title: 'Tips Dekorasi Rumah Bajet',
    description: 'Hias rumah anda dengan kos minimum dan hasil yang menarik.',
    date: '14 Feb 2024',
    readTime: '3 min',
  },

  // Pengangkutan
  {
    category: 'Pengangkutan',
    title: 'Penambahbaikan Sistem LRT',
    description: 'Sistem pengangkutan awam lebih efisien dan mesra pengguna.',
    date: '13 Feb 2024',
    readTime: '4 min',
  },
  {
    category: 'Pengangkutan',
    title: 'Diskaun Tambang Pengangkutan Awam',
    description:
      'Nikmati diskaun tambang bagi pengguna kerap pengangkutan awam.',
    date: '11 Feb 2024',
    readTime: '5 min',
  },

  // Bantuan
  {
    category: 'Bantuan',
    title: 'Bantuan Prihatin Rakyat Fasa 1',
    description: 'Pembayaran fasa pertama akan dilakukan bermula minggu ini.',
    date: '11 Feb 2024',
    readTime: '5 min',
  },
  {
    category: 'Bantuan',
    title: 'Cara Mohon Bantuan Persekolahan',
    description:
      'Maklumat tentang bantuan pakaian sekolah dan peralatan pembelajaran.',
    date: '12 Feb 2024',
    readTime: '3 min',
  },

  // Perjalanan
  {
    category: 'Perjalanan',
    title: 'Kempen Cuti-Cuti Malaysia',
    description:
      'Nikmati pelbagai pakej pelancongan tempatan dengan harga menarik.',
    date: '11 Feb 2024',
    readTime: '4 min',
  },
  {
    category: 'Perjalanan',
    title: 'Prosedur Terkini Perjalanan Ke Luar Negara',
    description: 'Ketahui SOP semasa untuk perjalanan antarabangsa.',
    date: '14 Feb 2024',
    readTime: '5 min',
  },

  // Persaraan
  {
    category: 'Persaraan',
    title: 'Cara Rancang Persaraan Awal',
    description: 'Tips simpanan untuk memastikan persaraan selesa.',
    date: '13 Feb 2024',
    readTime: '4 min',
  },
  {
    category: 'Persaraan',
    title: 'Pengeluaran Akaun Persaraan KWSP',
    description: 'Maklumat terkini tentang pengeluaran akaun untuk persaraan.',
    date: '11 Feb 2024',
    readTime: '5 min',
  },

  // Kematian
  {
    category: 'Kematian',
    title: 'Proses Tuntutan Pampasan Kematian',
    description:
      'Garis panduan mengurus pampasan selepas kematian ahli keluarga.',
    date: '15 Feb 2024',
    readTime: '4 min',
  },
  {
    category: 'Kematian',
    title: 'Cara Daftar Kematian Secara Online',
    description:
      'Permohonan pendaftaran kematian kini lebih mudah atas talian.',
    date: '14 Feb 2024',
    readTime: '3 min',
  },

  // Umum
  {
    category: 'Umum',
    title: 'Senarai Nombor Penting Kerajaan',
    description: 'Pusat panggilan kerajaan untuk pelbagai perkhidmatan.',
    date: '11 Feb 2024',
    readTime: '5 min',
    svg: <JataNegaraIcon className="size-18" />,
  },
  {
    category: 'Umum',
    title: 'Notis Gangguan Bekalan Air',
    description: 'Maklumat terkini tentang jadual gangguan air.',
    date: '12 Feb 2024',
    readTime: '3 min',
  },

  // Hebahan
  {
    category: 'Hebahan',
    title: 'Belanjawan 2025',
    description:
      'Ketahui bantuan khusus yang diumumkan dalam belanjawan terkini.',
    date: '11 Feb 2024',
    readTime: '5 min',
  },
  {
    category: 'Hebahan',
    title: 'Program Rakyat Digital',
    description:
      'Platform khas untuk memperkukuh kemahiran digital rakyat Malaysia.',
    date: '12 Feb 2024',
    readTime: '4 min',
  },
];
