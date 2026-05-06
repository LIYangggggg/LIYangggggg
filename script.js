(() => {
  const meter = document.querySelector('.scroll-meter');
  const navLinks = Array.from(document.querySelectorAll('.site-nav a'));
  const languageButton = document.querySelector('.lang-toggle');
  const sections = navLinks.map((link) => document.querySelector(link.getAttribute('href'))).filter(Boolean);

  const copy = {
    en: {
      pageTitle: 'Yang Li | Computer Vision Algorithm Engineer',
      metaDescription: 'Yang Li is a computer vision algorithm engineer focused on OOD Detection, Failure Prediction, and reliable visual recognition systems.',
      brandName: 'Yang Li', navProfile: 'Profile', navWork: 'Experience', navResearch: 'Research', languageButton: '中文',
      heroName: 'Yang Li', heroRole: 'Algorithm Engineer (Computer Vision)',
      heroSummary: 'B.E. and M.E. from Wuhan University, with engineering experience in AI security algorithms. My main interests are OOD Detection, Failure Prediction, and visual model reliability, alongside hands-on work in classification, Re-ID, detection, segmentation, optimization, and deployment.',
      viewExperience: 'Experience', viewPapers: 'Papers', avatarAlt: 'Portrait of Yang Li',
      profileHeading: 'An engineering-oriented computer vision algorithm engineer',
      profileOod: 'Focused on out-of-distribution sample identification, open-set recognition, and reliable classification boundaries, so models can recognize when they should not be confident.',
      profileFailure: 'Work on misclassification prediction, failure sample mining, quality assessment, and risk-score modeling to make visual systems more controllable in real-world settings.',
      profileDeployTitle: 'Vision Deployment',
      profileDeploy: 'Develop classification, Re-ID, detection, and segmentation models, covering training, evaluation, optimization, and deployment pipelines for production scenarios.',
      profileToolTitle: 'Data & Tooling',
      profileTool: 'Build training frameworks and web-based automated annotation platforms, connecting upload, pre-annotation, review, and manual correction loops.',
      experienceHeading: 'From research validation to production deployment', jobDate: '2023.07 - Present',
      jobTitle: 'Hefei Intellindust Information Technology Co., Ltd. · Algorithm Engineer',
      jobSummary: 'Responsible for computer vision algorithm R&D and deployment in AI security scenarios, with emphasis on classification reliability, OOD Detection, Failure Prediction, and engineering-oriented training/deployment systems.',
      jobFace: 'Led optimization of face recognition, quality assessment, pose estimation, and capture strategies; improved false-alarm control and post-processing in complex construction-site scenarios.',
      jobClassification: 'Built a classification and reliability AI training framework from scratch and handled most classification algorithm R&D and iteration work.',
      jobReliability: 'Continuously improved model stability through data cleaning, sample reconstruction, false-positive mining, imbalanced-sample handling, and post-processing enhancement.',
      jobReid: 'Led the Metric Learning / Re-ID framework based on Fast-ReID, connecting training, evaluation, and deployment; optimized losses, feature alignment, and retrieval post-processing.',
      jobDetection: 'Participated in SOTA detection model R&D and deployment, mainly responsible for segmentation module design, training, and optimization; improved deployability through distillation and module-level improvements.',
      jobAnnotation: 'Helped build a web-based automated annotation platform for business teams, supporting data upload, automatic pre-annotation, result review, and manual correction loops.',
      educationTitle: 'Wuhan University · B.E. / M.E. in Surveying and Mapping Engineering',
      educationSummary: 'Built on a surveying and mapping background, expanded into visual perception, 3D reconstruction, and deep learning research, forming an engineering capability for industrial vision scenarios.',
      stackHeading: 'Technical Stack & Focus Areas', researchHeading: 'Papers, Awards & Patents', underReviewHeading: 'Under Review', publishedHeading: 'Published Paper', awardsHeading: 'Awards & Patents',
      firstAuthor: 'First Author', coFirstThird: 'Co-first Author, Third Listed',
      sureSummary: 'This work addresses reliability assessment in classification systems by formulating misclassification detection and out-of-distribution detection within a unified risk-modeling framework, aiming to characterize both whether a model is likely to be wrong and whether an input deviates from the known distribution.',
      zigzagSummary: 'This work studies the reliability bottleneck of Vision Transformers and introduces a prompted zigzag mechanism to reorganize feature interaction paths, improving the model’s ability to distinguish normal samples, erroneous predictions, and abnormal inputs.',
      edgeSummary: 'This work designs a family of lightweight, high-performance vision models for edge devices, systematically balancing computational cost, model capacity, and task performance for practical deployment under resource constraints.',
      projectPage: 'Project Page', mappingJournal: 'Geomatics Science and Technology', mappingTitle: 'Automated 3D Building Reconstruction from a Single Satellite Image',
      mappingSummary: 'This paper studies an automated reconstruction pipeline from a single satellite image to 3D building structures, covering building extraction, structural inference, and geometric representation generation for mapping-oriented automation.',
      competitionSummary: 'Champion of the Open-set Recognition track, serving as team leader.', patentTitle: '6 Invention Patents', patentSummary: 'Six invention patent applications have entered substantive examination.',
      footerName: '© 2026 Yang Li', footerBuilt: 'Built for GitHub Pages'
    }
  };

  function updateScrollState() {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    if (meter) meter.style.width = `${Math.max(0, Math.min(1, progress)) * 100}%`;
    const current = sections.slice().reverse().find((section) => section.getBoundingClientRect().top <= 130);
    navLinks.forEach((link) => link.classList.toggle('is-active', Boolean(current && link.getAttribute('href') === `#${current.id}`)));
  }

  const zh = {};
  document.querySelectorAll('[data-i18n]').forEach((el) => { zh[el.dataset.i18n] = el.textContent; });

  function applyLanguage(language) {
    const activeCopy = language === 'en' ? copy.en : zh;
    document.documentElement.lang = language === 'en' ? 'en' : 'zh-CN';
    document.title = activeCopy.pageTitle || zh.pageTitle || document.title;
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const value = activeCopy[el.dataset.i18n];
      if (value) el.textContent = value;
    });
    document.querySelectorAll('[data-i18n-attr]').forEach((el) => {
      el.dataset.i18nAttr.split(';').forEach((binding) => {
        const [attr, key] = binding.split(':');
        const value = activeCopy[key && key.trim()];
        if (attr && value) el.setAttribute(attr.trim(), value);
      });
    });
    document.body.dataset.language = language;
    languageButton.setAttribute('aria-label', language === 'en' ? 'Switch to Chinese' : 'Switch to English');
    localStorage.setItem('preferredLanguage', language);
    updateScrollState();
  }

  languageButton.addEventListener('click', () => applyLanguage(document.body.dataset.language === 'en' ? 'zh' : 'en'));
  window.addEventListener('scroll', updateScrollState, { passive: true });
  applyLanguage(localStorage.getItem('preferredLanguage') === 'en' ? 'en' : 'zh');
})();
