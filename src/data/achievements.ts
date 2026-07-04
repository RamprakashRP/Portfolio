export interface Achievement {
  id: string;
  title: string;
  description: string;
  tags: string[];
  date: string;
  media: string[];
  rpRank?: number;
}

export const achievements: Achievement[] = [
  {
    id: "sundar-pichai",
    title: "Meeting Sundar Pichai as Top 6 Google Student Ambassador",
    description: "From building models as a final-year AI student to discussing the future of technology with the CEO of Google. This still doesn't feel real.\n\nLast week, I had the absolute honor of representing Google Gemini India at the India AI Impact Summit 2026 at Bharat Mandapam.\n\nBut the highlight wasn't just the incredible expo.\n\nOut of tens of thousands of applicants across the country, I was humbled to be selected as one of the Top 6 Google Student Ambassadors in India to have an exclusive meeting with Sundar Pichai sir.\n\nWe didn't just take a photo. We had a genuine conversation about: \n- How the Student Ambassador program accelerates personal and technical growth. \n- The impact we are creating on campuses to make AI accessible to the next generation of developers. \n- The incredible projects we've completed leveraging Google's ecosystem.\n\nHearing his vision for India's AI future up close was the most inspiring moment of my tech journey so far. It validates every late night spent coding, organizing club events, and building communities.\n\nA massive thank you to the Google India team for trusting me with this platform and for investing so heavily in student leaders. To my fellow Top 6 what a surreal experience to share with you all!\n\nI am carrying this momentum forward. If you are a student looking to step into this ecosystem, keep an eye on my profile this week. I have something special to share that might help you start your own journey.",
    tags: ["Google", "AI", "Leadership", "Award"],
    date: "18th Feb 2026",
    media: [
      "/achievements/sundar-pichai/1.jpg",
      "/achievements/sundar-pichai/2.jpg",
      "/achievements/sundar-pichai/3.jpg",
      "/achievements/sundar-pichai/4.jpg",
      "/achievements/sundar-pichai/5.jpg"
    ],
    rpRank: 1,
  },
  {
    id: "best-outgoing-student",
    title: "Best Outgoing Student (2022-2026) at SRM IST",
    description: "The price of being \"Best Outgoing Student\" isn't just hard work. It's the choices no one sees.\n\n4 years. 49+ Professional Certifications. 9.7 CGPA. National Symposia Leadership. Research Patents. 4 Consecutive Sports Championships.\n\nToday, I'm incredibly humbled to share that I have been awarded the Best Outgoing Student (2022-2026) title at SRM Institute of Science and Technology.\n\nPeople often ask what the \"tipping point\" was. The truth? It was choosing myself.\n\nWhen others were seeking ways to goof off or \"hang out,\" I was working toward my goals. I had to make the difficult choice between fitting in and standing out. I chose the latter, even when it meant losing friends along the way. To reach the top 0.01%, you have to be comfortable being the person who works while everyone else is resting.\n\nThe Evolution of Leadership: In my first year, I thought being a leader meant taking everyone to the finish line. By my final year, I realized the hard truth: You can only lead those who want to grow.\n\nI stopped trying to carry those who only complained or waited for rewards they didn't work for. As soon as I let go of that weight and focused on those with a growth mindset, I saw myself and my team go higher than ever before.\n\nTo the Batch of 2027: \n1. Work is Entertainment: If you treat your work as a burden, you'll always be tired. If you turn your work into your enjoyment, you'll never \"work\" a day in your life. \n2. The 0.0001% Rule: No matter how many times you fail, if there is even a 0.0001% chance of winning, give it every single bit of energy you have. Most people quit at 99%. Don't be most people.\n\nThis award isn't just a trophy; it's a testament to 1,320 days of choosing purpose over comfort.\n\nSRM, it's been an honor.",
    tags: ["Academic", "Award", "Leadership"],
    date: "9th April 2026",
    media: [
      "/achievements/best-outgoing-student/1.jpg",
      "/achievements/best-outgoing-student/2.jpg",
      "/achievements/best-outgoing-student/3.jpg",
      "/achievements/best-outgoing-student/4.jpg"
    ],
    rpRank: 2,
  },
  {
    id: "overall-champions",
    title: "Overall Men's Trophy - Sports Leadership",
    description: "A good GPA is great. But the most important lessons in college aren't taught in a lecture hall.\n\nIt is incredibly easy to let college become nothing more than assignments and exams. Yes, maintaining your academics is absolutely necessary, but if you let it completely tie you down, you miss out on the real education. You have to step outside the classroom and explore sports, events, and communities.\n\nWhen I first stepped onto the college court, I was just a rookie hungry to play. I tasted gold early on in Basketball and Track & Field, but the journey to true leadership is rarely a straight line. In fact, by my second year, I missed the cut for the basketball squad entirely.\n\nThat setback stung. But it became the exact fuel I needed. I channeled that energy into leading the Track & Field team, fought my way back onto the basketball roster the following year for another Gold, and learned what it takes to grind through failure.\n\nAll of that culminated in my final year when I was trusted with the role of Department Men's Sports Coordinator.\n\nThis year wasn't about my individual game. It was about managing an entire ecosystem. I personally headed Basketball and Track, but the true strength of our department was the incredible juniors who stepped up and the dedicated team captains who led their respective sports.\n\nAs Michael Jordan said, \"Talent wins games, but teamwork and intelligence win championships.\"\n\nThe result? We didn't just win. We secured the Overall Men's Trophy with a massive 89 points, leaving the runner-up at 51 points.\n\nThis 89-point sweep belongs to every single athlete who left everything on the field. A massive shoutout to my counterpart, our Women's Department Coordinator, Sheerin S. Managing the logistics, the pressure, and the immense scale of our department's sports front alongside you was a masterclass in coordination. We promised we'd bring the trophies home, and we delivered!\n\nDo not just tie yourself to your desk. Step onto the field. Join that club. Take the loss, learn the lesson, and come back to lead the team.",
    tags: ["Sports", "Leadership", "Extracurricular"],
    date: "15th March 2026",
    media: [
      "/achievements/overall-champions/1.jpg",
      "/achievements/overall-champions/2.jpg",
      "/achievements/overall-champions/3.jpg",
      "/achievements/overall-champions/4.jpg",
      "/achievements/overall-champions/5.jpg",
      "/achievements/overall-champions/6.jpg"
    ],
    rpRank: 3,
  },
  {
    id: "dubai-ai-film-festival",
    title: "AI Film Festival Dubai - Winning Candidate",
    description: "Top 0.0001%. Fully Sponsored. Dubai Bound.\n\nI am beyond honored to announce that I have been selected as a Winning Candidate for the AI Film Festival in Dubai from 8th - 13th January, 2026!\n\nOut of thousands of talented students, standing here today as one of the Top 5 selected ambassadors feels surreal-effectively placing me in the top 0.0001% of the community.\n\nThis milestone represents more than just a trip; it is a recognition of months of relentless consistency, deep-dive AI knowledge, and genuine community impact. The selection process was rigorous, evaluating everything from our technical journey to our interpersonal skills, and reading the words \"exceptional merit, enthusiasm, and potential\" was the ultimate validation of that hard work.\n\nI am officially packing my bags for a Google sponsored trip to represent our community on an international stage, network with global innovators, and witness firsthand where AI and creativity collide.\n\nA massive thank you to the Google Student Ambassador program team for trusting me with this global opportunity and for recognizing the \"real work\" behind the scenes.\n\nNext stop: Dubai.",
    tags: ["Google", "AI", "Global", "Award"],
    date: "28th December 2025",
    media: [
      "/achievements/dubai-ai-film-festival/1.jpg"
    ],
    rpRank: 4,
  }
];
