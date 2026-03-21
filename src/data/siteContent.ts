/**
 * =====================================================
 * VIBRANT CHURCH - EDITABLE SITE CONTENT
 * =====================================================
 * 
 * 🎯 HOW TO EDIT THIS FILE:
 * 
 * 1. Find the section you want to edit (Hero, Mission, etc.)
 * 2. Change the text between the quotation marks " "
 * 3. For images, replace the import path with your new image
 * 4. Save the file - changes appear immediately!
 * 
 * ⚠️ IMPORTANT RULES:
 * - Only change text inside quotation marks " "
 * - Don't delete any lines or change property names
 * - Don't change the structure (colons, commas, brackets)
 * - Image files should be placed in: src/assets/church/
 * 
 * =====================================================
 */

// ==================== IMAGE IMPORTS ====================
// To change an image: Replace the file in src/assets/church/
// and update the import path below

import heroImage from '@/assets/church/hero-worship.png';
import communityImage from '@/assets/church/community.png';
import worshipImage from '@/assets/church/worship.png';
import youthImage from '@/assets/church/youth-group.jpeg';
import prayerImage from '@/assets/church/prayer-group.jpeg';
import leadershipImage1 from '@/assets/church/leadership-1.png';
import leadershipImage2 from '@/assets/church/leadership-2.png';

// ==================== EXPORTED IMAGES ====================
export const siteImages = {
  hero: heroImage,
  community: communityImage,
  worship: worshipImage,
  youth: youthImage,
  prayer: prayerImage,
  leadership1: leadershipImage1,
  leadership2: leadershipImage2,
};

// =====================================================
// 🏠 HERO SECTION (Top of homepage)
// =====================================================
export const heroContent = {
  // Main headline - appears in large text
  headline: "Welcome",
  headlineContinued: "to",
  
  // Church name - highlighted in gold
  churchName: "Vibrant",
  churchNameSuffix: "Church",
  
  // Subheadline - smaller text below headline
  subheadline: "Join us Sundays at 10:00 AM —",
  subheadlineSecondLine: "real worship, real community, real purpose.",
  
  // Circular button text
  ctaButtonText: "Plan your\nvisit",
};

// =====================================================
// ✝️ MISSION SECTION (Below hero)
// =====================================================
export const missionContent = {
  // Main headline
  headline: "A church that believes in Jesus,",
  headlineHighlight: "loves God",
  headlineContinued: "and people",
  
  // Paragraph text
  paragraph: "Welcome to Vibrant Church — a warm, welcoming church family located in the heart of Terre Hill. Whether you've been following Jesus for years or you're just beginning to explore faith, you are welcome here. Our desire is to create a place where people feel loved, accepted, and encouraged to grow spiritually.",
};

// =====================================================
// 🎴 QUICK ACTION CARDS (3 cards below mission)
// =====================================================
export const quickActionCards = [
  {
    title: "I'm New",
    description: "We are glad you are here! We look forward to connecting with you.",
    buttonText: "Plan a Visit",
  },
  {
    title: "Connect With Us",
    description: "Our team is here to answer any of your questions or provide more info about our church.",
    buttonText: "Get Connected",
  },
  {
    title: "Join a Group",
    description: "We place a high value on connecting in community with others. Find a group that's right for you.",
    buttonText: "View Groups",
  },
];

// =====================================================
// 🙏 BELIEFS SECTION (Blue background section)
// =====================================================
export const beliefsContent = {
  // Small text above headline
  eyebrowText: "Beliefs That Unite Us",
  
  // Main headline
  headline: "Empowered by God to reach others for Christ",
  
  // Paragraph text
  paragraph: "Vibrant Church is a community of people who love God and love one another. We believe church should feel like home — a place where you are accepted, supported, and encouraged.\n\nWe are passionate about helping people grow in their relationship with Jesus and discover the purpose God has for their lives.",
  
  // Button text
  buttonText: "Learn More About Us",
};

// =====================================================
// ⏰ SERVICE INFO STRIP (Gold banner)
// =====================================================
export const serviceInfoContent = {
  // Service time
  serviceTime: "Sundays at 10:00 AM",
  serviceSubtext: "Join us for worship!",
  
  // Address
  streetAddress: "113 Conestoga Street",
  cityStateZip: "Terre Hill, PA",
  
  // Button text
  buttonText: "Get Directions",
};

// =====================================================
// 👋 WHAT TO EXPECT SECTION (6 cards)
// =====================================================
export const expectationsContent = {
  // Section header
  sectionTitle: "What to Expect",
  sectionSubtitle: "When you visit Vibrant Church, you can expect:",
  
  // Individual cards - edit title and description for each
  cards: [
    {
      title: "Friendly, welcoming people",
      description: "You'll be greeted with warm smiles and genuine hospitality from the moment you arrive.",
    },
    {
      title: "Casual and comfortable atmosphere",
      description: "Come as you are! Jeans, shorts, or dresses—whatever makes you comfortable.",
    },
    {
      title: "Inspiring worship music",
      description: "Experience uplifting contemporary music that helps connect your heart to God.",
    },
    {
      title: "A practical, Bible-based message",
      description: "Practical messages from the Bible that apply to your everyday life.",
    },
    {
      title: "A safe and loving place for kids",
      description: "We love kids! Safe, fun, and age-appropriate programs for children.",
    },
    {
      title: "A community that truly cares",
      description: "Life is better together. Find genuine friendships and support.",
    },
  ],
};

// =====================================================
// 📅 UPCOMING EVENTS SECTION
// =====================================================
export const eventsContent = {
  // Section header
  sectionTitle: "Upcoming Events",
  sectionSubtitle: "There's always something happening at Vibrant Church. Come join us!",
  
  // Button at bottom
  viewAllButtonText: "View All Events",
  
  // Individual events - edit as needed
  events: [
    {
      id: 1,
      title: "Sunday Worship Service",
      date: "Every Sunday",
      time: "10:00 AM",
      description: "Join us for worship, fellowship, and an inspiring message.",
    },
    {
      id: 2,
      title: "Community Prayer Night",
      date: "January 22, 2026",
      time: "7:00 PM",
      description: "Come together for a powerful evening of prayer and intercession.",
    },
    {
      id: 3,
      title: "Youth Group Gathering",
      date: "Every Wednesday",
      time: "6:30 PM",
      description: "Middle and high school students connect through games, worship, and small groups.",
    },
  ],
};

// =====================================================
// 🎥 WATCH SECTION (Video/sermon section)
// =====================================================
export const watchContent = {
  // Headline
  headline: "Watch Our Latest Service",
  
  // Description paragraph
  description: "Couldn't make it in person? No problem! Watch our most recent service and stay connected with our church family from anywhere.",
  
  // Button text
  buttonText: "Watch Now",
};

// =====================================================
// ❤️ FINAL CTA SECTION (Full-width image with text)
// =====================================================
export const ctaContent = {
  // Main headline
  headline: "You Belong Here",
  
  // Subheadline/description
  subheadline: "No matter where you are in your faith journey, there's a place for you at Vibrant Church.",
  
  // Button text
  buttonText: "Plan Your Visit",
};

// =====================================================
// 🧭 FOOTER SECTION
// =====================================================
export const footerContent = {
  // Church name and mission
  churchName: "Vibrant Church",
  missionStatement: "We exist to love God, love people, and welcome everyone.",
  tagline: "A church where you belong.",
  
  // Service time
  serviceTimeLabel: "Service Times",
  serviceTime: "Sundays at 10:00 AM",
  
  // Address
  locationLabel: "Location",
  streetAddress: "113 Conestoga Street",
  cityStateZip: "Terre Hill, PA 17581",
  
  // Contact info
  contactLabel: "Get In Touch",
  phone: "+1 (559) 207-8144",
  email: "hello@vibranttchurch.org",
  
  // Copyright (year is auto-generated)
  copyrightText: "All rights reserved.",
  
  // Social media links
  socialLinks: {
    facebook: "https://www.facebook.com/terrehillvibrantchurch",
    instagram: "https://www.facebook.com/terrehillvibrantchurch",
    youtube: "https://www.youtube.com/@vibrantchurchterrehill7120",
  },
};

// =====================================================
// 🔗 NAVIGATION LINKS (Header & Footer)
// These control which pages appear in menus
// =====================================================
export const navigationLinks = [
  { name: "Home", path: "/" },
  { name: "Visit", path: "/visit" },
  { name: "About", path: "/about" },
  { name: "Watch", path: "/watch" },
  { name: "Give", path: "/give" },
  { name: "Contact", path: "/contact" },
];

// =====================================================
// =====================================================
// 📄 INDIVIDUAL PAGE CONTENT
// =====================================================
// =====================================================

// =====================================================
// 📖 ABOUT PAGE
// =====================================================
export const aboutPageContent = {
  // Hero section
  hero: {
    title: "About Us",
    description: "Vibrant Church is a welcoming community of Christ-followers in Terre Hill, Pennsylvania. We're passionate about loving God, building genuine relationships, and making a difference in our world.",
  },
  
  // Who We Are section
  whoWeAre: {
    eyebrowText: "Who We Are",
    headline: "A Place to Belong",
    paragraphs: [
      "Vibrant Church is a community of people who love God and love one another. We believe church should feel like home — a place where you are accepted, supported, and encouraged.",
      "We are passionate about helping people grow in their relationship with Jesus and discover the purpose God has for their lives.",
    ],
  },
  
  // Vision section
  vision: {
    headline: "Our Vision",
    statement: "To be a church that brings hope, healing, and new life to our community through the love of Jesus Christ.",
  },
  
  // Values section
  values: {
    eyebrowText: "Our Purpose",
    headline: "Our Values",
    items: [
      { title: "Jesus First", description: "Everything we do points to Him" },
      { title: "People Matter", description: "Everyone is valued and loved" },
      { title: "Authentic Community", description: "We grow better together" },
      { title: "Biblical Truth", description: "God's Word guides our lives" },
      { title: "Compassion & Service", description: "We serve our community with love" },
    ],
  },
  
  // Beliefs section
  beliefs: {
    headline: "What We Believe",
    intro: "We believe:",
    items: [
      "The Bible is the inspired Word of God",
      "Jesus Christ is the Son of God and Savior of the world",
      "Salvation is found through faith in Jesus",
      "The Holy Spirit guides and empowers believers",
      "The Church exists to share God's love and truth",
    ],
  },
  
  // Leadership section
  leadership: {
    eyebrowText: "Our Team",
    headline: "Our Leadership Team",
    description: "Meet the dedicated leaders serving our church family.",
    seniorPastor: {
      name: "Samy Kengela",
      role: "Senior Pastor",
      bio: "Pastor Samy leads Vibrant Church with a passion for reaching others for Christ. He and his wife Shireen are dedicated to helping people grow in their relationship with Jesus.",
    },
    overseer: {
      name: "Brian Sauder",
      role: "Overseer",
      bio: "Brian provides apostolic oversight and guidance to our church family.",
    },
    team: [
      {
        name: "Nelson & Sue Martin",
        role: "Leadership Team",
        bio: "Nelson and Sue serve faithfully on our leadership team, helping guide the vision and direction of our church.",
      },
      {
        name: "Craig & Denise Sensenig",
        role: "Leadership Team",
        bio: "Craig and Denise bring wisdom and experience to our leadership, serving our community with love.",
      },
      {
        name: "Ryan & Jen Eberly",
        role: "Leadership Team",
        bio: "Ryan and Jen are passionate about building community and helping others connect with Christ.",
      },
      {
        name: "Samy & Shireen Kengela",
        role: "Leadership Team",
        bio: "Samy and Shireen lead our church with hearts for worship, discipleship, and outreach.",
      },
    ],
  },
};

// =====================================================
// 📍 VISIT PAGE
// =====================================================
export const visitPageContent = {
  // Hero section
  hero: {
    title: "Plan Your Visit",
    description: "We know visiting a new church can feel intimidating — we want you to feel comfortable from the moment you arrive.",
  },
  
  // Service info cards
  serviceInfo: {
    serviceTimeTitle: "Service Time",
    locationTitle: "Location",
    parkingTitle: "Parking",
    parkingDescription: "Free parking available in our lot. Look for guest parking signs near the entrance.",
  },
  
  // Find Us section
  findUs: {
    headline: "Find Us",
  },
  
  // What Happens section
  whatHappens: {
    headline: "What Happens on Sunday",
    description: "Our services include:",
    items: [
      {
        title: "Uplifting worship music",
        description: "Our service includes about 20-25 minutes of contemporary worship music. Feel free to sing along, clap, or simply listen.",
      },
      {
        title: "Prayer",
        description: "We take time to pray together and bring our praises and needs before God.",
      },
      {
        title: "A message based on the Bible",
        description: "Our pastor shares a practical, Bible-based message that applies to everyday life. Services typically last about 75 minutes.",
      },
      {
        title: "Time to connect with others",
        description: "Before and after service, there's time to meet others and build friendships.",
      },
    ],
  },
  
  // Getting Here card
  gettingHere: {
    headline: "Getting Here",
    addressLabel: "Address",
    dressCodeLabel: "Dress Code",
    dressCodeText: "Come as you are — dress casually and feel at home.",
    arrivalLabel: "When to Arrive",
    arrivalText: "We recommend arriving 10-15 minutes early for your first visit. This gives you time to check in your kids and find a seat.",
    buttonText: "Get Directions",
  },
  
  // Kids section
  kids: {
    tagText: "Kids",
    headline: "We Love Kids!",
    description: "Vibrant Church offers a safe, loving environment where children can learn about God in a fun and engaging way.",
    features: [
      "Safe, loving environment",
      "Fun and engaging activities",
      "Age-appropriate teaching",
      "Secure check-in system",
      "Trained, caring volunteers",
    ],
    footnote: "Just look for the Kids Check-In area when you arrive, and our friendly team will help you get your children registered and settled.",
  },
  
  // CTA section
  cta: {
    headline: "Have Questions?",
    description: "We'd love to hear from you! Reach out with any questions about visiting Vibrant Church.",
    buttonText: "Contact Us",
  },
};

// =====================================================
// 🎬 WATCH PAGE
// =====================================================
export const watchPageContent = {
  // Hero section
  hero: {
    title: "Watch Online",
    description: "Join us online or watch past messages anytime.",
    subtext: "Experience uplifting worship and encouraging messages that help you grow in your faith.",
  },
  
  // Live stream section
  liveStream: {
    headline: "Live Every Sunday",
    description: "Join us live every Sunday at 10 AM EST on YouTube and Facebook.",
    watchLiveText: "Click to watch live service",
    youtubeButtonText: "Watch on YouTube",
    facebookButtonText: "Watch on Facebook",
  },
  
  // Sermon archive section
  sermonArchive: {
    headline: "Recent Sermons",
    description: "Catch up on messages you may have missed or revisit your favorites.",
    viewAllButtonText: "View All Sermons",
  },
  
  // Recent sermons - edit these when new sermons are added
  sermons: [
    {
      id: 1,
      title: "Finding Hope in Uncertain Times",
      speaker: "Pastor Mike Johnson",
      date: "January 12, 2026",
      duration: "45 min",
    },
    {
      id: 2,
      title: "The Power of Community",
      speaker: "Pastor Mike Johnson",
      date: "January 5, 2026",
      duration: "42 min",
    },
    {
      id: 3,
      title: "New Year, New Purpose",
      speaker: "Pastor Mike Johnson",
      date: "December 29, 2025",
      duration: "48 min",
    },
    {
      id: 4,
      title: "The Gift of Grace",
      speaker: "Pastor Mike Johnson",
      date: "December 22, 2025",
      duration: "52 min",
    },
  ],
  
  // Subscribe CTA section
  subscribeCta: {
    headline: "Never Miss a Message",
    description: "Subscribe to our YouTube channel to get notified when we go live and when new sermons are posted.",
    buttonText: "Subscribe on YouTube",
  },
};

// =====================================================
// 💝 GIVE PAGE
// =====================================================
export const givePageContent = {
  // Hero section
  hero: {
    title: "Give Generously",
    description: "Your generosity helps make ministry possible.",
  },
  
  // Giving options cards
  givingOptions: [
    {
      title: "One-Time Gift",
      description: "Make a single donation to support our church's mission and ministries.",
    },
    {
      title: "Recurring Giving",
      description: "Set up automatic weekly or monthly giving to provide consistent support.",
    },
    {
      title: "Special Offerings",
      description: "Give to specific causes like missions, building fund, or benevolence.",
    },
  ],
  
  // Secure giving section
  secureGiving: {
    headline: "Secure Online Giving",
    description: "Give safely and securely using your preferred payment method.",
    instructions: "Click the button below to give online. You can give using credit card, debit card, or bank transfer.",
    giveNowButtonText: "Give Now",
    securityNote: "Your information is secure and encrypted",
    recurringButtonText: "Set Up Recurring",
    specialGiftButtonText: "Special Gift",
  },
  
  // Other ways to give
  otherWaysToGive: {
    headline: "Other Ways to Give",
    inPerson: "Drop your gift in the offering during Sunday service",
    byMail: "Send a check to",
    textToGive: "Text \"GIVE\" to (717) 445-GIVE",
  },
  
  // Mailing address for donations
  mailingAddress: {
    line1: "P.O. Box 649",
    line2: "Terre Hill, PA 17581",
  },
  
  // Where your gift goes section
  giftImpact: {
    headline: "Where Your Gift Goes",
    description: "When you give to Vibrant Church, you are supporting:",
    areas: [
      { title: "Community Outreach", description: "Serving our neighbors and meeting needs in Terre Hill and beyond." },
      { title: "Kids & Youth", description: "Investing in the next generation through engaging programs." },
      { title: "Worship & Teaching", description: "Creating meaningful worship experiences and biblical teaching." },
      { title: "Church Operations", description: "Maintaining our facilities and supporting ministry staff." },
    ],
    thankYouMessage: "Thank you for being part of what God is doing here.",
  },
  
  // FAQ section
  faq: {
    headline: "Giving FAQs",
    questions: [
      {
        question: "Is my gift tax-deductible?",
        answer: "Yes! Vibrant Church is a 501(c)(3) nonprofit organization. You'll receive a giving statement at the end of the year for tax purposes.",
      },
      {
        question: "Can I designate my gift to a specific fund?",
        answer: "Absolutely. When giving online, you can choose from our general fund, missions, building fund, or benevolence fund.",
      },
      {
        question: "How do I set up recurring giving?",
        answer: "Click the 'Give Now' button and select 'Make this a recurring gift.' You can choose weekly, bi-weekly, or monthly giving.",
      },
      {
        question: "Is online giving secure?",
        answer: "Yes, we use industry-standard encryption to protect your financial information. Your data is never stored on our servers.",
      },
    ],
  },
  
  // Scripture section
  scripture: {
    verse: "Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver.",
    reference: "2 Corinthians 9:7",
  },
};

// =====================================================
// 📞 CONTACT PAGE
// =====================================================
export const contactPageContent = {
  // Hero section
  hero: {
    title: "Get Connected",
    description: "We would love to connect with you.",
    subtext: "Whether you have a question, need prayer, or want to get involved, we're here for you.",
  },
  
  // Contact info cards
  contactInfo: {
    addressTitle: "Address",
    phoneTitle: "Phone",
    emailTitle: "Email",
    serviceTimesTitle: "Service Times",
  },
  
  // Contact form section
  contactForm: {
    headline: "Send Us a Message",
    description: "Send us a message and we'll get back to you soon.",
    namePlaceholder: "Your name",
    emailPlaceholder: "your@email.com",
    phonePlaceholder: "(717) 555-1234",
    subjectPlaceholder: "How can we help?",
    messagePlaceholder: "Tell us what's on your heart...",
    submitButtonText: "Send Message",
    submittingText: "Sending...",
    successTitle: "Message Sent!",
    successDescription: "Thank you for reaching out. We'll get back to you soon!",
  },
  
  // Office hours
  officeHours: {
    headline: "Office Hours",
    hours: [
      { day: "Monday - Thursday", time: "9:00 AM - 4:00 PM" },
      { day: "Friday", time: "9:00 AM - 12:00 PM" },
      { day: "Saturday", time: "Closed" },
      { day: "Sunday", time: "Service at 10 AM" },
    ],
  },
  
  // Prayer request section
  prayerRequest: {
    headline: "Need Prayer?",
    description: "We believe in the power of prayer. If you're going through a difficult time or have a specific need, we would be honored to pray with you and for you.",
    footnote: "Submit a prayer request using the form above, or call us at",
  },
};

// =====================================================
// 📆 EVENTS PAGE
// =====================================================
export const eventsPageContent = {
  // Hero section
  hero: {
    title: "Events & Gatherings",
    description: "Stay connected with everything happening at Vibrant Church! From worship nights and Bible studies to community outreach and special services — there is always something happening.",
  },
  
  // Weekly services section
  weeklyServices: {
    tagText: "Weekly Gatherings",
    headline: "Regular Services",
    description: "These events happen regularly throughout the week.",
  },
  
  // Upcoming events section
  upcomingEvents: {
    headline: "Upcoming Events",
    description: "Special gatherings and events coming up in our community.",
  },
  
  // All events - edit these as needed
  // Set recurring: true for weekly events, recurring: false for one-time events
  events: [
    {
      id: 1,
      title: "Sunday Worship Service",
      date: "Every Sunday",
      time: "10:00 AM",
      description: "Join us for worship, fellowship, and an inspiring message.",
      recurring: true,
    },
    {
      id: 2,
      title: "Community Prayer Night",
      date: "January 22, 2026",
      time: "7:00 PM",
      description: "Come together for a powerful evening of prayer and intercession.",
      recurring: false,
    },
    {
      id: 3,
      title: "Youth Group Gathering",
      date: "Every Wednesday",
      time: "6:30 PM",
      description: "Middle and high school students connect through games, worship, and small groups.",
      recurring: true,
    },
    {
      id: 4,
      title: "Women's Bible Study",
      date: "January 25, 2026",
      time: "9:30 AM",
      description: "Dive deep into Scripture with other women seeking to grow in faith.",
      recurring: false,
    },
    {
      id: 5,
      title: "Family Game Night",
      date: "February 7, 2026",
      time: "6:00 PM",
      description: "Bring the whole family for food, fun, and fellowship!",
      recurring: false,
    },
    {
      id: 6,
      title: "Men's Breakfast",
      date: "February 14, 2026",
      time: "8:00 AM",
      description: "Good food, great fellowship, and encouragement for men of all ages.",
      recurring: false,
    },
  ],
  
  // CTA section
  cta: {
    headline: "Have an Event Idea?",
    description: "We'd love to hear your ideas for building community at Vibrant Church.",
    buttonText: "Contact Us",
  },
};

// =====================================================
// 🔧 SHARED CHURCH INFO
// Used across multiple pages - edit once, updates everywhere
// =====================================================
export const churchInfo = {
  name: "Vibrant Church",
  address: "113 Conestoga Street",
  city: "Terre Hill",
  state: "PA",
  zip: "17581",
  fullAddress: "113 Conestoga Street, Terre Hill, PA 17581",
  phone: "+1 (559) 207-8144",
  email: "hello@vibranttchurch.org",
  serviceTime: "Sundays at 10:00 AM",
};
