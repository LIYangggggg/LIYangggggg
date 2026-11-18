(() => {
  const languageButton = document.querySelector('.lang-toggle');
  const themeButton = document.querySelector('.theme-toggle');
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
  const navLinks = Array.from(document.querySelectorAll('.site-nav a'));

  const chinese = {
    pageTitle: '李洋 | 可靠计算机视觉',
    metaDescription: '李洋，J&T Express 视觉算法工程师。研究方向包括分布外检测、预测错误识别与开集识别，具有工业视觉模型训练、评估和部署经验。',
    backToTop: '回到首页',
    navigationLabel: '主导航',
    brandName: '李洋',
    navFocus: '方向',
    navExperience: '经历',
    navResearch: '研究',
    skipContent: '跳到主要内容',
    heroNameLatin: 'Yang Li',
    heroAffiliation: '视觉算法工程师',
    heroSummary: '我研究视觉识别模型在真实场景中的可靠性，重点关注如何识别错误预测、分布外输入和训练时未见过的类别。我也从事工业视觉系统研发，负责从数据处理、模型训练和评估到部署的工作。',
    avatarAlt: '李洋的肖像',
    portraitCaption: '本科及硕士均毕业于武汉大学测绘工程专业。',
    sureAlt: 'SUREPlus: CE 与 CutMix 的分类及可靠性评估对比',
    edgeAlt: 'EdgeCrafter 的任务专用知识蒸馏流程',
    researchTitle: '代表性研究',
    researchLead: '研究涵盖分类模型可靠性、端侧视觉与遥感三维重建。',
    accepted: '已接收',
    published: '已发表',
    firstAuthor: '第一作者',
    coFirstAuthor: '共同第一作者',
    projectPage: '项目主页',
    sureBody: '提出统一的风险建模框架，将误分类检测与分布外检测纳入同一评估流程，用于识别模型的不可靠预测。',
    edgeBody: '通过任务专用知识蒸馏训练紧凑型 Vision Transformer，面向资源受限设备上的密集预测任务。',
    zigzagBody: '通过提示引导的之字形交互重组 Vision Transformer 的特征交互路径，以区分正确预测、错误预测和分布外输入。',
    mappingJournal: '《测绘科学》（北大核心）',
    mappingTitle: '单张卫星影像的建筑自动化三维重建',
    mappingBody: '从单张卫星影像中提取建筑，推断其结构并生成三维几何模型。',
    challengeWinner: 'SSB 开集识别赛道第 1 名',
    challengeTitle: 'SURE-OOD 开集识别方案',
    teamLead: '团队负责人',
    reportFirstAuthor: '技术报告第一作者',
    challengeBody: '赛道评估图像分类器能否识别训练中未见过的类别。团队在 SURE 框架上构建 SURE-OOD，结合测试时增强和分布外评分，区分已知类别图像与未知类别图像。',
    challengeCode: '代码与比赛结果',
    focusTitle: '研究与工程方向',
    focusReliabilityTitle: '模型可靠性',
    focusReliabilityBody: '研究如何利用模型置信度检测误分类，以及如何识别超出训练分布的输入和训练时未见过的类别。',
    focusDeliveryTitle: '工业视觉系统',
    focusDeliveryBody: '开发和部署图像分类、人脸识别、重识别（Re-ID）、目标检测及图像分割模型，并通过现场数据评估性能。',
    focusToolingTitle: '训练与数据工具',
    focusToolingBody: '开发模型训练框架和自动标注工具，将现场样本用于后续训练与评估。',
    experienceTitle: '工作与教育经历',
    experienceDetails: '查看项目职责',
    jntDate: '2026.06 - 至今',
    jntCompany: 'J&T Express',
    jntTitle: '视觉算法工程师',
    jobDate: '2023.07 - 2026.06',
    jobCompany: '合肥英特灵达信息技术有限公司',
    jobTitle: '计算机视觉算法工程师',
    jobSummary: '面向安防场景研发并部署视觉算法，参与人脸识别、分类可靠性、度量学习、目标检测、图像分割及自动标注工具的开发。',
    jobItemOne: '搭建分类模型训练与可靠性评估框架，支持摔倒、遮挡、烟火检测及人体结构化等任务。',
    jobItemTwo: '主导基于 Fast-ReID 的模型训练、评估与部署，优化损失函数、特征对齐和检索后处理。',
    jobItemThree: '针对复杂场景中的误报，进行数据清洗、误报样本挖掘和样本重构，并优化后处理。',
    educationSchool: '武汉大学',
    educationTitle: '测绘工程 本科 / 硕士',
    educationSummary: '研究涉及遥感影像解译与三维重建，包括从单张卫星影像自动重建建筑。',
    highlightsTitle: '其他成果',
    patentTitle: '发明专利',
    patentSummary: '已获授权的发明专利为《一种模型训练方法、图像分类方法、装置及电子设备》。',
    patentPublication: '申请公布 CN121074477A',
    footerNote: '计算机视觉研究与工程'
  };

  const english = { pageTitle: document.title };
  document.querySelectorAll('[data-i18n]').forEach((element) => { english[element.dataset.i18n] = element.textContent; });
  document.querySelectorAll('[data-i18n-attr]').forEach((element) => {
    element.dataset.i18nAttr.split(';').forEach((binding) => {
      const [attribute, key] = binding.split(':').map((item) => item.trim());
      english[key] = element.getAttribute(attribute);
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
    document.querySelector('meta[name="theme-color"]').content = dark ? '#16191e' : '#fdfdfc';
  }

  function applyLanguage(language) {
    const dictionary = language === 'en' ? english : chinese;
    document.documentElement.lang = language === 'en' ? 'en' : 'zh-CN';
    document.title = dictionary.pageTitle;
    document.querySelectorAll('[data-i18n]').forEach((element) => {
      const value = dictionary[element.dataset.i18n];
      if (value) element.textContent = value;
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
  document.querySelectorAll('.hero').forEach((section) => observer.observe(section));

  languageButton.addEventListener('click', () => {
    const language = document.documentElement.lang === 'en' ? 'zh' : 'en';
    applyLanguage(language);
    savePreference('homepageLanguage', language);
  });
  themeButton.addEventListener('click', () => {
    const theme = themeButton.getAttribute('aria-pressed') === 'true' ? 'light' : 'dark';
    document.documentElement.dataset.theme = theme;
    savePreference('preferredTheme', theme);
    updateThemeButton();
  });
  systemTheme.addEventListener('change', updateThemeButton);
  const savedTheme = readPreference('preferredTheme');
  if (savedTheme === 'light' || savedTheme === 'dark') document.documentElement.dataset.theme = savedTheme;
  if (readPreference('homepageLanguage') === 'zh') applyLanguage('zh');
  else updateThemeButton();
})();
