import type { Product } from '../../types';

export const PRODUCTS_DATA: Product[] = [
  // ==========================================
  // STORE: Patchi (patchi-gourmet) - SWEETS
  // ==========================================
  {
    id: 'prod-patchi-1',
    storeId: 'store-patchi',
    storeSlug: 'patchi-gourmet',
    storeNameAr: 'باتشي وفنون الشوكولاتة الفاخرة',
    nameAr: 'صندوق شوكولاتة باتشي الملكي الفاخر (50 قطعة)',
    nameEn: 'Patchi Royal Assorted Chocolate Box (50 pcs)',
    descriptionAr: 'تشكيلة مختارة بعناية من أجود أنواع الشوكولاتة البلجيكية بالحليب والشوكولاتة الداكنة بحشوات البرالين، الفستق الحلبي، والبندق المحمص.',
    price: 245,
    originalPrice: 280,
    currency: 'ر.س',
    internalCategoryId: 'boxes',
    internalCategoryNameAr: 'بوكسات هدايا',
    image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1481391319762-47dff72954d9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1548848221-0c2e497ed557?auto=format&fit=crop&w=800&q=80'
    ],
    inStock: true,
    stockCount: 18,
    rating: 4.9,
    reviewCount: 142,
    attributes: [
      {
        id: 'packaging',
        nameAr: 'نوع التغليف والشريطة',
        required: true,
        options: [
          { id: 'gold_ribbon', nameAr: 'شريطة ذهبية فاخرة', priceModifier: 0 },
          { id: 'navy_velvet', nameAr: 'شريطة مخمل كحلي ملكي', priceModifier: 15 },
          { id: 'vip_wrapping', nameAr: 'تغليف هدايا VIP مع بطاقة', priceModifier: 25 },
        ]
      },
      {
        id: 'filling_preference',
        nameAr: 'تفضيل الحشوة الغالبة',
        required: false,
        options: [
          { id: 'assorted', nameAr: 'تشكيلة متوازنة منوعة', priceModifier: 0 },
          { id: 'nuts_only', nameAr: 'تركيز على المكسرات والكرانشي', priceModifier: 20 },
          { id: 'dark_only', nameAr: 'شوكولاتة داكنة 70%', priceModifier: 10 },
        ]
      }
    ],
    tagsAr: ['شوكولاتة بلجيكية', 'هدية فاخرة', 'ضيافة'],
    isBestSeller: true,
    isNew: false,
  },
  {
    id: 'prod-patchi-2',
    storeId: 'store-patchi',
    storeSlug: 'patchi-gourmet',
    storeNameAr: 'باتشي وفنون الشوكولاتة الفاخرة',
    nameAr: 'شوكولاتة ترافل الكراميل المملح والفستق',
    nameEn: 'Salted Caramel & Pistachio Truffles Box',
    descriptionAr: 'كرات الترافل الذائبة مغلفة ببودرة الكاكاو الفاخر ومحشوة بطبقات من الكراميل المملح الفرنسي وجناش الفستق الغني.',
    price: 165,
    currency: 'ر.س',
    internalCategoryId: 'truffles',
    internalCategoryNameAr: 'ترافل فاخر',
    image: 'https://images.unsplash.com/photo-1548848221-0c2e497ed557?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1548848221-0c2e497ed557?auto=format&fit=crop&w=800&q=80'
    ],
    inStock: true,
    stockCount: 25,
    rating: 4.8,
    reviewCount: 88,
    attributes: [
      {
        id: 'box_size',
        nameAr: 'حجم البوكس',
        required: true,
        options: [
          { id: 'size_250g', nameAr: '250 جرام (16 حبة)', priceModifier: 0 },
          { id: 'size_500g', nameAr: '500 جرام (32 حبة)', priceModifier: 85 },
        ]
      }
    ],
    tagsAr: ['ترافل', 'كراميل مملح', 'فستق'],
    isBestSeller: false,
    isNew: true,
  },
  {
    id: 'prod-patchi-3',
    storeId: 'store-patchi',
    storeSlug: 'patchi-gourmet',
    storeNameAr: 'باتشي وفنون الشوكولاتة الفاخرة',
    nameAr: 'صينية ضيافة كريستال ملكية مشكلة',
    nameEn: 'Royal Crystal Hospitality Tray',
    descriptionAr: 'صينية كريستال مذهبة ومصممة بأناقة تحتوي على 1.2 كجم من شوكولاتة باتشي المغلفة يدوياً بأوراق السلوفان الفاخرة.',
    price: 490,
    originalPrice: 550,
    currency: 'ر.س',
    internalCategoryId: 'trays',
    internalCategoryNameAr: 'صواني ضيافة',
    image: 'https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=800&q=80'
    ],
    inStock: true,
    stockCount: 6,
    rating: 5.0,
    reviewCount: 39,
    attributes: [
      {
        id: 'greeting_card',
        nameAr: 'إضافة كارت إهداء مذهب',
        required: false,
        options: [
          { id: 'card_congrats', nameAr: 'مبارك الترقية / التخرج', priceModifier: 15 },
          { id: 'card_wedding', nameAr: 'ألف مبارك الزواج', priceModifier: 15 },
          { id: 'card_custom', nameAr: 'نص مخصص يكتب بخط الرقعة', priceModifier: 25 },
        ]
      }
    ],
    tagsAr: ['صواني ضيافة', 'كريستال', 'أعراس'],
    isBestSeller: true,
    isNew: false,
  },

  // ==========================================
  // STORE: Habiba Sweets (habiba-royal-sweets) - SWEETS
  // ==========================================
  {
    id: 'prod-habiba-1',
    storeId: 'store-habiba',
    storeSlug: 'habiba-royal-sweets',
    storeNameAr: 'حلويات حبيبة الملكية',
    nameAr: 'كنافة نابلسية خشنة بالجبنة العكاوية الطازجة (1 كجم)',
    nameEn: 'Authentic Nabulsi Kunafa with Fresh Cheese (1kg)',
    descriptionAr: 'كنافة نابلسية تقليدية محضرة بالسمن البلدي الفاخر ومحشوة بجبنة نابلسية طازجة ذائبة مع القطر الخفيف والفستق الحلبي المقشور.',
    price: 75,
    currency: 'ر.س',
    internalCategoryId: 'kunafa',
    internalCategoryNameAr: 'كنافة نابلسية',
    image: 'https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&w=800&q=80'
    ],
    inStock: true,
    rating: 4.9,
    reviewCount: 310,
    attributes: [
      {
        id: 'crust_type',
        nameAr: 'نوع الشعيرية',
        required: true,
        options: [
          { id: 'rough', nameAr: 'خشنة مقرمشة', priceModifier: 0 },
          { id: 'soft', nameAr: 'ناعمة كلاسيكية', priceModifier: 0 },
        ]
      },
      {
        id: 'syrup_level',
        nameAr: 'مستوى القطر (الشيرة)',
        required: true,
        options: [
          { id: 'normal', nameAr: 'مضبوط كلاسيكي', priceModifier: 0 },
          { id: 'light', nameAr: 'خفيف وقليل الحلاوة', priceModifier: 0 },
          { id: 'extra', nameAr: 'قطر خارجي منفصل', priceModifier: 5 },
        ]
      }
    ],
    tagsAr: ['كنافة', 'جبنة', 'فستق'],
    isBestSeller: true,
  },
  {
    id: 'prod-habiba-2',
    storeId: 'store-habiba',
    storeSlug: 'habiba-royal-sweets',
    storeNameAr: 'حلويات حبيبة الملكية',
    nameAr: 'صحن بقلاوة مشكلة ملكية بالفستق الحلبي والكاجو',
    nameEn: 'Royal Mixed Baklava with Pistachio & Cashew',
    descriptionAr: 'رقائق عجين ذهبية هشة ومقرمشة ومحشوة بأجود أنواع الفستق الحلبي والكاجو، مصبوغة بالسمن البلدي النقي.',
    price: 95,
    originalPrice: 115,
    currency: 'ر.س',
    internalCategoryId: 'baklava',
    internalCategoryNameAr: 'بقلاوة ومعمول',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80'
    ],
    inStock: true,
    rating: 4.8,
    reviewCount: 198,
    tagsAr: ['بقلاوة', 'حلويات شامية', 'فستق حلبي'],
    isBestSeller: false,
    isNew: false,
  },

  // ==========================================
  // STORE: Flora Paris (flora-paris-boutique) - FLOWERS
  // ==========================================
  {
    id: 'prod-flora-1',
    storeId: 'store-flora-paris',
    storeSlug: 'flora-paris-boutique',
    storeNameAr: 'فلورا باريس لتنسيق الزهور والهدايا',
    nameAr: 'باقة الأميرة الملكية (30 جوري أحمر هولندي)',
    nameEn: 'The Royal Princess Bouquet (30 Dutch Red Roses)',
    descriptionAr: 'باقة يد فاخرة تضم 30 زهرة جوري أحمر هولندي فاخر منتقى بعناية، مع لمسات من أوراق الأوكالبتوس العطرية وتغليف أسود مخملي مذهب.',
    price: 260,
    originalPrice: 310,
    currency: 'ر.س',
    internalCategoryId: 'bouquets',
    internalCategoryNameAr: 'باقات يد فاخرة',
    image: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=800&q=80'
    ],
    inStock: true,
    stockCount: 14,
    rating: 4.9,
    reviewCount: 220,
    attributes: [
      {
        id: 'card_message',
        nameAr: 'نص كارت الإهداء المجاني',
        required: true,
        options: [
          { id: 'congrats', nameAr: 'ألف مبروك ومنها للأعلى يا رب', priceModifier: 0 },
          { id: 'love', nameAr: 'كل عام وأنتِ لقلبي أقرب وأجمل', priceModifier: 0 },
          { id: 'blank', nameAr: 'كارت فارغ فاخر أكتبه بيدي', priceModifier: 0 },
        ]
      },
      {
        id: 'wrapping_color',
        nameAr: 'لون التغليف الخارجي',
        required: true,
        options: [
          { id: 'navy_gold', nameAr: 'كحلي فاخر مع أطراف ذهبية', priceModifier: 0 },
          { id: 'cream_white', nameAr: 'أبيض لؤلؤي كريمي ناعم', priceModifier: 0 },
          { id: 'burgundy', nameAr: 'عنابي مخملي كلاسيكي', priceModifier: 15 },
        ]
      }
    ],
    tagsAr: ['ورد جوري', 'هولندي', 'رومانسي'],
    isBestSeller: true,
  },
  {
    id: 'prod-flora-2',
    storeId: 'store-flora-paris',
    storeSlug: 'flora-paris-boutique',
    storeNameAr: 'فلورا باريس لتنسيق الزهور والهدايا',
    nameAr: 'فازة زهور الأوركيد البيضاء الملكية في وعاء رخامي',
    nameEn: 'White Orchid Bloom in Luxury Marble Vase',
    descriptionAr: 'نبات الأوركيد الطبيعي الفاخر بفرعين مزهرين داخل فازة رخام طبيعي منقوشة يدوياً، تدوم طويلاً وتصلح لديكور المجالس والمكاتب.',
    price: 380,
    currency: 'ر.س',
    internalCategoryId: 'vases',
    internalCategoryNameAr: 'فازات رخامية',
    image: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=800&q=80'
    ],
    inStock: true,
    stockCount: 8,
    rating: 4.8,
    reviewCount: 94,
    tagsAr: ['أوركيد', 'فازة رخام', 'ديكور راقي'],
    isBestSeller: false,
    isNew: true,
  },

  // ==========================================
  // STORE: Sultan Grills (sultan-lounge-grill) - RESTAURANTS
  // ==========================================
  {
    id: 'prod-sultan-1',
    storeId: 'store-sultan-grill',
    storeSlug: 'sultan-lounge-grill',
    storeNameAr: 'لاونج ومشاوي السلطان الفاخر',
    nameAr: 'مشكل مشاوي السلطان الفاخر (4 أسياخ + مقبلات)',
    nameEn: 'Al Sultan Signature Mixed Grill Platter',
    descriptionAr: 'سيخ كباب لحم نعيمي مفروم طازج، سيخ كباب دجاج بالزعفران، سيخ شيش طاووق متبل، وريشة لحم ضأن مشوية على الفحم، تقدم مع حمص ومتبل وخبز التنور الساخن.',
    price: 118,
    originalPrice: 135,
    currency: 'ر.س',
    internalCategoryId: 'grills',
    internalCategoryNameAr: 'مشاوي على الفحم',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80'
    ],
    inStock: true,
    rating: 4.9,
    reviewCount: 450,
    attributes: [
      {
        id: 'bread_choice',
        nameAr: 'نوع الخبز',
        required: true,
        options: [
          { id: 'tannour', nameAr: 'خبز تنور طازج مع سمسم', priceModifier: 0 },
          { id: 'spicy_bread', nameAr: 'خبز بيواز حار بالبصل والبقدونس', priceModifier: 5 },
        ]
      },
      {
        id: 'drink_side',
        nameAr: 'المشروب المصاحب',
        required: false,
        options: [
          { id: 'none', nameAr: 'بدون مشروب', priceModifier: 0 },
          { id: 'fresh_pomegranate', nameAr: 'عصير رمان طبيعي طازج', priceModifier: 18 },
          { id: 'lemon_mint', nameAr: 'عصير ليمون ونعناع مثلج', priceModifier: 15 },
        ]
      }
    ],
    tagsAr: ['كباب', 'لحم نعيمي', 'مشاوي'],
    isBestSeller: true,
  },
  {
    id: 'prod-sultan-2',
    storeId: 'store-sultan-grill',
    storeSlug: 'sultan-lounge-grill',
    storeNameAr: 'لاونج ومشاوي السلطان الفاخر',
    nameAr: 'ريش لحم ضأن نعيمي مشوية ومتبلة بالأعشاب البرية',
    nameEn: 'Grilled Lamb Chops with Wild Rosemary',
    descriptionAr: 'أربع قطع من ريش الضأن الطازجة المتبلة بإكليل الجبل وزيت الزيتون البكر، مشوية بدرجة نضج مثالية وتقدم مع البطاطا المهروسة وصلصة الجريفي.',
    price: 135,
    currency: 'ر.س',
    internalCategoryId: 'grills',
    internalCategoryNameAr: 'مشاوي على الفحم',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80'
    ],
    inStock: true,
    rating: 4.8,
    reviewCount: 165,
    tagsAr: ['ريش لحم', 'ستيك', 'طازج'],
    isBestSeller: false,
    isNew: false,
  },
  {
    id: 'prod-sultan-3',
    storeId: 'store-sultan-grill',
    storeSlug: 'sultan-lounge-grill',
    storeNameAr: 'لاونج ومشاوي السلطان الفاخر',
    nameAr: 'تشكيلة مقبلات السلطان الخماسية الفاخرة',
    nameEn: 'Sultan Grand Mezza Platter (5 Varieties)',
    descriptionAr: 'حمص بيروتي بالصنوبر، متبل باذنجان مدخن، تبولة لبنانية طازجة بدبس الرمان، ورق عنب بدبس الرمان، وسلطة فتوش مقرمشة.',
    price: 68,
    currency: 'ر.س',
    internalCategoryId: 'appetizers',
    internalCategoryNameAr: 'مقبلات وسلطات',
    image: 'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&w=800&q=80'
    ],
    inStock: true,
    rating: 4.7,
    reviewCount: 190,
    tagsAr: ['حمص', 'متبل', 'ورق عنب'],
    isBestSeller: false,
  },

  // ==========================================
  // STORE: Al Alamiya (al-alamiya-smart-tech) - ELECTRONICS
  // ==========================================
  {
    id: 'prod-tech-1',
    storeId: 'store-al-alamiya',
    storeSlug: 'al-alamiya-smart-tech',
    storeNameAr: 'العالمية للإلكترونيات والأجهزة الذكية',
    nameAr: 'سماعات الرأس اللاسلكية العازلة للضوضاء Sony WH-1000XM5',
    nameEn: 'Sony WH-1000XM5 Wireless Noise-Cancelling Headphones',
    descriptionAr: 'أفضل تقنية عزل ضوضاء رائدة عالمياً مع معالج V1، بطارية تدوم حتى 30 ساعة، وميكروفونات متعددة لمكالمات فائقة النقاء بضمان الوكيل سنتين.',
    price: 1399,
    originalPrice: 1599,
    currency: 'ر.س',
    internalCategoryId: 'audio',
    internalCategoryNameAr: 'صوتيات وسماعات',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80'
    ],
    inStock: true,
    stockCount: 11,
    rating: 4.9,
    reviewCount: 380,
    attributes: [
      {
        id: 'color',
        nameAr: 'اللون المفضل',
        required: true,
        options: [
          { id: 'black', nameAr: 'أسود مطفي كلاسيكي', priceModifier: 0 },
          { id: 'silver', nameAr: 'فضي بلاتينيوم راقي', priceModifier: 0 },
          { id: 'midnight_blue', nameAr: 'أزرق كحلي داكن إصدار خاص', priceModifier: 50 },
        ]
      },
      {
        id: 'extended_warranty',
        nameAr: 'تمديد باقة الحماية والضمان',
        required: false,
        options: [
          { id: 'standard', nameAr: 'ضمان الوكيل الرسمي سنتين (مشمول)', priceModifier: 0 },
          { id: 'vip_care', nameAr: 'حماية إضافية ضد الكسر والماء لمدة 3 سنوات', priceModifier: 180 },
        ]
      }
    ],
    tagsAr: ['سوني', 'عزل ضوضاء', 'سماعات احترافية'],
    isBestSeller: true,
  },
  {
    id: 'prod-tech-2',
    storeId: 'store-al-alamiya',
    storeSlug: 'al-alamiya-smart-tech',
    storeNameAr: 'العالمية للإلكترونيات والأجهزة الذكية',
    nameAr: 'ساعة آبل الذكية Apple Watch Series 9 (GPS 45mm)',
    nameEn: 'Apple Watch Series 9 GPS 45mm Midnight Aluminum',
    descriptionAr: 'شاشة ساطعة للغاية بدرجة 2000 شمعة، حركة الضغط المزدوج الجديدة، تتبع النوم ونبضات القلب، وبطارية تدوم طوال اليوم مع الشحن السريع.',
    price: 1749,
    originalPrice: 1899,
    currency: 'ر.س',
    internalCategoryId: 'wearables',
    internalCategoryNameAr: 'ساعات وأساور ذكية',
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80'
    ],
    inStock: true,
    stockCount: 15,
    rating: 4.8,
    reviewCount: 290,
    tagsAr: ['أبل', 'ساعة ذكية', 'رياضة وصحة'],
    isBestSeller: true,
  },
  {
    id: 'prod-tech-3',
    storeId: 'store-al-alamiya',
    storeSlug: 'al-alamiya-smart-tech',
    storeNameAr: 'العالمية للإلكترونيات والأجهزة الذكية',
    nameAr: 'شاحن أنكر ماج سيف اللاسلكي 3 في 1 السريع Anker MagSafe',
    nameEn: 'Anker MagSafe 3-in-1 Fast Wireless Charging Station',
    descriptionAr: 'شحن لاسلكي متزامن لهاتف الآيفون، ساعة أبل، وسماعات إيربودز بقوة 15 واط مع هيكل ألمنيوم قابل للطي ومناسب للسفر.',
    price: 449,
    currency: 'ر.س',
    internalCategoryId: 'accessories',
    internalCategoryNameAr: 'إكسسوارات وشواحن',
    image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80'
    ],
    inStock: true,
    rating: 4.7,
    reviewCount: 110,
    tagsAr: ['أنكر', 'شاحن سريع', 'ماج سيف'],
    isBestSeller: false,
    isNew: true,
  },

  // ==========================================
  // STORE: Champs-Élysées (champs-elysees-perfumes) - BEAUTY
  // ==========================================
  {
    id: 'prod-beauty-1',
    storeId: 'store-elysees',
    storeSlug: 'champs-elysees-perfumes',
    storeNameAr: 'عطور ومكياج الشانزليزيه',
    nameAr: 'عطر النيش الملكي دي مارلي ليتون بيرفيوم (125 مل)',
    nameEn: 'Parfums de Marly Layton Royal Eau de Parfum (125ml)',
    descriptionAr: 'توليفة ساحرة تجمع بين نفحات البرغموت والتفاح المنعش، مع قلب من اللافندر والياسمين وقاعدة عنبرية غنية بالفانيليا وخشب الغاياك.',
    price: 990,
    originalPrice: 1180,
    currency: 'ر.س',
    internalCategoryId: 'perfumes',
    internalCategoryNameAr: 'عطور فاخرة ونيش',
    image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80'
    ],
    inStock: true,
    stockCount: 7,
    rating: 5.0,
    reviewCount: 310,
    attributes: [
      {
        id: 'gift_box',
        nameAr: 'تغليف الهدايا الملكي',
        required: false,
        options: [
          { id: 'standard', nameAr: 'تغليف المتجر الأصلي الفاخر', priceModifier: 0 },
          { id: 'custom_leather', nameAr: 'علبة جلد كحلية مذهبة مع بطاقة إهداء', priceModifier: 45 },
        ]
      }
    ],
    tagsAr: ['دي مارلي', 'عطور نيش', 'ثبات وفوحان'],
    isBestSeller: true,
  },
  {
    id: 'prod-beauty-2',
    storeId: 'store-elysees',
    storeSlug: 'champs-elysees-perfumes',
    storeNameAr: 'عطور ومكياج الشانزليزيه',
    nameAr: 'لوحة ظلال العيون هدى بيوتي الوردية Nude Eyeshadow',
    nameEn: 'Huda Beauty The New Nude Eyeshadow Palette',
    descriptionAr: '18 لوناً غنياً بتدرجات النيود الطبيعي والوردي، تجمع بين اللمسات المطفية واللامعة والجليتر المبتكر لإطلالة عيون ساحرة لا تُنسى.',
    price: 310,
    currency: 'ر.س',
    internalCategoryId: 'makeup',
    internalCategoryNameAr: 'مكياج وتجميل',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80'
    ],
    inStock: true,
    stockCount: 20,
    rating: 4.8,
    reviewCount: 175,
    tagsAr: ['هدى بيوتي', 'مكياج أصلي', 'عيون'],
    isBestSeller: false,
    isNew: false,
  },

  // ==========================================
  // STORE: Al Dawaa (al-dawaa-medical-care) - PHARMACIES
  // ==========================================
  {
    id: 'prod-pharma-1',
    storeId: 'store-al-dawaa',
    storeSlug: 'al-dawaa-medical-care',
    storeNameAr: 'صيدليات الدواء المتقدمة',
    nameAr: 'جهاز قياس ضغط الدم من الذراع أومرون Omron M3 Comfort',
    nameEn: 'Omron M3 Comfort Upper Arm Blood Pressure Monitor',
    descriptionAr: 'جهاز دقيق معتمد طبياً مع كف Intelli Wrap بزاوية 360 درجة للحصول على قراءات دقيقة وموثوقة، مع كاشف لعدم انتظام ضربات القلب.',
    price: 285,
    originalPrice: 340,
    currency: 'ر.س',
    internalCategoryId: 'devices',
    internalCategoryNameAr: 'أجهزة طبية وقياس',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80'
    ],
    inStock: true,
    stockCount: 16,
    rating: 4.9,
    reviewCount: 240,
    tagsAr: ['أومرون', 'ضغط الدم', 'طبي معتمد'],
    isBestSeller: true,
  },
  {
    id: 'prod-pharma-2',
    storeId: 'store-al-dawaa',
    storeSlug: 'al-dawaa-medical-care',
    storeNameAr: 'صيدليات الدواء المتقدمة',
    nameAr: 'مكمل المغنيسيوم جلايسينات عالي الامتصاص (120 كبسولة)',
    nameEn: 'Pure Magnesium Glycinate High Absorption (120 Caps)',
    descriptionAr: 'كبسولات نقية لدعم استرخاء العضلات، تحسين جودة النوم العميق، وصحة الجهاز العصبي، بدون اضطرابات في المعدة.',
    price: 115,
    currency: 'ر.س',
    internalCategoryId: 'vitamins',
    internalCategoryNameAr: 'فيتامينات ومكملات',
    image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=800&q=80'
    ],
    inStock: true,
    stockCount: 30,
    rating: 4.8,
    reviewCount: 195,
    tagsAr: ['مغنيسيوم', 'نوم مريح', 'فيتامينات'],
    isBestSeller: true,
    isNew: true,
  },

  // ==========================================
  // STORE: Tamimi Markets (tamimi-markets-express) - SUPERMARKETS
  // ==========================================
  {
    id: 'prod-market-1',
    storeId: 'store-tamimi',
    storeSlug: 'tamimi-markets-express',
    storeNameAr: 'أسواق التميمي سلكت',
    nameAr: 'سلة الفواكه العضوية الطازجة الفاخرة (5 كجم مشكل)',
    nameEn: 'Organic Fresh Fruits Selection Basket (5kg)',
    descriptionAr: 'مجموعة منتقاة بعناية من التفاح الوردي العضوي، البرتقال الفالنسي، العنب الأحمر بدون بذور، التوت الأزرق، والموز الطبيعي عالي الجودة.',
    price: 89,
    currency: 'ر.س',
    internalCategoryId: 'fresh',
    internalCategoryNameAr: 'خضار وفواكه طازجة',
    image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=800&q=80'
    ],
    inStock: true,
    rating: 4.9,
    reviewCount: 160,
    tagsAr: ['فواكه طازجة', 'عضوي', 'صحي'],
    isBestSeller: true,
  },

  // ==========================================
  // STORE: Royal Pet Boutique (royal-pet-boutique) - PETS
  // ==========================================
  {
    id: 'prod-pet-1',
    storeId: 'store-royal-pet',
    storeSlug: 'royal-pet-boutique',
    storeNameAr: 'واحة الحيوانات الأليفة الملكية',
    nameAr: 'طعام جاف للقطط رويال كانين فيت 32 (4 كجم)',
    nameEn: 'Royal Canin Fit 32 Adult Cat Dry Food (4kg)',
    descriptionAr: 'تركيبة غذائية متوازنة للقطط البالغة تدعم الحفاظ على الوزن المثالي، وتقليل كرات الشعر، وتقوية جهاز المناعة وصحة الجهاز البولي.',
    price: 185,
    originalPrice: 210,
    currency: 'ر.س',
    internalCategoryId: 'cats',
    internalCategoryNameAr: 'طعام ومستلزمات القطط',
    image: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=800&q=80'
    ],
    inStock: true,
    stockCount: 22,
    rating: 4.9,
    reviewCount: 280,
    tagsAr: ['رويال كانين', 'طعام قطط', 'صحي'],
    isBestSeller: true,
  }
];
