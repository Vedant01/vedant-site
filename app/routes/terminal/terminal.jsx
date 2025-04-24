import { useEffect, useRef, useState } from 'react';
import { Section } from '~/components/section';
import { Text } from '~/components/text';
import { tokens } from '~/components/theme-provider/theme';
import { baseMeta } from '~/utils/meta';
import styles from './terminal.module.css';
import config from '~/config.json';
import { Link } from '~/components/link';
import { Icon } from '~/components/icon';

export const meta = () => {
  return baseMeta({
    title: 'Portfolio',
    description: 'Interactive terminal-style portfolio showcasing my work and experience',
    hideNav: true,
  });
};

const commands = {
  help: () => `
Available commands:
help        - Show this help message
whoami      - Display personal introduction
projects    - List key projects
experience  - Show work history
orgs        - Display leadership & clubs
research    - Show publications & patents
skills      - Display technical stack
certs       - Show certifications
contact     - Display contact information
clear       - Clear the terminal
`,
  siri: () => `
Oh, hi siri
`,
  hello: () => {
    const greetings = [
      "Hello there! How can I help you today?",
      "Hey! Nice to see you here!",
      "Hi! Welcome to my terminal portfolio!",
      "Greetings! What would you like to know?",
      "Hey there! Ready to explore?",
      "Ahoy! Welcome aboard!",
      "Salutations! How may I assist?",
      "Yo! What's up?",
      "Howdy! Good to see you!",
      "Bonjour! Comment puis-je vous aider?",
    ];
    return greetings[Math.floor(Math.random() * greetings.length)];
  },
  bye: () => {
    const goodbyes = [
      "Goodbye! Come back soon!",
      "See you later!",
      "Take care!",
      "Farewell!",
      "Until next time!",
      "Adios!",
      "Ciao!",
      "Sayonara!",
      "Au revoir!",
      "Peace out!",
    ];
    return goodbyes[Math.floor(Math.random() * goodbyes.length)];
  },
  joke: () => {
    const jokes = [
      "Why don't programmers like nature? It has too many bugs.",
      "Why did the developer go broke? Because he used up all his cache.",
      "Why do programmers prefer dark mode? Because light attracts bugs.",
      "Why did the JavaScript developer go broke? Because he used up all his cache.",
      "Why did the computer go to the doctor? Because it had a virus!",
      "Why did the developer get stuck in the shower? Because the instructions said 'lather, rinse, repeat'.",
      "Why do programmers always mix up Christmas and Halloween? Because Oct 31 == Dec 25.",
      "Why did the programmer quit his job? Because he didn't get arrays.",
      "Why did the developer get fired? Because he couldn't C#.",
      "Why did the programmer go broke? Because he used up all his cache.",
    ];
    return jokes[Math.floor(Math.random() * jokes.length)];
  },
  quote: () => {
    const quotes = [
      "The best way to predict the future is to invent it. - Alan Kay",
      "Talk is cheap. Show me the code. - Linus Torvalds",
      "First, solve the problem. Then, write the code. - John Johnson",
      "Code is like humor. When you have to explain it, it's bad. - Cory House",
      "Programming isn't about what you know; it's about what you can figure out. - Chris Pine",
      "The only way to learn a new programming language is by writing programs in it. - Dennis Ritchie",
      "Sometimes it pays to stay in bed on Monday, rather than spending the rest of the week debugging Monday's code. - Dan Salomon",
      "Debugging is twice as hard as writing the code in the first place. - Brian Kernighan",
      "The most disastrous thing that you can ever learn is your first programming language. - Alan Kay",
      "The computer was born to solve problems that did not exist before. - Bill Gates",
    ];
    return quotes[Math.floor(Math.random() * quotes.length)];
  },
  weather: () => {
    const weathers = [
      "It's always sunny in the terminal! ☀️",
      "The weather is perfect for coding! 🌤️",
      "Warning: Heavy code showers expected! 🌧️",
      "Clear skies with a chance of bugs! 🌤️",
      "Partly cloudy with a possibility of stack overflow! ⛅",
      "High pressure system of productivity incoming! 🌤️",
      "Lightning-fast code execution today! ⚡",
      "Breezy conditions with occasional syntax errors! 🌬️",
      "The forecast calls for smooth compilation! 🌤️",
      "Storm warning: Debugging session ahead! ⚡",
    ];
    return weathers[Math.floor(Math.random() * weathers.length)];
  },
  time: () => {
    const times = [
      "It's always time to code!",
      "The current time is: " + new Date().toLocaleTimeString(),
      "Time flies when you're having fun coding!",
      "It's high time to write some code!",
      "The clock is ticking... better start coding!",
      "Time is an illusion. Coding time doubly so.",
      "It's 5 o'clock somewhere, but here it's always coding time!",
      "The only time that matters is compile time!",
      "Time to make the donuts... I mean, code!",
      "Time is relative, but bugs are absolute.",
    ];
    return times[Math.floor(Math.random() * times.length)];
  },
  whoami: () => `
Name: Vedant Agarwal
Title: Innovator
Location: Bengaluru,India
Education: B.Tech in Computer Science and Financial Technology at Manipal Institute of Technology
Current CGPA: Should'nt matter(It's good enough though)
Focus: Consulting, Business Strategy, Product Management, Fintech, and AI
Tagline: Entrepreneur | FinTech Innovator | AI Systems Designer | Business Strategist
Open to Remote Work or Relocation
`,
  projects: () => `
Key Projects:
1. AI Financial Market Agent
   - GenAI with LangGraph, Llama 3.1
   - Real-time insights on EBITDA, D/E ratio, revenue
   - 95% accuracy using yfinance, Graphviz, LangChain

2. GPT-2 From Scratch
   - Custom GPT-2 (~10M params) built using PyTorch
   - Used transformer blocks, vector dbs, custom tokenizer

3. Bank Due Diligence Automator
   - LLMs + LangChain + Vector stores
   - Automated project report analysis
   - 70% time saved on manual risk analysis

4. Fire Detection & Alert System
   - Multi-modal CV + IoT + Deep Learning
   - YOLOv8 + SIM800L + Python Kivy Mobile App
   - Reduced emergency response time by 40%

5. BizPal Fintech Dashboard
   - Built under Design Thinking Lab using SpringBoot, React, and MySQL
   - Streamlined B2B financial insights for SMEs
`,
  experience: () => `
Work Experience:
1. Founder & CEO at CashCached (Dec 2024 – Present)
   - AI-native fund management platform
   - Centralizes budgeting for agentic AI tools
   - Reduced enterprise fund waste by 70%
   - Built B2B finance API for AI teams and tools

2. Backend Intern – GoPerch (Jan 2024 – July 2024)
   - Built Python Flask apps for ad optimization
   - Integrated ML APIs to increase ad performance by 25%

3. Fellow – Headstarter.ai (2024)
   - Software Engineering Fellowship
`,
  orgs: () => `
Organizations:
1. Founder – Vora (Dec 2024 – Present)
   - AI Fund Distribution & Optimization Platform

2. President at Finova Manipal (Nov 2024 – Present)
   - Led 400+ members across DeFi, AI, cybersecurity, quant
   - Created 4 real-world fintech projects
   - Hosted a 2-day startup-centric hackathon with 200+ participants and 30k INR prize pool
   - Built and deployed Finova Coin (Solana-based crypto)
   - Facilitated 11+ research projects and 5 industry collabs

3. AI Researcher at RoboManipal (Aug 2023 – Present)
   - AI Object Detection for RoboCup Brazil 2025
   - World Robotics Championship, Top 20 in Robocon 2024
   - 3 research papers + 7 patents on AI + Blockchain-based auditing in robotics
`,
  research: () => `
Publications:
1. Blockchain-Enabled Auditing for Robotics and AI (Pre-Print)
2. Multi-Modal Fusion Techniques for Skin Diagnosis (Pre-print)
3. Garch-Informed Log-Periodicity in Crypto Microbubbles (Under Review)
4. Computer Vision + Forest Fire Mitigation Framework (Under Review)
5. Advances in Natural Language Human-Robot Interaction (Conference)
`,
  skills: () => `
Technical Skills:
Languages: Python, Java, C++, Solidity, SQL, TypeScript, HTML/CSS
Frameworks: Flask, SpringBoot, FastAPI, PyTorch, TensorFlow, LangChain, CrewAI
AI/ML: LangGraph, HuggingFace, OpenAI APIs, NLP, Deep Learning, Computer Vision
FinTech: Embedded Finance, Investment Banking, Risk Assessment, Capital Markets
Systems: Cloud (GCP/AWS), DBMS, OS, Networks, System Design
`,
  certs: () => `
Certifications:
1. Google Advanced Data Analytics Professional Certificate
2. Google Product Management Professional Certificate
3. DeepLearning.ai Generative AI Specialization
4. NYIF – Machine Learning for Trading
5. ISAC Certified Forensic Investigator
6. Java Fullstack Developer (Board Infinity)
`,
  contact: () => `
Contact Information:
Email: vedant.agarwal312@gmail.com
LinkedIn: linkedin.com/in/vedant-agarwal312
GitHub: github.com/vedant01
Portfolio: vedantagarwal.me
Startup: cashcached.com
Club: finovamanipal.org
`,
};

export const Terminal = () => {
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const terminalRef = useRef(null);
  const inputRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 480);
    };

    // Initial check
    checkMobile();

    // Add event listener for window resize
    window.addEventListener('resize', checkMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Display ASCII art and welcome message on initial load
    const mobileAscii = " __      __     \n \\ \\    / /\\    \n  \\ \\  / /  \\   \n   \\ \\/ / /\\ \\  \n    \\  / ____ \\ \n     \\/_/    \\_\\";
    const desktopAscii = config.ascii;
    
    setHistory([
      { type: 'output', content: isMobile ? mobileAscii : desktopAscii },
      { type: 'output', content: '\nWelcome to my interactive portfolio!\nType \'help\' to see available commands.\n' }
    ]);
    inputRef.current?.focus();
  }, [isMobile]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add command to history
    setHistory(prev => [...prev, { type: 'input', content: `> ${input}` }]);

    // Process command
    const command = input.toLowerCase().trim();
    let output = '';

    if (command === 'clear') {
      setHistory([]);
    } else if (command === 'sudo su') {
      output = 'Access Denied.';
    } else if (commands[command]) {
      output = commands[command]();
    } else {
      output = `Command not found: ${command}\nType 'help' to see available commands.`;
    }

    if (output) {
      setHistory(prev => [...prev, { type: 'output', content: output }]);
    }

    setInput('');
  };

  return (
    <div className={styles.page}>
      <Link href="/" className={styles.backButton}>
        <Icon icon="arrow-left" />
        Back to Home
      </Link>
      <Section className={styles.terminal}>
        <div className={styles.container} ref={terminalRef}>
          {history.map((item, index) => (
            <div key={index} className={styles[item.type]}>
              <Text size="m" as="pre" className={styles.text}>
                {item.content}
              </Text>
            </div>
          ))}
          <form onSubmit={handleSubmit} className={styles.inputContainer}>
            <span className={styles.prompt}>{'>'}</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className={styles.input}
              autoComplete="off"
              spellCheck="false"
            />
          </form>
        </div>
      </Section>
    </div>
  );
}; 