'use client'
import { LandingCTA } from '@/designSystem/landing/LandingCTA'
import { LandingContainer } from '@/designSystem/landing/LandingContainer'
import LandingFAQ from '@/designSystem/landing/LandingFAQ'
import { LandingFeatures } from '@/designSystem/landing/LandingFeatures'
import { LandingHero } from '@/designSystem/landing/LandingHero'
import { LandingHowItWorks } from '@/designSystem/landing/LandingHowItWorks'
import { LandingPainPoints } from '@/designSystem/landing/LandingPainPoints'
import { LandingPricing } from '@/designSystem/landing/LandingPricing'
import { LandingSocialProof } from '@/designSystem/landing/LandingSocialProof'
import { LandingSocialRating } from '@/designSystem/landing/LandingSocialRating'
import { LandingTestimonials } from '@/designSystem/landing/LandingTestimonials'
import {
  ClockCircleOutlined,
  EditOutlined,
  FileTextOutlined,
  LinkOutlined,
  SearchOutlined,
  TeamOutlined,
} from '@ant-design/icons'

export default function LandingPage() {
  const features = [
    {
      heading: 'Centralized Knowledge Base',
      description:
        'Upload files and URLs to create a comprehensive repository of organizational knowledge.',
      icon: <FileTextOutlined />,
    },
    {
      heading: 'Efficient Information Retrieval',
      description:
        'Query the chatbot to get precise answers quickly, reducing time spent searching for information.',
      icon: <SearchOutlined />,
    },
    {
      heading: 'Enhanced Productivity',
      description:
        'Streamline workflows and improve decision-making with easy access to information.',
      icon: <ClockCircleOutlined />,
    },
    {
      heading: 'Collaborative Environment',
      description:
        'Enable employees to share and access knowledge seamlessly, fostering a collaborative work culture.',
      icon: <TeamOutlined />,
    },
    {
      heading: 'Versatile Data Handling',
      description:
        'Supports various forms of knowledge, including documents and web links.',
      icon: <LinkOutlined />,
    },
    {
      heading: 'Scalable Solution',
      description:
        'Ideal for medium to large organizations across multiple industries.',
      icon: <EditOutlined />,
    },
  ]

  const testimonials = [
    {
      name: 'John Doe',
      designation: 'Project Manager',
      content:
        'This chatbot app has revolutionized the way our team accesses information. It has significantly reduced the time we spend searching for documents.',
      avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
    },
    {
      name: 'Jane Smith',
      designation: 'HR Specialist',
      content:
        'An invaluable tool for our organization. The centralized knowledge base has made our processes much more efficient.',
      avatar: 'https://randomuser.me/api/portraits/women/6.jpg',
    },
    {
      name: 'Michael Brown',
      designation: 'IT Support',
      content:
        'The chatbot app has streamlined our workflow and improved our productivity. It’s a game-changer!',
      avatar: 'https://randomuser.me/api/portraits/men/7.jpg',
    },
    {
      name: 'Emily White',
      designation: 'Financial Analyst',
      content:
        'Quick and easy access to information has made our decision-making process faster and more accurate.',
      avatar: 'https://randomuser.me/api/portraits/men/12.jpg',
    },
    {
      name: 'David Green',
      designation: 'Healthcare Administrator',
      content:
        'A must-have for any organization looking to improve efficiency and productivity.',
      avatar: 'https://randomuser.me/api/portraits/men/17.jpg',
    },
    {
      name: 'Sophia Blue',
      designation: 'Educator',
      content:
        'The chatbot app has been a fantastic addition to our institution. It has made accessing information so much easier for our staff.',
      avatar: 'https://randomuser.me/api/portraits/women/27.jpg',
    },
  ]

  const navItems = [
    {
      title: 'Home',
      link: '/',
    },
    {
      title: 'Features',
      link: '#features',
    },
    {
      title: 'Pricing',
      link: '#pricing',
    },
  ]

  const packages = [
    {
      title: 'Basic',
      description: 'Ideal for small teams',
      monthly: 9,
      yearly: 69,
      features: [
        'Centralized Knowledge Base',
        'Efficient Information Retrieval',
      ],
    },
    {
      title: 'Pro',
      description: 'Perfect for growing organizations',
      monthly: 29,
      yearly: 249,
      features: [
        'All Basic Features',
        'Enhanced Productivity',
        'Collaborative Environment',
      ],
      highlight: true,
    },
    {
      title: 'Enterprise',
      description: 'Best for large enterprises',
      monthly: 99,
      yearly: 999,
      features: [
        'All Pro Features',
        'Versatile Data Handling',
        'Scalable Solution',
      ],
    },
  ]

  const questionAnswers = [
    {
      question: 'How does the chatbot app work?',
      answer:
        'The chatbot app allows you to upload files and URLs to create a centralized knowledge base. You can then query the chatbot to retrieve precise information based on the uploaded data.',
    },
    {
      question: 'What types of files can I upload?',
      answer:
        'You can upload various forms of knowledge, including documents PDX/DOCX/CSV and web links.',
    },
    {
      question: 'Is the chatbot app suitable for large organizations?',
      answer:
        'Yes, the chatbot app is designed to be scalable and is ideal for medium to large organizations across multiple industries.',
    },
    {
      question: 'How can the chatbot app improve productivity?',
      answer:
        'By providing quick and easy access to information, the chatbot app reduces the time spent searching for documents and enhances overall productivity.',
    },
  ]

  const logos = [
    { url: 'https://i.imgur.com/afwBIFK.png' },
    { url: 'https://i.imgur.com/LlloOPa.png' },
    { url: 'https://i.imgur.com/j8jPb4H.png' },
    { url: 'https://i.imgur.com/mJ1sZFv.png' },
  ]

  const steps = [
    {
      heading: 'Upload Your Knowledge',
      description:
        'Easily upload files and URLs to create a centralized repository of information.',
    },
    {
      heading: 'Query the Chatbot',
      description:
        'Ask the chatbot questions to retrieve precise answers based on the uploaded data.',
    },
    {
      heading: 'Access Information Quickly',
      description:
        'Get the information you need in seconds, reducing the time spent searching for documents.',
    },
    {
      heading: 'Enhance Productivity',
      description:
        'Streamline workflows and improve decision-making with easy access to information.',
    },
  ]

  const painPoints = [
    {
      emoji: '🔍',
      title: 'Wasting time searching for documents',
    },
    {
      emoji: '⏳',
      title: 'Reduced productivity due to inefficient information retrieval',
    },
    {
      emoji: '💼',
      title: 'Difficulty in accessing organizational knowledge',
    },
  ]

  const avatarItems = [
    {
      src: 'https://randomuser.me/api/portraits/men/51.jpg',
    },
    {
      src: 'https://randomuser.me/api/portraits/women/9.jpg',
    },
    {
      src: 'https://randomuser.me/api/portraits/women/52.jpg',
    },
    {
      src: 'https://randomuser.me/api/portraits/men/5.jpg',
    },
    {
      src: 'https://randomuser.me/api/portraits/men/4.jpg',
    },
  ]

  return (
    <LandingContainer navItems={navItems}>
      <LandingHero
        title="Chat with your data seamlessly"
        subtitle="Turn enterprise knowledge (PDFs, URLs, text) into an AI assistant and talk to your data naturally"
        buttonText="Get Started"
        buttonLink="/login"
        pictureUrl="https://marblism-dashboard-api--production-public.s3.us-west-1.amazonaws.com/l6yaGG-chatbotknowledge-jYzO"
        socialProof={
          <LandingSocialRating
            avatarItems={avatarItems}
            numberOfUsers={1000}
            suffixText="from happy users"
          />
        }
      />
      <LandingSocialProof logos={logos} title="Featured on" />
      <LandingPainPoints
        title="The Hidden Costs of Inefficiency"
        painPoints={painPoints}
      />
      <LandingHowItWorks title="How It Works" steps={steps} />
      <LandingFeatures
        id="features"
        title="Achieve Your Goals with Our Chatbot App"
        subtitle="Discover how our features can help you streamline information retrieval and enhance productivity."
        features={features}
      />
      <LandingTestimonials
        title="Success Stories"
        subtitle="See how our chatbot app has helped other organizations achieve their goals."
        testimonials={testimonials}
      />
      <LandingPricing
        id="pricing"
        title="Choose the Right Plan for Your Needs"
        subtitle="Find the perfect plan to help you resolve your pain points and boost productivity."
        packages={packages}
      />
      <LandingFAQ
        id="faq"
        title="Frequently Asked Questions"
        subtitle="Get answers to common questions about our chatbot app."
        questionAnswers={questionAnswers}
      />
      <LandingCTA
        title="Ready to Boost Your Productivity?"
        subtitle="Get started with our chatbot app today and unlock your organization's full potential."
        buttonText="Get Started"
        buttonLink="/register"
      />
    </LandingContainer>
  )
}
