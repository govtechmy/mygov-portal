# MyGOV Malaysia

A modern, multilingual government portal built with Next.js and PayloadCMS, designed to provide citizens with easy access to government services and information.

## 🚀 Features

- **Multilingual Support**: Available in Malay (ms-MY) and English (en-GB)
- **Content Management**: Powered by PayloadCMS for easy content management
- **Modern UI**: Built with MyDS React components and Tailwind CSS
- **Responsive Design**: Mobile-first approach with responsive layouts
- **SEO Optimized**: Built-in SEO features and meta tags
- **Type Safety**: Full TypeScript support
- **Search Functionality**: Integrated search capabilities
- **Blog System**: Built-in blog and news management
- **Contact Forms**: Validated contact forms with Zod
- **Media Management**: File upload and management system

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **CMS**: [PayloadCMS 3](https://payloadcms.com/)
- **Database**: MongoDB with Mongoose
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) + [MyDS Design System](https://myds.design/)
- **Language**: TypeScript
- **Forms**: React Hook Form + Zod validation
- **Storage**: Pluggable via [Storage Adapters](https://payloadcms.com/docs/upload/storage-adapters) (default: Vercel Blob)
- **Deployment**: Vercel
- **Package Manager**: pnpm

## 📋 Prerequisites

- Node.js 18+
- pnpm
- MongoDB instance
- Vercel account (for blob storage)

## 🚀 Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/govtechmy/mygov-portal.git
   cd mygov-portal
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:

   ```env
   # PayloadCMS
   PAYLOAD_SECRET=your-payload-secret-key
   DATABASE_URI=mongodb://localhost:27017/mygov-portal

   # Vercel Blob Storage
   BLOB_READ_WRITE_TOKEN=your-vercel-blob-token

   # FRESHDESK_API_URL
   FRESHDESK_API_URL=https://your-freshdesk-domain.freshdesk.com/
   ```

4. **Generate Payload types**

   ```bash
   pnpm generate:types
   ```

5. **Run the development server**

   ```bash
   pnpm dev
   ```

6. **Access the application**
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Admin Panel: [http://localhost:3000/admin](http://localhost:3000/admin)

## 📁 Project Structure

```
src/
├── app/
│   ├── (frontend)/          # Public-facing pages
│   │   └── [locale]/        # Internationalized routes
│   └── (payload)/           # CMS admin interface
├── collections/             # PayloadCMS collections
├── components/              # React components
│   ├── home/               # Homepage components
│   └── layout/             # Layout components
├── constants/              # Application constants
├── globals/                # Global PayloadCMS configurations
└── lib/                    # Utility functions
```

## 🌐 Internationalization

The portal supports two languages:

- **Malay (ms-MY)** - Default language
- **English (en-GB)**

Language files are located in the `messages/` directory. To add a new language:

1. Create a new JSON file in `messages/` (e.g., `zh-CN.json`)
2. Update the `Locale` type in `src/lib/i18n.ts`
3. Add the new locale to the `locales` array

## 📝 Content Management

### Collections

- **Blog**: News articles and blog posts
- **FAQ**: Frequently asked questions
- **Features**: Service features and highlights
- **Media**: File and image management
- **Users**: Admin user management

### Adding Content

1. Access the admin panel at `/admin`
2. Create an admin user account
3. Navigate to the desired collection
4. Add, edit, or delete content as needed

## 🎨 Styling

The project uses:

- **MyDS React**: Malaysian Government Design System components
- **Tailwind CSS**: Utility-first CSS framework
- **Custom CSS**: Additional styling in `globals.css`

## 🔧 Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm format` - Format code with Prettier
- `pnpm format:check` - Check code formatting
- `pnpm generate:types` - Generate PayloadCMS types

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your repository to Vercel
2. Set up environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment

1. Build the application:

   ```bash
   pnpm build
   ```

2. Start the production server:
   ```bash
   pnpm start
   ```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the terms specified by GovTech Malaysia.

## 🆘 Support

For support and questions:

- Open an issue on GitHub
- Contact the GovTech Malaysia team
- Check the [documentation](https://payloadcms.com/docs)

## 🙏 Acknowledgments

- [GovTech Malaysia](https://www.govtech.gov.my/) for the project initiative
- [MyDS Design System](https://myds.design/) for the UI components
- [PayloadCMS](https://payloadcms.com/) for the headless CMS
- [Next.js](https://nextjs.org/) for the React framework

---

Made with ❤️ by GovTech Malaysia
