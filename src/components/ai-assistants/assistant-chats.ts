export type AssistantChat = {
  assistant: string;
  logo: string;
  question: string;
  tool: string;
  answer: string;
};

export const ASSISTANT_CHATS: AssistantChat[] = [
  {
    assistant: "Claude",
    logo: "/brands/claude.svg",
    question: "Which of my forms got the most leads this month?",
    tool: "list_forms",
    answer: "Your Contact form leads with 182 responses, up 34% on last month. Demo request is second with 96.",
  },
  {
    assistant: "ChatGPT",
    logo: "/brands/openai-chatgpt.svg",
    question: "How many bookings do I have this week?",
    tool: "get_booking_summary",
    answer: "You have 11 bookings this week. Thursday is the busiest, with 4 calls between 10:00 and 15:00.",
  },
  {
    assistant: "Claude",
    logo: "/brands/claude.svg",
    question: "Summarise my website traffic for the last 7 days.",
    tool: "get_analytics_summary",
    answer: "9,204 visitors, up 22%. Google sent 41% of them, and /pricing was the most visited page.",
  },
];
