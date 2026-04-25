import { NavBar } from '@/components/controls/Navbar/NavBar';
import styles from '@/app/students/page.module.scss';
import { Pill, PillDotIcon } from '@/components/controls/Pill';
import { Button } from '@/components/controls/Button';
import { FeatureCard } from '@/components/elements/FeatureCard';
import { ImageContentSection } from '@/components/elements/ImageContentSection';
import {
  ComparisonTable,
  ComparisonTableColumn,
  ComparisonTableRow,
} from '@/components/elements/ComparisonTable';
import {
  ArrowRight,
  BookOpen,
  Brain,
  ChartLine,
  Check,
  Clock3,
  ListChecks,
  Rocket,
  Users,
} from 'lucide-react';
import { Footer } from '@/components/controls/Footer';
import { JoinWaitlistForm } from '@/components/JoinWaitlistForm';

const studentFeatures = [
  {
    icon: <Brain />,
    title: 'Intelligent Learning',
    description:
      'Adaptive algorithms analyze your strengths and weaknesses to create personalized study plans that maximize retention and understanding.',
  },
  {
    icon: <ListChecks />,
    title: 'Smart Task Management',
    description:
      'Never miss a deadline again. Automatically organize assignments, projects, and exams with intelligent prioritization and reminders.',
  },
  {
    icon: <ChartLine />,
    title: 'Progress Tracking',
    description:
      'Visualize your academic journey with detailed analytics, grade predictions, and performance insights across all subjects.',
  },
  {
    icon: <Clock3 />,
    title: 'Time Management',
    description:
      'Balance academics, extracurriculars, and personal time with smart scheduling tools and productivity insights.',
  },
  {
    icon: <BookOpen />,
    title: 'Study Resources',
    description:
      'Access curated learning materials, practice quizzes, and flashcards tailored to your curriculum and learning pace.',
  },
  {
    icon: <Users />,
    title: 'Collaboration Tools',
    description:
      'Connect with classmates for group projects, study sessions, and peer-to-peer learning in a safe, moderated environment.',
  },
];

const workflowSteps = [
  {
    badgeTitle: 'Sync Your Schedule',
    title: 'Import your classes and assignments',
    description:
      "Connect with your school's learning management system or manually add your courses. Craftyverse automatically pulls in assignments, deadlines, and exam dates to create your personalized dashboard.",
    points: [
      'One-click integration with Canvas, Blackboard, Google Classroom',
      'Automatic sync keeps everything up-to-date',
      'Manual entry for extracurricular activities',
    ],
    imageSrc: '/images/feature-1.jpg',
    imageAlt: 'Students collaborating around laptops',
    layout: 'image-left' as const,
  },
  {
    badgeTitle: 'Get Organized',
    title: 'Prioritization your workload',
    description:
      'Our intelligent system analyzes deadlines, difficulty levels, and your past performance to create an optimized study schedule that prevents last-minute cramming.',
    points: [
      'Smart deadline reminders based on task complexity',
      'Break large projects into manageable milestones',
      'Suggested study blocks that match your energy levels',
    ],
    imageSrc: '/images/feature-2.jpg',
    imageAlt: 'Student planning assignments in a notebook',
    layout: 'image-right' as const,
  },
  {
    badgeTitle: 'Track Progress',
    title: 'Watch your growth in real-time',
    description:
      "Celebrate wins, identify areas for improvement, and stay motivated with comprehensive analytics that show how far you've come and where you're headed.",
    points: [
      'Visual grade tracking across all subjects',
      'Predictive GPA calculator and what-if scenarios',
      'Achievement badges and milestone celebrations',
    ],
    imageSrc: '/images/feature-3.jpg',
    imageAlt: 'Student focused while reviewing performance on laptop',
    layout: 'image-left' as const,
  },
];

const comparisonColumns: ComparisonTableColumn[] = [
  { key: 'craftyverse', label: 'Craftyverse', highlight: true },
  { key: 'traditional', label: 'Traditional Platforms' },
  { key: 'otherApps', label: 'Other Apps' },
];

const comparisonRows: ComparisonTableRow[] = [
  {
    feature: 'AI-Powered Learning Paths',
    values: {
      craftyverse: 'included',
      traditional: 'not-included',
      otherApps: 'not-included',
    },
  },
  {
    feature: 'Automatic LMS Integration',
    values: {
      craftyverse: 'included',
      traditional: 'not-included',
      otherApps: 'partial',
    },
  },
  {
    feature: 'Progress Analytics & Predictions',
    values: {
      craftyverse: 'included',
      traditional: 'not-included',
      otherApps: 'partial',
    },
  },
  {
    feature: 'Smart Deadline Prioritization',
    values: {
      craftyverse: 'included',
      traditional: 'not-included',
      otherApps: 'included',
    },
  },
  {
    feature: 'Collaboration Tools',
    values: {
      craftyverse: 'included',
      traditional: 'not-included',
      otherApps: 'partial',
    },
  },
  {
    feature: 'Mobile & Desktop Sync',
    values: {
      craftyverse: 'included',
      traditional: 'not-included',
      otherApps: 'included',
    },
  },
];

const waitlistBenefits = [
  'No credit card required',
  'Early access priority',
  'Exclusive updates',
];

export default function StudentPage() {
  return (
    <div className={styles.pageContainer}>
      <NavBar />
      <section className={styles.titleSection}>
        <Pill title="For students" icon={<PillDotIcon color="#fa8673" />} />
        <h1 className={styles.headline}>Your personal study</h1>
        <h1 className={styles.subHeadline}>companion</h1>
        <p className={styles.supportingText}>
          Stay organized, focused, and ahead with intelligent task management,
          personalized learning paths, and real-time progress tracking—all in
          one place.
        </p>
        <Button
          text="Join Waitlist"
          icon={<ArrowRight />}
          href="#join-waitlist-form"
          size="small"
        />
      </section>
      <section className={styles.featureSection}>
        <h2 className={styles.featureTitle}>Everything you need to succeed</h2>
        <p className={styles.featureDescription}>
          Craftyverse adapts to your unique learning style and helps you achieve
          your academic goals.
        </p>
        <div className={styles.featureGrid}>
          {studentFeatures.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </section>
      <section className={styles.workflowSection}>
        <h2 className={styles.workflowTitle}>How Craftyverse works for you</h2>
        <p className={styles.workflowDescription}>
          A seamless workflow designed to keep you organized and motivated every
          step of the way.
        </p>
        <div className={styles.workflowSteps}>
          {workflowSteps.map((step, index) => (
            <ImageContentSection
              key={step.title}
              {...step}
              badgeIcon={
                <span className={styles.workflowBadgeNumber} aria-hidden="true">
                  {index + 1}
                </span>
              }
            />
          ))}
        </div>
      </section>
      <section className={styles.comparisonSection}>
        <h2 className={styles.comparisonTitle}>
          Why students choose Craftyverse
        </h2>
        <p className={styles.comparisonDescription}>
          See how we compare to traditional methods and other platforms.
        </p>
        <ComparisonTable columns={comparisonColumns} rows={comparisonRows} />
      </section>
      <section id="join-waitlist-form" className={styles.waitlistSection}>
        <div className={styles.waitlistCard}>
          <Pill title="Join Waitlist" icon={<Rocket />} variant="accent" />
          <h2 className={styles.waitlistTitle}>
            Start your journey to academic excellence
          </h2>
          <p className={styles.waitlistDescription}>
            Join thousands of students on the waitlist. Be among the first to
            experience the future of learning.
          </p>
          <div className={styles.waitlistFormLayer}>
            <JoinWaitlistForm />
          </div>
          <div className={styles.waitlistDivider} />
          <ul
            className={styles.waitlistBenefitsContainer}
            aria-label="Waitlist benefits"
          >
            {waitlistBenefits.map((benefit) => (
              <li key={benefit} className={styles.waitlistBenefit}>
                <span className={styles.waitlistBenefitIcon}>
                  <Check
                    aria-hidden="true"
                    className={styles.waitlistBenefitIcon}
                  />
                </span>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <Footer />
    </div>
  );
}
