import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import s from './Skills.module.scss';

// --- Interface with Translation Keys ---
interface Skill {
  id: string;
  nameKey: string; // Key for translation
  level: number;
  category: 'frontend' | 'frameworks' | 'tools';
  descriptionKey: string; // Key for translation
  color: string;
}

const Skills = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [terminalActive, setTerminalActive] = useState(false);
  const [activeSkill, setActiveSkill] = useState<string | null>(null);
  // --- Initial Terminal Lines with Keys ---
  const [terminalLines, setTerminalLines] = useState<string[]>([t('terminal.initializing')]); // Example key

  // --- Skills Array with Translation Keys ---
  // !!! IMPORTANT: Replace these keys with your actual translation keys !!!
  const skills: Skill[] = [
    {
      id: 'react',
      nameKey: 'skills.react.name',
      level: 90, // Adjust
      category: 'frontend',
      descriptionKey: 'skills.react.description',
      color: '#61DAFB' // React Blue
    },
    {
      id: 'wordpress',
      nameKey: 'skills.wordpress.name',
      level: 95, // Adjust
      category: 'tools',
      descriptionKey: 'skills.wordpress.description',
      color: '#21759B' // WordPress Blue
    },
    {
      id: 'elementor',
      nameKey: 'skills.elementor.name',
      level: 92, // Adjust
      category: 'tools', // It's a tool within WordPress ecosystem
      descriptionKey: 'skills.elementor.description',
      color: '#92003B' // Elementor Pink/Magenta
    },
    {
      id: 'scss',
      nameKey: 'skills.scss.name',
      level: 96, // Adjust
      category: 'frontend',
      descriptionKey: 'skills.scss.description',
      color: '#CD669A' // Sass Pink
    },
    {
      id: 'javascript',
      nameKey: 'skills.javascript.name',
      level: 94, // Adjust
      category: 'frontend',
      descriptionKey: 'skills.javascript.description',
      color: '#F0DB4F' // JS Yellow (often with dark text)
    },
    {
      id: 'tailwind',
      nameKey: 'skills.tailwind.name',
      level: 85, // Adjust
      category: 'frontend', // Primarily a CSS framework for frontend
      descriptionKey: 'skills.tailwind.description',
      color: '#06B6D4' // Tailwind Cyan
    },
    {
      id: 'php',
      nameKey: 'skills.php.name',
      level: 80, // Adjust
      category: 'tools', // Primarily used for backend, esp. with WP
      descriptionKey: 'skills.php.description',
      color: '#777BB4' // PHP Purple
    },
    {
      id: 'nextjs',
      nameKey: 'skills.nextjs.name',
      level: 88, // Adjust
      category: 'frameworks', // React Framework
      descriptionKey: 'skills.nextjs.description',
      color: '#ff6971' // Next.js Black (or use a distinct gray like #888888)
    },
    {
      id: 'axios',
      nameKey: 'skills.axios.name',
      level: 87, // Adjust
      category: 'tools', // Data fetching library/tool
      descriptionKey: 'skills.axios.description',
      color: '#5A29E4' // Axios Purple-ish
    },
    {
      id: 'woocommerce',
      nameKey: 'skills.woocommerce.name',
      level: 89, // Adjust
      category: 'tools', // WordPress eCommerce plugin
      descriptionKey: 'skills.woocommerce.description',
      color: '#96588A' // WooCommerce Purple
    },
    {
      id: 'gsap',
      nameKey: 'skills.gsap.name',
      level: 84, // Adjust
      category: 'tools', // Animation library/tool
      descriptionKey: 'skills.gsap.description',
      color: '#88CE02' // GreenSock Green
    }
  ];

  // --- Function to get Category Translation Key ---
  const getCategoryKey = (category: Skill['category']): string => {
    switch (category) {
      case 'frontend': return 'skills.category.frontend'; // Example key
      case 'frameworks': return 'skills.category.frameworks';
      case 'tools': return 'skills.category.tools';
      default: return `skills.category.${category}`; // Fallback key
    }
  };

  const writeToTerminal = (skillId: string) => {
    const skill = skills.find(s => s.id === skillId);
    if (!skill) return;

    // Translate needed strings *before* using them
    const translatedName = t(skill.nameKey);
    const translatedCategory = t(getCategoryKey(skill.category));
    const translatedDescription = t(skill.descriptionKey);

    if (activeSkill !== skillId) {
      setTerminalLines([`> ${t('terminal.scanning')}`]); // Use key

      setTimeout(() => {
        setTerminalLines(prev => [
          ...prev,
          `> ${t('terminal.skillLabel')}: ${translatedName}`, // Use key and translated value
          `> ${t('terminal.categoryLabel')}: ${translatedCategory}`, // Use key and translated value
          `> ${t('terminal.levelLabel')}: ${skill.level}%`, // Use key
          `> ${t('terminal.descriptionLabel')}:` // Use key
        ]);

        // Typewriter effect with the translated description
        const words = translatedDescription.split(' ');
        let lineIndex = 0;
        let currentLine = '> ';

        words.forEach((word, i) => {
          setTimeout(() => {
            currentLine += word + ' ';
            setTerminalLines(prev => {
              const newLines = [...prev];
              const descriptionLineIndex = 5 + lineIndex; // Base index for description lines
              // Add or update the line
              if (newLines.length <= descriptionLineIndex) {
                newLines.push(currentLine.trimEnd());
              } else {
                newLines[descriptionLineIndex] = currentLine.trimEnd();
              }
              return newLines;
            });

            // Simple logic to wrap lines (adjust '8' as needed for desired width)
            if ((i + 1) % 8 === 0 && i < words.length - 1) {
              lineIndex++;
              currentLine = '> ';
            }
          }, (i + 1) * 50); // Adjust speed if needed
        });
      }, 600);
    }
  };


  const activateTerminal = () => {
    if (!terminalActive) {
      setTerminalActive(true);
      // --- Initial Terminal Messages with Keys ---
      const initialMessageKeys = [
        'terminal.initialized',
        'terminal.loadingDb',
        'terminal.connectedMatrix',
        'terminal.ready',
        'terminal.selectSkill'
      ];

      initialMessageKeys.forEach((key, i) => {
        setTimeout(() => {
          // Translate each message using its key
          setTerminalLines(prev => [...prev, `> ${t(key)}`]);
          if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
          }
        }, 500 + i * 300); // Stagger the messages
      });
    }
  };

  const handleSkillClick = (skillId: string) => {
    setActiveSkill(skillId);
    writeToTerminal(skillId);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setTimeout(() => {
            activateTerminal();
          }, 500); // Delay activation after becoming visible
          observer.disconnect(); // Observe only once
        }
      },
      { threshold: 0.3 } // Trigger when 30% visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []); // Empty dependency array means this runs once on mount

  // Scroll terminal down when new lines are added
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [terminalLines]);

  return (
    <section ref={sectionRef} className={`${s.skills} ${isVisible ? s.visible : ''}`} id="skills">
      <div className={s.container}>
        {/* --- Use Translation Key for Title --- */}
        <h2 className={s.title}>{t('skills.sectionTitle')}</h2>

        <div className={s.skillsLayout}>
          <div className={`${s.terminal} ${terminalActive ? s.active : ''}`}>
            <div className={s.terminalHeader}>
              <div className={s.terminalControls}>
                <span className={s.controlDot}></span>
                <span className={s.controlDot}></span>
                <span className={s.controlDot}></span>
              </div>
              {/* --- Use Translation Key for Terminal Title --- */}
              <div className={s.terminalTitle}>{t('terminal.windowTitle')}</div>
            </div>
            <div ref={terminalRef} className={s.terminalBody}>
              {terminalLines.map((line, index) => (
                // Render lines directly as they are already formatted with keys translated
                <div key={index} className={s.terminalLine}>
                  <span>{line}</span>
                </div>
              ))}
              {/* Conditionally render cursor if terminal is active */}
              {terminalActive && <div className={s.cursor}></div>}
            </div>
          </div>

          <div className={s.skillsGrid}>
            {skills.map((skill) => (
              <div
                key={skill.id}
                className={`${s.skillCard} ${activeSkill === skill.id ? s.active : ''}`}
                style={{
                  '--skill-color': skill.color,
                  '--skill-level': `${skill.level}%`
                } as React.CSSProperties}
                onClick={() => handleSkillClick(skill.id)}
              >
                {/* --- Translate Skill Name --- */}
                <div className={s.skillName}>{t(skill.nameKey)}</div>
                <div className={s.skillLevel}>
                  <div className={s.skillBar}>
                    <div className={s.skillBarFill}></div>
                  </div>
                  <span>{skill.level}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Floating elements remain unchanged as they are decorative */}
        <div className={s.floatingElements}>
           {['<div>', '</>', 'const', '{...}', '()', '=>', '[]', 'import', '</>'].map((element, i) => (
            <div
              key={`el-${i}`}
              className={s.floatingElement}
              style={{
                '--delay': `${i * 2}s`,
                '--size': `${Math.floor(Math.random() * 30) + 20}px`
              } as React.CSSProperties}
            >
              {element}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;