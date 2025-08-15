interface Feature {
  image: string;
  title: string;
  open: string;
  desc: string;
  support?: string; // optional
}

export const features: Feature[] = [
  {
    image: '/home/fourth_section/1.png',
    title: 'Pengalaman Mesra Pengguna',
    open: '/home/fourth_section/pengalaman_mesra.png',
    desc: 'Samada anda menggunakan MyGOV Malaysia untuk melakukan semakan atau permohonan, MyGOV Malaysia menawarkan pengalaman interaksi yang intuitif dengan antaramuka yang kemas dan intuitif.',
  },
  {
    image: '/home/fourth_section/2.png',
    title: 'Akaun Berasaskan',
    support: '/mydigitalid.png',
    open: '/home/fourth_section/mygov_mobile.png',
    desc: 'Untuk menggunakan MyGOV Malaysia, anda hanya perlu menggunakan MyDigital ID iaitu sistem pengenalan diri rakyat Malaysia yang sah dan selamat untuk kegunaan dalam talian.',
  },
  {
    image: '/home/fourth_section/3.png',
    title: 'Daripada lesen ke peperiksaan, semak semuanya di sini',
    open: '/home/fourth_section/lesen.png',
    desc: 'MyGOV Malaysia dapat menghantar notifikasi penting khusus untuk individu seperti amaran bencana yang dihantar terus kepada anda.',
  },
  {
    image: '/home/fourth_section/4.png',
    title: 'Terima notifikasi yang relevan dengan anda',
    open: '/home/fourth_section/notifikasi.png',
    desc: 'MyGOV Malaysia dapat menghantar notifikasi penting khusus untuk individu seperti amaran bencana yang dihantar terus kepada anda.',
  },
  {
    image: '/home/fourth_section/4.png',
    title: '... dan pelbagai fungsi akan datang',
    open: '/home/fourth_section/features_lain.png',
    desc: 'MyGOV Malaysia sedang giat membangunkan pelbagai fungsi baharu yang akan dilancarkan pada masa hadapan, seperti permohonan dan pembayaran.',
  },
];
