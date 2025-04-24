<p align="center">
  <img src="/public/favicon.svg" width="50" alt="Logo" />
</p>
<h1 align="center">Vedant's Portfolio</h1>

[![Site preview](/public/site-preview.png)](https://vedant01.github.io/portfolio_website)

A modern portfolio website showcasing my work in fintech, AI, and business strategy. Built with [Remix](https://remix.run/), [Three.js](https://threejs.org/), and [Framer Motion](https://www.framer.com/motion/).

## 🚀 Features

- **Modern Tech Stack**: Built with Remix, Three.js, and Framer Motion
- **Responsive Design**: Optimized for all devices
- **Interactive UI**: Smooth animations and transitions
- **Project Showcase**: Highlighting key projects in fintech and AI
- **Terminal Interface**: Unique terminal-style navigation
- **AI Integration**: Built with assistance from AI tools like Cursor, ChatGPT, and Perplexity

## 🛠️ Tech Stack

- **Frontend**: React, Remix, Three.js, Framer Motion
- **Styling**: CSS Modules, PostCSS
- **Deployment**: Cloudflare Pages
- **Development**: VS Code, Git, Figma
- **AI Tools**: Cursor, ChatGPT, Perplexity, Krea

## 📦 Installation & Setup

Make sure you have Node.js `19.9.0` or higher and npm `9.6.3` or higher installed.

1. Clone the repository:
```bash
git clone https://github.com/Vedant01/portfolio_website.git
cd portfolio_website
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. View the components storybook:
```bash
npm run dev:storybook
```

## 🚀 Deployment

The site is deployed using Cloudflare Pages. To deploy:

```bash
npm run deploy
```

## 📝 License

This project is open source and available under the MIT License. Feel free to use the code as a reference or starting point for your own portfolio. However, please:

- Modify the design and components to make it your own
- Don't present my projects as your own
- Consider crediting the original design if you use it largely unmodified

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## 📞 Contact

- **Website**: [vedant01.github.io/portfolio_website](https://vedant01.github.io/portfolio_website)
- **LinkedIn**: [Your LinkedIn Profile]
- **GitHub**: [github.com/Vedant01](https://github.com/Vedant01)

## 🙏 Acknowledgments

- Original design inspiration from [Hamish Williams](https://hamishw.com)
- AI tools that helped in development: Cursor, ChatGPT, Perplexity, Krea
- Open source community for their amazing tools and libraries

## FAQs

<details>
  <summary>How do I change the color on the <code>DisplacementSphere</code> (blobby rotating thing in the background).</summary>
  
  You'll need to edit the fragment shader. [Check out this issue for more details](https://github.com/HamishMW/portfolio/issues/19#issuecomment-870996615).
</details>

<details>
  <summary>How do I get the contact form to work?</summary>
  
  To get the contact form working create an AWS account and set up SES (Simple Email service). Then plug in your details into `.dev.vars.example` and rename it to `.dev.vars`. You'll also need to add these as enviroment variables in the Cloudflare dashboard for it to work in production. Or if you don't mind sending through gmail use [nodemailer](https://nodemailer.com/) instead.
</details>
