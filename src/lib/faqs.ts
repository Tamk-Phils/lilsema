export const contactFaqs = [
  {
    question: "How do I book a session?",
    answer:
      "Book directly via WhatsApp by clicking the button on our contact page. Lil Sema typically responds within 2 hours.",
  },
  {
    question: "Where are you located?",
    answer:
      "Based in Douala, Cameroon, with availability for travel across the country for weddings, events, and commercial projects.",
  },
  {
    question: "Do you offer drone shots?",
    answer:
      "Yes — cinematic aerial 4K drone videography and photography are available as part of premium packages.",
  },
  {
    question: "What is your turnaround time?",
    answer:
      "Photography clients receive a preview within 48 hours and the full gallery within 7–10 business days.",
  },
  {
    question: "What types of photography do you specialize in?",
    answer:
      "Portraits, weddings, corporate branding, concerts, music videos, commercial shoots, and cinematic event coverage throughout Cameroon.",
  },
  {
    question: "Do you travel outside Douala?",
    answer:
      "Yes. Lil Sema travels across Cameroon for major events and is available for destination shoots by arrangement.",
  },
] as const;

/** Display format for the contact page UI */
export const contactFaqsDisplay = contactFaqs.map((faq) => ({
  q: faq.question,
  a: faq.answer,
}));
