export interface Testimonial {
  name: string;
  role: string;
  rating: number;
  text: string;
  image: string; // The path to the image in public folder
}

export const leftReviews: Testimonial[] = [
  {
    name: 'Princeton Vishal',
    role: 'Joint Head of Social Media',
    rating: 4.5,
    text: "Working with Ram won't feel like work, it's just hanging out with a buddy. Anytime I call he picks and helps me out with anything.",
    image: '/testimonials/princeton.jpg'
  },
  {
    name: 'Azam',
    role: 'Joint Treasurer',
    rating: 4.5,
    text: "Working with RP felt a close and valued friend during days, Played a significant role in your personal growth, helping you learn many things and improve various skills. Shared experiences and learning moments during college contributed to your",
    image: '/testimonials/azam.avif'
  },
  {
    name: 'Haryshwa',
    role: 'Joint Technical Head',
    rating: 4.5,
    text: "Ram has an exceptional ability to handle multiple responsibilities at once while maintaining high quality. He is skilled across a wide range of areas, making him adaptable and highly dependable in any situation.",
    image: '/testimonials/haryshwa.jpg'
  },
  {
    name: 'Aman Kumar',
    role: 'Secretary General, SRMVMUN',
    rating: 5.0,
    text: "Working with Ram has been such a smooth and fun experience he is proactive, reliable, and always bring good energy to the team. Id rate a solid 5/5 as a coworker, with just a little room left for growth (which I know he will ace!) Keep it up ✨",
    image: '/testimonials/aman.avif'
  },
  {
    name: 'Could be Anyone!!',
    role: '...',
    rating: 5.0,
    text: "If Yall have something to say reach out, DM me ILL check it out !!",
    image: '/testimonials/anyone.png'
  }
];

export const rightReviews: Testimonial[] = [
  {
    name: 'Sheerin',
    role: 'Secretary, NIC',
    rating: 5.0,
    text: "Ramprakash is the true jack of all trades, driven by a constant desire to learn, grow, and excel in everything he does. He aims for the top and takes rejections as fuel to improve. With a strong focus on self-betterment and uplifting those around him, he turns every challenge into an opportunity for growth and inspiration.",
    image: '/testimonials/sheerin.avif'
  },
  {
    name: 'Bhuvanesh',
    role: 'Vice President, ACF',
    rating: 4.5,
    text: "Ram makes collaboration smooth and fun. He's reliable, approachable, and somehow turns every task into an engaging experience.",
    image: '/testimonials/bhuvanesh.avif'
  },
  {
    name: 'Kanishkaa C',
    role: 'Vice President, NIC',
    rating: 4.7,
    text: "Working with Ram has always been inspiring. I've learned a lot from him, be it his work ethics or self determination, he always gives his best!",
    image: '/testimonials/kanishkaa.avif'
  },
  {
    name: 'Kalaimani',
    role: 'Treasurer',
    rating: 3.5,
    text: "working with ram has been a great experience since he manages the work well, any kind of the problems will be resolved immediately with better communication and there won't be any kind of grievance with him.",
    image: '/testimonials/kalaimani.avif'
  },
  {
    name: 'Sri Varshini',
    role: 'Technical Head',
    rating: 4.0,
    text: "Working with Ram felt like a true partnership. Beyond just sharing the workload, he had a knack for seeing potential problems before they arose, which made every project run more smoothly. His dedication was a constant motivator; you could always rely on him to follow through, which ultimately made the entire experience productive and genuinely enjoyable.",
    image: '/testimonials/varshini.avif'
  }
];

export const specialReviews: Record<string, Testimonial> = {
  ryan: {
    name: 'Ryan',
    role: 'The One',
    rating: 5.0,
    text: "He is a Guy to be trusted with any task given. He is one of those Jack of all trades kind of guy !!",
    image: '/testimonials/ryan.avif'
  },
  sims: {
    name: 'SIMS Project Manager',
    role: 'Logo',
    rating: 5.0,
    text: "Working with Ram was great, highly recommend his services for project management and automation.",
    image: '/testimonials/sims.avif'
  }
};
