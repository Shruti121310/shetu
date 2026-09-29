/**
 * সেতু (Shetu) - Dummy Data & Utilities
 * Central repository of mock data for prototype demonstration
 * Designed for seamless future transition to Django ORM & PostgreSQL
 */

// Bengali Number Converter
function toBanglaNumber(num) {
  if (num === null || num === undefined) return '';
  const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return num.toString().replace(/[0-9]/g, digit => banglaDigits[digit]);
}

// Format relative expiry time in Bangla
function formatRelativeTime(hoursFromNow) {
  const hours = Math.floor(hoursFromNow);
  const minutes = Math.floor((hoursFromNow - hours) * 60);
  if (hours > 0 && minutes > 0) {
    return `${toBanglaNumber(hours)} ঘণ্টা ${toBanglaNumber(minutes)} মিনিট বাকি`;
  } else if (hours > 0) {
    return `${toBanglaNumber(hours)} ঘণ্টা বাকি`;
  } else {
    return `${toBanglaNumber(minutes)} মিনিট বাকি`;
  }
}

// 🍱 আহার সেতু (Food Listings Dummy Data)
const foodListings = [
  {
    id: 1,
    title: "চিকেন বিরিয়ানি ও বোরহানি",
    category: "রান্না করা খাবার",
    servings: 10,
    servingsText: "১০ জনের জন্য",
    cookedTime: "২ ঘণ্টা আগে রান্না হয়েছে",
    expiryHours: 1.4, // 1 hr 24 mins
    expiryTimestamp: Date.now() + 1.4 * 60 * 60 * 1000,
    distance: 1.8,
    distanceText: "১.৮ কিমি দূরে",
    location: "ধানমন্ডি ২৭, ঢাকা",
    status: "available", // available, reserved, expired
    statusBangla: "পাওয়া যাচ্ছে",
    donor: {
      name: "সুলতান’স ডাইন (ধানমন্ডি ব্রাঞ্চ)",
      type: "রেস্টুরেন্ট",
      isVerified: true,
      phone: "০১৭১২-৩৪৫৬৭৮",
      rating: "৪.৯"
    },
    deliveryMethods: ["volunteer", "pickup", "paid"],
    deliveryMethodText: "স্বেচ্ছাসেবক অথবা নিজে সংগ্রহ",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&auto=format&fit=crop&q=80",
    description: "একটি পারিবারিক অনুষ্ঠানের অতিরিক্ত খাবার। সম্পূর্ণ স্বাস্থ্যসম্মত উপায়ে প্যাকেট করা রয়েছে। গরম এবং ফ্রেশ অবস্থায় আছে।"
  },
  {
    id: 2,
    title: "সবজি খিচুড়ি ও ডিম ভুনা",
    category: "রান্না করা খাবার",
    servings: 25,
    servingsText: "২৫ জনের জন্য",
    cookedTime: "১ ঘণ্টা আগে রান্না হয়েছে",
    expiryHours: 3.5,
    expiryTimestamp: Date.now() + 3.5 * 60 * 60 * 1000,
    distance: 2.5,
    distanceText: "২.৫ কিমি দূরে",
    location: "মিরপুর ১০, ঢাকা",
    status: "available",
    statusBangla: "পাওয়া যাচ্ছে",
    donor: {
      name: "আল-মদিনা ক্যাটারিং",
      type: "ক্যাটারিং",
      isVerified: true,
      phone: "০১৮১৯-৮৭৬৫৪৩",
      rating: "৪.৮"
    },
    deliveryMethods: ["volunteer", "pickup"],
    deliveryMethodText: "স্বেচ্ছাসেবকের সাহায্য পাওয়া যাবে",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&auto=format&fit=crop&q=80",
    description: "ক্যাটারিং সার্ভিসের উদ্বৃত্ত খাবার। মোট ২৫টি বক্সে আলাদাভাবে প্যাকেজিং করা আছে। কোনো দুস্থ বা এতিমখানায় পৌঁছে দেওয়ার জন্য উপযুক্ত।"
  },
  {
    id: 3,
    title: "তাজা বেকারি পাউরুটি ও কেক",
    category: "প্যাকেটজাত খাবার",
    servings: 15,
    servingsText: "১৫ জনের জন্য",
    cookedTime: "আজ সকালে তৈরি",
    expiryHours: 8.0,
    expiryTimestamp: Date.now() + 8.0 * 60 * 60 * 1000,
    distance: 0.9,
    distanceText: "০.৯ কিমি দূরে",
    location: "কান্দিরপাড়, কুমিল্লা",
    status: "available",
    statusBangla: "পাওয়া যাচ্ছে",
    donor: {
      name: "আনন্দ বেকারি",
      type: "দোকান",
      isVerified: true,
      phone: "০১৭৩৩-১১২২৩৩",
      rating: "৪.৭"
    },
    deliveryMethods: ["pickup"],
    deliveryMethodText: "নিজে এসে সংগ্রহ করতে হবে",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&auto=format&fit=crop&q=80",
    description: "আজকের তৈরি ফ্রেশ পাউরুটি ও ড্রাই কেক। আগামীকাল সকাল পর্যন্ত সম্পূর্ণ ভালো থাকবে। প্রয়োজনীয় যেকোনো পরিবার সংগ্রহ করতে পারবেন।"
  },
  {
    id: 4,
    title: "ফলমূল (কলা ও আপেল)",
    category: "কাঁচা খাদ্যদ্রব্য",
    servings: 12,
    servingsText: "১২ জনের জন্য",
    cookedTime: "তাজা সংগৃহীত",
    expiryHours: 24.0,
    expiryTimestamp: Date.now() + 24.0 * 60 * 60 * 1000,
    distance: 4.2,
    distanceText: "৪.২ কিমি দূরে",
    location: "জিইসি মোড়, চট্টগ্রাম",
    status: "available",
    statusBangla: "পাওয়া যাচ্ছে",
    donor: {
      name: "তানভীর আহমেদ",
      type: "ব্যক্তিগত দাতা",
      isVerified: false,
      phone: "০১৬১১-৯৮৭৬৫৪",
      rating: "৫.০"
    },
    deliveryMethods: ["volunteer", "paid"],
    deliveryMethodText: "স্বেচ্ছাসেবক বা পেইড ডেলিভারি",
    image: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=800&auto=format&fit=crop&q=80",
    description: "পারিবারিক অনুষ্ঠানের জন্য কেনা হয়েছিল, বাড়তি থেকে গেছে। সম্পূর্ণ ফ্রেশ ফল।"
  },
  {
    id: 5,
    title: "বাসমতী চালের পোলাও ও মুরগির রোস্ট",
    category: "রান্না করা খাবার",
    servings: 40,
    servingsText: "৪০ জনের জন্য",
    cookedTime: "৩ ঘণ্টা আগে",
    expiryHours: 0.8, // 48 mins left
    expiryTimestamp: Date.now() + 0.8 * 60 * 60 * 1000,
    distance: 3.1,
    distanceText: "৩.১ কিমি দূরে",
    location: "উত্তরা সেক্টর ৪, ঢাকা",
    status: "available",
    statusBangla: "পাওয়া যাচ্ছে (জরুরি)",
    donor: {
      name: "হোয়াইট প্যালেস কমিউনিটি সেন্টার",
      type: "কমিউনিটি সেন্টার",
      isVerified: true,
      phone: "০১৯২২-৫৫৪৪৩৩",
      rating: "৪.৯"
    },
    deliveryMethods: ["volunteer", "pickup"],
    deliveryMethodText: "জরুরি ভিত্তিতে স্বেচ্ছাসেবক প্রয়োজন",
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=800&auto=format&fit=crop&q=80",
    description: "একটি বিয়ের অনুষ্ঠানের ফ্রেশ খাবার। বড় হটপটে সংরক্ষিত আছে। দ্রুত নিয়ে যেতে হবে।"
  },
  {
    id: 6,
    title: "দুপুরের ভাত, ডাল ও রুই মাছ",
    category: "রান্না করা খাবার",
    servings: 6,
    servingsText: "৬ জনের জন্য",
    cookedTime: "৫ ঘণ্টা আগে",
    expiryHours: -0.2, // Expired demo
    expiryTimestamp: Date.now() - 0.2 * 60 * 60 * 1000,
    distance: 5.5,
    distanceText: "৫.৫ কিমি দূরে",
    location: "ট্রাঙ্ক রোড, ফেনী",
    status: "expired",
    statusBangla: "মেয়াদ শেষ",
    donor: {
      name: "রাশেদ চৌধুরী",
      type: "ব্যক্তিগত দাতা",
      isVerified: false,
      phone: "০১৮৭৭-৬৬৫৫৪৪",
      rating: "৪.২"
    },
    deliveryMethods: ["pickup"],
    deliveryMethodText: "মেয়াদ উত্তীর্ণ হয়ে গেছে",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80",
    description: "দুপুরের অতিরিক্ত রান্না করা খাবার। ইতিমধ্যে নির্দিষ্ট সময় পার হয়ে যাওয়ায় বিতরণ বন্ধ।"
  }
];

// 👕 বস্ত্র সেতু (Clothes Listings Dummy Data)
const clothesListings = [
  {
    id: 101,
    title: "শীতের উষ্ণ জ্যাকেট (হুডি সহ)",
    category: "শীতের পোশাক",
    target: "শিশু",
    age: "৮-১২ বছর",
    size: "M",
    condition: "ভালো",
    conditionBadge: "ভালো অবস্থা",
    quantity: "১ টি",
    distance: 2.4,
    distanceText: "২.৪ কিমি দূরে",
    location: "বনশ্রী, ঢাকা",
    status: "available",
    statusBangla: "পাওয়া যাচ্ছে",
    donor: {
      name: "সাদিয়া জাহান",
      type: "ব্যক্তিগত দাতা",
      isVerified: true,
      phone: "০১৫২১-৩৩৪৪৭৭"
    },
    deliveryMethods: ["pickup", "volunteer"],
    image: "https://images.unsplash.com/photo-1544441893-675973e31985?w=800&auto=format&fit=crop&q=80",
    description: "ছোট ভাইয়ের জ্যাকেট, এখন ছোট হয়ে গেছে তাই দান করতে চাই। কোনো ছেঁড়া বা দাগ নেই, চেইন সম্পূর্ণ ঠিক আছে।"
  },
  {
    id: 102,
    title: "উলের নরম কম্বল (ডাবল)",
    category: "শীতের পোশাক",
    target: "সাধারণ",
    age: "যেকোনো বয়স",
    size: "L",
    condition: "নতুন",
    conditionBadge: "একদম নতুন",
    quantity: "২ টি",
    distance: 1.5,
    distanceText: "১.৫ কিমি দূরে",
    location: "লালমাটিয়া, ঢাকা",
    status: "available",
    statusBangla: "পাওয়া যাচ্ছে",
    donor: {
      name: "আহমেদ ফাউন্ডেশন",
      type: "চ্যারিটি সংস্থা",
      isVerified: true,
      phone: "০১৯১১-২২৩৩৪৪"
    },
    deliveryMethods: ["volunteer", "pickup"],
    image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=800&auto=format&fit=crop&q=80",
    description: "শীতার্থ কোনো পরিবার বা আশ্রয়হীন মানুষের জন্য ২টি নতুন কম্বল। সরাসরি প্যাকেটজাত।"
  },
  {
    id: 103,
    title: "স্কুল ড্রেস ও শার্ট সেট",
    category: "স্কুল/কলেজের পোশাক",
    target: "শিশু",
    age: "৬-৯ বছর",
    size: "S",
    condition: "ভালো",
    conditionBadge: "ব্যবহারযোগ্য",
    quantity: "২ জোড়া",
    distance: 3.2,
    distanceText: "৩.২ কিমি দূরে",
    location: "মাইজদী কোর্ট, নোয়াখালী",
    status: "available",
    statusBangla: "পাওয়া যাচ্ছে",
    donor: {
      name: "ফারহানা আক্তার",
      type: "শিক্ষিকা",
      isVerified: true,
      phone: "০১৮২২-৩৩৪৪৫৫"
    },
    deliveryMethods: ["pickup"],
    image: "https://images.unsplash.com/photo-1622445262464-84b1456045b6?w=800&auto=format&fit=crop&q=80",
    description: "সাদা স্কুল শার্ট এবং নেভি ব্লু প্যান্ট। সরকারি বা যেকোনো প্রাথমিক বিদ্যালয়ের ছাত্রদের উপযোগী।"
  },
  {
    id: 104,
    title: "সুতি শাড়ি ও শাল",
    category: "ঐতিহ্যবাহী পোশাক",
    target: "নারী",
    age: "প্রাপ্তবয়স্ক",
    size: "ফ্রি সাইজ",
    condition: "ভালো",
    conditionBadge: "ভালো অবস্থা",
    quantity: "৩ টি",
    distance: 4.8,
    distanceText: "৪.৮ কিমি দূরে",
    location: "চকবাজার, চট্টগ্রাম",
    status: "available",
    statusBangla: "পাওয়া যাচ্ছে",
    donor: {
      name: "নাজমা বেগম",
      type: "ব্যক্তিগত দাতা",
      isVerified: false,
      phone: "০১৭৭৭-৮৮৯৯০০"
    },
    deliveryMethods: ["pickup", "volunteer", "paid"],
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop&q=80",
    description: "ব্যবহার করা হয়েছে খুব কম, ধোয়া ও ইস্ত্রি করা আছে। যেকোনো অভাবী মা-বোনের উপকারে আসবে।"
  },
  {
    id: 105,
    title: "পুরুষদের ফর্মাল শার্ট ও গ্যাবার্ডিন প্যান্ট",
    category: "সাধারণ পোশাক",
    target: "পুরুষ",
    age: "তরুণ/প্রাপ্তবয়স্ক",
    size: "XL",
    condition: "মোটামুটি ভালো",
    conditionBadge: "ব্যবহারযোগ্য",
    quantity: "৪ টি",
    distance: 2.1,
    distanceText: "২.১ কিমি দূরে",
    location: "টমছম ব্রিজ, কুমিল্লা",
    status: "available",
    statusBangla: "পাওয়া যাচ্ছে",
    donor: {
      name: "মাহমুদুল হাসান",
      type: "ব্যক্তিগত দাতা",
      isVerified: true,
      phone: "০১৬৮৮-৯৯০০১১"
    },
    deliveryMethods: ["volunteer", "pickup"],
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&auto=format&fit=crop&q=80",
    description: "অফিস বা চাকরির ইন্টারভিউয়ের জন্য উপযুক্ত পরিচ্ছন্ন শার্ট ও প্যান্ট।"
  }
];

// 📚 গ্রন্থ সেতু (Books Listings Dummy Data)
const bookListings = [
  {
    id: 201,
    title: "Clean Code",
    subtitle: "A Handbook of Agile Software Craftsmanship",
    author: "Robert C. Martin",
    category: "কম্পিউটার সায়েন্স / প্রোগ্রামিং",
    mode: "borrow", // donate, borrow, exchange
    modeBangla: "ধার",
    borrowDays: 30,
    owner: "আব্দুল্লাহ আল মামুন",
    ownerType: "শিক্ষার্থী, বুয়েট",
    isVerified: true,
    distance: 1.5,
    distanceText: "১.৫ কিমি দূরে",
    location: "আজিমপুর, ঢাকা",
    status: "available",
    statusBangla: "পাওয়া যাচ্ছে",
    coverImage: "https://images.unsplash.com/photo-1532012164546-f432f2e3edd4?w=800&auto=format&fit=crop&q=80",
    description: "সফটওয়্যার ইঞ্জিনিয়ারিংয়ের জন্য অবশ্য পাঠ্য একটি বই। ১৫ বা ৩০ দিনের জন্য ধার দেওয়া হবে। যত্নে পড়তে হবে।"
  },
  {
    id: 202,
    title: "Database System Concepts",
    subtitle: "Seventh Edition",
    author: "Silberschatz, Korth, Sudarshan",
    category: "একাডেমিক / টেক্সটবুক",
    mode: "exchange",
    modeBangla: "বিনিময়",
    exchangeWish: "C++ Programming অথবা Operating System Concepts",
    owner: "মো: রহিম উল্লাহ",
    ownerType: "সিএসই শিক্ষার্থী",
    isVerified: true,
    distance: 2.2,
    distanceText: "২.২ কিমি দূরে",
    location: "বাড্ডা, ঢাকা",
    status: "available",
    statusBangla: "বিনিময়যোগ্য",
    coverImage: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80",
    description: "ডাটাবেজ সিস্টেমস সম্পূর্ণ কনসেপ্ট বই। আমি এখন C++ Programming অথবা OS এর বইয়ের সাথে বিনিময় করতে চাই।"
  },
  {
    id: 203,
    title: "সঞ্চয়িতা (কাব্যসংকলন)",
    subtitle: "রবীন্দ্রনাথ ঠাকুর সমগ্র",
    author: "রবীন্দ্রনাথ ঠাকুর",
    category: "বাংলা সাহিত্য ও কবিতা",
    mode: "donate",
    modeBangla: "দান",
    borrowDays: null,
    owner: "প্রফেসর ড. আনিসুর রহমান",
    ownerType: "অবসরপ্রাপ্ত শিক্ষক",
    isVerified: true,
    distance: 3.8,
    distanceText: "৩.৮ কিমি দূরে",
    location: "ঝিলটুলি, ফরিদপুর",
    status: "available",
    statusBangla: "সম্পূর্ণ দান",
    coverImage: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&auto=format&fit=crop&q=80",
    description: "আমার সংগ্রহে দুটি কপি রয়েছে। কোনো সাহিত্যপ্রেমী বা শিক্ষার্থীকে স্থায়ীভাবে উপহার দিতে চাই।"
  },
  {
    id: 204,
    title: "এইচএসসি পদার্থবিজ্ঞান ১ম ও ২য় পত্র",
    subtitle: "ড. শাহজাহান তপন",
    author: "ড. শাহজাহান তপন",
    category: "উচ্চ মাধ্যমিক গাইড ও বই",
    mode: "donate",
    modeBangla: "দান",
    borrowDays: null,
    owner: "তানজিলা হক",
    ownerType: "মেডিকেল শিক্ষার্থী",
    isVerified: false,
    distance: 1.1,
    distanceText: "১.১ কিমি দূরে",
    location: "শোলকবহর, চট্টগ্রাম",
    status: "available",
    statusBangla: "সম্পূর্ণ দান",
    coverImage: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&auto=format&fit=crop&q=80",
    description: "এইচএসসি পরীক্ষায় ভালো ফলাফলের পর বইটি অন্য কোনো আর্থিক অনটনে থাকা ছোট ভাই বা বোনকে দিতে চাই।"
  },
  {
    id: 205,
    title: "গণিত অলিম্পিয়াড প্রস্তুতি",
    subtitle: "সমস্যা ও সমাধান সমগ্র",
    author: "মুনির হাসান",
    category: "অলিম্পিয়াড ও বিজ্ঞান",
    mode: "borrow",
    modeBangla: "ধার",
    borrowDays: 15,
    owner: "সাকিব আল হাসান",
    ownerType: "বিশ্ববিদ্যালয় শিক্ষার্থী",
    isVerified: true,
    distance: 4.0,
    distanceText: "৪.০ কিমি দূরে",
    location: "শাসনগাছা, কুমিল্লা",
    status: "available",
    statusBangla: "পাওয়া যাচ্ছে",
    coverImage: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&auto=format&fit=crop&q=80",
    description: "স্কুল বা কলেজের গণিতপ্রেমীদের জন্য। ১৫ দিনের জন্য ধার নিতে পারেন।"
  }
];

// 🔔 Notifications Data
const notificationsList = [
  {
    id: 1,
    type: "food",
    category: "খাবারের বিজ্ঞপ্তি",
    title: "🍱 আপনার কাছাকাছি খাবার পাওয়া গেছে",
    message: "১০ জনের জন্য বিরিয়ানি ও বোরহানি আপনার অবস্থান থেকে ১.৮ কিমি দূরে পাওয়া যাচ্ছে।",
    distance: "১.৮ কিমি",
    timeRemaining: "১ ঘণ্টা ২০ মিনিট বাকি",
    timestamp: "১০ মিনিট আগে",
    isUnread: true,
    link: "pages/food-details.html?id=1",
    actionText: "খাবারটি দেখুন"
  },
  {
    id: 2,
    type: "exchange",
    category: "বিনিময়ের অনুরোধ",
    title: "🔄 নতুন বই বিনিময়ের প্রস্তাব এসেছে",
    message: "রহিম আপনার 'C++ Programming' বইটি চান। বিনিময়ে 'Database System Concepts' বইটি দিতে চেয়েছেন।",
    distance: "২.২ কিমি",
    timeRemaining: "",
    timestamp: "২৫ মিনিট আগে",
    isUnread: true,
    link: "pages/book-exchange.html",
    actionText: "প্রস্তাব দেখুন"
  },
  {
    id: 3,
    type: "book_return",
    category: "বই ফেরত দেওয়ার স্মরণপত্র",
    title: "📖 বই ফেরত দেওয়ার সময় ঘনিয়ে এসেছে",
    message: "আপনার ধার নেওয়া 'Clean Code' বইটি আগামী ৩১ অক্টোবরের মধ্যে ফেরত দিতে অনুরোধ করা হচ্ছে।",
    distance: "",
    timeRemaining: "৫ দিন বাকি",
    timestamp: "২ ঘণ্টা আগে",
    isUnread: false,
    link: "pages/book-borrow.html",
    actionText: "বিস্তারিত দেখুন"
  },
  {
    id: 4,
    type: "volunteer",
    category: "স্বেচ্ছাসেবকের কাজ",
    title: "🤝 জরুরি খাদ্য ডেলিভারি অনুরোধ",
    message: "সুলতান’স ডাইন থেকে এতিমখানায় খাবার পৌঁছে দিতে একজন স্বেচ্ছাসেবক আহ্বান করা হয়েছে।",
    distance: "১.২ কিমি",
    timeRemaining: "জরুরি",
    timestamp: "৩ ঘণ্টা আগে",
    isUnread: false,
    link: "pages/volunteers.html",
    actionText: "কাজটি গ্রহণ করুন"
  },
  {
    id: 5,
    type: "delivery",
    category: "ডেলিভারি আপডেট",
    title: "🚚 শীতের পোশাক ডেলিভারি সম্পন্ন",
    message: "আপনার দানকৃত জ্যাকেটটি সুবিধাবঞ্চিত শিশুর হাতে সফলভাবে হস্তান্তর করা হয়েছে।",
    distance: "",
    timeRemaining: "",
    timestamp: "গতকাল",
    isUnread: false,
    link: "pages/dashboard.html",
    actionText: "ইতিহাস দেখুন"
  }
];

// 🤝 Volunteer Tasks Dummy Data
const volunteerTasks = [
  {
    id: "VOL-101",
    title: "সুলতান’স ডাইন হতে খাবার সংগ্রহ",
    type: "খাবার সংগ্রহ ও পৌঁছে দেওয়া",
    pickupLocation: "ধানমন্ডি ২৭, ঢাকা",
    dropLocation: "পথকলি শিশু আশ্রম, রায়েরবাজার",
    distance: 1.2,
    distanceText: "১.২ কিমি",
    items: "১০ জনের প্যাকেটজাত বিরিয়ানি",
    expiryTime: "১ ঘণ্টা ৩০ মিনিট বাকি",
    points: 40,
    status: "nearby", // nearby, in_progress, completed
    statusBangla: "কাছাকাছি কাজ"
  },
  {
    id: "VOL-102",
    title: "শীতবস্ত্র সংগ্রহ ও বিতরণ",
    type: "কাপড় ডেলিভারি",
    pickupLocation: "লালমাটিয়া ডি ব্লক",
    dropLocation: "কমলাপুর রেলওয়ে স্টেশন ভাসমান মানুষ",
    distance: 3.5,
    distanceText: "৩.৫ কিমি",
    items: "২টি উলের ডাবল কম্বল",
    expiryTime: "আজ সন্ধ্যা ৮টা",
    points: 60,
    status: "in_progress",
    statusBangla: "চলমান ডেলিভারি"
  },
  {
    id: "VOL-103",
    title: "বই পৌঁছে দেওয়া",
    type: "বই বিনিময় সহায়তা",
    pickupLocation: "আজিমপুর এস্টেট",
    dropLocation: "ঢাকা বিশ্ববিদ্যালয় ক্যাম্পাস",
    distance: 1.8,
    distanceText: "১.৮ কিমি",
    items: "১টি কম্পিউটার সায়েন্স বই",
    expiryTime: "সম্পন্ন",
    points: 30,
    status: "completed",
    statusBangla: "সম্পন্ন"
  }
];

// 🎁 Volunteer Rewards Catalog
const volunteerRewards = [
  {
    id: "REW-1",
    title: "৳১০০ পার্টনার ভাউচার",
    partner: "স্বপ্ন সুপারশপ / চালডাল",
    pointsRequired: 500,
    icon: "ticket"
  },
  {
    id: "REW-2",
    title: "বুকস্টোর ২০% ছাড় ভাউচার",
    partner: "রকমারি ডট কম ও বাতিঘর",
    pointsRequired: 300,
    icon: "book"
  },
  {
    id: "REW-3",
    title: "রেস্টুরেন্ট ছাড় ভাউচার (৳১৫০)",
    partner: "সিলেক্টেড পার্টনার ফুড কর্নার",
    pointsRequired: 400,
    icon: "utensils"
  }
];

// 📊 Impact Stats (Platform Statistics)
const impactStats = {
  totalDonations: "১,২৫০+",
  successfulConnections: "৮৫০+",
  activeVolunteers: "৩২০+",
  sharedItems: "২,৪০০+"
};

// 👤 Current User Mock Profile
const currentUser = {
  name: "আসিফ ইকবাল",
  email: "asif.iqbal@example.com",
  phone: "০১৭১১-২২৩৩৪৪",
  role: "সক্রিয় দাতা ও স্বেচ্ছাসেবক",
  isVerified: true,
  location: "ধানমন্ডি, ঢাকা",
  joinedDate: "মার্চ ২০২৫",
  points: 340,
  stats: {
    totalDonations: 14,
    activeRequests: 3,
    borrowedBooks: 2,
    successfulDeliveries: 19
  }
};

// 🛡️ Admin Mock Data
const adminData = {
  stats: {
    totalUsers: "২,৭৫০",
    activeDonations: "১৮৫",
    foodDonations: "৬২",
    clothesDonations: "৭৮",
    booksDonations: "৪৫",
    volunteersCount: "৩২০",
    pendingReports: "৭",
    completedDeliveries: "১,৮৪০"
  },
  usersList: [
    { id: 1, name: "সুলতান’স ডাইন", email: "sultans@dhaka.com", role: "যাচাইকৃত সামাজিক দাতা", status: "সক্রিয়", badge: "verified" },
    { id: 2, name: "আসিফ ইকবাল", email: "asif@example.com", role: "স্বেচ্ছাসেবক", status: "সক্রিয়", badge: "volunteer" },
    { id: 3, name: "সাদিয়া জাহান", email: "sadia@gmail.com", role: "সাধারণ ব্যবহারকারী", status: "সক্রিয়", badge: "user" },
    { id: 4, name: "সন্দেহজনক ইউজার ১২", email: "fake99@tempmail.com", role: "সাধারণ ব্যবহারকারী", status: "অপেক্ষমাণ রিপোর্ট", badge: "warning" }
  ],
  listingsList: [
    { id: 101, title: "চিকেন বিরিয়ানি ও বোরহানি", category: "আহার সেতু", donor: "সুলতান’স ডাইন", status: "অনুমোদিত" },
    { id: 102, title: "শীতের উষ্ণ জ্যাকেট", category: "বস্ত্র সেতু", donor: "সাদিয়া জাহান", status: "অনুমোদিত" },
    { id: 103, title: "Clean Code", category: "গ্রন্থ সেতু", donor: "আব্দুল্লাহ আল মামুন", status: "অনুমোদিত" },
    { id: 104, title: "মেয়াদোত্তীর্ণ বাসি খাবার", category: "আহার সেতু", donor: "অজ্ঞাত দাতা", status: "পর্যালোচনাধীন" }
  ],
  reportsList: [
    { id: 501, item: "মেয়াদোত্তীর্ণ বাসি খাবার", reporter: "তানভীর হাসান", reason: "ভুল তথ্য ও স্বাস্থ্য ঝুঁকি", status: "অমীমাংসিত" },
    { id: 502, item: "সন্দেহজনক ইউজার ১২", reporter: "ফারহানা মিম", reason: "ভুয়া পোস্ট ও অতিরিক্ত অর্থ দাবি", status: "অমীমাংসিত" }
  ]
};

// Export to window for vanilla JS access across pages
window.ShetuData = {
  foodListings,
  clothesListings,
  bookListings,
  notificationsList,
  volunteerTasks,
  volunteerRewards,
  impactStats,
  currentUser,
  adminData,
  toBanglaNumber,
  formatRelativeTime
};
