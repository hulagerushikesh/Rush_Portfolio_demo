# Rushikesh Hulage - Portfolio Website

A modern, responsive portfolio website built with Next.js 15, TypeScript, and Tailwind CSS. Showcasing professional experience in AI/ML, backend development, and cloud architecture.

## 🚀 Features

- **Modern Design**: Clean, professional design with dark/light mode support
- **Responsive**: Fully responsive across all devices
- **Performance**: Optimized for speed and SEO
- **Interactive**: Smooth animations with Framer Motion
- **Accessible**: Built with accessibility best practices

## 📱 Pages

- **Home**: Hero section with introduction and featured projects
- **About**: Professional background, experience, and skills
- **Projects**: Portfolio showcase with filtering and detailed views
- **Blog**: Technical articles and insights (ready for content)
- **Resume**: Professional resume with download functionality
- **Contact**: Contact form and social links

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Deployment**: Vercel (recommended)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd rush-portfolio
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── about/             # About page
│   ├── blog/              # Blog section
│   ├── contact/           # Contact page
│   ├── projects/          # Projects showcase
│   ├── resume/            # Resume page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # Reusable components
│   ├── Footer.tsx         # Site footer
│   ├── Navbar.tsx         # Navigation bar
│   └── ThemeProvider.tsx  # Dark/light mode provider
└── lib/                   # Utility functions
    └── utils.ts           # Common utilities
```

## 🎨 Customization

### Personal Information

Update the following files with your information:

- `src/app/layout.tsx` - Meta tags and site title
- `src/app/page.tsx` - Hero section content
- `src/app/about/page.tsx` - Personal information and experience
- `src/app/resume/page.tsx` - Resume content
- `src/app/contact/page.tsx` - Contact information

### Styling

- Modify `tailwind.config.js` for theme customization
- Update `src/app/globals.css` for global styles
- Component-specific styles are in individual component files

### Content

- Add your projects to `src/app/projects/page.tsx`
- Create blog posts in `src/app/blog/`
- Update social links throughout the site

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with zero configuration

### Other Platforms

The site can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 📧 Contact

Rushikesh Hulage - [hulagerushikesh@gmail.com](mailto:hulagerushikesh@gmail.com)

Project Link: [https://github.com/rushikeshhulage/portfolio](https://github.com/rushikeshhulage/portfolio)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS
- [Framer Motion](https://www.framer.com/motion/) for smooth animations
- [Lucide](https://lucide.dev/) for beautiful icons
