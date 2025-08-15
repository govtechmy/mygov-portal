interface Items {
  icon: string;
  title: string;
  lists: {
    1: string;
    2?: string;
    3?: string;
    4?: string;
    5?: string;
  };
}

export const leftItems: Items[] = [
  {
    icon: '/home/third_section/kelahiran.png',
    title: 'Kelahiran & Pengenalan Diri',
    lists: {
      1: 'Mykad',
    },
  },
  {
    icon: '/home/third_section/pengangkutan.png',
    title: 'Pengangkutan',
    lists: {
      1: 'Lesen Memandu',
      2: 'Lesen Kenderaan Motor',
      3: 'Semakan Saman JPJ',
      4: 'Semakan nombor pendaftaran terkini',
      5: 'Semakan Keputusan Ujian Memandu',
    },
  },
  {
    icon: '/home/third_section/kesihatan.png',
    title: 'Kesihatan & Kebajikan',
    lists: {
      1: 'Semakan Status OKU',
      2: 'Semakan Mangsa Bencana',
      3: 'Semakan Pusat PPS Aktif',
      4: 'Temujanji Klinik Kesihatan Kerajaan',
    },
  },
];

export const rightItems: Items[] = [
  {
    icon: '/home/third_section/perjalanan.png',
    title: 'Perjalanan & Perlancongan',
    lists: {
      1: 'Passport',
      2: 'Semakan Sekatan Perjalanan Imigresen (SSPI)',
    },
  },
  {
    icon: '/home/third_section/pendidikan.png',
    title: 'Pendidikan',
    lists: {
      1: 'Semakan Keputusan Peperiksaan',
    },
  },

  {
    icon: '/home/third_section/umum.png',
    title: 'Umum',
    lists: {
      1: 'Direktori Kementerian dan Agensi',
      2: 'MYSPR Semak',
      3: 'Portal Data Terbuka',
    },
  },
];

//========================== MOBILE SECTION =============================
export const leftItemsMobile: Items[] = [
  {
    icon: '/home/third_section/kelahiran.png',
    title: 'Kelahiran & Pengenalan Diri',
    lists: {
      1: 'Mykad',
    },
  },
  {
    icon: '/home/third_section/pendidikan.png',
    title: 'Pendidikan',
    lists: {
      1: 'Semakan Keputusan Peperiksaan',
    },
  },
  {
    icon: '/home/third_section/pengangkutan.png',
    title: 'Pengangkutan',
    lists: {
      1: 'Lesen Memandu',
      2: 'Lesen Kenderaan Motor',
      3: 'Semakan Saman JPJ',
      4: 'Semakan nombor pendaftaran terkini',
      5: 'Semakan Keputusan Ujian Memandu',
    },
  },
];

export const rightItemsMobile: Items[] = [
  {
    icon: '/home/third_section/bantuan.png',
    title: 'Bantuan & Kewangan',
    lists: {
      1: 'Sumbangan Tunai Rahmah (STR)',
    },
  },
  {
    icon: '/home/third_section/perjalanan.png',
    title: 'Perjalanan & Perlancongan',
    lists: {
      1: 'Passport',
      2: 'Semakan Sekatan Perjalanan Imigresen (SSPI)',
    },
  },
  {
    icon: '/home/third_section/kesihatan.png',
    title: 'Kesihatan & Kebajikan',
    lists: {
      1: 'Semakan Status OKU',
      2: 'Semakan Mangsa Bencana',
      3: 'Semakan Pusat PPS Aktif',
      4: 'Temujanji Klinik Kesihatan Kerajaan',
    },
  },
];
