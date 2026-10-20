(() => {
  const languageButton = document.querySelector('.lang-toggle');
  const themeButton = document.querySelector('.theme-toggle');
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
  const navLinks = Array.from(document.querySelectorAll('.site-nav a'));

  const english = {
    pageTitle: 'Yang Li | Reliable Computer Vision',
    metaDescription: 'Yang Li is a computer vision algorithm engineer focused on OOD Detection, Failure Prediction, and reliable visual systems.',
    backToTop: 'Back to top', navigationLabel: 'Primary navigation', brandName: 'Yang Li',
    navFocus: 'Focus', navExperience: 'Experience', navResearch: 'Research',
    skipContent: 'Skip to content', heroRole: 'Computer vision research & engineering', heroNameLatin: 'Computer Vision',
    heroStatement: 'Building vision systems you can trust.', heroAffiliation: 'Senior Algorithm Engineer',
    heroSummary: 'I research OOD Detection and Failure Prediction, while building production systems for classification, Re-ID, detection, and segmentation.',
    viewResearch: 'View research', avatarAlt: 'Portrait of Yang Li', portraitCaption: 'B.E. & M.E., Wuhan University',
    exploreResearch: 'Explore the research', sureAlt: 'SUREPlus: classification and reliability comparison of CE and CutMix', edgeAlt: 'EdgeCrafter task-specialized distillation pipeline', coFirstAuthor: 'Co-first author',
    proofLabel: 'Career highlights', proofAward: 'OOD-CV Open-set Recognition champion', proofPatents: 'invention patents in substantive examination', proofPapers: 'papers on reliability and edge vision', proofIndustry: 'building production vision systems',
    focusTitle: 'Research & engineering', focusLead: 'Recognizing unknowns and errors, and building vision systems that work in practice.',
    focusReliabilityTitle: 'Model reliability', focusReliabilityBody: 'Treat misclassification, out-of-distribution inputs, and open-set samples as connected risks, so confidence reflects what can actually go wrong.',
    focusDeliveryTitle: 'Vision deployment', focusDeliveryBody: 'Build classification, face, Re-ID, detection, and segmentation systems across the full path from data to deployment.',
    focusToolingTitle: 'Data and tooling', focusToolingBody: 'Develop training frameworks and automated annotation platforms that shorten feedback and iteration loops.',
    experienceTitle: 'Experience & education', jntDate: 'Jun 2026 - Present', jntCompany: 'J&T Express', jntTitle: 'Senior Algorithm Engineer', jobDate: 'Jul 2023 - Jun 2026', jobCompany: 'Hefei Intellindust Information Technology Co., Ltd.', jobTitle: 'Computer Vision Algorithm Engineer',
    jobSummary: 'Develop and deploy algorithms for AI security scenarios, leading or contributing to face recognition, classification reliability, Metric Learning, detection, segmentation, and automated annotation tooling.',
    jobItemOne: 'Built a classification and reliability training framework from scratch for fall, occlusion, smoke and fire, and human-structure tasks.',
    jobItemTwo: 'Led a Fast-ReID training, evaluation, and deployment pipeline, improving losses, feature alignment, and retrieval post-processing.',
    jobItemThree: 'Improved stability in complex sites through data cleaning, false-positive mining, sample reconstruction, and post-processing.',
    educationSchool: 'Wuhan University', educationTitle: 'B.E. / M.E. in Surveying and Mapping Engineering', educationSummary: 'Extended a mapping background into visual perception, 3D reconstruction, and deep learning research, forming an engineering practice for industrial vision.',
    researchTitle: 'Selected research', researchLead: 'Work that best represents my current direction across classification reliability, edge vision, and 3D reconstruction.', underReview: 'Under review',
    sureBody: 'A unified risk framework for misclassification and out-of-distribution detection, estimating both whether a prediction may be wrong and whether an input departs from known data.',
    zigzagBody: 'A prompted zigzag mechanism that reorganizes feature interaction paths to better separate normal samples, wrong predictions, and abnormal inputs.',
    edgeBody: 'A family of edge vision models that systematically balances compute, model capacity, and task performance.', projectPage: 'Project page', accepted: 'Accepted', published: 'Published', firstAuthor: 'First author',
    mappingTitle: 'Automated 3D Building Reconstruction from a Single Satellite Image', mappingBody: 'An automated pipeline spanning building extraction, structural inference, and geometric representation from a single satellite image.',
    closingTitle: 'Code & projects', closingBody: 'Explore my open-set recognition challenge solution and more open-source work.', challengeLink: 'ECCV 2024 open-set recognition solution', githubLink: 'Browse all public repositories', footerNote: 'Reliability research / production vision'
  };

  const chinese = {};
  document.querySelectorAll('[data-i18n]').forEach((element) => { chinese[element.dataset.i18n] = element.innerHTML; });
  document.querySelectorAll('[data-i18n-attr]').forEach((element) => {
    element.dataset.i18nAttr.split(';').forEach((binding) => {
      const [attribute, key] = binding.split(':').map((item) => item.trim());
      chinese[key] = element.getAttribute(attribute);
    });
  });

  // Storage can be unavailable in private or restricted browsing contexts.
  function readPreference(key) {
    try { return localStorage.getItem(key); } catch { return null; }
  }
  function savePreference(key, value) {
    try { localStorage.setItem(key, value); } catch { /* Keep controls usable for this visit. */ }
  }

  function updateThemeButton() {
    const dark = document.documentElement.dataset.theme === 'dark' ||
      (!document.documentElement.dataset.theme && systemTheme.matches);
    const en = document.documentElement.lang === 'en';
    themeButton.setAttribute('aria-pressed', String(dark));
    themeButton.setAttribute('aria-label', en ? (dark ? 'Switch to light mode' : 'Switch to dark mode') : (dark ? '切换浅色模式' : '切换深色模式'));
    document.querySelector('meta[name="theme-color"]').content = dark ? '#16191e' : '#f8f9fb';
  }

  function applyLanguage(language) {
    const dictionary = language === 'en' ? english : chinese;
    document.documentElement.lang = language === 'en' ? 'en' : 'zh-CN';
    document.title = language === 'en' ? english.pageTitle : '李洋 | 可靠计算机视觉';
    document.querySelectorAll('[data-i18n]').forEach((element) => {
      const value = dictionary[element.dataset.i18n];
      if (value) element.innerHTML = value;
    });
    document.querySelectorAll('[data-i18n-attr]').forEach((element) => {
      element.dataset.i18nAttr.split(';').forEach((binding) => {
        const [attribute, key] = binding.split(':').map((item) => item.trim());
        const value = dictionary[key];
        if (attribute && value) element.setAttribute(attribute, value);
      });
    });
    languageButton.textContent = language === 'en' ? '中' : 'EN';
    languageButton.setAttribute('aria-label', language === 'en' ? '切换到中文' : 'Switch to English');
    document.body.dataset.language = language;
    savePreference('preferredLanguage', language);
    updateThemeButton();
  }

  const observer = new IntersectionObserver((entries) => {
    const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;
    navLinks.forEach((link) => {
      const active = link.getAttribute('href') === `#${visible.target.id}`;
      link.classList.toggle('is-active', active);
      if (active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }, { rootMargin: '-28% 0px -56% 0px', threshold: [0, 0.2, 0.5] });

  navLinks.forEach((link) => {
    const section = document.querySelector(link.getAttribute('href'));
    if (section) observer.observe(section);
  });
  document.querySelectorAll('.hero, .proof').forEach((section) => observer.observe(section));

  languageButton.addEventListener('click', () => applyLanguage(document.body.dataset.language === 'en' ? 'zh' : 'en'));
  themeButton.addEventListener('click', () => {
    const theme = themeButton.getAttribute('aria-pressed') === 'true' ? 'light' : 'dark';
    document.documentElement.dataset.theme = theme;
    savePreference('preferredTheme', theme);
    updateThemeButton();
  });
  systemTheme.addEventListener('change', updateThemeButton);
  const savedTheme = readPreference('preferredTheme');
  if (savedTheme === 'light' || savedTheme === 'dark') document.documentElement.dataset.theme = savedTheme;
  applyLanguage(readPreference('preferredLanguage') === 'en' ? 'en' : 'zh');
})();
