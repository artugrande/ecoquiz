export interface QuizQuestion {
  question: string
  options: string[]
  correctAnswer: number
  timeLimit: number
  ecoTip: string
}

export const quizData: QuizQuestion[] = [
  {
    question: "What percentage of global greenhouse gas emissions comes from the transportation sector?",
    options: ["About 10%", "About 24%", "About 45%", "About 60%"],
    correctAnswer: 1,
    timeLimit: 20,
    ecoTip:
      "Transportation accounts for roughly 24% of global CO₂ emissions. Choosing public transit, cycling, or electric vehicles can significantly reduce your carbon footprint.",
  },
  {
    question: "Which material takes the longest to decompose in a landfill?",
    options: ["Plastic bottle", "Glass bottle", "Aluminum can", "Paper bag"],
    correctAnswer: 1,
    timeLimit: 20,
    ecoTip:
      "Glass can take up to 1 million years to decompose, but it's 100% recyclable and can be recycled endlessly without loss of quality. Always recycle glass!",
  },
  {
    question: "How much water does the average person use per day in developed countries?",
    options: ["50 liters", "100 liters", "150 liters", "200 liters"],
    correctAnswer: 2,
    timeLimit: 20,
    ecoTip:
      "The average person in developed countries uses about 150 liters of water daily. Simple actions like shorter showers and fixing leaks can save thousands of liters per year.",
  },
  {
    question: "Which renewable energy source currently generates the most electricity worldwide?",
    options: ["Solar power", "Wind power", "Hydroelectric power", "Geothermal power"],
    correctAnswer: 2,
    timeLimit: 20,
    ecoTip:
      "Hydroelectric power is the largest renewable electricity source globally. However, solar and wind are the fastest-growing renewable energy technologies.",
  },
  {
    question: "What percentage of Earth's species are estimated to live in rainforests?",
    options: ["25%", "50%", "75%", "90%"],
    correctAnswer: 1,
    timeLimit: 20,
    ecoTip:
      "Rainforests cover only 6% of Earth's surface but contain about 50% of all species. Protecting these ecosystems is crucial for biodiversity conservation.",
  },
  {
    question: "Which mode of transport has the lowest carbon emissions per passenger kilometer?",
    options: ["Electric car", "Bus", "Train", "Bicycle"],
    correctAnswer: 3,
    timeLimit: 20,
    ecoTip:
      "Bicycles produce zero emissions and are the most sustainable transport option. For longer distances, trains are typically the most eco-friendly motorized option.",
  },
  {
    question: "How many years does it take for a plastic bag to decompose?",
    options: ["10-20 years", "50-100 years", "200-500 years", "1000+ years"],
    correctAnswer: 2,
    timeLimit: 20,
    ecoTip:
      "Plastic bags can take 200-500 years to decompose. Switch to reusable bags to eliminate this waste—one reusable bag can replace hundreds of single-use bags.",
  },
  {
    question: "What is the average carbon footprint per person per year in developed countries?",
    options: ["2 tons", "6 tons", "10 tons", "16 tons"],
    correctAnswer: 2,
    timeLimit: 25,
    ecoTip:
      "The average carbon footprint in developed countries is about 10 tons CO₂ per year. To limit global warming to 1.5°C, we need to reduce this to under 2 tons by 2050.",
  },
  {
    question: "Which diet has the lowest environmental impact?",
    options: ["Omnivorous diet", "Pescatarian diet", "Vegetarian diet", "Plant-based (vegan) diet"],
    correctAnswer: 3,
    timeLimit: 20,
    ecoTip:
      "Plant-based diets have the lowest environmental impact, using less land, water, and producing fewer emissions. Even reducing meat consumption a few days per week makes a difference.",
  },
  {
    question: "What percentage of the ocean's surface should be protected to maintain healthy marine ecosystems?",
    options: ["At least 10%", "At least 20%", "At least 30%", "At least 50%"],
    correctAnswer: 2,
    timeLimit: 20,
    ecoTip:
      "Scientists recommend protecting at least 30% of the ocean by 2030 to preserve marine biodiversity and ensure healthy ecosystems for future generations.",
  },
]
