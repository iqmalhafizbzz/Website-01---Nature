// All visible copy for the Halia & Co. demo site, taken from the Content Pack.
// Halia & Co. is invented: no name, figure, fee or address here belongs to a real business.

export const site = {
  name: "Halia & Co.",
  tagline: "Tax & Accounting",
  demoBanner: "Demo site by Primaxoft. Halia & Co. is not a real business.",
  phone: "+60 3-1234 5678",
  phoneHref: "tel:+60312345678",
  email: "hello@halia.example",
  address: ["Level 9, Menara Halia", "47800 Petaling Jaya, Selangor"],
  hours: "Monday to Friday, 9:00 am to 6:00 pm",
  // The brief asks for the WhatsApp button to open the Contact page, not wa.me.
  whatsappHref: "/contact/",
  socials: [
    { label: "LinkedIn", href: "#" },
    { label: "Facebook", href: "#" },
  ],
};

export const bookCall = { label: "Book a free call", href: "/contact/" };

export const nav = [
  { value: "home", label: "Home", href: "/" },
  { value: "services", label: "Services", href: "/services/" },
  { value: "about", label: "About", href: "/about/" },
  { value: "fees", label: "How we work & fees", href: "/how-we-work/" },
  { value: "contact", label: "Contact", href: "/contact/" },
];

export type Item = { title: string; text: string };

export const home = {
  hero: {
    title: "Your books, done right. Your taxes, on time.",
    text: "We look after accounting, tax and payroll for small businesses in the Klang Valley, for one fixed monthly fee. You run the business; we keep LHDN, SSM and your bank happy.",
    secondary: { label: "See our fees", href: "/how-we-work/" },
    photo: "tidy desk laptop documents",
  },
  plate: {
    title: "What we take off your plate",
    items: [
      { title: "Bookkeeping and accounts", text: "Monthly books, bank reconciliation and the financial statements your bank asks for." },
      { title: "Tax", text: "Filing for you and your business, plus planning so the bill is never a surprise." },
      { title: "Payroll", text: "Salaries, EPF, SOCSO, EIS and PCB, paid and filed every month." },
      { title: "e-Invoicing and SST", text: "Getting you set up with MyInvois and keeping your SST returns on time." },
    ] satisfies Item[],
  },
  why: {
    title: "Why business owners stay with us",
    items: [
      { title: "Fixed fees.", text: "You know the price before we start, and it doesn't change when you ask questions." },
      { title: "A reply within one working day.", text: "On WhatsApp or email, from the accountant who knows your file." },
      { title: "Plain language.", text: "We explain what the numbers mean for your business, not just what they are." },
    ] satisfies Item[],
  },
  start: {
    title: "Getting started takes two weeks",
    steps: [
      "A free 20-minute call to understand your business.",
      "A fixed quote within two working days.",
      "We collect your past records and take over from your old accountant.",
    ],
  },
  who: {
    title: "Who we work with",
    text: "Cafés and restaurants, clinics, contractors, online sellers and consultancies, from one-person businesses to companies with 50 staff. If you're not sure we're a fit, ask; we'll tell you honestly.",
    tags: ["Cafés and restaurants", "Clinics", "Contractors", "Online sellers", "Consultancies"],
    photo: "kuala lumpur shop street",
  },
  cta: {
    title: "Not sure where your books stand?",
    text: "Book a free 20-minute call. We'll tell you what's missing, what's due, and what it would cost us to sort it out. No obligation.",
  },
};

export const services = {
  hero: {
    title: "Services",
    text: "Everything a small business needs to stay compliant and know where it stands, handled by one team.",
    photo: "calculator notebook flat lay",
  },
  items: [
    {
      id: "bookkeeping",
      title: "Bookkeeping and accounts",
      text: "Send us your receipts and bank statements by the 7th of each month; we do the rest. You get monthly management accounts that show profit, cash and what's owed to you, and annual financial statements prepared for your audit or your bank.",
    },
    {
      id: "tax",
      title: "Tax",
      text: "Form B or BE for sole proprietors, Form P for partnerships and Form C for companies, filed on time. For companies we also prepare the CP204 tax estimate and review it mid-year, so there are no penalties for under-estimating. If LHDN reviews your file, we handle the letters and the meeting with you.",
    },
    {
      id: "payroll",
      title: "Payroll",
      text: "We run payroll every month: payslips, EPF, SOCSO, EIS and PCB, paid and filed before the deadline. At year end your staff get their EA forms on time. Fees are per employee, so it grows with you.",
    },
    {
      id: "e-invoicing",
      title: "e-Invoicing and SST",
      text: "We help you choose how to issue e-Invoices through MyInvois, set it up with your current system, and check the first months with you. If your business needs to register for SST, we handle the registration and every return after it.",
    },
  ],
  partners: {
    title: "Audit and company secretarial",
    text: "Statutory audit and company secretarial work are done by partner firms we have worked with for years. We prepare everything they need, so you deal with one team.",
  },
};

export const about = {
  hero: {
    title: "Big-firm experience, small-business attention",
    text: "Halia & Co. was started in 2016 by two accountants who spent their early careers at large firms. We saw small businesses get rushed service and surprise bills, and we wanted to give them the same care big clients get, at a price they can plan for.",
    photo: "bright office meeting room",
  },
  beliefs: {
    title: "What we believe",
    items: [
      "Your accountant should be easy to reach.",
      "A price should be a price.",
      "Good numbers help you decide, not just file.",
    ],
  },
  team: {
    title: "The team",
    people: [
      { name: "Nurul Aina Rahman", role: "Founding Partner, Tax", about: "Nurul spent eight years in tax advisory at a large firm before starting Halia & Co. She leads tax planning and every LHDN review." },
      { name: "Daniel Wong Kah Wai", role: "Partner, Accounting", about: "Daniel looks after the monthly books and management accounts. He is the person to ask “can I afford this?”." },
      { name: "Priya Raman", role: "Senior Accountant, Payroll", about: "Priya runs payroll for all our clients and knows every EPF and SOCSO form by heart." },
      { name: "Hafiz Azman", role: "Accounts Executive", about: "Hafiz is usually your first contact: he collects your documents and makes sure nothing is missing." },
    ],
  },
  numbers: {
    title: "Halia & Co. in numbers",
    stats: [
      { value: 120, suffix: "+", label: "businesses looked after" },
      { value: 10, suffix: " years", label: "in Petaling Jaya" },
      { value: 1, suffix: " working day", label: "to reply" },
    ],
  },
  visit: {
    title: "Come and see us",
    text: "Our office is in Petaling Jaya, five minutes from the LRT. Visits are by appointment, so the person who knows your file is there to meet you.",
    photo: "petaling jaya office building",
  },
};

export const fees = {
  hero: {
    title: "How we work and what it costs",
    text: "One fixed monthly fee, agreed before we start. Here is how it works and where the prices start.",
  },
  process: {
    title: "From first call to first report",
    steps: [
      { title: "Free call", meta: "20 minutes", text: "We learn about your business and what's due." },
      { title: "Fixed quote", text: "Within two working days." },
      { title: "Handover", text: "In your first two weeks: we collect past records and contact your old accountant for you." },
      { title: "Every month", text: "You send documents by the 7th; your report arrives by the 20th." },
    ],
  },
  plans: {
    title: "Fees",
    items: [
      { name: "Starter", for: "For sole proprietors and partnerships", prefix: "From", price: "RM250", unit: "/ month", includes: ["Bookkeeping", "Annual accounts", "Form B or P"] },
      { name: "Company", for: "For Sdn. Bhd. companies", prefix: "From", price: "RM650", unit: "/ month", includes: ["Bookkeeping", "Management accounts", "Form C", "CP204"] },
      { name: "Payroll", for: "Any plan", prefix: "", price: "RM15", unit: "per employee per month", includes: ["Payslips", "EPF, SOCSO, EIS and PCB", "EA forms at year end"] },
    ],
  },
  included: {
    title: "Always included, never extra",
    items: ["Questions on WhatsApp and email", "A yearly planning meeting", "Handling LHDN letters", "Taking over from your old accountant"],
    note: "Extra work, such as catching up on years of missing books, is quoted in writing before we start.",
  },
  faq: {
    title: "Questions we often hear",
    items: [
      { question: "My books are a mess. Can you still help?", answer: "Yes. We quote the catch-up work separately, then start the monthly fee." },
      { question: "Do I have to change software?", answer: "No. We work with most accounting software, or spreadsheets if that's what you have." },
      { question: "Can I leave?", answer: "Yes, with one month's notice. We hand your records to your next accountant." },
      { question: "Do you do audits?", answer: "Through partner firms; see Services." },
    ],
  },
  cta: {
    title: "Get your fixed quote",
    text: "Book a free call and you'll have a fixed price within two working days.",
  },
};

export const contact = {
  hero: {
    title: "Talk to us",
    text: "Tell us a little about your business, and we'll reply within one working day to book your free 20-minute call.",
  },
  form: {
    businessTypes: ["Sole proprietor", "Partnership", "Sdn. Bhd."],
    needs: ["Bookkeeping", "Tax", "Payroll", "e-Invoicing and SST", "Not sure"],
    submit: "Send",
    thanks: "Thanks! This is a demo site, so your message wasn't sent anywhere.",
  },
  other: {
    title: "Other ways to reach us",
    photo: "office reception plant",
  },
  next: {
    title: "What happens next",
    steps: [
      "We reply within one working day.",
      "We book a 20-minute call at a time that suits you.",
      "You get a fixed quote within two working days of the call.",
    ],
  },
};
