     import { Article, CategoryInfo, MarketItem, WeatherItem, VideoStory } from '../types/news';

export const CATEGORIES: CategoryInfo[] = [
  { id: 'all', slug: 'all', nameHindi: 'होम', nameEnglish: 'Home', descriptionHi: 'मुख्य पृष्ठ एवं ताज़ा समाचार', descriptionEn: 'Frontpage and breaking updates' },
  { id: 'bharat', slug: 'bharat', nameHindi: 'भारत', nameEnglish: 'India', descriptionHi: 'राष्ट्रीय समाचार, विकास और नीतियां', descriptionEn: 'National affairs, governance and policy' },
  { id: 'duniya', slug: 'duniya', nameHindi: 'दुनिया', nameEnglish: 'World', descriptionHi: 'वैश्विक कूटनीति, भू-राजनीति और अंतरराष्ट्रीय मामले', descriptionEn: 'Global geopolitics, diplomacy and conflicts' },
  { id: 'rajneeti', slug: 'rajneeti', nameHindi: 'राजनीति', nameEnglish: 'Politics', descriptionHi: 'संसद, चुनाव, राजनीतिक दल और शासन व्यवस्था', descriptionEn: 'Parliament, elections and governance' },
  { id: 'business', slug: 'business', nameHindi: 'बिज़नेस', nameEnglish: 'Business', descriptionHi: 'अर्थव्यवस्था, शेयर बाज़ार, बैंकिंग और कॉर्पोरेट', descriptionEn: 'Markets, economy, startups and finance' },
  { id: 'technology', slug: 'technology', nameHindi: 'टेक्नोलॉजी', nameEnglish: 'Tech & AI', descriptionHi: 'एआई, अंतरिक्ष अन्वेषण, साइबर सुरक्षा और गैजेट्स', descriptionEn: 'Artificial intelligence, space and innovation' },
  { id: 'shiksha', slug: 'shiksha', nameHindi: 'शिक्षा', nameEnglish: 'Education', descriptionHi: 'उच्च शिक्षा, प्रतियोगी परीक्षाएं, शोध और रोजगार', descriptionEn: 'Higher education, exams and career opportunities' },
  { id: 'sports', slug: 'sports', nameHindi: 'खेल', nameEnglish: 'Sports', descriptionHi: 'क्रिकेट, ओलंपिक, फुटबॉल और राष्ट्रीय खेल परिदृश्य', descriptionEn: 'Cricket, tournaments, football and athletics' },
  { id: 'manoranjan', slug: 'manoranjan', nameHindi: 'मनोरंजन', nameEnglish: 'Entertainment', descriptionHi: 'सिनेमा, कला, संगीत और सांस्कृतिक मंच', descriptionEn: 'Cinema, streaming, art and cultural reviews' },
  { id: 'lifestyle', slug: 'lifestyle', nameHindi: 'लाइफस्टाइल', nameEnglish: 'Lifestyle', descriptionHi: 'स्वास्थ्य, यात्रा, योग और जीवन शैली', descriptionEn: 'Health, wellness, travel and heritage' },
  { id: 'samaj', slug: 'samaj', nameHindi: 'समाज', nameEnglish: 'Society', descriptionHi: 'पर्यावरण, समाज सुधार, ग्रामीण विकास व संस्कृति', descriptionEn: 'Environment, grassroots change and rural India' },
  { id: 'video', slug: 'video', nameHindi: 'वीडियो', nameEnglish: 'Video', descriptionHi: 'वीडियो रिपोर्ट, विशेष साक्षात्कार व ग्राउंड रिपोर्ट', descriptionEn: 'Visual bulletins, interviews and ground dispatches' },
  { id: 'explainer', slug: 'explainer', nameHindi: 'एक्सप्लेनर', nameEnglish: 'Explainers', descriptionHi: 'जटिल मुद्दों की आसान भाषा में गहन पड़ताल', descriptionEn: 'In-depth analysis of complex national issues' },
];

export const INITIAL_ARTICLES: Article[] = [
  {
    id: 'lead-bullet-train-2026',
    slug: 'varanasi-delhi-high-speed-rail-corridor-greenlit',
    slugHi: 'varanasi-delhi-high-speed-rail-corridor-greenlit',
    slugEn: 'delhi-varanasi-bullet-train-corridor-environmental-nod',
    language: 'bilingual',
    
    // Hindi Version
    title: 'वाराणसी-दिल्ली बुलेट ट्रेन कॉरिडोर को अंतिम पर्यावरण मंज़ूरी: 320 किमी/घंटा रफ्तार, 3 घंटे 40 मिनट में सफर',
    titleHi: 'वाराणसी-दिल्ली बुलेट ट्रेन कॉरिडोर को अंतिम पर्यावरण मंज़ूरी: 320 किमी/घंटा रफ्तार, 3 घंटे 40 मिनट में सफर',
    summary: 'रेल मंत्रालय और राष्ट्रीय उच्च गति रेल निगम (NHSRCL) ने परियोजना के विस्तृत डिजाइन को अंतिम रूप दिया। 820 किलोमीटर लंबे इस कॉरिडोर से यूपी और राष्ट्रीय राजधानी क्षेत्र के 12 बड़े औद्योगिक शहरों को तेज कनेक्टिविटी मिलेगी।',
    summaryHi: 'रेल मंत्रालय और राष्ट्रीय उच्च गति रेल निगम (NHSRCL) ने परियोजना के विस्तृत डिजाइन को अंतिम रूप दिया। 820 किलोमीटर लंबे इस कॉरिडोर से यूपी और राष्ट्रीय राजधानी क्षेत्र के 12 बड़े औद्योगिक शहरों को तेज कनेक्टिविटी मिलेगी।',
    content: [
      'नई दिल्ली। भारत में उच्च गति रेल अवसंरचना के विकास में आज एक ऐतिहासिक मील का पत्थर दर्ज किया गया। रेल मंत्रालय और राष्ट्रीय उच्च गति रेल निगम (NHSRCL) की संयुक्त समिति ने वाराणसी-दिल्ली हाई-स्पीड रेल कॉरिडोर (Bullet Train Corridor) के दूसरे चरण की पर्यावरण प्रभाव मूल्यांकन (EIA) रिपोर्ट को औपचारिक रूप से मंज़ूरी प्रदान कर दी है।',
      'इस परियोजना के तहत 820 किलोमीटर लंबे ट्रैक पर ट्रेनें 320 किमी प्रति घंटे की अधिकतम रफ्तार से दौड़ेंगी, जिससे नई दिल्ली से वाराणसी का सफर केवल 3 घंटे 40 मिनट में पूरा होगा। वर्तमान में वंदे भारत एक्सप्रेस से इस दूरी को तय करने में लगभग 8 घंटे का समय लगता है।',
      'परियोजना के प्रमुख विशेषताओं में 12 अत्याधुनिक स्टेशन शामिल हैं जिनमें ग्रेटर नोएडा, अलीगढ़, आगरा, कानपुर, लखनऊ, रायबरेली, प्रयागराज और वाराणसी मुख्य जंक्शन होंगे। तकनीकी अधिकारियों के अनुसार 60 प्रतिशत ट्रैक एलिवेटेड वायडक्ट पर होगा, जिससे कृषि भूमि अधिग्रहण की आवश्यकता न्यूनतम रहेगी।',
      'ऊर्जा दक्षता और हरित विकास को ध्यान में रखते हुए, पूरे कॉरिडोर को सौर ऊर्जा से संचालित सहायक ग्रिड से जोड़ा जाएगा। शुरुआती अनुमान के अनुसार, 2029 तक इस परियोजना का प्रथम खंड कानपुर-वाराणसी के बीच परिचालन में लाने का लक्ष्य तय किया गया है।'
    ],
    contentHi: [
      'नई दिल्ली। भारत में उच्च गति रेल अवसंरचना के विकास में आज एक ऐतिहासिक मील का पत्थर दर्ज किया गया। रेल मंत्रालय और राष्ट्रीय उच्च गति रेल निगम (NHSRCL) की संयुक्त समिति ने वाराणसी-दिल्ली हाई-स्पीड रेल कॉरिडोर (Bullet Train Corridor) के दूसरे चरण की पर्यावरण प्रभाव मूल्यांकन (EIA) रिपोर्ट को औपचारिक रूप से मंज़ूरी प्रदान कर दी है।',
      'इस परियोजना के तहत 820 किलोमीटर लंबे ट्रैक पर ट्रेनें 320 किमी प्रति घंटे की अधिकतम रफ्तार से दौड़ेंगी, जिससे नई दिल्ली से वाराणसी का सफर केवल 3 घंटे 40 मिनट में पूरा होगा। वर्तमान में वंदे भारत एक्सप्रेस से इस दूरी को तय करने में लगभग 8 घंटे का समय लगता है।',
      'परियोजना के प्रमुख विशेषताओं में 12 अत्याधुनिक स्टेशन शामिल हैं जिनमें ग्रेटर नोएडा, अलीगढ़, आगरा, कानपुर, लखनऊ, रायबरेली, प्रयागराज और वाराणसी मुख्य जंक्शन होंगे। तकनीकी अधिकारियों के अनुसार 60 प्रतिशत ट्रैक एलिवेटेड वायडक्ट पर होगा, जिससे कृषि भूमि अधिग्रहण की आवश्यकता न्यूनतम रहेगी।',
      'ऊर्जा दक्षता और हरित विकास को ध्यान में रखते हुए, पूरे कॉरिडोर को सौर ऊर्जा से संचालित सहायक ग्रिड से जोड़ा जाएगा। शुरुआती अनुमान के अनुसार, 2029 तक इस परियोजना का प्रथम खंड कानपुर-वाराणसी के बीच परिचालन में लाने का लक्ष्य तय किया गया है।'
    ],
    
    // English Version
    titleEn: 'Delhi-Varanasi Bullet Train Corridor Secures Final Environmental Clearance: 320 km/h Top Speed, 3h 40m Journey',
    summaryEn: 'The Ministry of Railways and NHSRCL have finalized the engineering layout for the 820-km corridor connecting 12 major industrial hubs across Uttar Pradesh and the National Capital Region.',
    contentEn: [
      'NEW DELHI — India marked a significant infrastructure milestone as the Ministry of Railways and National High Speed Rail Corporation Limited (NHSRCL) formally cleared the Environmental Impact Assessment (EIA) for the Delhi-Varanasi High-Speed Corridor.',
      'Designed for operating speeds up to 320 km/h, the semi-elevated corridor will reduce travel time between the national capital and the holy city to under 3 hours and 40 minutes, down from the current 8 hours on Vande Bharat trains.',
      'The approved route incorporates 12 multi-modal transit hubs including Greater Noida, Aligarh, Agra, Kanpur, Lucknow, Raebareli, Prayagraj, and Varanasi Junction. Over 60 percent of the right-of-way will run on elevated viaducts to preserve arable farmland.',
      'Engineers have also mandated a captive solar microgrid along the track embankment to power auxiliary signaling and maintenance yards, targeting Phase 1 operations by late 2029.'
    ],

    pullQuote: 'यह केवल पटरियों का विस्तार नहीं, बल्कि भारत के आर्थिक धमनियों को 21वीं सदी की गति से जोड़ने का राष्ट्रीय संकल्प है।',
    pullQuoteEn: 'This high-speed link is not just concrete and rails; it is a vital catalyst accelerating regional commerce into the 21st century.',
    category: 'bharat',
    categoryHindi: 'भारत',
    categoryEnglish: 'India',
    tags: ['बुलेट ट्रेन', 'भारतीय रेल', 'इन्फ्रास्ट्रक्चर', 'Bullet Train', 'Infrastructure'],
    publishedAt: '25 मिनट पहले',
    timestampIso: '2026-10-24T21:15:00Z',
    createdAt: '2026-10-24T20:30:00Z',
    updatedAt: '2026-10-24T21:15:00Z',
    readTimeMinutes: 5,
    author: {
      id: 'auth-1',
      name: 'अमित कुमार श्रीवास्तव',
      nameEn: 'Amit Kumar Srivastava',
      role: 'वरिष्ठ राष्ट्रीय ब्यूरो प्रमुख',
      roleEn: 'Senior National Bureau Chief',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80'
    },
    imageUrl: '/src/assets/images/hero_infrastructure_india_1792903179895.jpg',
    imageCaption: 'बेंगलुरु और नई दिल्ली के बीच उच्च गति परीक्षण ट्रैक पर तैयार आधुनिक भारत गौरव हाई-स्पीड रैक।',
    imageCredit: 'न्यूज़वेव विशेष / पीटीआई',
    status: 'published',
    isLead: true,
    isFeatured: true,
    featured: true,
    isBreaking: true,
    breakingNews: true,
    isTrending: true,
    trendingRank: 1,
    views: 48920,
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    videoTitle: 'वाराणसी-दिल्ली बुलेट ट्रेन: रूट मैप, स्टेशन और टाइमलाइन का 3D विज़ुअल दौरा',
    comments: [
      {
        id: 'c-1',
        author: 'डॉ. राजेश नारायण',
        text: 'पूर्वांचल और एनसीआर के बीच व्यापारिक दृष्टि से यह कदम गेम-चेंजर साबित होगा। स्टेशनों का मल्टी-मॉडल ट्रांसपोर्ट हब होना अनिवार्य है।',
        timestamp: '15 मिनट पहले',
        likes: 24
      }
    ]
  },
  {
    id: 'tech-isro-space-telemetry-2026',
    slug: 'isro-advanced-satellite-payload-successful-test',
    slugHi: 'isro-advanced-satellite-payload-successful-test',
    slugEn: 'isro-validates-next-gen-cryogenic-optical-satellite-telemetry',
    language: 'bilingual',
    
    title: 'इसरो का नया अंतरिक्ष कीर्तिमान: अगली पीढ़ी के अर्थ ऑब्जर्वेशन उपग्रह का क्रायोजेनिक और ऑप्टिकल परीक्षण सफल',
    titleHi: 'इसरो का नया अंतरिक्ष कीर्तिमान: अगली पीढ़ी के अर्थ ऑब्जर्वेशन उपग्रह का क्रायोजेनिक और ऑप्टिकल परीक्षण सफल',
    summary: 'बेंगलुरु स्थित यू.आर. राव उपग्रह केंद्र में वैज्ञानिकों ने स्वदेशी हाई-रिज़ॉल्यूशन ऑप्टिकल पेलोड का थर्मल वैक्यूम परीक्षण पूरा किया। यह उपग्रह सटीक मौसम पूर्वानुमान और कृषि मानचित्रण में मील का पत्थर बनेगा।',
    summaryHi: 'बेंगलुरु स्थित यू.आर. राव उपग्रह केंद्र में वैज्ञानिकों ने स्वदेशी हाई-रिज़ॉल्यूशन ऑप्टिकल पेलोड का थर्मल वैक्यूम परीक्षण पूरा किया। यह उपग्रह सटीक मौसम पूर्वानुमान और कृषि मानचित्रण में मील का पत्थर बनेगा।',
    content: [
      'बेंगलुरु। भारतीय अंतरिक्ष अनुसंधान संगठन (ISRO) ने आज एक और स्वदेशी तकनीकी सफलता दर्ज की। अंतरिक्ष वैज्ञानिकों के दल ने भारत के नवीनतम पृथ्वी अवलोकन उपग्रह (EOS-09) के प्राथमिक पेलोड का जटिल सिमुलेशन परीक्षण 100% सटीकता के साथ पूरा कर लिया है।',
      'यह उपग्रह 0.3 मीटर के ग्राउंड रेजोल्यूशन के साथ रात और घने बादलों में भी स्पष्ट इमेजिंग करने में सक्षम है। इसरो अध्यक्ष ने वैज्ञानिकों की टीम को बधाई देते हुए कहा कि यह उपग्रह भारत के आपदा प्रबंधन, तटीय निगरानी और फसल आकलन की क्षमता को वैश्विक स्तर पर अग्रिम पंक्ति में लाएगा।',
      'इस पेलोड में पहली बार स्वदेश निर्मित न्यूरोमॉर्फिक चिपसेट का उपयोग किया गया है, जो अंतरिक्ष में ही डेटा को प्रोसेस कर धरती पर डाउनलोड का समय 70% तक घटा देता है।'
    ],
    contentHi: [
      'बेंगलुरु। भारतीय अंतरिक्ष अनुसंधान संगठन (ISRO) ने आज एक और स्वदेशी तकनीकी सफलता दर्ज की। अंतरिक्ष वैज्ञानिकों के दल ने भारत के नवीनतम पृथ्वी अवलोकन उपग्रह (EOS-09) के प्राथमिक पेलोड का जटिल सिमुलेशन परीक्षण 100% सटीकता के साथ पूरा कर लिया है।',
      'यह उपग्रह 0.3 मीटर के ग्राउंड रेजोल्यूशन के साथ रात और घने बादलों में भी स्पष्ट इमेजिंग करने में सक्षम है। इसरो अध्यक्ष ने वैज्ञानिकों की टीम को बधाई देते हुए कहा कि यह उपग्रह भारत के आपदा प्रबंधन, तटीय निगरानी और फसल आकलन की क्षमता को वैश्विक स्तर पर अग्रिम पंक्ति में लाएगा।',
      'इस पेलोड में पहली बार स्वदेश निर्मित न्यूरोमॉर्फिक चिपसेट का उपयोग किया गया है, जो अंतरिक्ष में ही डेटा को प्रोसेस कर धरती पर डाउनलोड का समय 70% तक घटा देता है।'
    ],

    titleEn: 'ISRO Reaches Space Milestone: Next-Gen Earth Observation Satellite Passes Rigorous Cryo-Optical Tests',
    summaryEn: 'Scientists at the U.R. Rao Satellite Centre in Bengaluru complete thermal-vacuum simulations for the indigenous 0.3m optical payload destined for disaster monitoring.',
    contentEn: [
      'BENGALURU — The Indian Space Research Organisation (ISRO) recorded another breakthrough in indigenous space instrumentation with the full qualification of its EOS-09 optical payload.',
      'Achieving sub-meter precision (0.3m ground sample distance), the sensor array features custom onboard neuromorphic co-processors that compress hyper-spectral telemetry before downlink.',
      'The multi-spectral imager is calibrated for real-time flood monitoring, glacial lake monitoring in Ladakh, and high-frequency agrarian yield predictions across the subcontinent.'
    ],

    pullQuote: 'अंतरिक्ष विज्ञान में भारत अब केवल डेटा प्राप्तकर्ता नहीं, बल्कि अगली पीढ़ी की ऑप्टिकल टेलीमेट्री का वैश्विक निर्माता है।',
    pullQuoteEn: 'India is no longer merely consuming space data; we are architecting sovereign hardware for deep orbital intelligence.',
    category: 'technology',
    categoryHindi: 'टेक्नोलॉजी',
    categoryEnglish: 'Tech & AI',
    tags: ['इसरो', 'अंतरिक्ष', 'उपग्रह', 'विज्ञान', 'AI', 'Space', 'ISRO'],
    publishedAt: '42 मिनट पहले',
    timestampIso: '2026-10-24T20:55:00Z',
    readTimeMinutes: 4,
    author: {
      id: 'auth-2',
      name: 'डॉ. प्रिया शर्मा',
      nameEn: 'Dr. Priya Sharma',
      role: 'विज्ञान एवं अंतरिक्ष संवाददाता',
      roleEn: 'Science & Aerospace Correspondent',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&h=120&q=80'
    },
    imageUrl: '/src/assets/images/tech_space_research_india_1792903181347.jpg',
    imageCaption: 'क्लीनरूम प्रयोगशाला में उपग्रह के मुख्य ऑप्टिकल मॉड्यूल की जांच करते इसरो वैज्ञानिक दल।',
    imageCredit: 'न्यूज़वेव / इसरो मीडिया सेल',
    status: 'published',
    isFeatured: true,
    featured: true,
    isTrending: true,
    trendingRank: 2,
    views: 34180,
    videoUrl: 'https://www.youtube.com/watch?v=21X5lGlDOfg',
    videoTitle: 'इसरो क्लीनरूम एक्सक्लूसिव: EOS-09 सैटेलाइट के पेलोड का परीक्षण कैसे हुआ?',
    comments: []
  },
  {
    id: 'biz-mumbai-bkc-sensex-rally',
    slug: 'indian-stock-market-sensex-crosses-historic-milestone',
    slugHi: 'indian-stock-market-sensex-crosses-historic-milestone',
    slugEn: 'sensex-crosses-85000-historic-milestone-bkc-rally',
    language: 'bilingual',
    
    title: 'बाज़ार में जबरदस्त उछाल: सेंसेक्स 85,200 के ऐतिहासिक शिखर पर, मैन्युफैक्चरिंग और बैंकिंग शेयरों में चौतरफा लिवाली',
    titleHi: 'बाज़ार में जबरदस्त उछाल: सेंसेक्स 85,200 के ऐतिहासिक शिखर पर, मैन्युफैक्चरिंग और बैंकिंग शेयरों में चौतरफा लिवाली',
    summary: 'घरेलू संस्थागत निवेशकों (DII) और विदेशी फंड्स की 14,000 करोड़ रुपये की शुद्ध खरीदारी से मुंबई शेयर बाज़ार में रौनक। निफ्टी 26,000 के मनोवैज्ञानिक स्तर को पार कर गया।',
    summaryHi: 'घरेलू संस्थागत निवेशकों (DII) और विदेशी फंड्स की 14,000 करोड़ रुपये की शुद्ध खरीदारी से मुंबई शेयर बाज़ार में रौनक। निफ्टी 26,000 के मनोवैज्ञानिक स्तर को पार कर गया।',
    content: [
      'मुंबई। भारतीय पूंजी बाज़ार में सप्ताह के अंतिम कारोबारी दिवस पर ऐतिहासिक तेज़ी दर्ज की गई। बॉम्बे स्टॉक एक्सचेंज (BSE) का संवेदी सूचकांक सेंसेक्स 842 अंक चढ़कर 85,214 के अब तक के सर्वोच्च स्तर पर बंद हुआ। वहीं नेशनल स्टॉक एक्सचेंज (NSE) का निफ्टी 50 भी 258 अंकों की बढ़त के साथ 26,012 पर पहुंच गया।',
      'बाजार विश्लेषकों का मानना है कि मजबूत जीएसटी संग्रह, विनिर्माण क्षेत्र के पीएमआई आंकड़ों में लगातार तेजी और ब्याज दरों में स्थिरता की संभावना ने निवेशकों के भरोसे को नई ताकत दी है।'
    ],
    contentHi: [
      'मुंबई। भारतीय पूंजी बाज़ार में सप्ताह के अंतिम कारोबारी दिवस पर ऐतिहासिक तेज़ी दर्ज की गई। बॉम्बे स्टॉक एक्सचेंज (BSE) का संवेदी सूचकांक सेंसेक्स 842 अंक चढ़कर 85,214 के अब तक के सर्वोच्च स्तर पर बंद हुआ। वहीं नेशनल स्टॉक एक्सचेंज (NSE) का निफ्टी 50 भी 258 अंकों की बढ़त के साथ 26,012 पर पहुंच गया।',
      'बाजार विश्लेषकों का मानना है कि मजबूत जीएसटी संग्रह, विनिर्माण क्षेत्र के पीएमआई आंकड़ों में लगातार तेजी और ब्याज दरों में स्थिरता की संभावना ने निवेशकों के भरोसे को नई ताकत दी है।'
    ],

    titleEn: 'Markets Surge to Historic Highs: Sensex Breaches 85,200, Nifty Above 26,000 Led by Manufacturing and BFSI',
    summaryEn: 'Combined institutional inflows of ₹14,000 crore and robust manufacturing PMI propel Dalal Street to unprecedented valuations.',
    contentEn: [
      'MUMBAI — Dalal Street concluded the trading week on a historic high as the BSE Sensex advanced 842 points to settle at 85,214, while the Nifty 50 comfortably crossed the 26,000 milestone.',
      'The breadth was decisively positive, anchored by heavy capital expenditure stocks, automotive exporters, and private sector banks amid expectations of steady policy rates.'
    ],

    category: 'business',
    categoryHindi: 'बिज़नेस',
    categoryEnglish: 'Business',
    tags: ['शेयर बाज़ार', 'सेंसेक्स', 'निफ्टी', 'Sensex', 'Economy', 'Markets'],
    publishedAt: '1 घंटा पहले',
    timestampIso: '2026-10-24T20:30:00Z',
    readTimeMinutes: 4,
    author: {
      id: 'auth-3',
      name: 'राकेश वर्मा',
      nameEn: 'Rakesh Verma',
      role: 'मार्केट व कॉरपोरेट एडिटर',
      roleEn: 'Markets & Corporate Editor',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80'
    },
    imageUrl: '/src/assets/images/business_mumbai_finance_1792903180849.jpg',
    imageCaption: 'मुंबई के बांद्रा-कुर्ला कॉम्प्लेक्स (BKC) का वित्तीय परिदृश्य जहाँ विदेशी निवेश प्रवाह में निरंतर वृद्धि देखी गई।',
    imageCredit: 'न्यूज़वेव / रॉयटर्स',
    status: 'published',
    isFeatured: true,
    featured: true,
    isTrending: true,
    trendingRank: 3,
    views: 29500,
    comments: []
  },
  {
    id: 'world-trade-diplomacy-accord',
    slug: 'global-trade-summit-multilateral-clean-energy-pact',
    slugHi: 'global-trade-summit-multilateral-clean-energy-pact',
    slugEn: 'global-trade-summit-40-nations-sign-clean-energy-accord',
    language: 'bilingual',
    
    title: 'वैश्विक व्यापार शिखर सम्मेलन: स्वच्छ ऊर्जा और आपूर्ति श्रृंखला लचीलेपन पर 40 देशों की ऐतिहासिक सहमति',
    titleHi: 'वैश्विक व्यापार शिखर सम्मेलन: स्वच्छ ऊर्जा और आपूर्ति श्रृंखला लचीलेपन पर 40 देशों की ऐतिहासिक सहमति',
    summary: 'जिनेवा में आयोजित अंतर-सरकारी सम्मेलन में भारत और प्रमुख यूरोपीय संघ साझेदारों ने महत्वपूर्ण खनिजों के सुरक्षित व्यापार और ग्रीन हाइड्रोजन मानकों पर बहुपक्षीय समझौते पर हस्ताक्षर किए।',
    summaryHi: 'जिनेवा में आयोजित अंतर-सरकारी सम्मेलन में भारत और प्रमुख यूरोपीय संघ साझेदारों ने महत्वपूर्ण खनिजों के सुरक्षित व्यापार और ग्रीन हाइड्रोजन मानकों पर बहुपक्षीय समझौते पर हस्ताक्षर किए।',
    content: [
      'जिनेवा। वैश्विक व्यापार और ऊर्जा संकट के समाधान हेतु आयोजित तीन दिवसीय उच्चस्तरीय कूटनीतिक सम्मेलन आज एक निर्णायक सहमति पत्र के साथ संपन्न हुआ। 40 सदस्य देशों ने स्वच्छ ऊर्जा आपूर्ति श्रृंखला और क्रिटिकल मिनरल्स (लिथियम, कोबाल्ट, रेयर अर्थ) के पारदर्शी व्यापार हेतु नए बहुपक्षीय ढांचे पर हस्ताक्षर किए।',
      'सम्मेलन में भारतीय प्रतिनिधिमंडल ने "ग्लोबल साउथ" के हितों को मजबूती से रखते हुए यह सुनिश्चित किया कि तकनीक हस्तांतरण और स्थानीय विनिर्माण को नई संधियों में सर्वोच्च प्राथमिकता दी जाए।'
    ],
    contentHi: [
      'जिनेवा। वैश्विक व्यापार और ऊर्जा संकट के समाधान हेतु आयोजित तीन दिवसीय उच्चस्तरीय कूटनीतिक सम्मेलन आज एक निर्णायक सहमति पत्र के साथ संपन्न हुआ। 40 सदस्य देशों ने स्वच्छ ऊर्जा आपूर्ति श्रृंखला और क्रिटिकल मिनरल्स (लिथियम, कोबाल्ट, रेयर अर्थ) के पारदर्शी व्यापार हेतु नए बहुपक्षीय ढांचे पर हस्ताक्षर किए।',
      'सम्मेलन में भारतीय प्रतिनिधिमंडल ने "ग्लोबल साउथ" के हितों को मजबूती से रखते हुए यह सुनिश्चित किया कि तकनीक हस्तांतरण और स्थानीय विनिर्माण को नई संधियों में सर्वोच्च प्राथमिकता दी जाए।'
    ],

    titleEn: 'Global Trade Summit: 40 Nations Ratify Clean Tech Supply Chain and Mineral Pact in Geneva',
    summaryEn: 'Multilateral summit concludes with historic consensus on equitable critical minerals trade and harmonized green hydrogen certification.',
    contentEn: [
      'GENEVA — Envoys from 40 nations ratified an overarching agreement establishing fair access standards for rare earths and lithium processing.',
      'The Indian delegation championed the priorities of emerging economies, ensuring local manufacturing offsets and open technology licensing remain non-negotiable clauses.'
    ],

    category: 'duniya',
    categoryHindi: 'दुनिया',
    categoryEnglish: 'World',
    tags: ['वैश्विक कूटनीति', 'व्यापार', 'स्वच्छ ऊर्जा', 'World Affairs', 'Diplomacy'],
    publishedAt: '2 घंटे पहले',
    timestampIso: '2026-10-24T19:40:00Z',
    readTimeMinutes: 5,
    author: {
      id: 'auth-4',
      name: 'सुरेखा नायर',
      nameEn: 'Surekha Nair',
      role: 'अंतरराष्ट्रीय कूटनीतिक विश्लेषक',
      roleEn: 'International Diplomatic Analyst',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&h=120&q=80'
    },
    imageUrl: '/src/assets/images/world_diplomacy_summit_1792903181066.jpg',
    imageCaption: 'जिनेवा शिखर सम्मेलन में अंतरराष्ट्रीय प्रतिनिधियों के बीच बहुपक्षीय व्यापार समझौते पर विस्तृत चर्चा।',
    imageCredit: 'न्यूज़वेव / एएफपी',
    status: 'published',
    isFeatured: true,
    featured: true,
    isTrending: true,
    trendingRank: 4,
    views: 19800,
    videoUrl: 'https://www.youtube.com/watch?v=kJQP7kiw5Fk',
    videoTitle: 'जिनेवा डेलिगेशन ब्रीफिंग: भारत और 40 देशों के बीच क्या सहमति बनी?',
    comments: []
  },
  {
    id: 'explainer-semiconductor-revolution-india',
    slug: 'explainer-semiconductor-fabrication-chips-explained-hindi',
    slugHi: 'explainer-semiconductor-fabrication-chips-explained-hindi',
    slugEn: 'explainer-indias-semiconductor-fab-mission-and-silicon-race',
    language: 'bilingual',
    
    title: 'एक्सप्लेनर: सेमीकंडक्टर फैब क्या है और भारत के लिए यह चिप क्रांति राष्ट्रीय सुरक्षा व अर्थव्यवस्था हेतु क्यों निर्णायक है?',
    titleHi: 'एक्सप्लेनर: सेमीकंडक्टर फैब क्या है और भारत के लिए यह चिप क्रांति राष्ट्रीय सुरक्षा व अर्थव्यवस्था हेतु क्यों निर्णायक है?',
    summary: 'सिलिकॉन वेफर से लेकर नैनोमीटर ट्रांजिस्टर तक: जानिए चिप निर्माण की जटिल प्रक्रिया, धोलेरा और साणंद प्लांट का महत्व और भारत कैसे ताइवान व दक्षिण कोरिया के समकक्ष खड़ा होने की राह पर है।',
    summaryHi: 'सिलिकॉन वेफर से लेकर नैनोमीटर ट्रांजिस्टर तक: जानिए चिप निर्माण की जटिल प्रक्रिया, धोलेरा और साणंद प्लांट का महत्व और भारत कैसे ताइवान व दक्षिण कोरिया के समकक्ष खड़ा होने की राह पर है।',
    content: [
      'आज दुनिया का कोई भी उपकरण—चाहे वह आपकी जेब में रखा स्मार्टफोन हो, इलेक्ट्रिक कार हो या लड़ाकू विमान—बिना सिलिकॉन चिप के एक सेकंड भी काम नहीं कर सकता। लेकिन सेमीकंडक्टर निर्माण (Semiconductor Fab) दुनिया की सबसे जटिल औद्योगिक प्रक्रियाओं में से एक है।',
      '1. फैब (Fabrication Plant) क्या होता है?\nफैब वह संयंत्र है जहाँ शून्य-धूल वाले अल्ट्रा-क्लीन रूम में बाल से 10,000 गुना पतले सर्किट लेज़र लिथोग्राफी तकनीक द्वारा सिलिकॉन वेफर पर उकेरे जाते हैं। एक सिंगल चिप में अरबों ट्रांजिस्टर होते हैं।',
      '2. भारत के लिए यह क्यों महत्वपूर्ण है?\nवर्तमान में वैश्विक स्तर पर 80% एडवांस चिप्स ताइवान (TSMC) में बनती हैं। भू-राजनीतिक तनाव या प्राकृतिक आपदा के समय आपूर्ति श्रृंखला बाधित होने का भारी जोखिम रहता है। भारत में धोलेरा और साणंद में स्थापित हो रहे प्लांट देश को 2030 तक चिप आत्मनिर्भरता की श्रेणी में लाएंगे।'
    ],
    contentHi: [
      'आज दुनिया का कोई भी उपकरण—चाहे वह आपकी जेब में रखा स्मार्टफोन हो, इलेक्ट्रिक कार हो या लड़ाकू विमान—बिना सिलिकॉन चिप के एक सेकंड भी काम नहीं कर सकता। लेकिन सेमीकंडक्टर निर्माण (Semiconductor Fab) दुनिया की सबसे जटिल औद्योगिक प्रक्रियाओं में से एक है।',
      '1. फैब (Fabrication Plant) क्या होता है?\nफैब वह संयंत्र है जहाँ शून्य-धूल वाले अल्ट्रा-क्लीन रूम में बाल से 10,000 गुना पतले सर्किट लेज़र लिथोग्राफी तकनीक द्वारा सिलिकॉन वेफर पर उकेरे जाते हैं। एक सिंगल चिप में अरबों ट्रांजिस्टर होते हैं।',
      '2. भारत के लिए यह क्यों महत्वपूर्ण है?\nवर्तमान में वैश्विक स्तर पर 80% एडवांस चिप्स ताइवान (TSMC) में बनती हैं। भू-राजनीतिक तनाव या प्राकृतिक आपदा के समय आपूर्ति श्रृंखला बाधित होने का भारी जोखिम रहता है। भारत में धोलेरा और साणंद में स्थापित हो रहे प्लांट देश को 2030 तक चिप आत्मनिर्भरता की श्रेणी में लाएंगे।'
    ],

    titleEn: 'Explainer: Inside India\'s Semiconductor Fab Mission — Why Silicon Sovereignty is Crucial for National Security',
    summaryEn: 'From silicon ingots to nanometer lithography: How Dholera and Sanand chip fabs represent India’s strategic pivot away from single-source global dependencies.',
    contentEn: [
      'From automotive ECUs to satellite guidance, modern civilization runs on microchips etched with transistors thinner than human hair.',
      'Why Fabs Matter: Pure cleanroom manufacturing at 28nm and below requires uninterrupted power, hyper-pure deionized water, and extreme ultraviolet (EUV) optics.',
      'The Geopolitical Stake: Over 80% of top-tier chips originate in Taiwan. India’s multi-billion dollar capital subsidy program seeks to establish domestic fabrication resiliency by 2030.'
    ],

    pullQuote: '21वीं सदी का तेल कच्चा खनिज नहीं, बल्कि सिलिकॉन चिप है। जिस देश का अपनी चिप पर नियंत्रण होगा, वही वैश्विक शक्ति बनेगा।',
    pullQuoteEn: 'Silicon is the crude oil of the 21st century. Nations that control fabrication govern their technological destiny.',
    category: 'explainer',
    categoryHindi: 'एक्सप्लेनर',
    categoryEnglish: 'Explainers',
    tags: ['एक्सप्लेनर', 'सेमीकंडक्टर', 'चिप मिशन', 'Semiconductor', 'Chips', 'Explainers'],
    publishedAt: '3 घंटे पहले',
    timestampIso: '2026-10-24T18:30:00Z',
    readTimeMinutes: 6,
    author: {
      id: 'auth-2',
      name: 'डॉ. प्रिया शर्मा',
      nameEn: 'Dr. Priya Sharma',
      role: 'विज्ञान एवं अंतरिक्ष संवाददाता',
      roleEn: 'Science & Aerospace Correspondent',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&h=120&q=80'
    },
    imageUrl: '/src/assets/images/tech_space_research_india_1792903181347.jpg',
    imageCaption: 'माइक्रोचिप फैब्रिकेशन और उच्च-स्तरीय नैनोमीटर वेफर टेस्टिंग की स्वच्छ प्रयोगशाला।',
    imageCredit: 'न्यूज़वेव विजुअल डेस्क',
    status: 'published',
    isTrending: true,
    trendingRank: 5,
    views: 41200,
    videoUrl: 'https://www.youtube.com/watch?v=tI9Nfxw_7Wk',
    videoTitle: 'सेमीकंडक्टर कैसे बनते हैं? 5 मिनट में आसान 3D एनीमेशन एक्सप्लेनर',
    comments: []
  },
  {
    id: 'sports-cricket-india-world-test-championship',
    slug: 'india-cricket-team-clinches-historic-test-victory',
    slugHi: 'india-cricket-team-clinches-historic-test-victory',
    slugEn: 'india-secures-commanding-test-triumph-wtc-standings',
    language: 'bilingual',
    
    title: 'क्रिकेट: ऐतिहासिक टेस्ट विजय के साथ भारत विश्व टेस्ट चैंपियनशिप (WTC) तालिका के शीर्ष पर बरकरार',
    titleHi: 'क्रिकेट: ऐतिहासिक टेस्ट विजय के साथ भारत विश्व टेस्ट चैंपियनशिप (WTC) तालिका के शीर्ष पर बरकरार',
    summary: 'तेज़ गेंदबाज़ों के धारदार स्पैल और शीर्ष क्रम के शतकीय साझेदारियों से घरेलू श्रृंखला में 3-0 से क्लीन स्वीप। लॉर्ड्स फाइनल की राह मजबूत।',
    summaryHi: 'तेज़ गेंदबाज़ों के धारदार स्पैल और शीर्ष क्रम के शतकीय साझेदारियों से घरेलू श्रृंखला में 3-0 से क्लीन स्वीप। लॉर्ड्स फाइनल की राह मजबूत।',
    content: [
      'कोलकाता। ईडन गार्डन्स में भारतीय क्रिकेट टीम ने पांचवें दिन के अंतिम सत्र में मेहमान टीम को 148 रनों से हराकर ऐतिहासिक 3-0 की टेस्ट श्रृंखला अपने नाम कर ली। इस जीत के साथ ही आईसीसी विश्व टेस्ट चैंपियनशिप (WTC) अंक तालिका में भारत का शीर्ष स्थान और अधिक सुदृढ़ हो गया है।',
      'टीम के तेज़ गेंदबाज़ी आक्रमण ने दूसरी पारी में केवल 42 ओवरों में विपक्षी बल्लेबाजी को समेट दिया। भारतीय कप्तान ने मैच के बाद कहा कि युवाओं का आक्रामक दृष्टिकोण और अनुशासित गेंदबाज़ी इस जीत का मुख्य आधार रही।'
    ],
    contentHi: [
      'कोलकाता। ईडन गार्डन्स में भारतीय क्रिकेट टीम ने पांचवें दिन के अंतिम सत्र में मेहमान टीम को 148 रनों से हराकर ऐतिहासिक 3-0 की टेस्ट श्रृंखला अपने नाम कर ली। इस जीत के साथ ही आईसीसी विश्व टेस्ट चैंपियनशिप (WTC) अंक तालिका में भारत का शीर्ष स्थान और अधिक सुदृढ़ हो गया है।',
      'टीम के तेज़ गेंदबाज़ी आक्रमण ने दूसरी पारी में केवल 42 ओवरों में विपक्षी बल्लेबाजी को समेट दिया। भारतीय कप्तान ने मैच के बाद कहा कि युवाओं का आक्रामक दृष्टिकोण और अनुशासित गेंदबाज़ी इस जीत का मुख्य आधार रही।'
    ],

    titleEn: 'Cricket: India Consolidates Top Spot in World Test Championship With Dominant 3-0 Series Sweep',
    summaryEn: 'Pace battery bundles out opposition on Day 5 at Eden Gardens, guaranteeing high points advantage on the road to the Lord’s final.',
    contentEn: [
      'KOLKATA — A fierce reverse-swing clinic by India’s seamers sealed a commanding 148-run victory at Eden Gardens, wrapping up an emphatic 3-0 series whitewash.',
      'With consecutive series victories under their belt, India maintains the premier win-percentage in the current World Test Championship cycle.'
    ],

    category: 'sports',
    categoryHindi: 'खेल',
    categoryEnglish: 'Sports',
    tags: ['क्रिकेट', 'टीम इंडिया', 'WTC', 'Cricket', 'Sports'],
    publishedAt: '4 घंटे पहले',
    timestampIso: '2026-10-24T17:45:00Z',
    readTimeMinutes: 3,
    author: {
      id: 'auth-6',
      name: 'विक्रम मल्होत्रा',
      nameEn: 'Vikram Malhotra',
      role: 'वरिष्ठ खेल पत्रकार',
      roleEn: 'Senior Sports Correspondent',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80'
    },
    imageUrl: '/src/assets/images/hero_infrastructure_india_1792903179895.jpg',
    imageCaption: 'मैच समाप्ति के बाद ट्रॉफी के साथ जश्न मनाती भारतीय क्रिकेट टीम।',
    imageCredit: 'न्यूज़वेव / बीसीसीआई',
    status: 'published',
    views: 38200,
    videoUrl: 'https://www.youtube.com/watch?v=9bZkp7q19f0',
    videoTitle: 'ईडन गार्डन्स में जीत का रोमांचक क्षण: आखिरी विकेट का वीडियो हाइलाइट',
    comments: []
  }
];

export const VIDEO_STORIES: VideoStory[] = [
  {
    id: 'vid-1',
    title: 'वाराणसी-दिल्ली बुलेट ट्रेन: 320 किमी/घंटा रफ्तार का 3D विज़ुअल दौरा',
    titleEn: 'Delhi-Varanasi High Speed Bullet Train: 3D Visualization & Route Map',
    description: 'जानिए बुलेट ट्रेन कॉरिडोर के 12 स्टेशन, एलिवेटेड ट्रैक और यात्रा समय में 4 घंटे की ऐतिहासिक बचत की पूरी रिपोर्ट।',
    descriptionEn: 'Full breakdown of the 820-km corridor, route alignment, and multi-modal transit junctions.',
    youtubeId: 'dQw4w9WgXcQ',
    duration: '04:15',
    category: 'bharat',
    categoryHindi: 'भारत',
    thumbnailUrl: '/src/assets/images/hero_infrastructure_india_1792903179895.jpg',
    publishedAt: '2 घंटे पहले',
    relatedArticleId: 'lead-bullet-train-2026'
  },
  {
    id: 'vid-2',
    title: 'इसरो क्लीनरूम एक्सक्लूसिव: EOS-09 ऑप्टिकल सैटेलाइट का ग्राउंड टेस्ट',
    titleEn: 'ISRO Cleanroom Exclusive: Qualifying the Next-Gen EOS-09 Sensor Array',
    description: 'वैज्ञानिकों ने कैसे पूरा किया 0.3 मीटर रिज़ॉल्यूशन वाले स्वदेशी पेलोड का थर्मल वैक्यूम परीक्षण।',
    descriptionEn: 'Engineers demonstrate optical calibration of high-resolution Earth Observation satellite.',
    youtubeId: '21X5lGlDOfg',
    duration: '03:40',
    category: 'technology',
    categoryHindi: 'टेक्नोलॉजी',
    thumbnailUrl: '/src/assets/images/tech_space_research_india_1792903181347.jpg',
    publishedAt: '3 घंटे पहले',
    relatedArticleId: 'tech-isro-space-telemetry-2026'
  },
  {
    id: 'vid-3',
    title: 'सेमीकंडक्टर चिप कैसे बनती है? 5 मिनट में आसान 3D एनीमेशन',
    titleEn: 'How Microchips Are Fabricated: 5-Minute Visual Explainer',
    description: 'सिलिकॉन वेफर से लेकर नैनोमीटर ट्रांजिस्टर तक: भारत के सेमीकंडक्टर मिशन का सबसे सरल वीडियो विश्लेषण।',
    descriptionEn: 'From pure silicon crystals to extreme ultraviolet lithography: Chip fabrication simplified.',
    youtubeId: 'tI9Nfxw_7Wk',
    duration: '05:12',
    category: 'explainer',
    categoryHindi: 'एक्सप्लेनर',
    thumbnailUrl: '/src/assets/images/tech_space_research_india_1792903181347.jpg',
    publishedAt: '5 घंटे पहले',
    relatedArticleId: 'explainer-semiconductor-revolution-india'
  },
  {
    id: 'vid-4',
    title: 'मुंबई शेयर बाज़ार 85,200 के पार: वित्तीय दिग्गजों का विशेष पैनल मंथन',
    titleEn: 'Sensex Beyond 85,000: Analysts Discuss Capital Inflows and Valuations',
    description: 'दलाल स्ट्रीट पर तेज़ी का नया दौर: क्या यह स्तर आगे भी टिकेगा? देखिए विशेषज्ञों की राय।',
    descriptionEn: 'Market leaders break down DII momentum and manufacturing PMI tailwinds.',
    youtubeId: 'kJQP7kiw5Fk',
    duration: '06:30',
    category: 'business',
    categoryHindi: 'बिज़नेस',
    thumbnailUrl: '/src/assets/images/business_mumbai_finance_1792903180849.jpg',
    publishedAt: '6 घंटे पहले',
    relatedArticleId: 'biz-mumbai-bkc-sensex-rally'
  }
];

export const MARKET_DATA: MarketItem[] = [
  { name: 'सेंसेक्स (BSE)', nameEn: 'BSE Sensex', value: '85,214.60', change: '+842.10 (1.00%)', isPositive: true },
  { name: 'निफ्टी 50 (NSE)', nameEn: 'NSE Nifty 50', value: '26,012.35', change: '+258.45 (1.00%)', isPositive: true },
  { name: 'सोना (10 ग्राम)', nameEn: 'Gold (10g)', value: '₹78,450', change: '+320.00 (0.41%)', isPositive: true },
  { name: 'चांदी (1 किग्रा)', nameEn: 'Silver (1kg)', value: '₹94,800', change: '-150.00 (-0.16%)', isPositive: false },
  { name: 'USD / INR', nameEn: 'USD / INR', value: '₹84.12', change: '-0.08 (-0.10%)', isPositive: true },
  { name: 'कच्चा तेल (ब्रेंट)', nameEn: 'Brent Crude', value: '$74.60/bbl', change: '+0.85 (1.15%)', isPositive: false }
];

export const WEATHER_DATA: WeatherItem[] = [
  { city: 'नई दिल्ली', cityEn: 'New Delhi', temp: '28°C', condition: 'साफ़ मौसम', conditionEn: 'Clear Sky' },
  { city: 'मुंबई', cityEn: 'Mumbai', temp: '31°C', condition: 'हल्की धूप', conditionEn: 'Sunny' },
  { city: 'लखनऊ', cityEn: 'Lucknow', temp: '27°C', condition: 'सुहावना', conditionEn: 'Pleasant' },
  { city: 'पटना', cityEn: 'Patna', temp: '26°C', condition: 'हल्के बादल', conditionEn: 'Partly Cloudy' },
  { city: 'जयपुर', cityEn: 'Jaipur', temp: '29°C', condition: 'धूप', conditionEn: 'Sunny' },
];

export const EDITORIAL_COLUMNS = [
  {
    id: 'op-1',
    author: 'प्रो. रामचंद्र मुकुंद',
    authorEn: 'Prof. Ramchandra Mukund',
    role: 'अर्थशास्त्री एवं पूर्व नीति सलाहकार',
    roleEn: 'Economist & Policy Advisor',
    title: 'आर्थिक विकास और रोजगार: आंकड़ों की चमक के बीच अनौपचारिक क्षेत्र की चुनौतियां',
    titleEn: 'Economic Growth and Jobs: Navigating Informal Sector Challenges Beyond Headlines',
    readTime: '6 मिनट पढ़ें',
    readTimeEn: '6 min read'
  },
  {
    id: 'op-2',
    author: 'नीरजा चौधरी',
    authorEn: 'Neerja Chowdhury',
    role: 'वरिष्ठ राजनीतिक विश्लेषक',
    roleEn: 'Senior Political Columnist',
    title: 'गठबंधन राजनीति का नया व्याकरण: क्षेत्रीय आकांक्षाओं और राष्ट्रीय विमर्श का संतुलन',
    titleEn: 'Coalition Architecture: Balancing Regional Aspirations with Federal Consensus',
    readTime: '5 मिनट पढ़ें',
    readTimeEn: '5 min read'
  },
  {
    id: 'op-3',
    author: 'डॉ. हरीश वेणुगोपाल',
    authorEn: 'Dr. Harish Venugopal',
    role: 'पर्यावरण विज्ञानी',
    roleEn: 'Environmental Scientist',
    title: 'जलवायु परिवर्तन और हिमालयी नदियां: नीतिगत चेतावनी को अनदेखा करने का भारी मूल्य',
    titleEn: 'Glacial Fragility: Why Ignoring Himalayan Hydrological Alerts Carries Heavy Costs',
    readTime: '7 मिनट पढ़ें',
    readTimeEn: '7 min read'
  }
];
