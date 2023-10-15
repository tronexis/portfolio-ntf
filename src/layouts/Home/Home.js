import styles from './Home.module.css';

import sliceTextureLarge from 'assets/slice-app-large.jpg';
import sliceTexturePlaceholder from 'assets/slice-app-placeholder.jpg';
import sliceTexture from 'assets/slice-app.jpg';
import api4uiTexture from 'assets/api4ui.png';
import api4uiTextureLarge from 'assets/api4ui-large.png';
import api4uiTexturePlaceholder from 'assets/api4ui-placeholder.png';
import prompthelperTexture from 'assets/prompthelper.png';
import prompthelperTextureLarge from 'assets/prompthelper-large.png';
import prompthelperTexturePlaceholder from 'assets/prompthelper-placeholder.png';
import { Footer } from 'components/Footer';
import { Meta } from 'components/Meta';
import { Intro } from 'layouts/Home/Intro';
import { Profile } from 'layouts/Home/Profile';
import { ProjectSummary } from 'layouts/Home/ProjectSummary';
import { useEffect, useRef, useState } from 'react';

const disciplines = ['Developer', 'Designer'];

export const Home = () => {
  const [visibleSections, setVisibleSections] = useState([]); // State to track which sections are visible
  const [isScrollIndicatorHidden, setScrollIndicatorHidden] = useState(false); // State to track if scroll indicator should be hidden

  // Refs to each scrollable section
  const introRef = useRef();
  const projectOneRef = useRef();
  const projectTwoRef = useRef();
  const projectThreeRef = useRef();
  const detailsRef = useRef();

  useEffect(() => {
    const sections = [
      introRef,
      projectOneRef,
      projectTwoRef,
      projectThreeRef,
      detailsRef,
    ];

    // Observer to track section visibility
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

    indicatorObserver.observe(introRef.current);

    return () => {
      sectionObserver.disconnect();
      indicatorObserver.disconnect();
    };
  }, [visibleSections]);

  return (
    <div className={styles.home}>
      <Meta
        title="Muslim Developer + Designer"
        description="Design portfolio of Tanjil Ahmed — a front-end engineer working on web & mobile
          apps with a focus on motion, experience design, and accessibility."
      />
      <Intro
        id="intro"
        sectionRef={introRef}
        disciplines={disciplines}
        scrollIndicatorHidden={isScrollIndicatorHidden}
      />
      <ProjectSummary
        id="project-1"
        sectionRef={projectOneRef}
        visible={visibleSections.includes(projectOneRef.current)}
        index={1}
        title="API4UI.io"
        description="Design and development of frontend for a no-ui-code app builder for building business applications fast and easily built using Next.js"
        buttonText="View project"
        // buttonLink="/projects/smart-sparrow"
        buttonLink="https://api4ui.io"
        model={{
          type: 'laptop',
          alt: 'API4UI.io',
          textures: [
            {
              srcSet: [api4uiTexture, api4uiTextureLarge],
              placeholder: api4uiTexturePlaceholder,
            },
          ],
        }}
      />
      <ProjectSummary
        id="project-2"
        alternate
        sectionRef={projectTwoRef}
        visible={visibleSections.includes(projectTwoRef.current)}
        index={2}
        title="PromptHelper.io"
        description="Design and development of frontend for a ChatGPT prompt enhancer and analyzer built using Next.js"
        buttonText="View project"
        // buttonLink="/projects/smart-sparrow"
        buttonLink="https://www.prompthelper.io"
        model={{
          type: 'laptop',
          alt: 'PromptHelper.io',
          textures: [
            {
              srcSet: [prompthelperTexture, prompthelperTextureLarge],
              placeholder: prompthelperTexturePlaceholder,
            },
          ],
        }}
      />
      <ProjectSummary
        id="project-3"
        sectionRef={projectThreeRef}
        visible={visibleSections.includes(projectThreeRef.current)}
        index={3}
        title="Biomedical image collaboration"
        description="Increasing the amount of collaboration in Slice, an app for biomedical imaging"
        buttonText="View project"
        buttonLink="/projects/slice"
        model={{
          type: 'laptop',
          alt: 'Annotating a biomedical image in the Slice app',
          textures: [
            {
              srcSet: [sliceTexture, sliceTextureLarge],
              placeholder: sliceTexturePlaceholder,
            },
          ],
        }}
      />
      <Profile
        sectionRef={detailsRef}
        visible={visibleSections.includes(detailsRef.current)}
        id="details"
      />
      <Footer />
    </div>
  );
};
