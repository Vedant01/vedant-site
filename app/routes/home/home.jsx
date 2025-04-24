import gamestackTexture2Large from '~/assets/gamestack-list-large.jpg';
import gamestackTexture2Placeholder from '~/assets/gamestack-list-placeholder.jpg';
import gamestackTexture2 from '~/assets/gamestack-list.jpg';
import gamestackTextureLarge from '~/assets/gamestack-login-large.jpg';
import gamestackTexturePlaceholder from '~/assets/gamestack-login-placeholder.jpg';
import gamestackTexture from '~/assets/gamestack-login.jpg';
import sliceTextureLarge from '~/assets/slice-app-large.jpg';
import sliceTexturePlaceholder from '~/assets/slice-app-placeholder.jpg';
import sliceTexture from '~/assets/slice-app.jpg';
import sprTextureLarge from '~/assets/spr-lesson-builder-dark-large.jpg';
import sprTexturePlaceholder from '~/assets/spr-lesson-builder-dark-placeholder.jpg';
import sprTexture from '~/assets/spr-lesson-builder-dark.jpg';
import project1 from '~/assets/project_1.png';
import project1Large from '~/assets/project_1_large.png';
import project2Front from '~/assets/project_2_front.png';
import project2FrontLarge from '~/assets/project_2_front_large.png';
import project2Back from '~/assets/project_2_back.png';
import project2BackLarge from '~/assets/project_2_back_large.png';
import project3 from '~/assets/project_3.png';
import project3Large from '~/assets/project_3_large.png';
import { Footer } from '~/components/footer';
import { baseMeta } from '~/utils/meta';
import { Intro } from './intro';
import { Profile } from './profile';
import { ProjectSummary } from './project-summary';
import { useEffect, useRef, useState } from 'react';
import config from '~/config.json';
import styles from './home.module.css';

// Prefetch draco decoader wasm
export const links = () => {
  return [
    {
      rel: 'prefetch',
      href: '/draco/draco_wasm_wrapper.js',
      as: 'script',
      type: 'text/javascript',
      importance: 'low',
    },
    {
      rel: 'prefetch',
      href: '/draco/draco_decoder.wasm',
      as: 'fetch',
      type: 'application/wasm',
      importance: 'low',
    },
  ];
};

export const meta = () => {
  return baseMeta({
    title: 'Developer + Inventor',
    description: `Web portfolio of ${config.name} — Aspiring entrepreneur with expertise in AI and FinTech, building innovative projects and shaping the future of intelligent automation. `,
  });
};

export const Home = () => {
  const [visibleSections, setVisibleSections] = useState([]);
  const [scrollIndicatorHidden, setScrollIndicatorHidden] = useState(false);
  const intro = useRef();
  const projectOne = useRef();
  const projectTwo = useRef();
  const projectThree = useRef();
  const details = useRef();

  useEffect(() => {
    const sections = [intro, projectOne, projectTwo, projectThree, details];

    const sectionObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const section = entry.target;
            observer.unobserve(section);
            if (visibleSections.includes(section)) return;
            setVisibleSections(prevSections => [...prevSections, section]);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    );

    const indicatorObserver = new IntersectionObserver(
      ([entry]) => {
        setScrollIndicatorHidden(!entry.isIntersecting);
      },
      { rootMargin: '-100% 0px 0px 0px' }
    );

    sections.forEach(section => {
      sectionObserver.observe(section.current);
    });

    indicatorObserver.observe(intro.current);

    return () => {
      sectionObserver.disconnect();
      indicatorObserver.disconnect();
    };
  }, [visibleSections]);

  return (
    <div className={styles.home}>
      <Intro
        id="intro"
        sectionRef={intro}
        scrollIndicatorHidden={scrollIndicatorHidden}
      />
      <ProjectSummary
        id="project-1"
        sectionRef={projectOne}
        visible={visibleSections.includes(projectOne.current)}
        index={1}
        title="Cashcached"
        description="Building innovative fintech solutions businesses, focusing on AI-powered compliance, auditing and payments"
        buttonText="Visit Website"
        buttonLink="https://cashcached.com"
        model={{
          type: 'laptop',
          alt: 'Cashcached fintech platform',
          textures: [
            {
              srcSet: `${project1} 1280w, ${project1Large} 2560w`,
              placeholder: project1,
            },
          ],
        }}
      />
      <ProjectSummary
        id="project-2"
        alternate
        sectionRef={projectTwo}
        visible={visibleSections.includes(projectTwo.current)}
        index={2}
        title="Finova Manipal"
        description="Leading the university's premier fintech & investment cell, fostering innovation, research and strategic partnerships"
        buttonText="Learn More"
        buttonLink="https://finovamanipal.org"
        model={{
          type: 'phone',
          alt: 'Finova Manipal platform',
          textures: [
            {
              srcSet: `${project2Front} 375w, ${project2FrontLarge} 750w`,
              placeholder: project2Front,
            },
            {
              srcSet: `${project2Back} 375w, ${project2BackLarge} 750w`,
              placeholder: project2Back,
            },
          ],
        }}
      />
      <ProjectSummary
        id="project-3"
        sectionRef={projectThree}
        visible={visibleSections.includes(projectThree.current)}
        index={3}
        title="Portfolio & Projects"
        description="Explore my journey in fintech, AI, and business strategy through various projects and initiatives"
        buttonText="View Portfolio"
        buttonLink="/terminal"
        model={{
          type: 'laptop',
          alt: 'Portfolio showcase',
          textures: [
            {
              srcSet: `${project3} 800w, ${project3Large} 1920w`,
              placeholder: project3,
            },
          ],
        }}
      />
      <Profile
        sectionRef={details}
        visible={visibleSections.includes(details.current)}
        id="details"
      />
      <Footer />
    </div>
  );
};
