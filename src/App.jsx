import { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
import "./App.css";

const markdownComponents = {
  p: ({ children }) => <p className="mb-2 leading-relaxed">{children}</p>,
  strong: ({ children }) => <span className="font-bold text-green-300">{children}</span>,
  em: ({ children }) => <span className="italic text-green-300">{children}</span>,
  a: ({ children, href }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-cyan-400 hover:text-cyan-300 underline transition-colors"
    >
      {children}
    </a>
  ),
  ul: ({ children }) => <ul className="mb-2 space-y-1">{children}</ul>,
  ol: ({ children }) => <ol className="mb-2 space-y-1">{children}</ol>,
  li: ({ children }) => <li className="ml-6 list-disc leading-relaxed">{children}</li>,
  h1: ({ children }) => <h1 className="text-lg font-bold mb-2 text-green-300">{children}</h1>,
  h2: ({ children }) => <h2 className="text-base font-bold mb-2 text-green-300">{children}</h2>,
  code: ({ children }) => (
    <code className="bg-gray-900 px-2 py-1 rounded text-cyan-300 text-sm font-mono">{children}</code>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-2 border-green-400 pl-3 italic text-gray-400 my-2">
      {children}
    </blockquote>
  )
}

const command = [
  "help",
  "about",
  "skills",
  "projects",
  "experience",
  "contact",
  "clear"
]

const commandAnswers = {
  help: `**💡 Help Command**

Use this command to see all available commands and their descriptions.

**Available commands:**
- \`about\` — Know more about me
- \`skills\` — See my technical skills
- \`projects\` — View the projects I have worked on
- \`experience\` — Check my professional experience
- \`contact\` — Get my contact information
- \`clear\` — Clear the terminal`,

  about: `**👋 About Me**

Hi, I'm **Rahul Kumar**, a pre-final year *Engineering student at IIT Jodhpur* majoring in *Chemistry*.

I am a **passionate software developer**, continuously contributing through **projects and hands-on development**. I enjoy building solutions that blend creativity with technology, and I am always eager to learn and grow in software development.`,

  skills: `**💻 Skills**

**Frontend:** React, TypeScript, TailwindCSS, Framer Motion  
**Backend:** Node.js, Express, Django  
**Databases:** MongoDB, PostgreSQL  
**Languages:** JavaScript, C++, Python  
**Tools:** Git, GitHub, Docker`,

  projects: `
**🚀 Projects**

1. **[Prometeo'25](https://prometeo.in)** — A full-fledged website developed with **React** (frontend) and **Django** (backend) for *IIT Jodhpur's annual tech fest*.  
   - Worked as part of the frontend team  
   - Website received impressive response and served as central platform

2. **[URBAN LUXE](https://ecommerce-lilac-eight-92.vercel.app/)** — A **MERN stack** e-commerce platform  
   - Product listing, cart, checkout, and authentication

3. **[Kathayan'25](https://kathayan.in/)** — Official website for *IIT Jodhpur's annual literature fest*  
   - Contributed as **frontend developer**  
   - Handled entire frontend design and implementation

4. **[HackSprint](https://hack-sprint-iitj.vercel.app/)** — Centralized web platform to host hackathons, daily dev and aptitude challenges, and public project submissions for hands-on learning and technical growth.  
   - Developed as a part of SOC of **DevLup Lab, IIT Jodhpur**

5. **DRDO IITJ Website** — Developed a web platform for **ML-based classification and detection** for defense applications.  
   - Handled frontend development and integration of ML modules
`,

  experience: `
**🏢 Experience**

- **Full-Stack Engineer** — Marketing Service Company MUFTLO  
  - Working for the past 3 months on various websites and cloud services  
  - Contributing as a junior developer handling full-stack development tasks

- **Core Member** — DevLup Lab, IIT Jodhpur  
  - Core member of IITJ’s open-source enthusiast club  
  - Contributing to projects promoting open-source development and technical learning

- **Assistant Head, Web Dev Team** — IIT Jodhpur Tech & Literature Fest  
  - Worked on frontend development for two major fest websites  
  - Coordinated with the web team, ensured great team work.
`,

  contact: `**📧 Contact**

- **Email:** b23cy1017@iitj.ac.in
- **GitHub:** [github.com/rahul-1901](https://github.com/rahulkumar1901)  
- **LinkedIn:** [linkedin.com/in/rahul-kumar-52898928a](https://www.linkedin.com/in/rahul-kumar-52898928a)`
}

export default function App() {
  const [commandInput, setCommandInput] = useState("")
  const [commandOutput, setCommandOutput] = useState([])
  const [typingIndex, setTypingIndex] = useState(null)
  const [typedText, setTypedText] = useState("")
  const [time, setTime] = useState(new Date())
  const outputRef = useRef(null)

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const welcomeOutput = `**💻 Welcome to Rahul Kumar's Terminal Portfolio**

Type \`help\` to see all available commands.`;
    setCommandOutput([{ command: "welcome", output: welcomeOutput }]);
    setTypingIndex(0);
  }, []);

  const handleCommand = (command) => {
    const userCommand = command.trim().toLowerCase();

    if (userCommand === "clear") {
      setCommandOutput([]);
      setTypingIndex(null);
      setTypedText("");
    } else if (userCommand === "") {
      return;
    } else {
      const output =
        commandAnswers[userCommand] ||
        `❌ Command not found: ${userCommand}. Type \`help\` for available commands.`;
      const newOutput = [...commandOutput, { command: userCommand, output }];
      setCommandOutput(newOutput);
      setTypingIndex(newOutput.length - 1);
      setTypedText("");
    }

    setCommandInput("");
  };

  useEffect(() => {
    if (typingIndex === null) return;
    const currentText = commandOutput[typingIndex]?.output || "";
    let index = 0;
    const interval = setInterval(() => {
      if (index < currentText.length) {
        setTypedText((prev) => prev + currentText[index]);
        index++;
      } else {
        clearInterval(interval);
        setTypingIndex(null);
      }
    }, 15);
    return () => clearInterval(interval);
  }, [typingIndex, commandOutput]);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [commandOutput, typedText])

  const formatTime = (date) =>
    date.toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      hour12: true,
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleCommand(commandInput)
    }
  }

  return (
    <div className="bg-black text-green-400 font-mono flex flex-col h-screen w-screen overflow-hidden">
      <div className="flex flex-col px-4 py-3 border-b border-green-400 bg-black shrink-0">
        <p className="text-green-400 text-lg font-bold">Rahul Kumar</p>
        <p className="text-gray-500 text-xs">Software Developer | Full Stack Developer</p>
      </div>

      <div className="flex flex-1 w-full overflow-hidden flex-col md:flex-row">
        <div className="flex md:w-[35%] items-center justify-center border-b md:border-b-0 md:border-r border-green-400 p-10 md:p-4 bg-black/60">
          <div
            className="relative w-[250px] sm:w-[280px] md:w-[260px] rounded-2xl p-[2px] 
               bg-gradient-to-br from-green-500 via-green-700 to-green-500 
               shadow-[0_0_25px_rgba(34,197,94,0.5)] 
               transition-all duration-300"
          >
            <div className="bg-black rounded-2xl p-5 text-center">
              <div
                className="w-24 h-24 mx-auto rounded-full overflow-hidden 
                   border-2 border-green-500
                   hover:scale-105 transition-transform duration-300"
              >
                <img
                  src="https://avatars.githubusercontent.com/u/147478589?v=4"
                  alt="Rahul Kumar"
                  className="w-full h-full object-cover"
                />
              </div>

              <h2 className="mt-3 text-green-400 text-xl font-semibold tracking-wide">
                Rahul Kumar
              </h2>
              <p className="text-gray-400 text-sm font-light">Full Stack Developer</p>

              <div className="flex justify-center mt-4 space-x-6 text-gray-400 text-xs">
                <div className="flex flex-col items-center">
                  <a
                    href="https://github.com/rahul-1901"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaGithub className="text-green-400 text-lg" />
                  </a>
                  <p className="text-gray-400 font-bold mt-1">GitHub</p>
                </div>

                <div className="flex flex-col items-center">
                  <a
                    href="https://www.linkedin.com/in/rahul-kumar-52898928a"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaLinkedin className="text-green-400 text-lg" />
                  </a>
                  <p className="text-gray-400 font-bold mt-1">LinkedIn</p>
                </div>

                <div className="flex flex-col items-center">
                  <a
                    href="https://www.instagram.com/rahulyadav_1916?igsh=M3lieHg3azN0b3Nj"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaInstagram className="text-green-400 text-lg" />
                  </a>
                  <p className="text-gray-400 font-bold mt-1">Instagram</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col overflow-hidden md:w-[65%]">
          <div className="flex flex-wrap items-center gap-2 border-b border-green-400 px-3 py-2 bg-black shrink-0 overflow-x-auto">
            {command.map((cmd, index) => (
              <div key={index} className="flex items-center gap-2 whitespace-nowrap">
                <p className="text-green-400 text-xs hover:text-cyan-400 cursor-pointer transition-colors">
                  {cmd}
                </p>
                {index < command.length - 1 && <div className="h-3 w-px bg-green-400/50"></div>}
              </div>
            ))}
          </div>

          <div
            ref={outputRef}
            className="flex-1 overflow-y-auto px-4 py-3 space-y-3 scrollbar-thin scrollbar-thumb-green-400/30 scrollbar-track-black"
          >
            {commandOutput.map((item, index) => (
              <div key={index} className="space-y-1">
                <p className="text-xs sm:text-sm">
                  <span className="text-cyan-400">rahul-1901@portfolio</span>
                  <span className="text-green-400">:~$</span>
                  <span className="ml-2 text-green-400">{item.command}</span>
                </p>
                <div className="ml-4 text-white text-xs sm:text-sm leading-relaxed">
                  {typingIndex === index ? (
                    <ReactMarkdown components={markdownComponents}>{typedText}</ReactMarkdown>
                  ) : (
                    <ReactMarkdown components={markdownComponents}>{item.output}</ReactMarkdown>
                  )}
                </div>
              </div>
            ))}

            {/* Input Field */}
            <div className="flex items-center gap-2 pt-2 pb-1">
              <span className="text-cyan-400 text-xs sm:text-sm whitespace-nowrap">rahul-1901@portfolio:~$</span>
              <input
                type="text"
                value={commandInput}
                onChange={(e) => setCommandInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a command..."
                className="flex-1 bg-black border-none outline-none text-green-400 text-xs sm:text-sm placeholder-gray-600 caret-green-400"
                autoFocus
                autoComplete="off"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center px-4 py-2 border-t border-green-400 bg-black shrink-0 text-xs">
        <span className="text-green-400">rahul-1901@portfolio:~$</span>
        <span className="text-green-400">{formatTime(time)}</span>
      </div>
    </div>
  )
}
